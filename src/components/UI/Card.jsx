import React from "react";
import { motion } from "framer-motion";

const Card = ({ children, className = "", hover = false }) => {
  const baseClasses = "bg-white rounded-xl shadow-sm border border-gray-200";
  const hoverClasses = hover
    ? "hover:shadow-lg hover:border-gray-300 transition-all duration-300"
    : "";

  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      className={`${baseClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
