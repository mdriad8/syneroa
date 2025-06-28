import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "./UI/Button";

const IdeaDetailsModal = ({ isOpen, onClose, ideaId, ideas }) => {
  const idea = ideas.find((i) => i.$id === ideaId) || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-900/70">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-700">
                {idea.title || "No Title"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                {idea.description || "No description available"}
              </p>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <strong>Author:</strong> {idea.author || "Unknown"}
                </div>
                <div>
                  <strong>University:</strong> {idea.university || "N/A"}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      idea.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {idea.status || "N/A"}
                  </span>
                </div>
                <div>
                  <strong>Submitted:</strong>{" "}
                  {new Date(idea.createdAt).toLocaleDateString() || "N/A"}
                </div>
              </div>
              {idea.tags && (
                <div>
                  <strong>Tags:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {idea.tags.split(",").map((tag) => (
                      <span
                        key={tag}
                        className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <Button
                variant="outline"
                onClick={onClose}
                className="mt-6 w-full"
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

export default IdeaDetailsModal;
