import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "./UI/Button";
import { createIdea } from "../services/database";
import toast from "react-hot-toast";

const IdeaSubmissionModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createIdea({
        ...data,
        createdAt: new Date().toISOString(),
        status: "pending",
      });
      toast.success("Idea submitted successfully!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to submit idea. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Submit Your Idea
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title - Full width */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description - Full width */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  rows="4"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Name & Email - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name *
                  </label>
                  <input
                    {...register("author", { required: "Name is required" })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                  />
                  {errors.author && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.author.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* University & Tags - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    University *
                  </label>
                  <input
                    {...register("university", {
                      required: "University is required",
                    })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                  />
                  {errors.university && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.university.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tags (comma-separated)
                  </label>
                  <input
                    {...register("tags")}
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                loading={loading}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Submit <Send size={16} className="ml-2" />
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default IdeaSubmissionModal;
