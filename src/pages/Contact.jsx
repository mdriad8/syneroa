import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Users,
  Briefcase,
} from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import { createContactMessage } from "../services/database";
import toast from "react-hot-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch for general inquiries",
      contact: "info@syneroa.com",
      action: "mailto:info@syneroa.com",
    },
    {
      icon: MessageSquare,
      title: "Support",
      description: "Need help with the platform?",
      contact: "info@syneroa.com",
      action: "mailto:info@syneroa.com",
    },
    {
      icon: Briefcase,
      title: "Partnerships",
      description: "Interested in collaborating?",
      contact: "syneroa@gmail.com",
      action: "mailto:syneroa@gmail.com",
    },
  ];

  const offices = [
    {
      city: "Melbourne",
      address: "Melbourne, VIC 3000, Australia",
      phone: "+61 4266 55519",
    },
  ];

  const faqs = [
    {
      question: "How can I submit a solution to a challenge?",
      answer:
        'Visit our Platform page, select the challenge you want to participate in, and click "Submit Solution". You\'ll need to create an account first.',
    },
    {
      question: "Can universities partner with Syneroa?",
      answer:
        "Absolutely! We offer custom partnership programs for universities. Contact us at partnerships@syneroa.com to discuss opportunities.",
    },
    {
      question: "What kind of support do fellowship recipients get?",
      answer:
        "Fellows receive a stipend, dedicated mentorship, access to resources, and the opportunity to present at our demo day.",
    },
    {
      question: "How are challenge winners selected?",
      answer:
        "Solutions are evaluated by our panel of industry experts based on innovation, feasibility, impact potential, and technical execution.",
    },
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Form Data Being Sent:", data); // Shows what you're sending
    try {
      await createContactMessage({
        ...data,
        createdAt: new Date().toISOString(),
      });
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      console.error("Submission Error:", error); // See exact error
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions, ideas, or want to collaborate? We'd love to hear
              from you. Reach out and let's build the future of innovation
              together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mb-4">
                    <method.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <a
                    href={method.action}
                    className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
                  >
                    {method.contact}
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership Opportunity">
                        Partnership Opportunity
                      </option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                      <option value="Fellowship Application">
                        Fellowship Application
                      </option>
                      <option value="Media Inquiry">Media Inquiry</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                      })}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                      placeholder="Tell us about your inquiry..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" loading={loading}>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-teal-600" />
                  Our Offices
                </h3>
                <div className="space-y-4">
                  {offices.map((office) => (
                    <div
                      key={office.city}
                      className="border-l-4 border-teal-600 pl-4"
                    >
                      <h4 className="font-medium text-slate-900">
                        {office.city}
                      </h4>
                      <p className="text-gray-600 text-sm">{office.address}</p>
                      <p className="text-gray-600 text-sm">{office.phone}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-4 last:border-b-0"
                    >
                      <h4 className="font-medium text-slate-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Connect with us on social media and stay updated with the latest
              innovations, challenges, and success stories.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-teal-100 hover:text-white transition-colors"
              >
                <Users className="h-8 w-8" />
              </a>
              <a
                href="#"
                className="text-teal-100 hover:text-white transition-colors"
              >
                <MessageSquare className="h-8 w-8" />
              </a>
              <a
                href="#"
                className="text-teal-100 hover:text-white transition-colors"
              >
                <Mail className="h-8 w-8" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
