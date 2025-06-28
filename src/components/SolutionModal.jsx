import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "./UI/Button";
import { createSolution } from "../services/database";
import { storage } from "../lib/appwrite";
import toast from "react-hot-toast";

const SolutionModal = ({ isOpen, onClose, challengeId }) => {
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const BUCKET_ID = "685a28ac00111368ab73"; // Your actual Appwrite bucket ID

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let pdfUrl = "";

      if (pdfFile) {
        const fileUpload = await storage.createFile(
          BUCKET_ID,
          "unique()",
          pdfFile
        );

        pdfUrl = storage.getFileView(BUCKET_ID, fileUpload.$id).href;
      }

      const solutionData = {
        ...data,
        tags: data.tags.split(",").map((tag) => tag.trim()),
        challengeId: challengeId || "",
        pdfUrl,
      };

      await createSolution(solutionData);
      toast.success("Solution submitted successfully! We'll review it soon.");
      reset();
      setPdfFile(null);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit solution. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      toast.error("Please select a valid PDF file.");
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
            className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Submit Your Solution
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Solution Title *
                  </label>
                  <input
                    {...register("title", { required: "Title is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your solution title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Describe your solution and how it addresses the problem..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      {...register("author", { required: "Name is required" })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                    {errors.author && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.author.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      University/Organization *
                    </label>
                    <input
                      {...register("university", {
                        required: "University/Organization is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Your university or organization"
                    />
                    {errors.university && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.university.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="AI & Machine Learning">
                      AI & Machine Learning
                    </option>
                    <option value="Climate & Sustainability">
                      Climate & Sustainability
                    </option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Social Impact">Social Impact</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    {...register("tags")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="React, Node.js, AI, etc. (comma separated)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach PDF (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {pdfFile
                          ? pdfFile.name
                          : "Click to upload PDF documentation"}
                      </p>
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full" loading={loading}>
                  Submit Solution <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SolutionModal;
