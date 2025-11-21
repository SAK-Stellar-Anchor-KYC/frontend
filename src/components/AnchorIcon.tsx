'use client';

import React from 'react';

interface AnchorIconProps {
  className?: string;
  size?: number;
}

export const AnchorIcon: React.FC<AnchorIconProps> = ({ 
  className = '', 
  size = 32 
}) => {
  const uniqueId = `anchorGradient-${size}`;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={uniqueId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFA500" />
          <stop offset="50%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#FF4500" />
        </linearGradient>
      </defs>
      
      {/* Ring/Shackle at top - bright orange */}
      <circle
        cx="16"
        cy="6"
        r="3"
        fill={`url(#${uniqueId})`}
      />
      
      {/* Shank - vertical shaft */}
      <rect
        x="14.5"
        y="9"
        width="3"
        height="10"
        fill={`url(#${uniqueId})`}
        rx="1"
      />
      
      {/* Stock - horizontal bar */}
      <rect
        x="10"
        y="12"
        width="12"
        height="2.5"
        fill={`url(#${uniqueId})`}
        rx="1"
      />
      
      {/* Left Fluke/Arm */}
      <path
        d="M12 19 L6 28 L10 26 L14 22 Z"
        fill={`url(#${uniqueId})`}
      />
      
      {/* Right Fluke/Arm */}
      <path
        d="M20 19 L26 28 L22 26 L18 22 Z"
        fill={`url(#${uniqueId})`}
      />
      
      {/* Left Bill/Palm tip */}
      <path
        d="M6 28 L4 30 L6 30 Z"
        fill={`url(#${uniqueId})`}
      />
      
      {/* Right Bill/Palm tip */}
      <path
        d="M26 28 L28 30 L26 30 Z"
        fill={`url(#${uniqueId})`}
      />
    </svg>
  );
};

