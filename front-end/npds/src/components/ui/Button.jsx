import React from "react";
import clsx from "clsx";

export const Button = ({ children, variant = "ghost", size = "lg", className, ...props }) => {
  const baseStyles = "rounded-md font-medium";
  const variantStyles = variant === "ghost" ? "bg-transparent hover:bg-white/20" : "";
  const sizeStyles = size === "lg" ? "text-5xl py-6 px-12" : "";

  return (
    <button className={clsx(baseStyles, variantStyles, sizeStyles, className)} {...props}>
      {children}
    </button>
  );
};
