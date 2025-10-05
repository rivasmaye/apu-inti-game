import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface GameButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "costa" | "sierra" | "selva";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export function GameButton({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  className 
}: GameButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "costa":
        return "bg-costa text-tierra hover:bg-costa/80 border-2 border-tierra/20";
      case "sierra":
        return "bg-sierra text-white hover:bg-sierra/80 border-2 border-white/20";
      case "selva":
        return "bg-selva text-tierra hover:bg-selva/80 border-2 border-tierra/20";
      case "secondary":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      default:
        return "bg-primary text-primary-foreground hover:bg-primary/80";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-2 text-sm";
      case "lg":
        return "px-8 py-4 text-lg";
      default:
        return "px-6 py-3 text-base";
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "game-shadow rounded-xl font-medium",
        // Motion & interaction
        "transform-gpu will-change-transform transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 active:scale-[0.98]",
        "hover:animate-bounce",
        // Glow & focus
        "hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60",
        // Shimmer sweep
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        getVariantStyles(),
        getSizeStyles(),
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
}