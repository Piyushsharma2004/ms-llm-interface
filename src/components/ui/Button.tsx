import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  size = "md",
  variant = "default",
  className = "",
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded";

  const sizeStyles = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
  };

  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{typeof children === 'string' ? children : 'Loading...'}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;