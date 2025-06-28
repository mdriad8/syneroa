import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "../components/UI/Button";

const CapstoneProjectDetailsModal = ({
  isOpen,
  onClose,
  projectId,
  capstoneProjects,
}) => {
  const project = capstoneProjects.find((p) => p.$id === projectId) || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-6"
          >
            <div className="flex justify-between items-center mb-6 border-b border-emerald-200 pb-4">
              <h2 className="text-2xl font-bold text-emerald-700">
                {project.title || "No Title"}
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
                {project.description || "No description available"}
              </p>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <strong>University:</strong> {project.university || "N/A"}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      project.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.status || "N/A"}
                  </span>
                </div>
                <div>
                  <strong>Author:</strong> {project.author || "Unknown"}
                </div>
                <div>
                  <strong>Submitted:</strong>{" "}
                  {project.createdAt
                    ? new Date(project.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
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

export default CapstoneProjectDetailsModal;
