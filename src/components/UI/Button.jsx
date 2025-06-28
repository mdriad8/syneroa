import React from "react";
import { motion } from "framer-motion";

const Button = ({
  variant = "primary",
  size = "md",
  children,
  loading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500 disabled:bg-gray-400",
    secondary:
      "bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500 disabled:bg-gray-400",
    outline:
      "border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-teal-500 disabled:border-gray-300 disabled:text-gray-400",
    ghost:
      "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:text-gray-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
