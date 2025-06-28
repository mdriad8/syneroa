import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "./UI/Button";
import { createProblem } from "../services/database";
import toast from "react-hot-toast";

const ProblemSubmissionModal = ({ isOpen, onClose }) => {
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
      await createProblem({
        ...data,
        createdAt: new Date().toISOString(),
        votes: 0,
      });
      toast.success("Problem submitted successfully!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to submit problem. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-emerald-700">
                Submit a Problem
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  rows="3"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <input
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Name *
                </label>
                <input
                  {...register("submittedBy", {
                    required: "Your name is required",
                  })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
                {errors.submittedBy && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.submittedBy.message}
                  </p>
                )}
              </div>
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

export default ProblemSubmissionModal;
