import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Square-cornered, generously padded, small-caps label (Brand Guide v1.1).
 * One primary action per view.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-sm border text-label whitespace-nowrap",
    "transition-colors duration-200 select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-burgundy-700",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "border-burgundy-700 bg-burgundy-700 text-ivory hover:border-burgundy-900 hover:bg-burgundy-900",
        secondary: "border-rose-100 bg-rose-100 text-burgundy-900 hover:border-rose hover:bg-rose",
        outline: "border-burgundy-700 bg-transparent text-burgundy-700 hover:bg-burgundy-700 hover:text-ivory",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-7",
        lg: "h-14 px-9",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show a spinner, set aria-busy and block clicks. Ignored with asChild. */
  loading?: boolean;
  /** Render the child element (e.g. next/link) with button styling. */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, asChild = false, disabled, children, type, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (asChild) {
      return (
        <Slot className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
