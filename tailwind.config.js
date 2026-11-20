/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gender: {
          der: "#2563EB",
          die: "#DC2626",
          das: "#16A34A"
        },
        brand: {
          50: "#EAF7F2",
          100: "#D6EFE6",
          500: "#0B6B4F",
          600: "#095740",
          700: "#074230",
          gold: "#FFCE00",
          coral: "#F2545B"
        }
      },
      fontFamily: {
        sans: ["Inter_400Regular", "System"],
        medium: ["Inter_500Medium", "System"],
        semibold: ["Inter_600SemiBold", "System"],
        bold: ["Inter_700Bold", "System"],
        bengali: ["NotoSansBengali_400Regular", "System"],
        "bengali-medium": ["NotoSansBengali_500Medium", "System"],
        "bengali-semibold": ["NotoSansBengali_600SemiBold", "System"],
        "bengali-bold": ["NotoSansBengali_700Bold", "System"]
      }
    }
  },
  plugins: []
};
