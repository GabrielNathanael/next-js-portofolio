import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glass = false, children, ...props }, ref) => {
    const baseStyles = "rounded-2xl transition-all duration-300";

    const styles = glass
      ? "bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/50"
      : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700";

    const hoverStyles = hover
      ? "hover:shadow-2xl hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-600"
      : "";

    return (
      <div
        ref={ref}
        className={cn(baseStyles, styles, hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
