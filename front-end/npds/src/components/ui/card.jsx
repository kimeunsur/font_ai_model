import React from "react";

export const Button = ({ children, variant, size, className, ...props }) => {
  const baseStyles =
    "font-semibold rounded-lg focus:outline-none focus:ring-2 transition";
  const variants = {
    ghost: "bg-transparent hover:bg-gray-200",
  };
  const sizes = {
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
