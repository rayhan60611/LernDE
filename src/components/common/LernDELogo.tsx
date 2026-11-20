import React from "react";
import Svg, { Circle, Rect, Text as SvgText, TSpan } from "react-native-svg";

interface LernDELogoProps {
  variant?: "square" | "ios" | "android";
  size?: number;
}

/**
 * Cross-platform React Native SVG version of logo/LernDEIcon.jsx
 * Palette:
 * - Emerald Green: #0B6B4F
 * - Coral Red Dot: #F2545B
 * - German Gold Dot & "DE": #FFCE00
 * - Mint Subtitle: #D6EFE6
 */
export const LernDELogo: React.FC<LernDELogoProps> = ({
  variant = "ios",
  size = 40
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 190 190">
      {variant === "android" ? (
        <Circle cx="95" cy="95" r="95" fill="#0B6B4F" />
      ) : variant === "ios" ? (
        <Rect width="190" height="190" rx="43" fill="#0B6B4F" />
      ) : (
        <Rect width="190" height="190" fill="#0B6B4F" />
      )}

      <SvgText
        x="95"
        y="109"
        textAnchor="middle"
        fontFamily="Inter_700Bold"
        fontSize="92"
        fontWeight="600"
        fill="#FFFFFF"
      >
        a
      </SvgText>

      <Circle cx="71" cy="45" r="9" fill="#F2545B" />
      <Circle cx="119" cy="45" r="9" fill="#FFCE00" />

      <SvgText
        x="95"
        y="135"
        textAnchor="middle"
        fontFamily="Inter_700Bold"
        fontSize="20"
        fontWeight="700"
        fill="#FFFFFF"
      >
        Lern
        <TSpan fill="#FFCE00">DE</TSpan>
      </SvgText>

      <SvgText
        x="95"
        y="153"
        textAnchor="middle"
        fontFamily="NotoSansBengali_600SemiBold"
        fontSize="11"
        fill="#D6EFE6"
      >
        English · বাংলা → Deutsch
      </SvgText>
    </Svg>
  );
};
