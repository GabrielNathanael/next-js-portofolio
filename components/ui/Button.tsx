import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 dark:shadow-blue-500/20 dark:hover:shadow-blue-500/30",
      secondary:
        "bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 dark:shadow-violet-500/20 dark:hover:shadow-violet-500/30",
      ghost: `
  bg-white/40 dark:bg-white/5
  backdrop-blur-sm
  text-neutral-800 dark:text-neutral-200
  hover:bg-white/60 dark:hover:bg-white/10
  border border-white/30 dark:border-white/10
  transition-colors
`,
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-7 py-3.5 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
