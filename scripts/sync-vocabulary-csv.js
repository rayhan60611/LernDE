const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const outPath = path.join(rootDir, "src", "data", "csvVocabularyData.ts");

function parseCSVLine(line) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const next = line[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
  }
  result.push(cur.trim());
  return result;
}

function cleanTopic(rawTopic) {
  const t = (rawTopic || "General").trim();
  if (t.includes("(") && !t.includes(")")) {
    return `${t})`;
  }
  return t;
}

function normalizeChapter(rawChapter) {
  return (rawChapter || "Kapitel 1")
    .trim()
    .replace(/^Kapital\s+/i, "Kapitel ");
}

// 1. Parse vocabulary.csv (1,000 daily/topic words + build pronunciation lookup map)
const pronunciationMap = new Map();
const dailyCsvPath = path.join(rootDir, "vocabulary.csv");
const dailyRows = [];

if (fs.existsSync(dailyCsvPath)) {
  const lines = fs.readFileSync(dailyCsvPath, "utf8").trim().split(/\r?\n/);
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = parseCSVLine(line);
    const id = parts[0] || String(i);
    const day = parts[1] || "Day 1";
    const rawLevel = parts[2] || "A1";
    const level = ["A1", "A2", "B1", "B2"].includes(rawLevel) ? rawLevel : "A1";
    const topic = cleanTopic(parts[3]);
    const rawArticle = (parts[4] || "").toLowerCase();
    const article = ["der", "die", "das"].includes(rawArticle)
      ? rawArticle
      : undefined;
    const german = parts[5] || "";
    const fullGerman =
      parts[6] || (article ? `${article} ${german}` : german);
    const banglaPronunciation = parts[7] || "";
    const banglaMeaning = parts[8] || "";

    if (!german) continue;

    if (banglaPronunciation) {
      pronunciationMap.set(german.toLowerCase(), banglaPronunciation);
    }

    const exampleDe = article
      ? `${fullGerman} ist ein wichtiges Wort (${topic}).`
      : `Wir lernen heute „${fullGerman}“ (${day}).`;

    dailyRows.push({
      id: `daily-${id}`,
      day,
      sourceCsv: "vocabulary.csv",
      level,
      topic,
      ...(article ? { article } : {}),
      german,
      fullGerman,
      english: `${banglaMeaning} (${topic})`,
      bangla: banglaMeaning,
      ...(banglaPronunciation ? { phoneticHint: banglaPronunciation } : {}),
      exampleDe,
      exampleEn: `${fullGerman} — ${day} (${topic})`,
      exampleBn: `${fullGerman} (${banglaMeaning})${
        banglaPronunciation ? ` — উচ্চারণ: ${banglaPronunciation}` : ""
      }`
    });
  }
}

// 2. Parse a1.csv, a2.csv, b1.csv (Kapitel-based level CSVs)
function parseLevelCsv(fileName, expectedLevel) {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) return [];

  const lines = fs.readFileSync(filePath, "utf8").trim().split(/\r?\n/);
  const items = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = parseCSVLine(line);
    // Columns: id,level,chapter,article,german,plural,en,bn,example_de
    const id = parts[0] || `${expectedLevel.toLowerCase()}_${i}`;
    const rawLevel = parts[1] || expectedLevel;
    const level = ["A1", "A2", "B1", "B2"].includes(rawLevel)
      ? rawLevel
      : expectedLevel;
    const chapter = normalizeChapter(parts[2]);
    const rawArticle = (parts[3] || "").toLowerCase();
    const article = ["der", "die", "das"].includes(rawArticle)
      ? rawArticle
      : undefined;
    const german = parts[4] || "";
    const plural = parts[5] || undefined;
    const en = parts[6] || "";
    const bn = parts[7] || "";
    const rawExampleDe = parts[8] || "";

    if (!german) continue;

    const fullGerman = article ? `${article} ${german}` : german;
    const phoneticHint = pronunciationMap.get(german.toLowerCase());

    const exampleDe =
      rawExampleDe ||
      (article
        ? `${fullGerman} gehört zu „${chapter}“ (${level}).`
        : `Im ${chapter} üben wir das Wort „${german}“.`);

    items.push({
      id,
      chapter,
      sourceCsv: fileName,
      level,
      topic: chapter,
      ...(article ? { article } : {}),
      german,
      fullGerman,
      ...(plural ? { plural } : {}),
      english: en || `${bn} (${chapter})`,
      bangla: bn || german,
      ...(phoneticHint ? { phoneticHint } : {}),
      exampleDe,
      exampleEn: en ? `${fullGerman}: ${en}` : `${fullGerman} (${chapter})`,
      exampleBn: `${fullGerman} — অর্থ: ${bn}${
        plural ? ` (বহুবচন: ${plural})` : ""
      }`
    });
  }

  return items;
}

const a1Rows = parseLevelCsv("a1.csv", "A1");
const a2Rows = parseLevelCsv("a2.csv", "A2");
const b1Rows = parseLevelCsv("b1.csv", "B1");
const b2Rows = parseLevelCsv("b2.csv", "B2");

const allCombined = [...a1Rows, ...a2Rows, ...b1Rows, ...b2Rows, ...dailyRows];

const outputTs = `// AUTO-GENERATED FROM a1.csv (${a1Rows.length}), a2.csv (${a2Rows.length}), b1.csv (${b1Rows.length}), b2.csv (${b2Rows.length}), and vocabulary.csv (${dailyRows.length})
// Total Words: ${allCombined.length}
import { VocabularyItem } from "../types";

export const A1_CSV_WORDS: VocabularyItem[] = ${JSON.stringify(a1Rows)};

export const A2_CSV_WORDS: VocabularyItem[] = ${JSON.stringify(a2Rows)};

export const B1_CSV_WORDS: VocabularyItem[] = ${JSON.stringify(b1Rows)};

export const B2_CSV_WORDS: VocabularyItem[] = ${JSON.stringify(b2Rows)};

export const DAILY_CSV_WORDS: VocabularyItem[] = ${JSON.stringify(dailyRows)};

export const CSV_VOCABULARY_ITEMS: VocabularyItem[] = [
  ...A1_CSV_WORDS,
  ...A2_CSV_WORDS,
  ...B1_CSV_WORDS,
  ...B2_CSV_WORDS,
  ...DAILY_CSV_WORDS
];
`;

fs.writeFileSync(outPath, outputTs, "utf8");
console.log(
  `Generated csvVocabularyData.ts: A1=${a1Rows.length}, A2=${a2Rows.length}, B1=${b1Rows.length}, B2=${b2Rows.length}, Daily=${dailyRows.length} (Total=${allCombined.length})`
);
