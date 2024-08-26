import React from "react";

interface ShadowDividerProps {
  className?: string;
}

const ShadowDivider: React.FC<ShadowDividerProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-2/3 h-px bg-primary shadow-[0_0_4px_2px_theme(colors.primary)] ${className}`}
    />
  );
};

export default ShadowDivider;
