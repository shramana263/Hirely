import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

export function Button({ 
  children, 
  variant = "default", 
  size = "default", 
  className,
  asChild = false,
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
    ghost: "hover:bg-gray-100 text-gray-700",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8"
  };
  
  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: cn(combinedClassName, (children as any).props?.className)
    });
  }
  
  return (
    <button 
      {...props} 
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
