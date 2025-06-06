import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-green-600 text-white hover:bg-green-700": variant === "primary",
            "bg-gray-100 text-gray-900 hover:bg-gray-200":
              variant === "secondary",
            "border border-gray-300 bg-transparent hover:bg-gray-100":
              variant === "outline",
            "h-9 px-4 text-sm": size === "sm",
            "h-10 px-6 text-base": size === "md",
            "h-11 px-8 text-lg": size === "lg",
          },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
        ) : null}
        {children}
      </button>
    );
  }
);
