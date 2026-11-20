import React from "react";

const BG = {
  square: <rect width="190" height="190" fill="#0B6B4F" />,
  ios: <rect width="190" height="190" rx="43" fill="#0B6B4F" />,
  android: <circle cx="95" cy="95" r="95" fill="#0B6B4F" />,
};

/**
 * variant: "square" | "ios" | "android"
 * size: width/height in px
 */
export default function LernDEIcon({ variant = "square", size = 190, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 190 190"
      role="img"
      aria-label="LernDE"
      {...props}
    >
      {BG[variant] ?? BG.square}
      <text x="95" y="109" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="92" fontWeight="500" fill="#FFFFFF">a</text>
      <circle cx="71" cy="45" r="9" fill="#F2545B" />
      <circle cx="119" cy="45" r="9" fill="#FFCE00" />
      <text x="95" y="133" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="17" fontWeight="500" fill="#FFFFFF">
        Lern<tspan fill="#FFCE00">DE</tspan>
      </text>
      <text x="95" y="151" textAnchor="middle" fontFamily="'Noto Sans Bengali', 'Hind Siliguri', Helvetica, Arial, sans-serif" fontSize="11" fill="#D6EFE6">
        English · বাংলা → Deutsch
      </text>
    </svg>
  );
}
