import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import Button from "./UI/Button";

const SolutionDetailsModal = ({ isOpen, onClose, solutionId, solutions }) => {
  const solution = solutions.find((s) => s.$id === solutionId) || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-emerald-700">
                Solution Details
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {solution.title || "No Title"}
                </h3>
                <p className="text-gray-600 mt-2">
                  {solution.description || "No description available"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <strong>Category:</strong> {solution.category || "N/A"}
                </div>
                <div>
                  <strong>Submitted By:</strong> {solution.author || "Unknown"}
                </div>
                <div>
                  <strong>University:</strong> {solution.university || "N/A"}
                </div>
                <div>
                  <strong>Tags:</strong> {solution.tags?.join(", ") || "None"}
                </div>
              </div>

              {solution.pdfUrl && (
                <div>
                  <strong>Documentation:</strong>
                  <a
                    href={solution.pdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Download PDF <Download className="ml-2 h-4 w-4" />
                  </a>
                </div>
              )}

              <Button
                onClick={onClose}
                className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SolutionDetailsModal;
