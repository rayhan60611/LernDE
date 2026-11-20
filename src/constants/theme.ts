import { CEFRLevel, GermanArticle, ThemeMode } from "../types";

export function getThemeColors(themeMode: ThemeMode) {
  if (themeMode === "black") {
    return {
      isDark: true,
      isBlack: true,
      screenBg: "#000000",
      cardBg: "#0F0F0F",
      wellBg: "#171717",
      border: "#262626",
      subtleBorder: "#1C1C1C"
    };
  }
  if (themeMode === "dark") {
    return {
      isDark: true,
      isBlack: false,
      screenBg: "#041E16",
      cardBg: "#082E22",
      wellBg: "#052219",
      border: "#134E3A",
      subtleBorder: "#0B4635"
    };
  }
  if (themeMode === "pink") {
    return {
      isDark: false,
      isBlack: false,
      isPink: true,
      screenBg: "#FFF0F5",
      cardBg: "#FFFFFF",
      wellBg: "#FCE7F3",
      border: "#FBCFE8",
      subtleBorder: "#F9A8D4"
    };
  }
  return {
    isDark: false,
    isBlack: false,
    isPink: false,
    screenBg: "#EDF7F3",
    cardBg: "#FFFFFF",
    wellBg: "#E2F2EC",
    border: "#C6E4D9",
    subtleBorder: "#D6EFE6"
  };
}

export const BRAND_THEME = {
  emerald: "#0B6B4F",
  emeraldDark: "#084C38",
  emeraldLight: "#D6EFE6",
  emeraldTint: "#EAF7F2",
  emeraldBright: "#10B981",
  gold: "#FFCE00",
  goldDark: "#D97706",
  coral: "#F2545B"
};

export const GENDER_COLORS: Record<
  GermanArticle,
  {
    hex: string;
    bgLight: string;
    bgDark: string;
    borderLight: string;
    borderDark: string;
    labelEn: string;
    labelBn: string;
  }
> = {
  der: {
    hex: "#2563EB",
    bgLight: "#EFF6FF",
    bgDark: "rgba(37, 99, 235, 0.2)",
    borderLight: "#BFDBFE",
    borderDark: "#1D4ED8",
    labelEn: "Masculine (der)",
    labelBn: "পুংলিঙ্গ (der)"
  },
  die: {
    hex: "#DC2626",
    bgLight: "#FEF2F2",
    bgDark: "rgba(220, 38, 38, 0.2)",
    borderLight: "#FECACA",
    borderDark: "#B91C1C",
    labelEn: "Feminine (die)",
    labelBn: "স্ত্রীলিঙ্গ (die)"
  },
  das: {
    hex: "#16A34A",
    bgLight: "#F0FDF4",
    bgDark: "rgba(22, 163, 74, 0.2)",
    borderLight: "#BBF7D0",
    borderDark: "#15803D",
    labelEn: "Neuter (das)",
    labelBn: "ক্লীবলিঙ্গ (das)"
  }
};

export const CEFR_LEVELS: CEFRLevel[] = ["A1", "A2", "B1", "B2"];

export const CEFR_META: Record<
  CEFRLevel,
  {
    nameDe: string;
    nameEn: string;
    nameBn: string;
    badgeColor: string;
  }
> = {
  A1: {
    nameDe: "Einstieg",
    nameEn: "Beginner Survival",
    nameBn: "প্রাথমিক স্তর (A1)",
    badgeColor: "#0B6B4F"
  },
  A2: {
    nameDe: "Grundlagen",
    nameEn: "Elementary Fluency",
    nameBn: "মৌলিক স্তর (A2)",
    badgeColor: "#0D9488"
  },
  B1: {
    nameDe: "Mittelstufe I",
    nameEn: "Independent Speaker",
    nameBn: "মাধ্যমিক স্তর ১ (B1)",
    badgeColor: "#D97706"
  },
  B2: {
    nameDe: "Mittelstufe II",
    nameEn: "Vantage & Workplace",
    nameBn: "মাধ্যমিক স্তর ২ (B2)",
    badgeColor: "#F2545B"
  }
};
