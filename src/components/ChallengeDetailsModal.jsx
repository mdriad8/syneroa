import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "./UI/Button";

const ChallengeDetailsModal = ({
  isOpen,
  onClose,
  challengeId,
  challenges,
}) => {
  const challenge = challenges.find((c) => c.$id === challengeId) || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white rounded-lg shadow-2xl w-full max-w-3xl p-6 overflow-y-auto max-h-[85vh]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-teal-700">
                Challenge Details
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {challenge.title || "No Title"}
                </h3>
                <p className="text-gray-600 mt-2">
                  {challenge.description || "No description available"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <strong>Deadline:</strong>{" "}
                  {new Date(challenge.deadline).toLocaleDateString()}
                </div>
                <div>
                  <strong>Prize:</strong> {challenge.prize || "N/A"}
                </div>
                <div>
                  <strong>Participants:</strong> {challenge.participants || 0}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  {new Date(challenge.deadline) >
                  new Date("2025-06-24T08:45:00+06:00")
                    ? "Active"
                    : "Closed"}
                </div>
              </div>
              <div>
                <strong>Tags:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {challenge.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  )) || <span className="text-gray-500">No tags</span>}
                </div>
              </div>
              <Button
                variant="primary"
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

export default ChallengeDetailsModal;
