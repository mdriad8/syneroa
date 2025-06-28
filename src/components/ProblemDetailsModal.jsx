import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "./UI/Button";

const ProblemDetailsModal = ({ isOpen, onClose, problemId, problems }) => {
  const problem = problems.find((p) => p.$id === problemId) || {};

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
                Problem Details
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
                  {problem.title || "No Title"}
                </h3>
                <p className="text-gray-600 mt-2">
                  {problem.description || "No description available"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <strong>Category:</strong>{" "}
                  {problem.category || "Uncategorized"}
                </div>
                <div>
                  <strong>Submitted By:</strong>{" "}
                  {problem.submittedBy || "Unknown"}
                </div>
                <div>
                  <strong>Created:</strong>{" "}
                  {new Date(problem.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <strong>Votes:</strong> {problem.votes || 0}
                </div>
              </div>
              <Button
                variant="secondary"
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

export default ProblemDetailsModal;
