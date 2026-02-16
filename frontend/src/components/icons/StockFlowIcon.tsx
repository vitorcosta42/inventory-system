import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const StockFlowIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      <text y=".9em" fontSize="90">
        📦
      </text>
    </svg>
  );
};

export default StockFlowIcon;
