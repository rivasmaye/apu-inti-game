import React from "react";

interface ResourceIconProps {
  type: "water" | "solar" | "biodiversity" | "satellite" | "sustainability";
  value?: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string; // <-- Permitimos pasar el label desde afuera
}

export function ResourceIcon({ type, value, showValue = false, size = "md", label }: ResourceIconProps) {
  const getIcon = () => {
    switch (type) {
      case "water":
        return "💧";
      case "solar":
        return "🌞";
      case "biodiversity":
        return "🌿";
      case "satellite":
        return "📡";
      case "sustainability":
        return "♻️";
      default:
        return "🔆";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-lg p-2";
      case "lg":
        return "text-3xl p-4";
      default:
        return "text-2xl p-3";
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg game-shadow">
      <div className={`${getSizeClasses()} bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg`}>
        <span className="block">{getIcon()}</span>
      </div>
      <div className="pr-3">
        <p className="text-sm font-medium text-tierra">{label ?? "Recurso"}</p>
        {showValue && value !== undefined && (
          <p className="text-xs text-tierra/70">{value}%</p>
        )}
      </div>
    </div>
  );
}
