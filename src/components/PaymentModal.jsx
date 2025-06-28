import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Lock, CheckCircle } from "lucide-react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useAuth } from "../contexts/AuthContext";
import Button from "./UI/Button";
import Card from "./UI/Card";
import stripePromise, { createPaymentIntent } from "../lib/stripe";
import { enrollInCourse } from "../services/database";
import toast from "react-hot-toast";

const CheckoutForm = ({ course, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (course && course.price > 0) {
      createPaymentIntent(course.price, 'usd', {
        courseId: course.$id,
        courseName: course.title,
        userId: user.$id,
        userEmail: user.email
      }).then((data) => {
        setClientSecret(data.clientSecret);
      }).catch((error) => {
        console.error('Error creating payment intent:', error);
        toast.error('Failed to initialize payment');
      });
    }
  }, [course, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === 'succeeded') {
        // Enroll user in course
        await enrollInCourse(course.$id, user.$id, {
          paymentId: paymentIntent.id,
          amount: course.price,
          currency: 'usd',
          stripePaymentId: paymentIntent.id,
          status: 'completed'
        });

        toast.success(`Successfully enrolled in ${course.title}!`);
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-slate-900 mb-2">Order Summary</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{course.title}</span>
          <span className="font-semibold">${course.price}</span>
        </div>
        <div className="border-t mt-2 pt-2 flex justify-between items-center font-semibold">
          <span>Total</span>
          <span>${course.price}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <CreditCard className="inline h-4 w-4 mr-2" />
          Card Information
        </label>
        <div className="border border-gray-300 rounded-lg p-3 bg-white">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-600">
        <Lock className="h-4 w-4 mr-2" />
        Your payment information is secure and encrypted
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || loading}
          loading={loading}
          className="flex-1"
        >
          Pay ${course.price}
        </Button>
      </div>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, course, onSuccess }) => {
  const { user } = useAuth();

  if (!course) return null;

  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  const handleFreeEnrollment = async () => {
    try {
      await enrollInCourse(course.$id, user.$id);
      toast.success(`Successfully enrolled in ${course.title}!`);
      handleSuccess();
    } catch (error) {
      console.error('Free enrollment error:', error);
      toast.error(error.message || 'Enrollment failed');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {course.price > 0 ? 'Complete Purchase' : 'Enroll in Course'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  by {course.instructor}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                  <span>{course.students || 0} students</span>
                </div>
              </div>

              {course.price > 0 ? (
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    course={course}
                    onSuccess={handleSuccess}
                    onCancel={onClose}
                  />
                </Elements>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800 mb-1">
                      Free Course
                    </h3>
                    <p className="text-green-600 text-sm">
                      This course is completely free. Click below to enroll!
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleFreeEnrollment}
                      className="flex-1"
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;