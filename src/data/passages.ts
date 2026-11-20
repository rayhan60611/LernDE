import { PassageWordEntry, ReadingPassage } from "../types";
import { VOCABULARY_ITEMS } from "./vocabulary";

const CSV_WORD_LOOKUP_MAP: Record<string, PassageWordEntry> = {};
for (const item of VOCABULARY_ITEMS) {
  const cleanKey = item.german.trim().toLowerCase();
  if (cleanKey && !CSV_WORD_LOOKUP_MAP[cleanKey]) {
    CSV_WORD_LOOKUP_MAP[cleanKey] = {
      surface: item.german,
      lemma: item.german,
      article: item.article,
      plural: item.plural,
      partOfSpeech: item.article ? "Nomen" : item.topic,
      english: item.english,
      bangla: `${item.bangla}${item.phoneticHint ? ` (উচ্চারণ: ${item.phoneticHint})` : ""}`,
      exampleDe: item.exampleDe,
      exampleEn: item.exampleEn,
      exampleBn: item.exampleBn
    };
  }
}

export const GLOBAL_GERMAN_DICTIONARY: Record<string, PassageWordEntry> = {
  // Common function words, verbs, adjectives & nouns across all passages
  ich: {
    surface: "ich",
    lemma: "ich",
    partOfSpeech: "Pronomen",
    english: "I",
    bangla: "আমি",
    exampleDe: "Ich lerne jeden Tag Deutsch.",
    exampleEn: "I learn German every day.",
    exampleBn: "আমি প্রতিদিন জার্মান শিখি।"
  },
  heiße: {
    surface: "heiße",
    lemma: "heißen",
    partOfSpeech: "Verb",
    english: "am called / my name is",
    bangla: "নাম হওয়া / ডাকা হওয়া",
    exampleDe: "Ich heiße Rayhan.",
    exampleEn: "My name is Rayhan.",
    exampleBn: "আমার নাম রায়হান।"
  },
  rayhan: {
    surface: "Rayhan",
    lemma: "Rayhan",
    partOfSpeech: "Eigenname",
    english: "Rayhan (Proper Noun)",
    bangla: "রায়হান (নাম)",
    exampleDe: "Rayhan lebt und arbeitet in Frankfurt.",
    exampleEn: "Rayhan lives and works in Frankfurt.",
    exampleBn: "রায়হান ফ্রাঙ্কফুর্টে বসবাস ও কাজ করেন।"
  },
  und: {
    surface: "und",
    lemma: "und",
    partOfSpeech: "Konjunktion",
    english: "and",
    bangla: "এবং / ও",
    exampleDe: "Ich spreche Englisch, Bangla und Deutsch.",
    exampleEn: "I speak English, Bangla, and German.",
    exampleBn: "আমি ইংরেজি, বাংলা এবং জার্মান বলি।"
  },
  wohne: {
    surface: "wohne",
    lemma: "wohnen",
    partOfSpeech: "Verb",
    english: "live / reside",
    bangla: "বসবাস করা / থাকা",
    exampleDe: "Ich wohne in einer schönen Stadt.",
    exampleEn: "I live in a beautiful city.",
    exampleBn: "আমি একটি সুন্দর শহরে বাস করি।"
  },
  in: {
    surface: "in",
    lemma: "in",
    partOfSpeech: "Präposition",
    english: "in / into",
    bangla: "ভেতরে / মধ্যে / -তে",
    exampleDe: "Wir sind in der Bibliothek.",
    exampleEn: "We are in the library.",
    exampleBn: "আমরা গ্রন্থাগারে আছি।"
  },
  frankfurt: {
    surface: "Frankfurt",
    lemma: "Frankfurt am Main",
    partOfSpeech: "Eigenname",
    english: "Frankfurt (city in Hesse, Germany)",
    bangla: "ফ্রাঙ্কফুর্ট (জার্মানির শহর)",
    exampleDe: "Frankfurt hat eine berühmte Skyline.",
    exampleEn: "Frankfurt has a famous skyline.",
    exampleBn: "ফ্রাঙ্কফুর্টের একটি বিখ্যাত স্কাইলাইন আছে।"
  },
  jeden: {
    surface: "jeden",
    lemma: "jeder",
    partOfSpeech: "Pronomen / Artikelwort",
    english: "every / each",
    bangla: "প্রতিটি / প্রত্যেক",
    exampleDe: "Ich lese jeden Abend ein Kapitel.",
    exampleEn: "I read a chapter every evening.",
    exampleBn: "আমি প্রতিদিন সন্ধ্যায় একটি অধ্যায় পড়ি।"
  },
  morgen: {
    surface: "Morgen",
    lemma: "Morgen",
    article: "der",
    plural: "die Morgen",
    partOfSpeech: "Nomen",
    english: "morning",
    bangla: "সকাল",
    exampleDe: "Der Morgen ist frisch und ruhig.",
    exampleEn: "The morning is fresh and quiet.",
    exampleBn: "সকালটি সতেজ ও শান্ত।"
  },
  trinke: {
    surface: "trinke",
    lemma: "trinken",
    partOfSpeech: "Verb",
    english: "drink",
    bangla: "পান করা",
    exampleDe: "Ich trinke gern warmen Tee.",
    exampleEn: "I like drinking warm tea.",
    exampleBn: "আমি গরম চা পান করতে পছন্দ করি।"
  },
  einen: {
    surface: "einen",
    lemma: "ein",
    partOfSpeech: "Artikel (Akkusativ maskulin)",
    english: "a / an (masculine accusative)",
    bangla: "একটি (পুংলিঙ্গ কর্ম কারক)",
    exampleDe: "Ich suche einen Bahnhof.",
    exampleEn: "I am looking for a train station.",
    exampleBn: "আমি একটি রেলস্টেশন খুঁজছি।"
  },
  kaffee: {
    surface: "Kaffee",
    lemma: "Kaffee",
    article: "der",
    plural: "die Kaffees",
    partOfSpeech: "Nomen",
    english: "coffee",
    bangla: "কফি",
    exampleDe: "Der Kaffee schmeckt wunderbar.",
    exampleEn: "The coffee tastes wonderful.",
    exampleBn: "কফিটি চমৎকার স্বাদের।"
  },
  esse: {
    surface: "esse",
    lemma: "essen",
    partOfSpeech: "Verb",
    english: "eat",
    bangla: "খাওয়া",
    exampleDe: "Ich esse frisches Obst.",
    exampleEn: "I eat fresh fruit.",
    exampleBn: "আমি তাজা ফল খাই।"
  },
  frisches: {
    surface: "frisches",
    lemma: "frisch",
    partOfSpeech: "Adjektiv",
    english: "fresh",
    bangla: "তাজা / টাটকা",
    exampleDe: "Hier gibt es frisches Brot.",
    exampleEn: "There is fresh bread here.",
    exampleBn: "এখানে তাজা রুটি পাওয়া যায়।"
  },
  brot: {
    surface: "Brot",
    lemma: "Brot",
    article: "das",
    plural: "die Brote",
    partOfSpeech: "Nomen",
    english: "bread",
    bangla: "রুটি",
    exampleDe: "Das deutsche Brot ist weltweit bekannt.",
    exampleEn: "German bread is famous worldwide.",
    exampleBn: "জার্মান রুটি বিশ্বজুড়ে পরিচিত।"
  },
  danach: {
    surface: "Danach",
    lemma: "danach",
    partOfSpeech: "Adverb",
    english: "afterwards / after that",
    bangla: "তারপর / এরপর",
    exampleDe: "Erst arbeiten wir, danach machen wir Pause.",
    exampleEn: "First we work, afterwards we take a break.",
    exampleBn: "প্রথমে আমরা কাজ করি, তারপর বিরতি নিই।"
  },
  gehe: {
    surface: "gehe",
    lemma: "gehen",
    partOfSpeech: "Verb",
    english: "go / walk",
    bangla: "যাওয়া / হাঁটা",
    exampleDe: "Ich gehe zu Fuß zum Bahnhof.",
    exampleEn: "I walk to the train station.",
    exampleBn: "আমি হেঁটে রেলস্টেশনে যাই।"
  },
  zum: {
    surface: "zum",
    lemma: "zu dem",
    partOfSpeech: "Präposition + Artikel (Dativ)",
    english: "to the (masculine/neuter dative)",
    bangla: "দিকে / প্রতি (zu + dem)",
    exampleDe: "Wie komme ich zum Bahnhof?",
    exampleEn: "How do I get to the train station?",
    exampleBn: "আমি কীভাবে রেলস্টেশনে যাব?"
  },
  bahnhof: {
    surface: "Bahnhof",
    lemma: "Bahnhof",
    article: "der",
    plural: "die Bahnhöfe",
    partOfSpeech: "Nomen",
    english: "train station",
    bangla: "রেলস্টেশন",
    exampleDe: "Der Bahnhof liegt im Zentrum.",
    exampleEn: "The train station is in the center.",
    exampleBn: "রেলস্টেশনটি শহরের কেন্দ্রে অবস্থিত।"
  },
  der: {
    surface: "Der",
    lemma: "der",
    article: "der",
    partOfSpeech: "Artikel (maskulin)",
    english: "the (masculine)",
    bangla: "টি / টা (পুংলিঙ্গ নির্দিষ্ট আর্টিকেল)",
    exampleDe: "Der Zug kommt auf Gleis 5.",
    exampleEn: "The train arrives on track 5.",
    exampleBn: "ট্রেনটি ৫ নম্বর প্ল্যাটফর্মে আসছে।"
  },
  zug: {
    surface: "Zug",
    lemma: "Zug",
    article: "der",
    plural: "die Züge",
    partOfSpeech: "Nomen",
    english: "train",
    bangla: "ট্রেন / রেলগাড়ি",
    exampleDe: "Der Zug fährt pünktlich ab.",
    exampleEn: "The train departs on time.",
    exampleBn: "ট্রেনটি সময়মতো ছেড়ে যায়।"
  },
  fährt: {
    surface: "fährt",
    lemma: "fahren",
    partOfSpeech: "Verb",
    english: "drives / travels / goes (by vehicle)",
    bangla: "চলা / যানবাহনে যাওয়া",
    exampleDe: "Die S-Bahn fährt alle zehn Minuten.",
    exampleEn: "The S-Bahn runs every ten minutes.",
    exampleBn: "এস-বান প্রতি দশ মিনিট পরপর চলে।"
  },
  pünktlich: {
    surface: "pünktlich",
    lemma: "pünktlich",
    partOfSpeech: "Adjektiv / Adverb",
    english: "punctual / on time",
    bangla: "সময়মতো / সময়নিষ্ঠ",
    exampleDe: "Bitte seien Sie morgen pünktlich.",
    exampleEn: "Please be on time tomorrow.",
    exampleBn: "অনুগ্রহ করে আগামীকাল সময়মতো আসবেন।"
  },
  zur: {
    surface: "zur",
    lemma: "zu der",
    partOfSpeech: "Präposition + Artikel (Dativ feminin)",
    english: "to the (feminine dative)",
    bangla: "দিকে / প্রতি (zu + der)",
    exampleDe: "Ich fahre mit dem Bus zur Universität.",
    exampleEn: "I take the bus to the university.",
    exampleBn: "আমি বাসে করে বিশ্ববিদ্যালয়ে যাই।"
  },
  universität: {
    surface: "Universität",
    lemma: "Universität",
    article: "die",
    plural: "die Universitäten",
    partOfSpeech: "Nomen",
    english: "university",
    bangla: "বিশ্ববিদ্যালয়",
    exampleDe: "Die Universität in Frankfurt ist sehr modern.",
    exampleEn: "The university in Frankfurt is very modern.",
    exampleBn: "ফ্রাঙ্কফুর্টের বিশ্ববিদ্যালয়টি অত্যন্ত আধুনিক।"
  },
  am: {
    surface: "Am",
    lemma: "an dem",
    partOfSpeech: "Präposition + Artikel",
    english: "on the / at the",
    bangla: "তে / এ (an + dem)",
    exampleDe: "Am Wochenende lerne ich Vokabeln.",
    exampleEn: "On the weekend I learn vocabulary.",
    exampleBn: "সপ্তাহান্তে আমি শব্দভাণ্ডার শিখি।"
  },
  samstag: {
    surface: "Samstag",
    lemma: "Samstag",
    article: "der",
    plural: "die Samstage",
    partOfSpeech: "Nomen",
    english: "Saturday",
    bangla: "শনিবার",
    exampleDe: "Am Samstag gehe ich auf den Markt.",
    exampleEn: "On Saturday I go to the market.",
    exampleBn: "শনিবারে আমি বাজারে যাই।"
  },
  kaufe: {
    surface: "kaufe",
    lemma: "kaufen",
    partOfSpeech: "Verb",
    english: "buy / purchase",
    bangla: "কেনা / ক্রয় করা",
    exampleDe: "Ich kaufe Gemüse im Supermarkt.",
    exampleEn: "I buy vegetables in the supermarket.",
    exampleBn: "আমি সুপারমার্কেটে সবজি কিনি।"
  },
  auf: {
    surface: "auf",
    lemma: "auf",
    partOfSpeech: "Präposition",
    english: "on / at",
    bangla: "ওপরে / -তে",
    exampleDe: "Das Buch liegt auf dem Tisch.",
    exampleEn: "The book is lying on the table.",
    exampleBn: "বইটি টেবিলের ওপর আছে।"
  },
  dem: {
    surface: "dem",
    lemma: "der / das",
    partOfSpeech: "Artikel (Dativ)",
    english: "the (dative masculine/neuter)",
    bangla: "টি / টা (ডেটিভ আর্টিকেল)",
    exampleDe: "Ich helfe dem Studenten.",
    exampleEn: "I help the student.",
    exampleBn: "আমি ছাত্রটিকে সাহায্য করি।"
  },
  markt: {
    surface: "Markt",
    lemma: "Markt",
    article: "der",
    plural: "die Märkte",
    partOfSpeech: "Nomen",
    english: "market",
    bangla: "বাজার",
    exampleDe: "Der Markt bietet frisches Obst.",
    exampleEn: "The market offers fresh fruit.",
    exampleBn: "বাজারটিতে তাজা ফল পাওয়া যায়।"
  },
  ein: {
    surface: "ein",
    lemma: "ein",
    partOfSpeech: "Artikel / Verbpräfix",
    english: "a / an (or separable prefix 'ein-')",
    bangla: "একটি (অথবা উপসর্গ)",
    exampleDe: "Das ist ein gutes Wörterbuch.",
    exampleEn: "That is a good dictionary.",
    exampleBn: "এটি একটি ভালো অভিধান।"
  },
  die: {
    surface: "Die",
    lemma: "die",
    article: "die",
    partOfSpeech: "Artikel (feminin / Plural)",
    english: "the (feminine / plural)",
    bangla: "টি / গুলো (স্ত্রীলিঙ্গ বা বহুবচন আর্টিকেল)",
    exampleDe: "Die Sprache ist der Schlüssel.",
    exampleEn: "The language is the key.",
    exampleBn: "ভাষা হলো চাবিকাঠি।"
  },
  apfel: {
    surface: "Apfel",
    lemma: "Apfel",
    article: "der",
    plural: "die Äpfel",
    partOfSpeech: "Nomen",
    english: "apple",
    bangla: "আপেল",
    exampleDe: "Der Apfel aus Hessen ist saftig.",
    exampleEn: "The apple from Hesse is juicy.",
    exampleBn: "হেসেনের আপেলটি রসালো।"
  },
  äpfel: {
    surface: "Äpfel",
    lemma: "Apfel",
    article: "der",
    plural: "die Äpfel",
    partOfSpeech: "Nomen (Plural)",
    english: "apples",
    bangla: "আপেলগুলো",
    exampleDe: "Die roten Äpfel kosten zwei Euro.",
    exampleEn: "The red apples cost two euros.",
    exampleBn: "লাল আপেলগুলোর দাম দুই ইউরো।"
  },
  sind: {
    surface: "sind",
    lemma: "sein",
    partOfSpeech: "Verb",
    english: "are (plural of sein)",
    bangla: "হয় / আছি / আছেন",
    exampleDe: "Wir sind motivierte Lernende.",
    exampleEn: "We are motivated learners.",
    exampleBn: "আমরা উদ্যমী শিক্ষার্থী।"
  },
  sehr: {
    surface: "sehr",
    lemma: "sehr",
    partOfSpeech: "Adverb",
    english: "very",
    bangla: "খুব / অত্যন্ত",
    exampleDe: "Vielen Dank, das ist sehr nett!",
    exampleEn: "Thank you very much, that is very kind!",
    exampleBn: "অনেক ধন্যবাদ, এটি অত্যন্ত সদয়!"
  },
  lecker: {
    surface: "lecker",
    lemma: "lecker",
    partOfSpeech: "Adjektiv",
    english: "delicious / tasty",
    bangla: "সুস্বাদু",
    exampleDe: "Das Abendessen riecht sehr lecker.",
    exampleEn: "The dinner smells very delicious.",
    exampleBn: "রাতের খাবারটির খুব সুস্বাদু ঘ্রাণ বেরিয়েছে।"
  },
  verkäuferin: {
    surface: "Verkäuferin",
    lemma: "Verkäuferin",
    article: "die",
    plural: "die Verkäuferinnen",
    partOfSpeech: "Nomen",
    english: "saleswoman / shop assistant",
    bangla: "বিক্রয়কর্মী (নারী)",
    exampleDe: "Die Verkäuferin gibt mir die Rechnung.",
    exampleEn: "The saleswoman gives me the receipt.",
    exampleBn: "বিক্রয়কর্মী আমাকে রশিদটি দিচ্ছেন।"
  },
  sagt: {
    surface: "sagt",
    lemma: "sagen",
    partOfSpeech: "Verb",
    english: "says / tells",
    bangla: "বলা",
    exampleDe: "Er sagt immer die Wahrheit.",
    exampleEn: "He always tells the truth.",
    exampleBn: "সে সবসময় সত্য কথা বলে।"
  },
  freundlich: {
    surface: "freundlich",
    lemma: "freundlich",
    partOfSpeech: "Adjektiv",
    english: "friendly / kind",
    bangla: "বন্ধুসুলভ / অমায়িক",
    exampleDe: "Unsere Nachbarn sind sehr freundlich.",
    exampleEn: "Our neighbors are very friendly.",
    exampleBn: "আমাদের প্রতিবেশীরা খুব বন্ধুসুলভ।"
  },
  danke: {
    surface: "Danke",
    lemma: "Dank",
    article: "der",
    partOfSpeech: "Interjektion / Nomen",
    english: "thank you / thanks",
    bangla: "ধন্যবাদ",
    exampleDe: "Danke für deine schnelle Hilfe!",
    exampleEn: "Thanks for your quick help!",
    exampleBn: "তোমার দ্রুত সাহায্যের জন্য ধন্যবাদ!"
  },
  wochenende: {
    surface: "Wochenende",
    lemma: "Wochenende",
    article: "das",
    plural: "die Wochenenden",
    partOfSpeech: "Nomen",
    english: "weekend",
    bangla: "সপ্তাহান্ত / ছুটির দিন",
    exampleDe: "Das Wochenende verbringe ich mit Freunden.",
    exampleEn: "I spend the weekend with friends.",
    exampleBn: "সপ্তাহান্তটি আমি বন্ধুদের সাথে কাটাই।"
  },
  letzten: {
    surface: "Letzten",
    lemma: "letzt-",
    partOfSpeech: "Adjektiv",
    english: "last / previous",
    bangla: "গত / সর্বশেষ",
    exampleDe: "Letzten Monat habe ich den Kurs begonnen.",
    exampleEn: "Last month I started the course.",
    exampleBn: "গত মাসে আমি কোর্সটি শুরু করেছি।"
  },
  sonntag: {
    surface: "Sonntag",
    lemma: "Sonntag",
    article: "der",
    plural: "die Sonntage",
    partOfSpeech: "Nomen",
    english: "Sunday",
    bangla: "রবিবার",
    exampleDe: "Am Sonntag sind die Geschäfte geschlossen.",
    exampleEn: "On Sunday the shops are closed.",
    exampleBn: "রবিবারে দোকানপাট বন্ধ থাকে।"
  },
  haben: {
    surface: "haben",
    lemma: "haben",
    partOfSpeech: "Verb",
    english: "have",
    bangla: "আছে / থাকা (অথবা Perfekt সাহায্যকারী ক্রিয়া)",
    exampleDe: "Wir haben viele neue Wörter gelernt.",
    exampleEn: "We have learned many new words.",
    exampleBn: "আমরা অনেক নতুন শব্দ শিখেছি।"
  },
  wir: {
    surface: "wir",
    lemma: "wir",
    partOfSpeech: "Pronomen",
    english: "we",
    bangla: "আমরা",
    exampleDe: "Wir üben zusammen die Aussprache.",
    exampleEn: "We practice pronunciation together.",
    exampleBn: "আমরা একসাথে উচ্চারণ অনুশীলন করি।"
  },
  ausflug: {
    surface: "Ausflug",
    lemma: "Ausflug",
    article: "der",
    plural: "die Ausflüge",
    partOfSpeech: "Nomen",
    english: "excursion / day trip",
    bangla: "ভ্রমণ / সংক্ষিপ্ত সফর",
    exampleDe: "Der Ausflug an den Rhein war wunderschön.",
    exampleEn: "The trip to the Rhine was wonderful.",
    exampleBn: "রাইন নদীতে ভ্রমণটি চমৎকার ছিল।"
  },
  nach: {
    surface: "nach",
    lemma: "nach",
    partOfSpeech: "Präposition",
    english: "to (cities/countries) / after",
    bangla: "দিকে / পরে",
    exampleDe: "Nach dem Unterricht gehe ich nach Hause.",
    exampleEn: "After class I go home.",
    exampleBn: "ক্লাসের পরে আমি বাসায় যাই।"
  },
  heidelberg: {
    surface: "Heidelberg",
    lemma: "Heidelberg",
    partOfSpeech: "Eigenname",
    english: "Heidelberg (historic German university city)",
    bangla: "হাইডেলবার্গ (ঐতিহাসিক জার্মান শহর)",
    exampleDe: "Heidelberg ist bekannt für sein altes Schloss.",
    exampleEn: "Heidelberg is famous for its old castle.",
    exampleBn: "হাইডেলবার্গ তার প্রাচীন দুর্গের জন্য বিখ্যাত।"
  },
  gemacht: {
    surface: "gemacht",
    lemma: "machen",
    partOfSpeech: "Verb (Partizip II)",
    english: "made / done",
    bangla: "করেছি / করা হয়েছে",
    exampleDe: "Du hast große Fortschritte gemacht!",
    exampleEn: "You have made great progress!",
    exampleBn: "তুমি দারুণ উন্নতি করেছ!"
  },
  das: {
    surface: "Das",
    lemma: "das",
    article: "das",
    partOfSpeech: "Artikel (neutrum) / Pronomen",
    english: "the (neuter) / that",
    bangla: "টি / এটি (ক্লীবলিঙ্গ আর্টিকেল)",
    exampleDe: "Das Schloss steht auf dem Berg.",
    exampleEn: "The castle stands on the hill.",
    exampleBn: "দুর্গটি পাহাড়ের ওপর দাঁড়িয়ে আছে।"
  },
  schloss: {
    surface: "Schloss",
    lemma: "Schloss",
    article: "das",
    plural: "die Schlösser",
    partOfSpeech: "Nomen",
    english: "castle / palace / lock",
    bangla: "প্রাসাদ / দুর্গ / তালা",
    exampleDe: "Wir haben das berühmte Schloss fotografiert.",
    exampleEn: "We photographed the famous castle.",
    exampleBn: "আমরা বিখ্যাত দুর্গটির ছবি তুলেছি।"
  },
  wetter: {
    surface: "Wetter",
    lemma: "Wetter",
    article: "das",
    plural: "die Wetter",
    partOfSpeech: "Nomen",
    english: "weather",
    bangla: "আবহাওয়া",
    exampleDe: "Das Wetter im Frühling ist angenehm.",
    exampleEn: "The weather in spring is pleasant.",
    exampleBn: "বসন্তকালে আবহাওয়া মনোরম থাকে।"
  },
  termin: {
    surface: "Termin",
    lemma: "Termin",
    article: "der",
    plural: "die Termine",
    partOfSpeech: "Nomen",
    english: "appointment",
    bangla: "অ্যাপয়েন্টমেন্ট / নির্ধারিত সময়",
    exampleDe: "Ich habe heute einen Termin beim Arzt.",
    exampleEn: "I have an appointment with the doctor today.",
    exampleBn: "আজ ডাক্তারের সাথে আমার একটি অ্যাপয়েন্টমেন্ট আছে।"
  },
  arzt: {
    surface: "Arzt",
    lemma: "Arzt",
    article: "der",
    plural: "die Ärzte",
    partOfSpeech: "Nomen",
    english: "doctor / physician",
    bangla: "ডাক্তার / চিকিৎসক",
    exampleDe: "Der Arzt untersucht den Patienten gründlich.",
    exampleEn: "The doctor examines the patient thoroughly.",
    exampleBn: "ডাক্তার রোগীকে ভালোভাবে পরীক্ষা করছেন।"
  },
  apotheke: {
    surface: "Apotheke",
    lemma: "Apotheke",
    article: "die",
    plural: "die Apotheken",
    partOfSpeech: "Nomen",
    english: "pharmacy",
    bangla: "ফার্মেসি / ওষুধের দোকান",
    exampleDe: "Ich hole das Medikament in der Apotheke ab.",
    exampleEn: "I pick up the medicine at the pharmacy.",
    exampleBn: "আমি ফার্মেসি থেকে ওষুধটি সংগ্রহ করি।"
  },
  rezept: {
    surface: "Rezept",
    lemma: "Rezept",
    article: "das",
    plural: "die Rezepte",
    partOfSpeech: "Nomen",
    english: "prescription / recipe",
    bangla: "প্রেসক্রিপশন / ব্যবস্থাপত্র",
    exampleDe: "Das Rezept ist für ein Antibiotikum.",
    exampleEn: "The prescription is for an antibiotic.",
    exampleBn: "প্রেসক্রিপশনটি একটি অ্যান্টিবায়োটিকের জন্য।"
  },
  bürgeramt: {
    surface: "Bürgeramt",
    lemma: "Bürgeramt",
    article: "das",
    plural: "die Bürgerämter",
    partOfSpeech: "Nomen",
    english: "citizens' registration office",
    bangla: "নাগরিক নিবন্ধন অফিস (বুর্গারআম্ট)",
    exampleDe: "Beim Bürgeramt meldet man seinen Wohnsitz an.",
    exampleEn: "At the citizens' office you register your residence.",
    exampleBn: "বুর্গারআম্টে নিজের বসবাসের ঠিকানা নিবন্ধন করতে হয়।"
  },
  anmeldung: {
    surface: "Anmeldung",
    lemma: "Anmeldung",
    article: "die",
    plural: "die Anmeldungen",
    partOfSpeech: "Nomen",
    english: "registration",
    bangla: "নিবন্ধন / আনমেলডুং",
    exampleDe: "Die Anmeldung dauerte nur fünfzehn Minuten.",
    exampleEn: "The registration took only fifteen minutes.",
    exampleBn: "নিবন্ধনটি করতে মাত্র পনেরো মিনিট লেগেছে।"
  },
  mietvertrag: {
    surface: "Mietvertrag",
    lemma: "Mietvertrag",
    article: "der",
    plural: "die Mietverträge",
    partOfSpeech: "Nomen",
    english: "rental contract / lease",
    bangla: "বাসা ভাড়ার চুক্তিপত্র",
    exampleDe: "Der Mietvertrag gilt ab dem ersten Oktober.",
    exampleEn: "The rental contract is valid from the first of October.",
    exampleBn: "ভাড়ার চুক্তিপত্রটি পহেলা অক্টোবর থেকে কার্যকর।"
  },
  wohnung: {
    surface: "Wohnung",
    lemma: "Wohnung",
    article: "die",
    plural: "die Wohnungen",
    partOfSpeech: "Nomen",
    english: "apartment / flat",
    bangla: "বাসা / অ্যাপার্টমেন্ট",
    exampleDe: "Die Wohnung hat einen hellen Balkon.",
    exampleEn: "The apartment has a bright balcony.",
    exampleBn: "বাসাটিতে একটি আলো-বাতাসপূর্ণ বারান্দা আছে।"
  },
  praktikum: {
    surface: "Praktikum",
    lemma: "Praktikum",
    article: "das",
    plural: "die Praktika",
    partOfSpeech: "Nomen",
    english: "internship",
    bangla: "ইন্টার্নশিপ / হাতে-কলমে প্রশিক্ষণ",
    exampleDe: "Das Praktikum in der IT-Firma war sehr lehrreich.",
    exampleEn: "The internship at the IT company was very instructive.",
    exampleBn: "আইটি কোম্পানিতে ইন্টার্নশিপটি অত্যন্ত শিক্ষণীয় ছিল।"
  },
  erfahrung: {
    surface: "Erfahrung",
    lemma: "Erfahrung",
    article: "die",
    plural: "die Erfahrungen",
    partOfSpeech: "Nomen",
    english: "experience",
    bangla: "অভিজ্ঞতা",
    exampleDe: "Berufliche Erfahrung ist auf dem Arbeitsmarkt wichtig.",
    exampleEn: "Professional experience is important in the job market.",
    exampleBn: "চাকরির বাজারে পেশাগত অভিজ্ঞতা অত্যন্ত গুরুত্বপূর্ণ।"
  },
  softwareentwicklung: {
    surface: "Softwareentwicklung",
    lemma: "Softwareentwicklung",
    article: "die",
    plural: "die Softwareentwicklungen",
    partOfSpeech: "Nomen",
    english: "software development",
    bangla: "সফটওয়্যার ডেভেলপমেন্ট / উন্নয়ন",
    exampleDe: "Moderne Softwareentwicklung erfordert Teamarbeit.",
    exampleEn: "Modern software development requires teamwork.",
    exampleBn: "আধুনিক সফটওয়্যার ডেভেলপমেন্টে দলগত কাজ প্রয়োজন।"
  },
  schnittstelle: {
    surface: "Schnittstelle",
    lemma: "Schnittstelle",
    article: "die",
    plural: "die Schnittstellen",
    partOfSpeech: "Nomen",
    english: "interface / API",
    bangla: "ইন্টারফেস / সংযোগস্থল (API)",
    exampleDe: "Wir dokumentieren jede Schnittstelle sorgfältig.",
    exampleEn: "We document every interface carefully.",
    exampleBn: "আমরা প্রতিটি ইন্টারফেস যত্নসহকারে ডকুমেন্ট করি।"
  },
  digitalisierung: {
    surface: "Digitalisierung",
    lemma: "Digitalisierung",
    article: "die",
    plural: "die Digitalisierungen",
    partOfSpeech: "Nomen",
    english: "digitalization",
    bangla: "ডিজিটালকরণ / ডিজিটালাইজেশন",
    exampleDe: "Die Digitalisierung verändert unsere Arbeitswelt.",
    exampleEn: "Digitalization is transforming our working world.",
    exampleBn: "ডিজিটালাইজেশন আমাদের কর্মজগৎকে বদলে দিচ্ছে।"
  },
  forschung: {
    surface: "Forschung",
    lemma: "Forschung",
    article: "die",
    plural: "die Forschungen",
    partOfSpeech: "Nomen",
    english: "research",
    bangla: "গবেষণা",
    exampleDe: "Angewandte Forschung verbindet Theorie und Praxis.",
    exampleEn: "Applied research connects theory and practice.",
    exampleBn: "ফলিত গবেষণা তত্ত্ব এবং বাস্তব প্রয়োগকে যুক্ত করে।"
  },
  algorithmus: {
    surface: "Algorithmus",
    lemma: "Algorithmus",
    article: "der",
    plural: "die Algorithmen",
    partOfSpeech: "Nomen",
    english: "algorithm",
    bangla: "অ্যালগরিদম",
    exampleDe: "Der Algorithmus erkennt gesprochene Wörter präzise.",
    exampleEn: "The algorithm recognizes spoken words precisely.",
    exampleBn: "অ্যালগরিদমটি উচ্চারিত শব্দগুলো নিখুঁতভাবে শনাক্ত করে।"
  },
  erkenntnis: {
    surface: "Erkenntnis",
    lemma: "Erkenntnis",
    article: "die",
    plural: "die Erkenntnisse",
    partOfSpeech: "Nomen",
    english: "insight / cognition / realization",
    bangla: "উপলব্ধি / প্রজ্ঞা",
    exampleDe: "Wissenschaftliche Erkenntnis wächst durch kritischen Dialog.",
    exampleEn: "Scientific insight grows through critical dialogue.",
    exampleBn: "সমালোচনামূলক সংলাপের মাধ্যমে বৈজ্ঞানিক প্রজ্ঞা বৃদ্ধি পায়।"
  },
  bewusstsein: {
    surface: "Bewusstsein",
    lemma: "Bewusstsein",
    article: "das",
    plural: "die Bewusstseine",
    partOfSpeech: "Nomen",
    english: "consciousness / awareness",
    bangla: "চেতনা / সচেতনতা",
    exampleDe: "Sprachliches Bewusstsein fördert interkulturelle Empathie.",
    exampleEn: "Linguistic awareness promotes intercultural empathy.",
    exampleBn: "ভাষাগত সচেতনতা আন্তঃসাংস্কৃতিক সহমর্মিতা বৃদ্ধি করে।"
  },
  diskurs: {
    surface: "Diskurs",
    lemma: "Diskurs",
    article: "der",
    plural: "die Diskurse",
    partOfSpeech: "Nomen",
    english: "discourse",
    bangla: "তাত্ত্বিক আলোচনা / ডিসকোর্স",
    exampleDe: "Ein offener Diskurs stärkt die demokratische Gesellschaft.",
    exampleEn: "An open discourse strengthens democratic society.",
    exampleBn: "একটি উন্মুক্ত আলোচনা গণতান্ত্রিক সমাজকে শক্তিশালী করে।"
  },
  lerne: {
    surface: "lerne",
    lemma: "lernen",
    partOfSpeech: "Verb",
    english: "learn / study",
    bangla: "শেখা / অধ্যয়ন করা",
    exampleDe: "Ich lerne jeden Tag neue deutsche Wörter.",
    exampleEn: "I learn new German words every day.",
    exampleBn: "আমি প্রতিদিন নতুন জার্মান শব্দ শিখি।"
  },
  gern: {
    surface: "gern",
    lemma: "gern",
    partOfSpeech: "Adverb",
    english: "gladly / like to",
    bangla: "আনন্দের সাথে / পছন্দ করা",
    exampleDe: "Ich lese gern deutsche Geschichten.",
    exampleEn: "I like reading German stories.",
    exampleBn: "আমি জার্মান গল্প পড়তে পছন্দ করি।"
  },
  deutsch: {
    surface: "Deutsch",
    lemma: "Deutsch",
    article: "das",
    partOfSpeech: "Nomen (Sprache)",
    english: "German (language)",
    bangla: "জার্মান ভাষা",
    exampleDe: "Deutsch ist eine präzise und logische Sprache.",
    exampleEn: "German is a precise and logical language.",
    exampleBn: "জার্মান একটি নিখুঁত ও যুক্তিনির্ভর ভাষা।"
  },
  war: {
    surface: "war",
    lemma: "sein",
    partOfSpeech: "Verb (Präteritum)",
    english: "was",
    bangla: "ছিল / ছিলাম",
    exampleDe: "Das Wetter gestern war wunderbar.",
    exampleEn: "The weather yesterday was wonderful.",
    exampleBn: "গতকালের আবহাওয়া চমৎকার ছিল।"
  },
  sonnig: {
    surface: "sonnig",
    lemma: "sonnig",
    partOfSpeech: "Adjektiv",
    english: "sunny",
    bangla: "রৌদ্রোজ্জ্বল",
    exampleDe: "Heute ist ein sonniger Tag in Frankfurt.",
    exampleEn: "Today is a sunny day in Frankfurt.",
    exampleBn: "আজ ফ্রাঙ্কফুর্টে একটি রৌদ্রোজ্জ্বল দিন।"
  },
  alte: {
    surface: "alte",
    lemma: "alt",
    partOfSpeech: "Adjektiv",
    english: "old / historic",
    bangla: "পুরোনো / প্রাচীন",
    exampleDe: "Die alte Brücke ist sehr bekannt.",
    exampleEn: "The old bridge is very famous.",
    exampleBn: "প্রাচীন সেতুটি খুব বিখ্যাত।"
  },
  nachmittag: {
    surface: "Nachmittag",
    lemma: "Nachmittag",
    article: "der",
    plural: "die Nachmittage",
    partOfSpeech: "Nomen",
    english: "afternoon",
    bangla: "বিকেল / অপরাহ্ণ",
    exampleDe: "Am Nachmittag trinken wir Tee.",
    exampleEn: "In the afternoon we drink tea.",
    exampleBn: "বিকেলে আমরা চা পান করি।"
  },
  einem: {
    surface: "einem",
    lemma: "ein",
    partOfSpeech: "Artikel (Dativ)",
    english: "a / an (dative masculine/neuter)",
    bangla: "একটি (ডেটিভ আর্টিকেল)",
    exampleDe: "Wir sitzen in einem gemütlichen Café.",
    exampleEn: "We are sitting in a cozy café.",
    exampleBn: "আমরা একটি মনোরম ক্যাফেতে বসে আছি।"
  },
  café: {
    surface: "Café",
    lemma: "Café",
    article: "das",
    plural: "die Cafés",
    partOfSpeech: "Nomen",
    english: "café / coffee shop",
    bangla: "ক্যাফে / কফিশপ",
    exampleDe: "Das Café am Main ist immer gut besucht.",
    exampleEn: "The café by the Main is always busy.",
    exampleBn: "মাইন নদীর তীরের ক্যাফেটিতে সবসময় ভিড় থাকে।"
  },
  gesessen: {
    surface: "gesessen",
    lemma: "sitzen",
    partOfSpeech: "Verb (Partizip II)",
    english: "sat",
    bangla: "বসেছিলাম / বসা",
    exampleDe: "Wir haben lange in der Sonne gesessen.",
    exampleEn: "We sat in the sun for a long time.",
    exampleBn: "আমরা দীর্ঘক্ষণ রোদে বসেছিলাম।"
  },
  gestern: {
    surface: "Gestern",
    lemma: "gestern",
    partOfSpeech: "Adverb",
    english: "yesterday",
    bangla: "গতকাল",
    exampleDe: "Gestern habe ich meine Hausaufgaben gemacht.",
    exampleEn: "Yesterday I did my homework.",
    exampleBn: "গতকাল আমি আমার বাড়ির কাজ করেছি।"
  },
  hatte: {
    surface: "hatte",
    lemma: "haben",
    partOfSpeech: "Verb (Präteritum)",
    english: "had",
    bangla: "ছিল (অতীতে থাকা)",
    exampleDe: "Ich hatte gestern viel Arbeit.",
    exampleEn: "I had a lot of work yesterday.",
    exampleBn: "গতকাল আমার অনেক কাজ ছিল।"
  },
  deshalb: {
    surface: "deshalb",
    lemma: "deshalb",
    partOfSpeech: "Konjunktionaladverb",
    english: "therefore / that's why",
    bangla: "তাই / সেজন্য",
    exampleDe: "Es regnet, deshalb nehme ich einen Regenschirm.",
    exampleEn: "It is raining, therefore I take an umbrella.",
    exampleBn: "বৃষ্টি হচ্ছে, তাই আমি একটি ছাতা নিচ্ছি।"
  },
  habe: {
    surface: "habe",
    lemma: "haben",
    partOfSpeech: "Verb",
    english: "have (1st person singular)",
    bangla: "আছে / করেছি (Perfekt সাহায্যকারী ক্রিয়া)",
    exampleDe: "Ich habe die Prüfung bestanden.",
    exampleEn: "I have passed the exam.",
    exampleBn: "আমি পরীক্ষায় উত্তীর্ণ হয়েছি।"
  },
  beim: {
    surface: "beim",
    lemma: "bei dem",
    partOfSpeech: "Präposition + Artikel (Dativ)",
    english: "at the / with the",
    bangla: "কাছে / নিকটে (bei + dem)",
    exampleDe: "Ich bin gerade beim Arzt.",
    exampleEn: "I am currently at the doctor's.",
    exampleBn: "আমি এখন ডাক্তারের কাছে আছি।"
  },
  vereinbart: {
    surface: "vereinbart",
    lemma: "vereinbaren",
    partOfSpeech: "Verb (Partizip II)",
    english: "arranged / agreed upon",
    bangla: "নির্ধারণ করা / ঠিক করা",
    exampleDe: "Wir haben einen neuen Termin vereinbart.",
    exampleEn: "We arranged a new appointment.",
    exampleBn: "আমরা একটি নতুন সময় নির্ধারণ করেছি।"
  },
  hat: {
    surface: "hat",
    lemma: "haben",
    partOfSpeech: "Verb",
    english: "has",
    bangla: "আছে / করেছে",
    exampleDe: "Er hat mir sehr geholfen.",
    exampleEn: "He helped me a lot.",
    exampleBn: "তিনি আমাকে অনেক সাহায্য করেছেন।"
  },
  mich: {
    surface: "mich",
    lemma: "ich (Akkusativ)",
    partOfSpeech: "Pronomen",
    english: "me (accusative)",
    bangla: "আমাকে",
    exampleDe: "Der Arzt hat mich freundlich begrüßt.",
    exampleEn: "The doctor greeted me kindly.",
    exampleBn: "ডাক্তার আমাকে আন্তরিকভাবে স্বাগত জানিয়েছেন।"
  },
  untersucht: {
    surface: "untersucht",
    lemma: "untersuchen",
    partOfSpeech: "Verb (Partizip II)",
    english: "examined / investigated",
    bangla: "পরীক্ষা করা / অনুসন্ধান করা",
    exampleDe: "Die Ärztin hat den Patienten untersucht.",
    exampleEn: "The doctor examined the patient.",
    exampleBn: "চিকিৎসক রোগীকে পরীক্ষা করেছেন।"
  },
  mir: {
    surface: "mir",
    lemma: "ich (Dativ)",
    partOfSpeech: "Pronomen",
    english: "to me (dative)",
    bangla: "আমাকে (সম্প্রদান/ডেটিভ)",
    exampleDe: "Kannst du mir bitte helfen?",
    exampleEn: "Can you please help me?",
    exampleBn: "তুমি কি আমাকে দয়া করে সাহায্য করতে পারো?"
  },
  gegeben: {
    surface: "gegeben",
    lemma: "geben",
    partOfSpeech: "Verb (Partizip II)",
    english: "given",
    bangla: "দিয়েছে / দেওয়া হয়েছে",
    exampleDe: "Sie hat mir ein gutes Buch gegeben.",
    exampleEn: "She gave me a good book.",
    exampleBn: "সে আমাকে একটি ভালো বই দিয়েছে।"
  },
  direkt: {
    surface: "direkt",
    lemma: "direkt",
    partOfSpeech: "Adjektiv / Adverb",
    english: "directly / immediately",
    bangla: "সরাসরি / তাৎক্ষণিকভাবে",
    exampleDe: "Die Apotheke liegt direkt gegenüber.",
    exampleEn: "The pharmacy is directly across the street.",
    exampleBn: "ফার্মেসিটি রাস্তার ঠিক বিপরীত পাশেই অবস্থিত।"
  },
  abgeholt: {
    surface: "abgeholt",
    lemma: "abholen",
    partOfSpeech: "Verb (Partizip II)",
    english: "picked up / collected",
    bangla: "সংগ্রহ করা / নিয়ে আসা",
    exampleDe: "Ich habe mein Paket bei der Post abgeholt.",
    exampleEn: "I picked up my package at the post office.",
    exampleBn: "আমি পোস্ট অফিস থেকে আমার পার্সেলটি সংগ্রহ করেছি।"
  },
  steueridentifikationsnummer: {
    surface: "Steueridentifikationsnummer",
    lemma: "Steueridentifikationsnummer",
    article: "die",
    plural: "die Steueridentifikationsnummern",
    partOfSpeech: "Nomen",
    english: "tax identification number (Steuer-ID)",
    bangla: "কর শনাক্তকরণ নম্বর (Steuer-ID)",
    exampleDe: "Die Steueridentifikationsnummer kommt per Post.",
    exampleEn: "The tax ID number arrives by mail.",
    exampleBn: "কর শনাক্তকরণ নম্বরটি ডাকযোগে আসে।"
  },
  bankkonto: {
    surface: "Bankkonto",
    lemma: "Bankkonto",
    article: "das",
    plural: "die Bankkonten",
    partOfSpeech: "Nomen",
    english: "bank account",
    bangla: "ব্যাংক অ্যাকাউন্ট",
    exampleDe: "Für das Gehalt benötigt man ein Bankkonto.",
    exampleEn: "You need a bank account for your salary.",
    exampleBn: "বেতনের জন্য একটি ব্যাংক অ্যাকাউন্ট প্রয়োজন হয়।"
  },
  deutschkenntnisse: {
    surface: "Deutschkenntnisse",
    lemma: "Deutschkenntnisse",
    article: "die",
    plural: "die Deutschkenntnisse",
    partOfSpeech: "Nomen (Plural)",
    english: "German language skills",
    bangla: "জার্মান ভাষার দক্ষতা",
    exampleDe: "Sehr gute Deutschkenntnisse öffnen viele Türen.",
    exampleEn: "Very good German skills open many doors.",
    exampleBn: "উন্নত জার্মান ভাষার দক্ষতা অনেক সুযোগের দুয়ার খুলে দেয়।"
  },
  anforderungen: {
    surface: "Anforderungen",
    lemma: "Anforderung",
    article: "die",
    plural: "die Anforderungen",
    partOfSpeech: "Nomen",
    english: "requirements / specifications",
    bangla: "চাহিদা / রিকোয়ারমেন্টস",
    exampleDe: "Die technischen Anforderungen sind klar definiert.",
    exampleEn: "The technical requirements are clearly defined.",
    exampleBn: "প্রযুক্তিগত চাহিদাগুলো স্পষ্টভাবে নির্ধারিত।"
  },
  spracherkennung: {
    surface: "Spracherkennung",
    lemma: "Spracherkennung",
    article: "die",
    plural: "die Spracherkennungen",
    partOfSpeech: "Nomen",
    english: "speech recognition",
    bangla: "কণ্ঠস্বর শনাক্তকরণ (Speech Recognition)",
    exampleDe: "Die Spracherkennung hilft beim Üben der Aussprache.",
    exampleEn: "Speech recognition helps when practicing pronunciation.",
    exampleBn: "কণ্ঠস্বর শনাক্তকরণ প্রযুক্তি উচ্চারণ অনুশীলনে সহায়তা করে।"
  }
};

export const READING_PASSAGES: ReadingPassage[] = [
  // ===================== A1 (36 Progressive Stories) =====================
  {
    id: "passage-a1-1",
    level: "A1",
    category: "Basic Verbs (sein, kommen, wohnen, heißen)",
    titleDe: "1. Hallo, ich bin Karim!",
    titleEn: "Hello, I am Karim!",
    titleBn: "হ্যালো, আমি করিম!",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Hallo und guten Tag!", en: "Hello and good day!", bn: "হ্যালো এবং শুভ দিন!" },
      { de: "Ich heiße Karim.", en: "My name is Karim.", bn: "আমার নাম করিম।" },
      { de: "Ich bin sechsundzwanzig Jahre alt.", en: "I am twenty-six years old.", bn: "আমার বয়স ছাব্বিশ বছর।" },
      { de: "Ich komme aus Bangladesch.", en: "I come from Bangladesh.", bn: "আমি বাংলাদেশ থেকে এসেছি।" },
      { de: "Meine Heimatstadt ist Dhaka.", en: "My hometown is Dhaka.", bn: "আমার নিজের শহর ঢাকা।" },
      { de: "Jetzt wohne ich aber in Frankfurt.", en: "Now, however, I live in Frankfurt.", bn: "তবে এখন আমি ফ্রাঙ্কফুর্টে থাকি।" },
      { de: "Frankfurt ist eine große Stadt in Deutschland.", en: "Frankfurt is a big city in Germany.", bn: "ফ্রাঙ্কফুর্ট জার্মানির একটি বড় শহর।" },
      { de: "Ich bin Student an der Hochschule.", en: "I am a student at the university.", bn: "আমি বিশ্ববিদ্যালয়ের একজন ছাত্র।" },
      { de: "Jeden Tag lerne ich fleißig Deutsch.", en: "Every day I study German diligently.", bn: "প্রতিদিন আমি মনোযোগ দিয়ে জার্মান শিখি।" },
      { de: "Die deutsche Sprache macht mir viel Spaß.", en: "The German language is a lot of fun for me.", bn: "জার্মান ভাষা শিখতে আমার খুব মজা লাগে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-2",
    level: "A1",
    category: "Possessive Articles (mein, meine) & haben",
    titleDe: "2. Meine Familie",
    titleEn: "My Family",
    titleBn: "আমার পরিবার",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Heute erzähle ich von meiner Familie.", en: "Today I am telling you about my family.", bn: "আজ আমি আমার পরিবার সম্পর্কে বলছি।" },
      { de: "Mein Vater heißt Rahman.", en: "My father's name is Rahman.", bn: "আমার বাবার নাম রহমান।" },
      { de: "Er ist fünfzig Jahre alt und arbeitet als Lehrer.", en: "He is fifty years old and works as a teacher.", bn: "তাঁর বয়স পঞ্চাশ বছর এবং তিনি শিক্ষক হিসেবে কাজ করেন।" },
      { de: "Meine Mutter heißt Salma.", en: "My mother's name is Salma.", bn: "আমার মায়ের নাম সালমা।" },
      { de: "Sie ist Ärztin in einem Krankenhaus.", en: "She is a doctor in a hospital.", bn: "তিনি একটি হাসপাতালে ডাক্তার।" },
      { de: "Ich habe auch einen Bruder.", en: "I also have a brother.", bn: "আমার একটি ভাইও আছে।" },
      { de: "Mein Bruder heißt Tariq und ist zwanzig Jahre alt.", en: "My brother's name is Tariq and he is twenty years old.", bn: "আমার ভাইয়ের নাম তারিক এবং তার বয়স বিশ বছর।" },
      { de: "Er wohnt noch bei meinen Eltern in Dhaka.", en: "He still lives with my parents in Dhaka.", bn: "সে এখনো ঢাকায় আমার বাবা-মায়ের সাথে থাকে।" },
      { de: "Wir telefonieren oft am Wochenende.", en: "We often talk on the phone on the weekend.", bn: "আমরা সপ্তাহান্তে প্রায়ই ফোনে কথা বলি।" },
      { de: "Ich liebe meine Familie sehr.", en: "I love my family very much.", bn: "আমি আমার পরিবারকে খুব ভালোবাসি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-3",
    level: "A1",
    category: "Accusative Case (einen, eine, ein) & möchten",
    titleDe: "3. Im Café",
    titleEn: "At the Café",
    titleBn: "ক্যাফেতে",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Am Nachmittag gehe ich in ein kleines Café.", en: "In the afternoon I go into a small café.", bn: "বিকেলে আমি একটি ছোট ক্যাফেতে যাই।" },
      { de: "Das Café ist sehr gemütlich.", en: "The café is very cozy.", bn: "ক্যাফেটি খুব আরামদায়ক।" },
      { de: "Ich suche einen freien Tisch am Fenster.", en: "I look for a free table by the window.", bn: "আমি জানালার পাশে একটি খালি টেবিল খুঁজি।" },
      { de: "Bald kommt der Kellner zu mir.", en: "Soon the waiter comes to me.", bn: "শীঘ্রই ওয়েটার আমার কাছে আসেন।" },
      { de: "Er ist freundlich und fragt: „Was möchten Sie bitte?“", en: "He is friendly and asks: \"What would you like, please?\"", bn: "তিনি বন্ধুত্বপূর্ণ এবং জিজ্ঞাসা করেন: \"আপনি কী নিতে চান, দয়া করে?\"" },
      { de: "Ich antworte: „Ich möchte einen Kaffee und ein Stück Apfelkuchen.“", en: "I answer: \"I would like a coffee and a piece of apple cake.\"", bn: "আমি উত্তর দিই: \"আমি এক কাপ কফি এবং এক টুকরো অ্যাপেল কেক নিতে চাই।\"" },
      { de: "Der Kellner bringt das Essen sehr schnell.", en: "The waiter brings the food very quickly.", bn: "ওয়েটার খুব দ্রুত খাবার নিয়ে আসেন।" },
      { de: "Der Kaffee ist heiß und schmeckt wunderbar.", en: "The coffee is hot and tastes wonderful.", bn: "কফিটি গরম এবং স্বাদ চমৎকার।" },
      { de: "Danach bezahle ich fünf Euro fünfzig.", en: "Afterward I pay five euros fifty.", bn: "এরপর আমি পাঁচ ইউরো পঞ্চাশ সেন্ট পরিশোধ করি।" },
      { de: "Ich gebe dem Kellner auch ein kleines Trinkgeld.", en: "I also give the waiter a small tip.", bn: "আমি ওয়েটারকে সামান্য বকশিশও দিই।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-4",
    level: "A1",
    category: "Definite & Indefinite Articles (der, die, das)",
    titleDe: "4. Mein Zimmer",
    titleEn: "My Room",
    titleBn: "আমার ঘর",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Ich wohne in einem Studentenwohnheim.", en: "I live in a student dormitory.", bn: "আমি একটি ছাত্রাবাসে থাকি।" },
      { de: "Mein Zimmer ist nicht sehr groß, aber es ist hell.", en: "My room is not very big, but it is bright.", bn: "আমার ঘরটি খুব বড় নয়, কিন্তু এটি আলোকিত।" },
      { de: "Rechts steht ein bequemes Bett.", en: "On the right stands a comfortable bed.", bn: "ডান দিকে একটি আরামদায়ক বিছানা আছে।" },
      { de: "Links neben dem Fenster steht ein Schreibtisch.", en: "On the left next to the window stands a desk.", bn: "বাম দিকে জানালার পাশে একটি পড়ার টেবিল আছে।" },
      { de: "Auf dem Tisch liegt mein Laptop.", en: "On the desk lies my laptop.", bn: "টেবিলের ওপর আমার ল্যাপটপ রাখা আছে।" },
      { de: "Neben dem Laptop steht eine moderne Lampe.", en: "Next to the laptop stands a modern lamp.", bn: "ল্যাপটপের পাশে একটি আধুনিক বাতি আছে।" },
      { de: "An der Wand hängt ein großer Kalender.", en: "On the wall hangs a big calendar.", bn: "দেয়ালে একটি বড় ক্যালেন্ডার ঝুলছে।" },
      { de: "Im Schrank hängen meine Jacken und Hemden.", en: "In the closet hang my jackets and shirts.", bn: "আলমারিতে আমার জ্যাকেট এবং শার্টগুলো ঝোলানো আছে।" },
      { de: "Der Teppich auf dem Boden ist blau.", en: "The carpet on the floor is blue.", bn: "মেঝের কার্পেটটি নীল রঙের।" },
      { de: "Ich fühle mich in meinem Zimmer sehr wohl.", en: "I feel very comfortable in my room.", bn: "আমি আমার ঘরে খুব স্বাচ্ছন্দ্য বোধ করি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-5",
    level: "A1",
    category: "Numbers, Plurals & kosten",
    titleDe: "5. Auf dem Markt",
    titleEn: "At the Market",
    titleBn: "বাজারে",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Heute ist Samstag und ich gehe auf den Markt.", en: "Today is Saturday and I am going to the market.", bn: "আজ শনিবার এবং আমি বাজারে যাচ্ছি।" },
      { de: "Dort gibt es frisches Obst und Gemüse.", en: "There is fresh fruit and vegetables there.", bn: "সেখানে তাজা ফলমূল ও শাকসবজি পাওয়া যায়।" },
      { de: "Ich brauche Äpfel, Bananen und Tomaten.", en: "I need apples, bananas, and tomatoes.", bn: "আমার আপেল, কলা এবং টমেটো প্রয়োজন।" },
      { de: "Ein Kilo rote Äpfel kostet zwei Euro fünfzig.", en: "One kilo of red apples costs two euros fifty.", bn: "এক কেজি লাল আপেলের দাম দুই ইউরো পঞ্চাশ সেন্ট।" },
      { de: "Die gelben Bananen sind heute sehr billig.", en: "The yellow bananas are very cheap today.", bn: "হলুদ কলাগুলো আজ খুব সস্তা।" },
      { de: "Sie kosten nur ein Euro zwanzig pro Kilo.", en: "They cost only one euro twenty per kilo.", bn: "এগুলোর দাম প্রতি কেজি মাত্র এক ইউরো বিশ সেন্ট।" },
      { de: "Ich nehme auch fünfhundert Gramm Tomaten.", en: "I also take five hundred grams of tomatoes.", bn: "আমি পাঁচশ গ্রাম টমেটোও নিই।" },
      { de: "Die Verkäuferin wiegt alles genau ab.", en: "The saleswoman weighs everything accurately.", bn: "বিক্রয়কর্মী সবকিছু সঠিকভাবে ওজন করেন।" },
      { de: "Zusammen bezahle ich vier Euro achtzig.", en: "In total I pay four euros eighty.", bn: "মোট আমি চার ইউরো আশি সেন্ট পরিশোধ করি।" },
      { de: "Mit meiner vollen Tasche gehe ich zufrieden nach Hause.", en: "With my full bag I go home satisfied.", bn: "আমার ভর্তি ব্যাগ নিয়ে আমি সন্তুষ্ট মনে বাড়ি ফিরি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-6",
    level: "A1",
    category: "Separable Verbs (aufstehen, einkaufen, fernsehen)",
    titleDe: "6. Mein Tagesablauf",
    titleEn: "My Daily Routine",
    titleBn: "আমার দৈনন্দিন রুটিন",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Mein Tag beginnt unter der Woche sehr früh.", en: "My day starts very early during the week.", bn: "সপ্তাহের কাজের দিনগুলোতে আমার দিন খুব ভোরে শুরু হয়।" },
      { de: "Ich stehe jeden Morgen um sechs Uhr dreißig auf.", en: "I get up every morning at six thirty.", bn: "আমি প্রতিদিন সকাল ছয়টা ত্রিশ মিনিটে ঘুম থেকে উঠি।" },
      { de: "Zuerst dusche ich und putze mir die Zähne.", en: "First I shower and brush my teeth.", bn: "প্রথমে আমি গোসল করি এবং দাঁত ব্রাশ করি।" },
      { de: "Danach frühstücke ich und trinke eine Tasse Tee.", en: "Afterward I have breakfast and drink a cup of tea.", bn: "এরপর আমি সকালের নাস্তা করি এবং এক কাপ চা পান করি।" },
      { de: "Um acht Uhr fahre ich mit dem Bus zur Uni.", en: "At eight o'clock I take the bus to the university.", bn: "আটটার সময় আমি বাসে করে বিশ্ববিদ্যালয়ে যাই।" },
      { de: "Der Unterricht fängt pünktlich um neun Uhr an.", en: "Class starts punctually at nine o'clock.", bn: "ক্লাস ঠিক নয়টায় শুরু হয়।" },
      { de: "Am Nachmittag kaufe ich im Supermarkt Lebensmittel ein.", en: "In the afternoon I shop for groceries at the supermarket.", bn: "বিকেলে আমি সুপারমার্কেটে নিত্যপ্রয়োজনীয় জিনিস কেনাকাটা করি।" },
      { de: "Zu Hause koche ich dann ein warmes Abendessen.", en: "At home I then cook a warm dinner.", bn: "বাড়িতে ফিরে আমি রাতের গরম খাবার রান্না করি।" },
      { de: "Nach dem Essen sehe ich eine Stunde fern.", en: "After dinner I watch TV for an hour.", bn: "খাওয়ার পর আমি এক ঘণ্টা টিভি দেখি।" },
      { de: "Um elf Uhr gehe ich müde ins Bett.", en: "At eleven o'clock I go to bed tired.", bn: "এগারোটায় আমি ক্লান্ত হয়ে ঘুমাতে যাই।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-7",
    level: "A1",
    category: "Impersonal es & Adjectives",
    titleDe: "7. Das Wetter in Deutschland",
    titleEn: "The Weather in Germany",
    titleBn: "জার্মানির আবহাওয়া",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Das Wetter in Deutschland ändert sich oft.", en: "The weather in Germany changes often.", bn: "জার্মানির আবহাওয়া প্রায়ই পরিবর্তিত হয়।" },
      { de: "Im Winter ist es hier sehr kalt.", en: "In winter it is very cold here.", bn: "শীতকালে এখানে প্রচণ্ড ঠান্ডা পড়ে।" },
      { de: "Manchmal schneit es und die Straßen sind weiß.", en: "Sometimes it snows and the streets are white.", bn: "মাঝে মাঝে তুষারপাত হয় এবং রাস্তাগুলো সাদা হয়ে যায়।" },
      { de: "Im Frühling wird es langsam wieder wärmer.", en: "In spring it slowly gets warmer again.", bn: "বসন্তকালে ধীরে ধীরে আবার আবহাওয়া উষ্ণ হতে শুরু করে।" },
      { de: "Die Blumen blühen und die Sonne scheint oft.", en: "The flowers bloom and the sun shines often.", bn: "ফুল ফোটে এবং প্রায়ই সূর্য কিরণ দেয়।" },
      { de: "Der Sommer ist meistens sonnig und angenehm.", en: "Summer is mostly sunny and pleasant.", bn: "গ্রীষ্মকাল সাধারণত রৌদ্রোজ্জ্বল এবং মনোরম থাকে।" },
      { de: "Im Juli und August hat es manchmal dreißig Grad.", en: "In July and August it is sometimes thirty degrees.", bn: "জুলাই ও আগস্ট মাসে তাপমাত্রা মাঝে মাঝে ত্রিশ ডিগ্রি হয়।" },
      { de: "Im Herbst weht ein starker Wind.", en: "In autumn a strong wind blows.", bn: "শরৎকালে প্রবল বাতাস বয়।" },
      { de: "Es regnet viel und die Blätter fallen von den Bäumen.", en: "It rains a lot and the leaves fall from the trees.", bn: "প্রচুর বৃষ্টি হয় এবং গাছ থেকে পাতা ঝরে পড়ে।" },
      { de: "Trotzdem mag ich alle vier Jahreszeiten.", en: "Nevertheless, I like all four seasons.", bn: "তবুও আমি চারটি ঋতুই পছন্দ করি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-8",
    level: "A1",
    category: "Negation (kein, keine, nicht)",
    titleDe: "8. Im Supermarkt",
    titleEn: "At the Supermarket",
    titleBn: "সুপারমার্কেটে",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Ich öffne den Kühlschrank und sehe hinein.", en: "I open the refrigerator and look inside.", bn: "আমি ফ্রিজটি খুলি এবং ভেতরে তাকাই।" },
      { de: "Leider ist keine Milch mehr da.", en: "Unfortunately there is no milk left.", bn: "দুর্ভাগ্যবশত আর কোনো দুধ অবশিষ্ট নেই।" },
      { de: "Ich habe auch kein Brot und keine Eier.", en: "I also have no bread and no eggs.", bn: "আমার কাছে কোনো রুটি এবং ডিমও নেই।" },
      { de: "Deshalb gehe ich schnell zum Supermarkt um die Ecke.", en: "Therefore I go quickly to the supermarket around the corner.", bn: "তাই আমি দ্রুত মোড়ের সুপারমার্কেটে যাই।" },
      { de: "Dort nehme ich einen Einkaufswagen.", en: "There I take a shopping cart.", bn: "সেখানে আমি একটি শপিং কার্ট নিই।" },
      { de: "Ich finde die Milch und das Brot sofort.", en: "I find the milk and the bread immediately.", bn: "আমি সাথে সাথেই দুধ এবং রুটি খুঁজে পাই।" },
      { de: "Aber ich finde den Zucker nicht.", en: "But I do not find the sugar.", bn: "কিন্তু আমি চিনি খুঁজে পাই না।" },
      { de: "Eine Mitarbeiterin hilft mir freundlich.", en: "A female employee helps me kindly.", bn: "একজন মহিলা কর্মী আমাকে আন্তরিকভাবে সাহায্য করেন।" },
      { de: "An der Kasse habe ich kein Bargeld dabei.", en: "At the checkout I have no cash with me.", bn: "ক্যাশ কাউন্টারে আমার সাথে কোনো নগদ টাকা নেই।" },
      { de: "Zum Glück kann ich problemlos mit meiner Karte bezahlen.", en: "Fortunately I can pay with my card without any problem.", bn: "সৌভাগ্যবশত আমি কোনো সমস্যা ছাড়াই আমার কার্ড দিয়ে বিল পরিশোধ করতে পারি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-baeckerei",
    level: "A1",
    category: "Accusative Case, Quantities & Polite Requests (hätte gern, möchte)",
    titleDe: "In der Bäckerei",
    titleEn: "At the Bakery",
    titleBn: "বেকারিতে",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Am Sonntagmorgen gehe ich immer zur Bäckerei.", en: "On Sunday morning I always go to the bakery.", bn: "রবিবার সকালে আমি সবসময় বেকারিতে যাই।" },
      { de: "Dort riecht es wunderbar nach frischem Brot.", en: "There it smells wonderful of fresh bread.", bn: "সেখানে তাজা রুটির চমৎকার সুবাস পাওয়া যায়।" },
      { de: "Vor mir stehen schon drei Kunden in der Schlange.", en: "In front of me three customers are already standing in line.", bn: "আমার সামনে ইতিমধ্যেই তিনজন ক্রেতা লাইনে দাঁড়িয়ে আছেন।" },
      { de: "Dann bin ich an der Reihe und die Verkäuferin lächelt.", en: "Then it is my turn and the saleswoman smiles.", bn: "এরপর আমার পালা আসে এবং বিক্রয়কর্মী হাসেন।" },
      { de: "Ich sage: „Guten Morgen! Ich hätte gern vier normale Brötchen und zwei Croissants.“", en: "I say: \"Good morning! I would like four regular bread rolls and two croissants.\"", bn: "আমি বলি: \"সুপ্রভাত! আমি চারটি সাধারণ বনরুটি এবং দুটি ক্রোয়াসাঁ নিতে চাই।\"" },
      { de: "Sie fragt freundlich: „Darf es sonst noch etwas sein?“", en: "She asks kindly: \"Would you like anything else?\"", bn: "তিনি আন্তরিকভাবে জিজ্ঞাসা করেন: \"আর কি কিছু লাগবে?\"" },
      { de: "Ich antworte: „Ja, bitte noch ein Vollkornbrot und ein Stück Käsekuchen.“", en: "I answer: \"Yes, please also a whole-grain bread and a piece of cheesecake.\"", bn: "আমি উত্তর দিই: \"হ্যাঁ, দয়া করে আরও একটি হোল-গ্রেইন রুটি এবং এক টুকরো চিজকেক দিন।\"" },
      { de: "Sie packt alles sorgfältig in eine Papiertüte ein.", en: "She packs everything carefully into a paper bag.", bn: "তিনি সবকিছু যত্নসহকারে একটি কাগজের ব্যাগে ভরে দেন।" },
      { de: "Das Frühstück kostet zusammen sechs Euro achtzig.", en: "Breakfast costs six euros eighty in total.", bn: "সকালের নাস্তার দাম মোট ছয় ইউরো আশি সেন্ট।" },
      { de: "Zu Hause decke ich den Tisch und wecke meine Familie.", en: "At home I set the table and wake up my family.", bn: "বাড়িতে ফিরে আমি টেবিল সাজাই এবং আমার পরিবারকে ঘুম থেকে ডাকি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-9",
    level: "A1",
    category: "Stem-Changing Verbs (lesen, fahren, sprechen, laufen)",
    titleDe: "9. Hobbys und Freizeit",
    titleEn: "Hobbies and Free Time",
    titleBn: "শখ এবং অবসর সময়",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Am Wochenende habe ich endlich frei.", en: "On the weekend I am finally free.", bn: "সপ্তাহান্তে অবশেষে আমার ছুটি থাকে।" },
      { de: "In meiner Freizeit lese ich sehr gerne spannende Bücher.", en: "In my free time I really like reading exciting books.", bn: "আমার অবসর সময়ে আমি রোমাঞ্চকর বই পড়তে খুব পছন্দ করি।" },
      { de: "Mein Freund Lukas hat andere Hobbys.", en: "My friend Lukas has other hobbies.", bn: "আমার বন্ধু লুকাসের অন্যান্য শখ আছে।" },
      { de: "Er fährt jeden Samstag zwanzig Kilometer mit dem Fahrrad.", en: "He rides his bicycle twenty kilometers every Saturday.", bn: "সে প্রতি শনিবার বিশ কিলোমিটার সাইকেল চালায়।" },
      { de: "Manchmal laufen wir auch zusammen im Stadtpark.", en: "Sometimes we also jog together in the city park.", bn: "মাঝে মাঝে আমরা শহরের পার্কে একসাথে দৌড়াই।" },
      { de: "Lukas spricht außerdem vier Fremdsprachen fließend.", en: "Lukas also speaks four foreign languages fluently.", bn: "লুকাস এছাড়াও চারটি বিদেশি ভাষা সাবলীলভাবে বলতে পারে।" },
      { de: "Er lernt gerade Spanisch und isst gern Tapas.", en: "He is currently learning Spanish and likes eating tapas.", bn: "সে বর্তমানে স্প্যানিশ শিখছে এবং তাপাস খেতে পছন্দ করে।" },
      { de: "Am Abend treffen wir oft unsere Freunde.", en: "In the evening we often meet our friends.", bn: "সন্ধ্যায় আমরা প্রায়ই আমাদের বন্ধুদের সাথে দেখা করি।" },
      { de: "Wir hören Musik oder spielen zusammen Karten.", en: "We listen to music or play cards together.", bn: "আমরা গান শুনি অথবা একসাথে তাস খেলি।" },
      { de: "So vergeht das Wochenende immer viel zu schnell.", en: "That way the weekend always passes way too fast.", bn: "এভাবে সপ্তাহান্ত সবসময় খুব দ্রুত কেটে যায়।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-10",
    level: "A1",
    category: "Time Prepositions (am, um, von ... bis)",
    titleDe: "10. Mein Stundenplan",
    titleEn: "My Class Schedule",
    titleBn: "আমার ক্লাসের সময়সূচি",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Ich besuche einen Intensivkurs für Deutsch.", en: "I attend an intensive course for German.", bn: "আমি একটি ইনটেনসিভ জার্মান কোর্সে অংশ নিচ্ছি।" },
      { de: "Der Kurs findet von Montag bis Freitag statt.", en: "The course takes place from Monday to Friday.", bn: "কোর্সটি সোমবার থেকে শুক্রবার পর্যন্ত চলে।" },
      { de: "Jeden Morgen beginnt der Unterricht genau um neun Uhr.", en: "Every morning class begins at exactly nine o'clock.", bn: "প্রতিদিন সকালে ঠিক নয়টায় ক্লাস শুরু হয়।" },
      { de: "Wir lernen Grammatik und üben neue Wörter.", en: "We learn grammar and practice new words.", bn: "আমরা ব্যাকরণ শিখি এবং নতুন শব্দ অনুশীলন করি।" },
      { de: "Um zehn Uhr dreißig machen wir eine kurze Pause.", en: "At ten thirty we take a short break.", bn: "দশটা ত্রিশ মিনিটে আমরা একটি ছোট বিরতি নিই।" },
      { de: "In der Pause trinke ich einen Kaffee und esse ein Brötchen.", en: "During the break I drink a coffee and eat a bread roll.", bn: "বিরতির সময় আমি এক কাপ কফি পান করি এবং একটি বনরুটি খাই।" },
      { de: "Um elf Uhr geht der Unterricht weiter.", en: "At eleven o'clock class continues.", bn: "এগারোটায় আবার ক্লাস শুরু হয়।" },
      { de: "Der Kurs dauert bis dreizehn Uhr.", en: "The course lasts until one o'clock PM.", bn: "কোর্সটি দুপুর একটা পর্যন্ত চলে।" },
      { de: "Am Nachmittag mache ich zu Hause meine Hausaufgaben.", en: "In the afternoon I do my homework at home.", bn: "বিকেলে আমি বাড়িতে আমার বাড়ির কাজ করি।" },
      { de: "Am Samstag und Sonntag habe ich frei.", en: "On Saturday and Sunday I am free.", bn: "শনিবার এবং রবিবার আমার ছুটি থাকে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-11",
    level: "A1",
    category: "W-Questions (Wann, Wo, Wie viel, Welcher)",
    titleDe: "11. Am Bahnhof",
    titleEn: "At the Train Station",
    titleBn: "রেলস্টেশনে",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Ich stehe am Hauptbahnhof in Frankfurt.", en: "I am standing at the central train station in Frankfurt.", bn: "আমি ফ্রাঙ্কফুর্টের প্রধান রেলস্টেশনে দাঁড়িয়ে আছি।" },
      { de: "Ich möchte heute meine Tante in Köln besuchen.", en: "Today I want to visit my aunt in Cologne.", bn: "আজ আমি কোলনে আমার খালার সাথে দেখা করতে চাই।" },
      { de: "Zuerst gehe ich zum Informationsschalter.", en: "First I go to the information counter.", bn: "প্রথমে আমি তথ্যকেন্দ্রে যাই।" },
      { de: "Dort frage ich: „Wann fährt der nächste ICE nach Köln?“", en: "There I ask: \"When does the next ICE train to Cologne leave?\"", bn: "সেখানে আমি জিজ্ঞাসা করি: \"কোলনের পরবর্তী আইসিই (ICE) ট্রেনটি কখন ছাড়বে?\"" },
      { de: "Der Mitarbeiter schaut auf den Computer.", en: "The employee looks at the computer.", bn: "কর্মচারী কম্পিউটারের দিকে তাকান।" },
      { de: "Er sagt: „Der Zug fährt um vierzehn Uhr zehn ab.“", en: "He says: \"The train departs at two ten PM.\"", bn: "তিনি বলেন: \"ট্রেনটি দুপুর দুইটা দশ মিনিটে ছাড়বে।\"" },
      { de: "Ich frage weiter: „Von welchem Gleis fährt er ab?“", en: "I ask further: \"From which platform does it depart?\"", bn: "আমি আরও জিজ্ঞাসা করি: \"এটি কত নম্বর প্ল্যাটফর্ম থেকে ছাড়বে?\"" },
      { de: "Er antwortet: „Von Gleis sieben, und Sie müssen nicht umsteigen.“", en: "He answers: \"From platform seven, and you do not have to transfer.\"", bn: "তিনি উত্তর দেন: \"সাত নম্বর প্ল্যাটফর্ম থেকে, এবং আপনাকে ট্রেন বদলাতে হবে না।\"" },
      { de: "Ich kaufe schnell eine Fahrkarte am Automaten.", en: "I quickly buy a ticket at the machine.", bn: "আমি দ্রুত মেশিন থেকে একটি টিকিট কিনি।" },
      { de: "Pünktlich steige ich in den modernen Zug ein.", en: "Punctually I board the modern train.", bn: "ঠিক সময়ে আমি আধুনিক ট্রেনটিতে উঠে পড়ি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-12",
    level: "A1",
    category: "Modal Verb können",
    titleDe: "12. Talente und Fähigkeiten",
    titleEn: "Talents and Abilities",
    titleBn: "প্রতিভা এবং সক্ষমতা",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Jeder Mensch kann etwas besonders gut.", en: "Every person can do something particularly well.", bn: "প্রতিটি মানুষই বিশেষ কিছু ভালোভাবে করতে পারে।" },
      { de: "Meine Schwester Sara ist sehr musikalisch.", en: "My sister Sara is very musical.", bn: "আমার বোন সারা খুবই সংগীতপ্রেমী।" },
      { de: "Sie kann wunderbar Klavier und Gitarre spielen.", en: "She can play the piano and guitar wonderfully.", bn: "সে চমৎকার পিয়ানো এবং গিটার বাজাতে পারে।" },
      { de: "Außerdem kann sie sehr gut traditionell kochen.", en: "In addition, she can cook traditional food very well.", bn: "এছাড়া সে খুব ভালো ঐতিহ্যবাহী রান্না করতে পারে।" },
      { de: "Mein Vater kann kaputte Fahrräder und Autos reparieren.", en: "My father can repair broken bicycles and cars.", bn: "আমার বাবা নষ্ট সাইকেল এবং গাড়ি মেরামত করতে পারেন।" },
      { de: "Ich bin leider nicht sehr handwerklich begabt.", en: "Unfortunately, I am not very skilled with my hands.", bn: "দুর্ভাগ্যবশত আমি হাতের কাজে খুব একটা দক্ষ নই।" },
      { de: "Dafür kann ich aber sehr gut fotografieren.", en: "On the other hand, I can take very good photos.", bn: "তবে এর বদলে আমি খুব ভালো ছবি তুলতে পারি।" },
      { de: "Ich kann auch schnell neue Computersprachen lernen.", en: "I can also learn new computer languages quickly.", bn: "আমি দ্রুত নতুন কম্পিউটার ভাষাও শিখতে পারি।" },
      { de: "Am Wochenende backe ich manchmal einen Schokoladenkuchen.", en: "On the weekend I sometimes bake a chocolate cake.", bn: "সপ্তাহান্তে আমি মাঝে মাঝে চকলেট কেক তৈরি করি।" },
      { de: "Meine Freunde sagen, ich kann das wirklich gut!", en: "My friends say I can do that really well!", bn: "আমার বন্ধুরা বলে, আমি এটা সত্যিই ভালো পারি!" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-13",
    level: "A1",
    category: "Modal Verbs müssen & dürfen (Prohibition)",
    titleDe: "13. Die Hausordnung",
    titleEn: "The House Rules",
    titleBn: "বাড়ির নিয়মাবলি",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Ich wohne in einem großen Mehrfamilienhaus.", en: "I live in a large apartment building.", bn: "আমি একটি বড় বহুতল অ্যাপার্টমেন্ট ভবনে থাকি।" },
      { de: "Im Flur hängt die Hausordnung für alle Mieter.", en: "In the hallway hangs the house rules for all tenants.", bn: "করিডোরে সব ভাড়াটিয়াদের জন্য বাড়ির নিয়মাবলি টাঙানো আছে।" },
      { de: "Ab zweiundzwanzig Uhr darf man keine laute Musik hören.", en: "From ten PM onward one is not allowed to listen to loud music.", bn: "রাত দশটার পর থেকে উচ্চস্বরে গান শোনা নিষেধ।" },
      { de: "Alle Nachbarn müssen ab dieser Zeit ruhig sein.", en: "All neighbors must be quiet from this time on.", bn: "এই সময়ের পর থেকে সব প্রতিবেশীকে শান্ত থাকতে হবে।" },
      { de: "Im Treppenhaus darf man keine Fahrräder abstellen.", en: "In the stairwell one is not allowed to park bicycles.", bn: "সিঁড়িঘরে সাইকেল রাখা নিষেধ।" },
      { de: "Auch das Rauchen ist im gesamten Gebäude verboten.", en: "Smoking is also prohibited in the entire building.", bn: "পুরো ভবনের ভেতরে ধূমপান করাও নিষিদ্ধ।" },
      { de: "Jede Woche muss ein Mieter die Treppe putzen.", en: "Every week one tenant must clean the stairs.", bn: "প্রতি সপ্তাহে একজন ভাড়াটিয়াকে সিঁড়ি পরিষ্কার করতে হবে।" },
      { de: "Außerdem müssen wir den Müll richtig trennen.", en: "In addition, we must separate the trash properly.", bn: "এছাড়া আমাদের ময়লা সঠিকভাবে আলাদা করতে হবে।" },
      { de: "Papier, Plastik und Bioabfälle kommen in verschiedene Tonnen.", en: "Paper, plastic, and organic waste go into different bins.", bn: "কাগজ, প্লাস্টিক এবং জৈব বর্জ্য আলাদা আলাদা ডাস্টবিনে ফেলতে হয়।" },
      { de: "Wenn sich alle daran halten, leben wir friedlich zusammen.", en: "If everyone sticks to this, we live together peacefully.", bn: "সবাই এটি মেনে চললে আমরা শান্তিপূর্ণভাবে একসাথে বসবাস করতে পারি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-14",
    level: "A1",
    category: "Modal Verb sollen & Body Parts",
    titleDe: "14. Beim Arzt",
    titleEn: "At the Doctor's",
    titleBn: "ডাক্তারের কাছে",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Seit gestern fühle ich mich gar nicht gut.", en: "Since yesterday I have not felt well at all.", bn: "গতকাল থেকে আমার শরীর একদমই ভালো লাগছে না।" },
      { de: "Mein Kopf tut weh und ich habe Fieber.", en: "My head hurts and I have a fever.", bn: "আমার মাথা ব্যথা করছে এবং জ্বর এসেছে।" },
      { de: "Deshalb gehe ich heute Morgen zum Hausarzt.", en: "Therefore I go to the family doctor this morning.", bn: "তাই আজ সকালে আমি পারিবারিক ডাক্তারের কাছে যাই।" },
      { de: "Im Wartezimmer sitzen schon viele Patienten.", en: "Many patients are already sitting in the waiting room.", bn: "ওয়েটিং রুমে ইতিমধ্যেই অনেক রোগী বসে আছেন।" },
      { de: "Nach zwanzig Minuten ruft mich die Sprechstundenhilfe auf.", en: "After twenty minutes the receptionist calls me in.", bn: "বিশ মিনিট পর রিসেপশনিস্ট আমাকে ভেতরে ডাকেন।" },
      { de: "Der Arzt untersucht meinen Hals und hört meine Lunge ab.", en: "The doctor examines my throat and listens to my lungs.", bn: "ডাক্তার আমার গলা পরীক্ষা করেন এবং ফুসফুস দেখেন।" },
      { de: "Er sagt: „Sie haben eine starke Erkältung.“", en: "He says: \"You have a bad cold.\"", bn: "তিনি বলেন: \"আপনার প্রচণ্ড ঠান্ডা লেগেছে।\"" },
      { de: "Ich bekomme ein Rezept für die Apotheke.", en: "I get a prescription for the pharmacy.", bn: "আমি ফার্মেসির জন্য একটি প্রেসক্রিপশন পাই।" },
      { de: "Der Arzt sagt, ich soll viel Tee trinken und im Bett bleiben.", en: "The doctor says I should drink a lot of tea and stay in bed.", bn: "ডাক্তার বলেন আমার প্রচুর চা পান করা উচিত এবং বিছানায় বিশ্রাম নেওয়া উচিত।" },
      { de: "Am Montag soll ich noch einmal zur Kontrolle kommen.", en: "On Monday I should come once more for a checkup.", bn: "সোমবার আমার আবার চেকআপের জন্য আসা উচিত।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-termin-absagen",
    level: "A1",
    category: "Polite Apologies, Phone Expressions & können / müssen",
    titleDe: "Einen Termin absagen",
    titleEn: "Canceling an Appointment",
    titleBn: "অ্যাপয়েন্টমেন্ট বাতিল করা",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Heute habe ich um vierzehn Uhr einen Termin beim Zahnarzt.", en: "Today I have an appointment at the dentist at two PM.", bn: "আজ দুপুর দুইটায় দাঁতের ডাক্তারের কাছে আমার একটি অ্যাপয়েন্টমেন্ট আছে।" },
      { de: "Leider hat mein Zug aus Mainz über eine Stunde Verspätung.", en: "Unfortunately, my train from Mainz is over an hour late.", bn: "দুর্ভাগ্যবশত মাইনৎস থেকে আসা আমার ট্রেনটি এক ঘণ্টারও বেশি দেরিতে চলছে।" },
      { de: "Ich kann den Termin heute nicht pünktlich erreichen.", en: "I cannot make the appointment on time today.", bn: "আমি আজ সময়মতো অ্যাপয়েন্টমেন্টে পৌঁছাতে পারব না।" },
      { de: "Deshalb rufe ich sofort in der Zahnarztpraxis an.", en: "Therefore I call the dental practice immediately.", bn: "তাই আমি সাথে সাথে ডেন্টাল ক্লিনিকে ফোন করি।" },
      { de: "Die Sprechstundenhilfe meldet sich freundlich am Telefon.", en: "The receptionist answers politely on the phone.", bn: "রিসেপশনিস্ট ফোনে আন্তরিকভাবে কথা বলেন।" },
      { de: "Ich sage: „Guten Tag, mein Name ist Karim, und ich muss meinen Termin leider absagen.“", en: "I say: \"Good day, my name is Karim, and unfortunately I have to cancel my appointment.\"", bn: "আমি বলি: \"শুভ দিন, আমার নাম করিম, এবং দুর্ভাগ্যবশত আমাকে আমার অ্যাপয়েন্টমেন্টটি বাতিল করতে হচ্ছে।\"" },
      { de: "Ich erkläre ihr das Problem mit der Deutschen Bahn.", en: "I explain the problem with the German railway to her.", bn: "আমি তাঁকে জার্মান রেলওয়ের সমস্যার কথা খুলে বলি।" },
      { de: "Sie hat Verständnis und fragt: „Wann haben Sie wieder Zeit?“", en: "She is understanding and asks: \"When do you have time again?\"", bn: "তিনি বিষয়টি বোঝেন এবং জিজ্ঞাসা করেন: \"আপনার আবার কখন সময় হবে?\"" },
      { de: "Wir vereinbaren einen neuen Termin für nächsten Donnerstag um zehn Uhr.", en: "We schedule a new appointment for next Thursday at ten o'clock.", bn: "আমরা আগামী বৃহস্পতিবার সকাল দশটায় একটি নতুন অ্যাপয়েন্টমেন্ট ঠিক করি।" },
      { de: "Ich bedanke mich herzlich und lege das Telefon auf.", en: "I thank her warmly and hang up the phone.", bn: "আমি তাঁকে আন্তরিক ধন্যবাদ জানাই এবং ফোন রেখে দিই।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-15",
    level: "A1",
    category: "Modal Verb wollen & Seasons/Months (im)",
    titleDe: "15. Urlaubspläne",
    titleEn: "Vacation Plans",
    titleBn: "ছুটির পরিকল্পনা",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Der Sommer kommt bald und wir planen unseren Urlaub.", en: "Summer is coming soon and we are planning our vacation.", bn: "গ্রীষ্মকাল শীঘ্রই আসছে এবং আমরা আমাদের ছুটির পরিকল্পনা করছি।" },
      { de: "Im August haben meine Frau und ich drei Wochen frei.", en: "In August my wife and I have three weeks off.", bn: "আগস্ট মাসে আমার এবং আমার স্ত্রীর তিন সপ্তাহ ছুটি আছে।" },
      { de: "Dieses Jahr wollen wir nicht in Deutschland bleiben.", en: "This year we do not want to stay in Germany.", bn: "এ বছর আমরা জার্মানিতে থাকতে চাই না।" },
      { de: "Wir wollen ans Meer nach Spanien fahren.", en: "We want to travel to the sea in Spain.", bn: "আমরা স্পেনে সমুদ্রের ধারে বেড়াতে যেতে চাই।" },
      { de: "Dort wollen wir am Strand liegen und im Meer schwimmen.", en: "There we want to lie on the beach and swim in the sea.", bn: "সেখানে আমরা সৈকতে শুয়ে থাকতে এবং সমুদ্রে সাঁতার কাটতে চাই।" },
      { de: "Abends wollen wir frischen Fisch in kleinen Restaurants essen.", en: "In the evenings we want to eat fresh fish in small restaurants.", bn: "সন্ধ্যায় আমরা ছোট রেস্তোরাঁয় তাজা মাছ খেতে চাই।" },
      { de: "Mein Bruder will auch für eine Woche mitkommen.", en: "My brother also wants to come along for one week.", bn: "আমার ভাইও এক সপ্তাহের জন্য সাথে আসতে চায়।" },
      { de: "Morgen wollen wir im Reisebüro die Flüge buchen.", en: "Tomorrow we want to book the flights at the travel agency.", bn: "আগামীকাল আমরা ট্রাভেল এজেন্সিতে ফ্লাইট বুক করতে চাই।" },
      { de: "Ich brauche dringend eine Pause vom Alltag.", en: "I urgently need a break from everyday life.", bn: "দৈনন্দিন জীবন থেকে আমার জরুরি ভিত্তিতে একটি বিরতি প্রয়োজন।" },
      { de: "Dieser Urlaub wird bestimmt unvergesslich!", en: "This vacation will definitely be unforgettable!", bn: "এই ছুটিটি নিঃসন্দেহে অবিস্মরণীয় হবে!" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-16",
    level: "A1",
    category: "Accusative Pronouns (mich, dich, ihn, uns)",
    titleDe: "16. Eine Geburtstagsparty",
    titleEn: "A Birthday Party",
    titleBn: "একটি জন্মদিনের পার্টি",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Nächsten Samstag feiere ich meinen Geburtstag.", en: "Next Saturday I am celebrating my birthday.", bn: "আগামী শনিবার আমি আমার জন্মদিন উদযাপন করব।" },
      { de: "Ich lade alle meine Freunde herzlich ein.", en: "I warmly invite all my friends.", bn: "আমি আমার সব বন্ধুকে আন্তরিকভাবে আমন্ত্রণ জানাই।" },
      { de: "Ich rufe zuerst meinen besten Freund Paul an.", en: "First I call my best friend Paul.", bn: "প্রথমে আমি আমার সেরা বন্ধু পলকে ফোন করি।" },
      { de: "Ich frage ihn: „Kannst du mir bei den Vorbereitungen helfen?“", en: "I ask him: \"Can you help me with the preparations?\"", bn: "আমি তাকে জিজ্ঞাসা করি: \"তুমি কি আমাকে আয়োজনের কাজে সাহায্য করতে পারবে?\"" },
      { de: "Paul antwortet sofort: „Ja, ich unterstütze dich sehr gern!“", en: "Paul answers immediately: \"Yes, I will gladly support you!\"", bn: "পল সাথে সাথে উত্তর দেয়: \"হ্যাঁ, আমি তোমাকে আনন্দের সাথে সাহায্য করব!\"" },
      { de: "Am Freitag kaufen wir zusammen Getränke und Snacks ein.", en: "On Friday we buy drinks and snacks together.", bn: "শুক্রবার আমরা একসাথে পানীয় এবং স্ন্যাকস কিনি।" },
      { de: "Meine Schwester backt für uns eine große Torte.", en: "My sister bakes a big cake for us.", bn: "আমার বোন আমাদের জন্য একটি বড় কেক তৈরি করে।" },
      { de: "Am Samstagabend kommen zwanzig Gäste zu mir.", en: "On Saturday evening twenty guests come to my place.", bn: "শনিবার সন্ধ্যায় বিশজন অতিথি আমার বাসায় আসে।" },
      { de: "Alle bringen mir schöne Geschenke mit.", en: "Everyone brings me nice gifts.", bn: "সবাই আমার জন্য সুন্দর সুন্দর উপহার নিয়ে আসে।" },
      { de: "Wir tanzen und feiern bis spät in die Nacht.", en: "We dance and celebrate until late into the night.", bn: "আমরা গভীর রাত পর্যন্ত নাচি এবং আনন্দ করি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-17",
    level: "A1",
    category: "Imperative (Sie-form) & Directions",
    titleDe: "17. Wie komme ich zum Museum?",
    titleEn: "How Do I Get to the Museum?",
    titleBn: "আমি জাদুঘরে কীভাবে যাব?",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Eine Touristin steht auf der Straße und sucht das Museum.", en: "A female tourist is standing on the street looking for the museum.", bn: "একজন মহিলা পর্যটক রাস্তায় দাঁড়িয়ে জাদুঘর খুঁজছেন।" },
      { de: "Sie fragt einen Passanten: „Entschuldigung, wie komme ich zum Kunstmuseum?“", en: "She asks a passerby: \"Excuse me, how do I get to the art museum?\"", bn: "তিনি একজন পথচারীকে জিজ্ঞাসা করেন: \"মাফ করবেন, আমি আর্ট মিউজিয়ামে কীভাবে যাব?\"" },
      { de: "Der Mann lächelt und erklärt den Weg.", en: "The man smiles and explains the way.", bn: "লোকটি হাসেন এবং পথ দেখিয়ে দেন।" },
      { de: "„Gehen Sie hier immer geradeaus bis zur großen Ampel.“", en: "\"Go straight ahead here until the big traffic light.\"", bn: "\"এখান থেকে সোজা বড় ট্রাফিক সিগন্যাল পর্যন্ত যান।\"" },
      { de: "„Biegen Sie an der Ampel links in die Goethestraße ab.“", en: "\"Turn left at the traffic light into Goethestraße.\"", bn: "\"সিগন্যাল থেকে বাম দিকে গোয়েথেস্ট্রাসে-তে মোড় নিন।\"" },
      { de: "„Gehen Sie dann ungefähr dreihundert Meter weiter.“", en: "\"Then walk about three hundred meters further.\"", bn: "\"তারপর প্রায় তিনশ মিটার সামনে এগিয়ে যান।\"" },
      { de: "„Überqueren Sie die Brücke über den Fluss.“", en: "\"Cross the bridge over the river.\"", bn: "\"নদীর ওপরের সেতুটি পার হন।\"" },
      { de: "„Das Museum ist das große weiße Gebäude auf der rechten Seite.“", en: "\"The museum is the big white building on the right side.\"", bn: "\"জাদুঘরটি ডান পাশের বড় সাদা ভবন।\"" },
      { de: "Die Touristin bedankt sich herzlich für die Hilfe.", en: "The tourist thanks him warmly for the help.", bn: "পর্যটক সাহায্যের জন্য তাঁকে আন্তরিক ধন্যবাদ জানান।" },
      { de: "„Nehmen Sie am besten den Eingang links“, ruft der Mann noch hinterher.", en: "\"Best take the entrance on the left,\" the man calls out after her.", bn: "\"বাম দিকের প্রবেশপথটি ব্যবহার করাই ভালো হবে,\" লোকটি পেছন থেকে ডেকে বলেন।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-bank",
    level: "A1",
    category: "Banking Vocabulary, möchten & Dative (mit, bei)",
    titleDe: "Auf der Bank",
    titleEn: "At the Bank",
    titleBn: "ব্যাংকে",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Als neuer Student in Deutschland brauche ich ein eigenes Bankkonto.", en: "As a new student in Germany, I need my own bank account.", bn: "জার্মানিতে একজন নতুন শিক্ষার্থী হিসেবে আমার নিজের একটি ব্যাংক অ্যাকাউন্ট প্রয়োজন।" },
      { de: "Heute gehe ich am Vormittag zur Bank in der Innenstadt.", en: "Today I go in the late morning to the bank in the city center.", bn: "আজ বেলা বাড়ার সাথে সাথে আমি শহরের কেন্দ্রস্থলে ব্যাংকে যাই।" },
      { de: "Ein Berater begrüßt mich freundlich und bittet mich an seinen Tisch.", en: "An advisor greets me warmly and invites me to his desk.", bn: "একজন উপদেষ্টা আমাকে আন্তরিকভাবে স্বাগত জানান এবং তাঁর টেবিলে বসতে বলেন।" },
      { de: "Ich sage: „Guten Tag, ich möchte gern ein Girokonto für Studenten eröffnen.“", en: "I say: \"Good day, I would like to open a checking account for students.\"", bn: "আমি বলি: \"শুভ দিন, আমি শিক্ষার্থীদের জন্য একটি কারেন্ট অ্যাকাউন্ট (Girokonto) খুলতে চাই।\"" },
      { de: "Der Berater nickt und fragt nach meinem Reisepass und meiner Meldebescheinigung.", en: "The advisor nods and asks for my passport and my registration certificate.", bn: "উপদেষ্টা মাথা নাড়েন এবং আমার পাসপোর্ট ও ঠিকানা নিবন্ধনের সনদপত্র চান।" },
      { de: "Ich gebe ihm alle Dokumente und fülle ein Formular aus.", en: "I give him all documents and fill out a form.", bn: "আমি তাঁকে সব কাগজপত্র দিই এবং একটি ফর্ম পূরণ করি।" },
      { de: "Nach fünfzehn Minuten ist mein neues Konto fertig.", en: "After fifteen minutes my new account is ready.", bn: "পনেরো মিনিট পর আমার নতুন অ্যাকাউন্ট তৈরি হয়ে যায়।" },
      { de: "Eine Woche später bekomme ich meine Bankkarte per Post.", en: "One week later I receive my bank card by mail.", bn: "এক সপ্তাহ পর আমি ডাকযোগে আমার ব্যাংক কার্ড পাই।" },
      { de: "Danach gehe ich zum Geldautomaten und hebe fünfzig Euro ab.", en: "Afterward I go to the ATM and withdraw fifty euros.", bn: "এরপর আমি এটিএম বুথে যাই এবং পঞ্চাশ ইউরো তুলি।" },
      { de: "Jetzt kann ich meine Miete bequem per Überweisung bezahlen.", en: "Now I can conveniently pay my rent by bank transfer.", bn: "এখন আমি ব্যাংক ট্রান্সফারের মাধ্যমে সহজেই আমার বাড়িভাড়া পরিশোধ করতে পারি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-post",
    level: "A1",
    category: "Sending Mail/Parcels, nach vs. in & Numbers",
    titleDe: "Auf der Post",
    titleEn: "At the Post Office",
    titleBn: "পোস্ট অফিসে",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Meine Mutter hat bald Geburtstag und ich möchte ihr ein Geschenk schicken.", en: "My mother has a birthday soon and I want to send her a gift.", bn: "শীঘ্রই আমার মায়ের জন্মদিন এবং আমি তাঁকে একটি উপহার পাঠাতে চাই।" },
      { de: "Ich packe deutsche Schokolade und ein Buch in einen kleinen Karton.", en: "I pack German chocolate and a book into a small cardboard box.", bn: "আমি একটি ছোট কার্ডবোর্ডের বাক্সে জার্মান চকলেট এবং একটি বই ভরি।" },
      { de: "Dann gehe ich mit dem Paket zur Postfiliale.", en: "Then I go with the parcel to the post office branch.", bn: "তারপর আমি পার্সেলটি নিয়ে পোস্ট অফিসে যাই।" },
      { de: "Am Schalter sage ich: „Guten Tag, ich möchte dieses Paket nach Bangladesch schicken.“", en: "At the counter I say: \"Good day, I would like to send this parcel to Bangladesh.\"", bn: "কাউন্টারে আমি বলি: \"শুভ দিন, আমি এই পার্সেলটি বাংলাদেশে পাঠাতে চাই।\"" },
      { de: "Die Mitarbeiterin legt das Paket auf die Waage.", en: "The employee puts the parcel on the scale.", bn: "কর্মচারী পার্সেলটি ওজন মাপার যন্ত্রে রাখেন।" },
      { de: "Es wiegt genau ein Kilo und achthundert Gramm.", en: "It weighs exactly one kilo and eight hundred grams.", bn: "এটির ওজন ঠিক এক কেজি আটশ গ্রাম।" },
      { de: "Sie sagt: „Der Versand nach Asien kostet sechzehn Euro fünfzig.“", en: "She says: \"Shipping to Asia costs sixteen euros fifty.\"", bn: "তিনি বলেন: \"এশিয়ায় পাঠানোর খরচ ষোলো ইউরো পঞ্চাশ সেন্ট।\"" },
      { de: "Ich kaufe außerdem noch drei Briefmarken für Postkarten nach Europa.", en: "I also buy three stamps for postcards to Europe.", bn: "আমি ইউরোপে পোস্টকার্ড পাঠানোর জন্য আরও তিনটি ডাকটিকিট কিনি।" },
      { de: "Ich schreibe die Adresse deutlich auf das Paket und bezahle an der Kasse.", en: "I write the address clearly on the parcel and pay at the checkout.", bn: "আমি পার্সেলের ওপর স্পষ্টভাবে ঠিকানা লিখি এবং ক্যাশ কাউন্টারে টাকা পরিশোধ করি।" },
      { de: "In ungefähr zwei Wochen kommt mein Paket sicher in Dhaka an.", en: "In about two weeks my parcel will arrive safely in Dhaka.", bn: "প্রায় দুই সপ্তাহের মধ্যে আমার পার্সেলটি নিরাপদে ঢাকায় পৌঁছে যাবে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-18",
    level: "A1",
    category: "Demonstratives (dieser, welcher) & Colors",
    titleDe: "18. Im Kaufhaus",
    titleEn: "At the Department Store",
    titleBn: "ডিপার্টমেন্টাল স্টোরে",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Mein alter Mantel ist kaputt und zu dünn.", en: "My old coat is broken and too thin.", bn: "আমার পুরনো কোটটি ছিঁড়ে গেছে এবং খুব পাতলা।" },
      { de: "Deshalb gehe ich heute in ein großes Kaufhaus.", en: "Therefore I go into a big department store today.", bn: "তাই আজ আমি একটি বড় ডিপার্টমেন্টাল স্টোরে যাই।" },
      { de: "In der Herrenabteilung gibt es viele Wintermäntel.", en: "In the men's department there are many winter coats.", bn: "পুরুষদের বিভাগে অনেক শীতের কোট আছে।" },
      { de: "Ein Verkäufer fragt: „Welcher Mantel gefällt Ihnen am besten?“", en: "A salesman asks: \"Which coat do you like best?\"", bn: "একজন বিক্রয়কর্মী জিজ্ঞাসা করেন: \"কোন কোটটি আপনার সবচেয়ে বেশি পছন্দ হয়েছে?\"" },
      { de: "Ich zeige auf einen und sage: „Dieser schwarze Mantel sieht sehr elegant aus.“", en: "I point to one and say: \"This black coat looks very elegant.\"", bn: "আমি একটির দিকে ইশারা করে বলি: \"এই কালো কোটটি দেখতে খুব মার্জিত।\"" },
      { de: "Ich probiere ihn vor dem Spiegel an.", en: "I try it on in front of the mirror.", bn: "আমি আয়নার সামনে এটি পরে দেখি।" },
      { de: "Leider ist dieser Mantel etwas zu eng.", en: "Unfortunately, this coat is a bit too tight.", bn: "দুর্ভাগ্যবশত এই কোটটি একটু বেশি টাইট।" },
      { de: "Der Verkäufer bringt mir eine Nummer größer.", en: "The salesman brings me one size larger.", bn: "বিক্রয়কর্মী আমাকে এক সাইজ বড় এনে দেন।" },
      { de: "Diese Größe passt mir ganz genau.", en: "This size fits me completely accurately.", bn: "এই সাইজটি আমার শরীরে একদম ঠিকঠাক মানিয়েছে।" },
      { de: "Ich kaufe den Mantel sofort an der Kasse.", en: "I buy the coat immediately at the checkout.", bn: "আমি ক্যাশ কাউন্টার থেকে সাথে সাথে কোটটি কিনে নিই।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-19",
    level: "A1",
    category: "Dative Prepositions (mit, bei, nach, seit, zu)",
    titleDe: "19. Mein neuer Job",
    titleEn: "My New Job",
    titleBn: "আমার নতুন চাকরি",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Seit zwei Monaten habe ich eine neue Arbeit.", en: "For two months I have had a new job.", bn: "দুই মাস ধরে আমি একটি নতুন চাকরি করছি।" },
      { de: "Ich arbeite als IT-Spezialist bei einer internationalen Firma.", en: "I work as an IT specialist at an international company.", bn: "আমি একটি আন্তর্জাতিক কোম্পানিতে আইটি বিশেষজ্ঞ হিসেবে কাজ করি।" },
      { de: "Das Büro liegt direkt im Zentrum von Frankfurt.", en: "The office is located right in the center of Frankfurt.", bn: "অফিসটি ফ্রাঙ্কফুর্টের একদম কেন্দ্রস্থলে অবস্থিত।" },
      { de: "Jeden Morgen fahre ich mit der S-Bahn zur Arbeit.", en: "Every morning I take the S-Bahn to work.", bn: "প্রতিদিন সকালে আমি এস-বান (S-Bahn) ট্রেনে করে কাজে যাই।" },
      { de: "Die Fahrt dauert nur zwanzig Minuten.", en: "The ride takes only twenty minutes.", bn: "যাত্রায় মাত্র বিশ মিনিট সময় লাগে।" },
      { de: "Ich arbeite in einem Team mit fünf netten Kollegen.", en: "I work in a team with five nice colleagues.", bn: "আমি পাঁচজন ভালো সহকর্মীর একটি দলে কাজ করি।" },
      { de: "Wir sprechen im Büro meistens Deutsch und Englisch.", en: "In the office we mostly speak German and English.", bn: "অফিসে আমরা সাধারণত জার্মান এবং ইংরেজিতে কথা বলি।" },
      { de: "Nach der Arbeit gehe ich oft zum Sport.", en: "After work I often go to do sports.", bn: "কাজের পর আমি প্রায়ই ব্যায়াম করতে যাই।" },
      { de: "Manchmal trinke ich auch einen Kaffee mit meinem Chef.", en: "Sometimes I also drink a coffee with my boss.", bn: "মাঝে মাঝে আমি আমার বসের সাথেও কফি পান করি।" },
      { de: "Die Arbeit macht mir wirklich große Freude.", en: "The work really brings me great joy.", bn: "কাজটি আমাকে সত্যিই অনেক আনন্দ দেয়।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-20",
    level: "A1",
    category: "Two-Way Prepositions (Wo? + Dative)",
    titleDe: "20. Unsere neue Wohnung",
    titleEn: "Our New Apartment",
    titleBn: "আমাদের নতুন ফ্ল্যাট",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Letzte Woche sind wir in eine neue Wohnung umgezogen.", en: "Last week we moved into a new apartment.", bn: "গত সপ্তাহে আমরা একটি নতুন ফ্ল্যাটে উঠেছি।" },
      { de: "Die Wohnung hat drei Zimmer, eine Küche und ein Bad.", en: "The apartment has three rooms, a kitchen, and a bathroom.", bn: "ফ্ল্যাটটিতে তিনটি ঘর, একটি রান্নাঘর এবং একটি বাথরুম আছে।" },
      { de: "Im Wohnzimmer steht unser großes graues Sofa.", en: "In the living room stands our big gray sofa.", bn: "বসার ঘরে আমাদের বড় ধূসর সোফাটি রাখা আছে।" },
      { de: "Vor dem Sofa liegt ein weicher weißer Teppich.", en: "In front of the sofa lies a soft white carpet.", bn: "সোফার সামনে একটি নরম সাদা কার্পেট বিছানো আছে।" },
      { de: "Zwischen dem Fenster und der Tür steht ein Bücherregal.", en: "Between the window and the door stands a bookshelf.", bn: "জানালা এবং দরজার মাঝখানে একটি বইয়ের তাক আছে।" },
      { de: "Viele interessante Bücher stehen ordentlich im Regal.", en: "Many interesting books stand neatly on the shelf.", bn: "অনেক আকর্ষণীয় বই তাকের মধ্যে সুন্দরভাবে সাজানো আছে।" },
      { de: "An der Wand über dem Sofa hängt ein schönes Foto.", en: "On the wall above the sofa hangs a beautiful photo.", bn: "সোফার ওপরের দেয়ালে একটি সুন্দর ছবি ঝুলছে।" },
      { de: "In der Küche steht ein runder Esstisch aus Holz.", en: "In the kitchen stands a round dining table made of wood.", bn: "রান্নাঘরে কাঠের তৈরি একটি গোল খাবার টেবিল আছে।" },
      { de: "Auf dem Tisch steht eine Vase mit frischen Blumen.", en: "On the table stands a vase with fresh flowers.", bn: "টেবিলের ওপর তাজা ফুলসহ একটি ফুলদানি রাখা আছে।" },
      { de: "Wir lieben unsere neue Wohnung sehr.", en: "We love our new apartment very much.", bn: "আমরা আমাদের নতুন ফ্ল্যাটটি খুব ভালোবাসি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-buergeramt",
    level: "A1",
    category: "Official Appointments, Documents & müssen",
    titleDe: "Auf dem Bürgeramt",
    titleEn: "At the Citizens' Registration Office",
    titleBn: "নাগরিক নিবন্ধন অফিসে (Bürgeramt)",
    readingTimeMinutes: 2,
    sentences: [
      { de: "In Deutschland muss man nach einem Umzug seine neue Adresse anmelden.", en: "In Germany, after moving, one must register one's new address.", bn: "জার্মানিতে বাসা বদলানোর পর নিজের নতুন ঠিকানা নিবন্ধন করতে হয়।" },
      { de: "Dafür habe ich heute um neun Uhr einen Termin beim Bürgeramt.", en: "For this I have an appointment at the citizens' registration office today at nine o'clock.", bn: "এজন্য আজ সকাল নয়টায় নাগরিক নিবন্ধন অফিসে (Bürgeramt) আমার একটি অ্যাপয়েন্টমেন্ট আছে।" },
      { de: "Ich nehme meinen Reisepass, den Mietvertrag und die Bestätigung vom Vermieter mit.", en: "I take my passport, the rental contract, and the confirmation from the landlord with me.", bn: "আমি আমার পাসপোর্ট, বাড়িভাড়ার চুক্তিপত্র এবং বাড়িওয়ালার দেওয়া সনদপত্র সাথে নিয়ে যাই।" },
      { de: "Im Wartebereich erscheint bald meine Nummer auf dem Bildschirm.", en: "In the waiting area my number soon appears on the screen.", bn: "ওয়েটিং এরিয়ায় শীঘ্রই স্ক্রিনে আমার নম্বর ভেসে ওঠে।" },
      { de: "Ich gehe in Zimmer zwölf und begrüße den Beamten.", en: "I go into room twelve and greet the official.", bn: "আমি বারো নম্বর কক্ষে যাই এবং কর্মকর্তাকে অভিবাদন জানাই।" },
      { de: "Er prüft meine Papiere und tippt meine Daten in den Computer ein.", en: "He checks my papers and types my data into the computer.", bn: "তিনি আমার কাগজপত্র পরীক্ষা করেন এবং কম্পিউটারে আমার তথ্য টাইপ করেন।" },
      { de: "Nach zehn Minuten druckt er meine neue Meldebescheinigung aus.", en: "After ten minutes he prints out my new registration certificate.", bn: "দশ মিনিট পর তিনি আমার নতুন ঠিকানা নিবন্ধনের সনদপত্রটি প্রিন্ট করে দেন।" },
      { de: "Ich muss das Dokument unten noch einmal unterschreiben.", en: "I still have to sign the document once at the bottom.", bn: "আমাকে নিচে কাগজটিতে আরও একবার স্বাক্ষর করতে হয়।" },
      { de: "Der Service ist für Bürger kostenlos und sehr schnell.", en: "The service is free of charge for citizens and very fast.", bn: "নাগরিকদের জন্য এই সেবাটি বিনামূল্যে এবং খুব দ্রুত।" },
      { de: "Jetzt bin ich offiziell in meiner neuen Wohnung gemeldet!", en: "Now I am officially registered in my new apartment!", bn: "এখন আমি আনুষ্ঠানিকভাবে আমার নতুন ফ্ল্যাটে নিবন্ধিত!" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-21",
    level: "A1",
    category: "Accusative Prepositions (für, ohne, durch, gegen)",
    titleDe: "21. Geschenke kaufen",
    titleEn: "Buying Gifts",
    titleBn: "উপহার কেনা",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Bald ist Weihnachten und ich kaufe Geschenke.", en: "Soon it is Christmas and I am buying gifts.", bn: "শীঘ্রই বড়দিন আসছে এবং আমি উপহার কিনছি।" },
      { de: "Ich gehe am Samstag mit meiner Freundin durch die Fußgängerzone.", en: "On Saturday I walk with my girlfriend through the pedestrian zone.", bn: "শনিবার আমি আমার বান্ধবীর সাথে পথচারী অঞ্চলের মধ্য দিয়ে হাঁটি।" },
      { de: "Zuerst kaufen wir ein schönes Parfum für meine Mutter.", en: "First we buy a nice perfume for my mother.", bn: "প্রথমে আমরা আমার মায়ের জন্য একটি সুন্দর পারফিউম কিনি।" },
      { de: "Für meinen Vater finde ich ein spannendes Buch über Geschichte.", en: "For my father I find an exciting book about history.", bn: "আমার বাবার জন্য আমি ইতিহাসের ওপর একটি রোমাঞ্চকর বই খুঁজে পাই।" },
      { de: "Mein kleiner Bruder bekommt einen Fußball.", en: "My little brother gets a football.", bn: "আমার ছোট ভাই একটি ফুটবল পাবে।" },
      { de: "Ohne Geschenke möchte ich nicht nach Hause fahren.", en: "Without gifts I do not want to go home.", bn: "উপহার ছাড়া আমি বাড়ি ফিরতে চাই না।" },
      { de: "Gegen Mittag haben wir großen Hunger.", en: "Around noon we are very hungry.", bn: "দুপুরের দিকে আমাদের প্রচণ্ড ক্ষুধা লাগে।" },
      { de: "Wir kaufen zwei Sandwiches für unterwegs.", en: "We buy two sandwiches for the road.", bn: "আমরা পথের জন্য দুটি স্যান্ডউইচ কিনি।" },
      { de: "Danach gehen wir noch in ein Geschäft für Elektronik.", en: "Afterward we also go into a shop for electronics.", bn: "এরপর আমরা আরও একটি ইলেকট্রনিক্সের দোকানে যাই।" },
      { de: "Am Abend sind wir müde, aber alle Geschenke sind fertig.", en: "In the evening we are tired, but all gifts are ready.", bn: "সন্ধ্যায় আমরা ক্লান্ত হয়ে পড়ি, কিন্তু সব উপহার কেনা শেষ হয়ে যায়।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-22",
    level: "A1",
    category: "es gibt + Accusative & Food",
    titleDe: "22. Ein Abend im Restaurant",
    titleEn: "An Evening at the Restaurant",
    titleBn: "রেস্তোরাঁয় একটি সন্ধ্যা",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Heute Abend möchten wir nicht selbst kochen.", en: "Tonight we do not want to cook ourselves.", bn: "আজ রাতে আমরা নিজেরা রান্না করতে চাই না।" },
      { de: "Deshalb gehen wir in ein italienisches Restaurant.", en: "Therefore we go into an Italian restaurant.", bn: "তাই আমরা একটি ইতালীয় রেস্তোরাঁয় যাই।" },
      { de: "Im Restaurant gibt es heute viele Gäste.", en: "In the restaurant there are many guests today.", bn: "রেস্তোরাঁয় আজ অনেক অতিথি আছেন।" },
      { de: "Zum Glück gibt es noch einen freien Tisch in der Ecke.", en: "Fortunately there is still a free table in the corner.", bn: "সৌভাগ্যবশত কোণায় এখনো একটি খালি টেবিল আছে।" },
      { de: "Der Kellner gibt uns sofort die Speisekarte.", en: "The waiter immediately gives us the menu.", bn: "ওয়েটার সাথে সাথে আমাদের মেনু দেন।" },
      { de: "Auf der Karte gibt es Pizza, Pasta und frische Salate.", en: "On the menu there is pizza, pasta, and fresh salads.", bn: "মেনুতে পিৎজা, পাস্তা এবং তাজা সালাদ আছে।" },
      { de: "Ich bestelle eine Pizza mit Käse und Pilzen.", en: "I order a pizza with cheese and mushrooms.", bn: "আমি পনির এবং মাশরুম দিয়ে একটি পিৎজা অর্ডার করি।" },
      { de: "Meine Frau nimmt Spaghetti mit Tomatensoße.", en: "My wife takes spaghetti with tomato sauce.", bn: "আমার স্ত্রী টমেটো সস দিয়ে স্প্যাগেটি নেয়।" },
      { de: "Dazu bestellen wir eine Flasche Mineralwasser.", en: "With that we order a bottle of mineral water.", bn: "এর সাথে আমরা এক বোতল মিনারেল ওয়াটার অর্ডার করি।" },
      { de: "Das Essen schmeckt ausgezeichnet und der Service ist top.", en: "The food tastes excellent and the service is top-notch.", bn: "খাবারটি অসাধারণ সুস্বাদু এবং সেবাও দারুণ।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-23",
    level: "A1",
    category: "Imperative (du & ihr forms)",
    titleDe: "23. Tipps für Deutschlerner",
    titleEn: "Tips for German Learners",
    titleBn: "জার্মান শিক্ষার্থীদের জন্য টিপস",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Möchtest du schnell und gut Deutsch lernen?", en: "Would you like to learn German quickly and well?", bn: "তুমি কি দ্রুত এবং ভালোভাবে জার্মান শিখতে চাও?" },
      { de: "Dann hör dir diese einfachen Tipps an!", en: "Then listen to these simple tips!", bn: "তাহলে এই সহজ টিপসগুলো শোনো!" },
      { de: "Lern jeden Tag zehn neue Wörter mit dem Artikel.", en: "Learn ten new words with the article every day.", bn: "প্রতিদিন আর্টিকেলসহ দশটি নতুন শব্দ শেখো।" },
      { de: "Schreib die Wörter auf kleine Karten.", en: "Write the words on small cards.", bn: "শব্দগুলো ছোট কার্ডে লিখে রাখো।" },
      { de: "Lest auch kurze Texte und Bücher auf Deutsch!", en: "Also read short texts and books in German!", bn: "জার্মান ভাষায় ছোট লেখা এবং বইও পড়ো (তোমরা)!" },
      { de: "Sprecht so oft wie möglich mit anderen Menschen.", en: "Speak as often as possible with other people.", bn: "যতবার সম্ভব অন্য মানুষের সাথে কথা বলো (তোমরা)!" },
      { de: "Hab keine Angst vor Fehlern beim Sprechen!", en: "Do not be afraid of mistakes when speaking!", bn: "কথা বলার সময় ভুল করতে ভয় পেয়ো না!" },
      { de: "Schau dir deutsche Filme oder Nachrichten im Internet an.", en: "Watch German movies or news on the internet.", bn: "ইন্টারনেটে জার্মান সিনেমা বা খবর দেখো।" },
      { de: "Wiederhole die Grammatik regelmäßig am Wochenende.", en: "Review the grammar regularly on the weekend.", bn: "সপ্তাহান্তে নিয়মিত ব্যাকরণ পুনরাবৃত্তি করো।" },
      { de: "Bleib geduldig und gib niemals auf!", en: "Stay patient and never give up!", bn: "ধৈর্য ধরো এবং কখনো হাল ছেড়ো না!" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-24",
    level: "A1",
    category: "Coordinating Conjunctions (und, aber, oder)",
    titleDe: "24. Ein Ausflug ins Grüne",
    titleEn: "A Trip into Nature",
    titleBn: "প্রকৃতিতে ভ্রমণ",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Am Sonntag scheint die Sonne vom blauen Himmel.", en: "On Sunday the sun shines from the blue sky.", bn: "রবিবারে নীল আকাশ থেকে সূর্য কিরণ দিচ্ছে।" },
      { de: "Wir wollen einen Ausflug machen.", en: "We want to take a trip.", bn: "আমরা একটি ভ্রমণে যেতে চাই।" },
      { de: "Wir können in den Wald gehen oder an den See fahren.", en: "We can go into the forest or drive to the lake.", bn: "আমরা বনে যেতে পারি অথবা হ্রদের ধারে যেতে পারি।" },
      { de: "Meine Frau möchte lieber an den See fahren.", en: "My wife prefers to drive to the lake.", bn: "আমার স্ত্রী হ্রদের ধারে যেতে বেশি পছন্দ করে।" },
      { de: "Ich packe einen Rucksack mit Wasser und Obst ein.", en: "I pack a backpack with water and fruit.", bn: "আমি পানি এবং ফল দিয়ে একটি ব্যাকপ্যাক গুছিয়ে নিই।" },
      { de: "Wir nehmen den Bus, aber er ist heute sehr voll.", en: "We take the bus, but it is very full today.", bn: "আমরা বাসে উঠি, কিন্তু আজ বাসটি খুব ভিড়ে পূর্ণ।" },
      { de: "Nach dreißig Minuten erreichen wir den schönen See.", en: "After thirty minutes we reach the beautiful lake.", bn: "ত্রিশ মিনিট পর আমরা সুন্দর হ্রদটিতে পৌঁছাই।" },
      { de: "Das Wasser ist klar, aber noch ein bisschen kalt.", en: "The water is clear, but still a bit cold.", bn: "পানি স্বচ্ছ, কিন্তু এখনো একটু ঠান্ডা।" },
      { de: "Wir machen ein Picknick und genießen die frische Luft.", en: "We have a picnic and enjoy the fresh air.", bn: "আমরা পিকনিক করি এবং তাজা বাতাস উপভোগ করি।" },
      { de: "Am Abend fahren wir glücklich wieder nach Hause.", en: "In the evening we happily travel back home again.", bn: "সন্ধ্যায় আমরা আনন্দের সাথে আবার বাড়ি ফিরে আসি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-25",
    level: "A1",
    category: "Conjunctions denn & sondern",
    titleDe: "25. Lernen und Arbeiten",
    titleEn: "Studying and Working",
    titleBn: "পড়াশোনা এবং কাজ",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Viele Studenten in Deutschland arbeiten neben dem Studium.", en: "Many students in Germany work alongside their studies.", bn: "জার্মানিতে অনেক শিক্ষার্থী পড়াশোনার পাশাপাশি কাজ করে।" },
      { de: "Ich arbeite auch Teilzeit in einem Café.", en: "I also work part-time in a café.", bn: "আমিও একটি ক্যাফেতে খণ্ডকালীন কাজ করি।" },
      { de: "Ich mache das nicht nur für das Geld, sondern ich möchte auch Deutsch üben.", en: "I do not do this only for the money, rather I also want to practice German.", bn: "আমি শুধু টাকার জন্য এটি করি না, বরং আমি জার্মান ভাষাও অনুশীলন করতে চাই।" },
      { de: "Die Arbeit macht Spaß, denn meine Kollegen sind sehr nett.", en: "The work is fun, because my colleagues are very nice.", bn: "কাজটি আনন্দের, কারণ আমার সহকর্মীরা খুব ভালো।" },
      { de: "Manchmal bin ich abends müde, denn das Studium ist anspruchsvoll.", en: "Sometimes I am tired in the evening, because studying is demanding.", bn: "মাঝে মাঝে সন্ধ্যায় আমি ক্লান্ত থাকি, কারণ পড়াশোনা বেশ কঠিন।" },
      { de: "Am Wochenende gehe ich nicht aus, sondern ich lerne für meine Prüfungen.", en: "On the weekend I do not go out, rather I study for my exams.", bn: "সপ্তাহান্তে আমি বাইরে ঘুরতে যাই না, বরং আমার পরীক্ষার জন্য পড়াশোনা করি।" },
      { de: "Mein Ziel ist ein guter Abschluss an der Universität.", en: "My goal is a good degree at the university.", bn: "আমার লক্ষ্য হলো বিশ্ববিদ্যালয় থেকে একটি ভালো ডিগ্রি অর্জন করা।" },
      { de: "Danach möchte ich eine Vollzeitstelle finden.", en: "Afterward I want to find a full-time position.", bn: "এরপর আমি একটি পূর্ণকালীন চাকরি খুঁজে পেতে চাই।" },
      { de: "Meine Familie unterstützt mich sehr, denn sie sind stolz auf mich.", en: "My family supports me a lot, because they are proud of me.", bn: "আমার পরিবার আমাকে অনেক সমর্থন করে, কারণ তারা আমাকে নিয়ে গর্বিত।" },
      { de: "Mit Fleiß und Disziplin kann man alles erreichen.", en: "With diligence and discipline one can achieve anything.", bn: "পরিশ্রম এবং শৃঙ্খলার মাধ্যমে যেকোনো কিছু অর্জন করা সম্ভব।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-26",
    level: "A1",
    category: "Simple Past (Präteritum of sein & haben)",
    titleDe: "26. Gestern war ein langer Tag",
    titleEn: "Yesterday Was a Long Day",
    titleBn: "গতকাল একটি দীর্ঘ দিন ছিল",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Gestern war ein wirklich anstrengender Tag für mich.", en: "Yesterday was a really exhausting day for me.", bn: "গতকাল আমার জন্য সত্যিই একটি ক্লান্তিকর দিন ছিল।" },
      { de: "Morgens hatte ich schon um acht Uhr einen wichtigen Termin.", en: "In the morning I already had an important appointment at eight o'clock.", bn: "সকালে আটটায়ই আমার একটি গুরুত্বপূর্ণ অ্যাপয়েন্টমেন্ট ছিল।" },
      { de: "Leider war der Bus zu spät.", en: "Unfortunately the bus was too late.", bn: "দুর্ভাগ্যবশত বাসটি দেরিতে এসেছিল।" },
      { de: "Ich hatte großen Stress und war sehr nervös.", en: "I had a lot of stress and was very nervous.", bn: "আমার খুব মানসিক চাপ হচ্ছিল এবং আমি খুব নার্ভাস ছিলাম।" },
      { de: "Zum Glück war der Beamte im Amt sehr freundlich.", en: "Fortunately the official at the office was very friendly.", bn: "সৌভাগ্যবশত অফিসের কর্মকর্তা খুব বন্ধুত্বপূর্ণ ছিলেন।" },
      { de: "Alle meine Dokumente waren komplett und richtig.", en: "All my documents were complete and correct.", bn: "আমার সব কাগজপত্র সম্পূর্ণ এবং সঠিক ছিল।" },
      { de: "Am Nachmittag hatte ich noch drei Stunden Unterricht.", en: "In the afternoon I still had three hours of class.", bn: "বিকেলে আমার আরও তিন ঘণ্টা ক্লাস ছিল।" },
      { de: "Danach war ich total müde und hatte starken Hunger.", en: "Afterward I was totally tired and was very hungry.", bn: "এরপর আমি পুরোপুরি ক্লান্ত ছিলাম এবং আমার প্রচণ্ড ক্ষুধা লেগেছিল।" },
      { de: "Zu Hause hatte ich zum Glück noch etwas Suppe.", en: "At home I fortunately still had some soup.", bn: "বাড়িতে সৌভাগ্যবশত আমার কাছে কিছু স্যুপ ছিল।" },
      { de: "Um neun Uhr abends war ich schon im Bett.", en: "At nine o'clock in the evening I was already in bed.", bn: "রাত নয়টায়ই আমি বিছানায় ঘুমিয়ে পড়েছিলাম।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-fundbuero",
    level: "A1",
    category: "Perfekt (verlieren, finden, abgeben) & Descriptions",
    titleDe: "Im Fundbüro",
    titleEn: "At the Lost and Found Office",
    titleBn: "লস্ট অ্যান্ড ফাউন্ড অফিসে (Fundbüro)",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Gestern Nachmittag habe ich meinen schwarzen Rucksack in der Straßenbahn vergessen.", en: "Yesterday afternoon I forgot my black backpack on the tram.", bn: "গতকাল বিকেলে আমি ট্রামে আমার কালো ব্যাকপ্যাকটি ভুলে ফেলে এসেছিলাম।" },
      { de: "Im Rucksack waren mein Portemonnaie, mein Schlüssel und mein Deutschbuch.", en: "In the backpack were my wallet, my key, and my German book.", bn: "ব্যাকপ্যাকের ভেতরে আমার মানিব্যাগ, চাবি এবং জার্মান বই ছিল।" },
      { de: "Ich war sehr traurig und bin heute Morgen sofort zum Fundbüro gegangen.", en: "I was very sad and went immediately to the lost and found office this morning.", bn: "আমি খুব মন খারাপ করেছিলাম এবং আজ সকালে সাথে সাথে লস্ট অ্যান্ড ফাউন্ড অফিসে (Fundbüro) গিয়েছি।" },
      { de: "Am Schalter habe ich dem Mitarbeiter alles genau beschrieben.", en: "At the counter I described everything accurately to the employee.", bn: "কাউন্টারে আমি কর্মচারীকে সবকিছু সঠিকভাবে বর্ণনা করেছি।" },
      { de: "Er hat im Computer gesucht und gesagt: „Wir haben Ihren Rucksack gestern Abend gefunden!“", en: "He searched in the computer and said: \"We found your backpack yesterday evening!\"", bn: "তিনি কম্পিউটারে খুঁজে বলেছেন: \"আমরা গতকাল সন্ধ্যায় আপনার ব্যাকপ্যাকটি খুঁজে পেয়েছি!\"" },
      { de: "Ein ehrlicher Fahrgast hat den Rucksack beim Fahrer abgegeben.", en: "An honest passenger handed the backpack in to the driver.", bn: "একজন সৎ যাত্রী ব্যাকপ্যাকটি চালকের কাছে জমা দিয়েছিলেন।" },
      { de: "Ich habe meinen Ausweis gezeigt und meine Sachen kontrolliert.", en: "I showed my ID and checked my things.", bn: "আমি আমার পরিচয়পত্র দেখিয়েছি এবং আমার জিনিসপত্র পরীক্ষা করেছি।" },
      { de: "Zum Glück hat nichts gefehlt und mein Geld war noch da.", en: "Fortunately nothing was missing and my money was still there.", bn: "সৌভাগ্যবশত কোনো কিছুই হারায়নি এবং আমার টাকাও ঠিকঠাক ছিল।" },
      { de: "Ich habe eine kleine Gebühr bezahlt und den Rucksack mitgenommen.", en: "I paid a small fee and took the backpack with me.", bn: "আমি সামান্য ফি পরিশোধ করেছি এবং ব্যাকপ্যাকটি সাথে নিয়ে এসেছি।" },
      { de: "Über diese Ehrlichkeit habe ich mich riesig gefreut!", en: "I was hugely happy about this honesty!", bn: "এই সততা দেখে আমি ভীষণ খুশি হয়েছি!" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-27",
    level: "A1",
    category: "Perfekt with haben (Regular & Irregular)",
    titleDe: "27. Mein letztes Wochenende",
    titleEn: "My Last Weekend",
    titleBn: "আমার গত সপ্তাহান্ত",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Letztes Wochenende habe ich viele schöne Dinge erlebt.", en: "Last weekend I experienced many nice things.", bn: "গত সপ্তাহান্তে আমি অনেক সুন্দর অভিজ্ঞতা অর্জন করেছি।" },
      { de: "Am Samstagmorgen habe ich lange geschlafen.", en: "On Saturday morning I slept for a long time.", bn: "শনিবার সকালে আমি অনেকক্ষণ ঘুমিয়েছি।" },
      { de: "Danach habe ich meine ganze Wohnung gründlich geputzt.", en: "Afterward I thoroughly cleaned my entire apartment.", bn: "এরপর আমি আমার পুরো ফ্ল্যাটটি ভালোভাবে পরিষ্কার করেছি।" },
      { de: "Am Nachmittag habe ich meine Eltern in Bangladesch angerufen.", en: "In the afternoon I called my parents in Bangladesh.", bn: "বিকেলে আমি বাংলাদেশে আমার বাবা-মাকে ফোন করেছি।" },
      { de: "Wir haben eine Stunde lang geredet und viel gelacht.", en: "We talked for an hour and laughed a lot.", bn: "আমরা এক ঘণ্টা ধরে কথা বলেছি এবং অনেক হেসেছি।" },
      { de: "Am Abend habe ich ein neues Rezept ausprobiert.", en: "In the evening I tried out a new recipe.", bn: "সন্ধ্যায় আমি একটি নতুন রেসিপি চেষ্টা করেছি।" },
      { de: "Ich habe Reis mit Gemüse und Hähnchen gekocht.", en: "I cooked rice with vegetables and chicken.", bn: "আমি সবজি এবং মুরগির মাংস দিয়ে ভাত রান্না করেছি।" },
      { de: "Am Sonntag habe ich einen interessanten Film auf Deutsch gesehen.", en: "On Sunday I watched an interesting movie in German.", bn: "রবিবারে আমি জার্মান ভাষায় একটি আকর্ষণীয় সিনেমা দেখেছি।" },
      { de: "Ich habe fast alle Wörter verstanden!", en: "I understood almost all the words!", bn: "আমি প্রায় সব শব্দই বুঝতে পেরেছি!" },
      { de: "So habe ich mein Wochenende perfekt genutzt.", en: "That way I used my weekend perfectly.", bn: "এভাবে আমি আমার সপ্তাহান্তটি চমৎকারভাবে কাজে লাগিয়েছি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-28",
    level: "A1",
    category: "Perfekt with sein (Movement Verbs)",
    titleDe: "28. Ein Ausflug nach Heidelberg",
    titleEn: "A Trip to Heidelberg",
    titleBn: "হাইডেলবার্গ ভ্রমণ",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Vor zwei Wochen bin ich nach Heidelberg gefahren.", en: "Two weeks ago I traveled to Heidelberg.", bn: "দুই সপ্তাহ আগে আমি হাইডেলবার্গে গিয়েছিলাম।" },
      { de: "Heidelberg ist eine sehr berühmte Universitätsstadt.", en: "Heidelberg is a very famous university city.", bn: "হাইডেলবার্গ একটি অত্যন্ত বিখ্যাত বিশ্ববিদ্যালয় শহর।" },
      { de: "Ich bin früh am Morgen mit dem Zug losgefahren.", en: "I departed early in the morning by train.", bn: "আমি খুব সকালে ট্রেনে করে রওনা দিয়েছিলাম।" },
      { de: "Nach einer Stunde bin ich pünktlich am Bahnhof angekommen.", en: "After one hour I arrived punctually at the train station.", bn: "এক ঘণ্টা পর আমি ঠিক সময়ে রেলস্টেশনে পৌঁছেছিলাম।" },
      { de: "Vom Bahnhof bin ich zu Fuß in die Altstadt gegangen.", en: "From the train station I walked on foot into the old town.", bn: "স্টেশন থেকে আমি হেঁটে পুরনো শহরে গিয়েছিলাম।" },
      { de: "Dort bin ich durch die langen Straßen gebummelt.", en: "There I strolled through the long streets.", bn: "সেখানে আমি লম্বা রাস্তাগুলোর মধ্য দিয়ে ঘুরে বেড়িয়েছি।" },
      { de: "Danach bin ich auf den Berg zum alten Schloss gestiegen.", en: "Afterward I climbed up the mountain to the old castle.", bn: "এরপর আমি পাহাড়ে উঠে পুরনো দুর্গে গিয়েছিলাম।" },
      { de: "Von oben habe ich die ganze Stadt gesehen.", en: "From above I saw the whole city.", bn: "ওপর থেকে আমি পুরো শহরটি দেখেছি।" },
      { de: "Am Abend bin ich wieder nach Frankfurt zurückgefahren.", en: "In the evening I traveled back to Frankfurt again.", bn: "সন্ধ্যায় আমি আবার ফ্রাঙ্কফুর্টে ফিরে এসেছি।" },
      { de: "Dieser Tagesausflug ist mir sehr gut in Erinnerung geblieben.", en: "This day trip has stayed very well in my memory.", bn: "এই একদিনের ভ্রমণটি আমার স্মৃতিতে খুব ভালোভাবে গেঁথে আছে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-29",
    level: "A1",
    category: "Ordinal Numbers (Dates) & Perfekt",
    titleDe: "29. Das Fest im Park",
    titleEn: "The Festival in the Park",
    titleBn: "পার্কের উৎসব",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Am fünfzehnten Juni gab es ein großes Sommerfest im Park.", en: "On the fifteenth of June there was a big summer festival in the park.", bn: "পনেরোই জুন পার্কে একটি বড় গ্রীষ্মকালীন উৎসব হয়েছিল।" },
      { de: "Das Wetter war fantastisch und die Sonne hat geschienen.", en: "The weather was fantastic and the sun shone.", bn: "আবহাওয়া চমৎকার ছিল এবং সূর্য কিরণ দিচ্ছিল।" },
      { de: "Viele Familien und Studenten sind in den Park gekommen.", en: "Many families and students came to the park.", bn: "অনেক পরিবার এবং শিক্ষার্থী পার্কে এসেছিল।" },
      { de: "Es hat internationale Musik und leckeres Essen gegeben.", en: "There was international music and delicious food.", bn: "সেখানে আন্তর্জাতিক সংগীত এবং সুস্বাদু খাবারের ব্যবস্থা ছিল।" },
      { de: "Ich habe dort viele neue Leute kennengelernt.", en: "I met many new people there.", bn: "আমি সেখানে অনেক নতুন মানুষের সাথে পরিচিত হয়েছি।" },
      { de: "Wir haben zusammen getanzt und kalte Getränke getrunken.", en: "We danced together and drank cold drinks.", bn: "আমরা একসাথে নেচেছি এবং ঠান্ডা পানীয় পান করেছি।" },
      { de: "Um achtzehn Uhr hat eine lokale Band ein Konzert gegeben.", en: "At six PM a local band gave a concert.", bn: "সন্ধ্যা ছয়টায় একটি স্থানীয় ব্যান্ড কনসার্ট পরিবেশন করেছে।" },
      { de: "Alle Besucher haben geklatscht und mitgesungen.", en: "All visitors clapped and sang along.", bn: "সব দর্শনার্থীরা হাততালি দিয়েছে এবং সাথে গান গেয়েছে।" },
      { de: "Erst um zweiundzwanzig Uhr ist das Fest zu Ende gegangen.", en: "Only at ten PM did the festival come to an end.", bn: "রাত দশটায় গিয়ে উৎসবটি শেষ হয়েছে।" },
      { de: "Am sechzehnten Juni haben alle Zeitungen darüber berichtet.", en: "On the sixteenth of June all newspapers reported about it.", bn: "ষোলোই জুন সব সংবাদপত্রে এ বিষয়ে প্রতিবেদন প্রকাশিত হয়েছিল।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a1-30",
    level: "A1",
    category: "Complete A1 Review & man / es gibt",
    titleDe: "30. Bereit für die A1-Prüfung!",
    titleEn: "Ready for the A1 Exam!",
    titleBn: "A1 পরীক্ষার জন্য প্রস্তুত!",
    readingTimeMinutes: 2,
    sentences: [
      { de: "Heute schließe ich mein A1-Lehrbuch mit einem Lächeln.", en: "Today I close my A1 textbook with a smile.", bn: "আজ আমি হাসিমুখে আমার A1 পাঠ্যবইটি শেষ করছি।" },
      { de: "Vor drei Monaten konnte ich noch kein Wort Deutsch sprechen.", en: "Three months ago I could not speak a single word of German yet.", bn: "তিন মাস আগেও আমি জার্মান ভাষার একটি শব্দও বলতে পারতাম না।" },
      { de: "Jetzt verstehe ich schon viele Texte und Gespräche im Alltag.", en: "Now I already understand many texts and conversations in everyday life.", bn: "এখন আমি দৈনন্দিন জীবনের অনেক লেখা এবং কথোপকথন বুঝতে পারি।" },
      { de: "Ich kann im Restaurant bestellen und nach dem Weg fragen.", en: "I can order in a restaurant and ask for directions.", bn: "আমি রেস্তোরাঁয় খাবার অর্ডার করতে পারি এবং রাস্তা জিজ্ঞাসা করতে পারি।" },
      { de: "Ich weiß auch, wie man über die Vergangenheit spricht.", en: "I also know how to talk about the past.", bn: "আমি এটাও জানি যে কীভাবে অতীত সম্পর্কে কথা বলতে হয়।" },
      { de: "Natürlich gibt es noch viel neue Grammatik zu lernen.", en: "Of course there is still a lot of new grammar to learn.", bn: "অবশ্যই এখনো অনেক নতুন ব্যাকরণ শেখার বাকি আছে।" },
      { de: "Man muss jeden Tag ein bisschen üben.", en: "One must practice a little bit every day.", bn: "প্রতিদিন একটু একটু করে অনুশীলন করতে হবে।" },
      { de: "Morgen melde ich mich für die Goethe-Prüfung A1 an.", en: "Tomorrow I will register for the Goethe A1 exam.", bn: "আগামীকাল আমি গোয়েথে A1 পরীক্ষার জন্য নিবন্ধন করব।" },
      { de: "Danach möchte ich sofort mit dem Niveau A2 beginnen.", en: "Afterward I want to start immediately with level A2.", bn: "এরপর আমি সাথে সাথেই A2 স্তর শুরু করতে চাই।" },
      { de: "Ich bin sehr stolz auf meinen Fortschritt!", en: "I am very proud of my progress!", bn: "আমি আমার অগ্রগতি নিয়ে অত্যন্ত গর্বিত!" }
    ],
    dictionary: {}
  },

  // ===================== A2 (40 Progressive Stories) =====================
  {
    id: "passage-a2-1",
    level: "A2",
    category: "Subordinate Clauses (weil, dass)",
    titleDe: "1. Warum ich in Deutschland studiere",
    titleEn: "Why I Am Studying in Germany",
    titleBn: "কেন আমি জার্মানিতে পড়াশোনা করছি",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Viele Freunde fragen mich, warum ich nach Deutschland gekommen bin.", en: "Many friends ask me why I came to Germany.", bn: "অনেক বন্ধু আমাকে জিজ্ঞাসা করে, কেন আমি জার্মানিতে এসেছি।" },
      { de: "Ich erkläre ihnen, dass die Universitäten hier einen sehr guten Ruf haben.", en: "I explain to them that the universities here have a very good reputation.", bn: "আমি তাদের বোঝাই যে এখানকার বিশ্ববিদ্যালয়গুলোর খুব ভালো সুনাম রয়েছে।" },
      { de: "Außerdem gefällt mir, dass das Studium sehr praxisorientiert ist.", en: "In addition, I like that the studies are very practice-oriented.", bn: "তাছাড়া আমার ভালো লাগে যে এখানকার পড়াশোনা খুবই বাস্তবমুখী।" },
      { de: "Ich lerne jeden Tag intensiv Deutsch, weil ich bald ein Praktikum machen möchte.", en: "I study German intensively every day because I want to do an internship soon.", bn: "আমি প্রতিদিন মনোযোগ দিয়ে জার্মান শিখছি, কারণ আমি শীঘ্রই একটি ইন্টার্নশিপ করতে চাই।" },
      { de: "Mein Professor sagt, dass meine Sprachkenntnisse schon viel besser geworden sind.", en: "My professor says that my language skills have already become much better.", bn: "আমার প্রফেসর বলেন যে আমার ভাষার দক্ষতা ইতিমধ্যেই অনেক ভালো হয়েছে।" },
      { de: "Am Anfang war es schwierig, weil ich fast niemanden in Frankfurt kannte.", en: "In the beginning it was difficult because I knew almost nobody in Frankfurt.", bn: "শুরুতে ব্যাপারটা কঠিন ছিল, কারণ ফ্রাঙ্কফুর্টে আমি প্রায় কাউকেই চিনতাম না।" },
      { de: "Jetzt bin ich glücklich, weil ich viele nette Kommilitonen gefunden habe.", en: "Now I am happy because I have found many nice fellow students.", bn: "এখন আমি খুশি, কারণ আমি অনেক ভালো সহপাঠী খুঁজে পেয়েছি।" },
      { de: "Wir lernen oft zusammen in der Bibliothek, weil es dort ruhig ist.", en: "We often study together in the library because it is quiet there.", bn: "আমরা প্রায়ই লাইব্রেরিতে একসাথে পড়াশোনা করি, কারণ সেখানে পরিবেশ শান্ত থাকে।" },
      { de: "Ich bin sicher, dass mir dieses Studium für meine Zukunft hilft.", en: "I am sure that these studies will help me for my future.", bn: "আমি নিশ্চিত যে এই পড়াশোনা আমার ভবিষ্যতের জন্য সাহায্য করবে।" },
      { de: "Meine Eltern freuen sich sehr, dass ich meinen Traum verfolge.", en: "My parents are very happy that I am pursuing my dream.", bn: "আমার বাবা-মা খুব খুশি যে আমি আমার স্বপ্ন পূরণ করছি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-2",
    level: "A2",
    category: "Conjunctions als vs. wenn",
    titleDe: "2. Als ich ein Kind war",
    titleEn: "When I Was a Child",
    titleBn: "যখন আমি শিশু ছিলাম",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Als ich ein kleines Kind war, lebte ich mit meiner Familie in Dhaka.", en: "When I was a small child, I lived with my family in Dhaka.", bn: "যখন আমি ছোট শিশু ছিলাম, তখন আমি আমার পরিবারের সাথে ঢাকায় থাকতাম।" },
      { de: "Wenn morgens die Sonne aufging, weckte mich meine Mutter immer früh.", en: "Whenever the sun rose in the morning, my mother always woke me up early.", bn: "যখনই সকালে সূর্য উঠত, আমার মা আমাকে সবসময় ভোরে ঘুম থেকে ডেকে দিতেন।" },
      { de: "Wir frühstückten gemeinsam, bevor ich mit meinem Bruder zur Schule ging.", en: "We had breakfast together before I went to school with my brother.", bn: "আমি আমার ভাইয়ের সাথে স্কুলে যাওয়ার আগে আমরা একসাথে সকালের নাস্তা করতাম।" },
      { de: "Als ich acht Jahre alt wurde, bekam ich mein erstes Fahrrad.", en: "When I turned eight years old, I got my first bicycle.", bn: "যখন আমার বয়স আট বছর হলো, তখন আমি আমার প্রথম সাইকেল পেয়েছিলাম।" },
      { de: "Wenn es im Sommer stark regnete, spielten wir trotzdem draußen im Hof.", en: "Whenever it rained heavily in summer, we still played outside in the courtyard.", bn: "গ্রীষ্মকালে যখন প্রবল বৃষ্টি হতো, তখনও আমরা বাইরে উঠোনে খেলতাম।" },
      { de: "Meine Großeltern besuchten uns oft, wenn wir Ferien hatten.", en: "My grandparents often visited us when we had holidays.", bn: "যখন আমাদের ছুটি থাকত, আমার দাদা-দাদি প্রায়ই আমাদের বাড়িতে বেড়াতে আসতেন।" },
      { de: "Als ich zum ersten Mal einen Computer sah, war ich total fasziniert.", en: "When I saw a computer for the first time, I was totally fascinated.", bn: "যখন আমি প্রথমবার একটি কম্পিউটার দেখেছিলাম, তখন আমি পুরোপুরি মুগ্ধ হয়ে গিয়েছিলাম।" },
      { de: "Wenn ich heute alte Fotos anschaue, muss ich oft lächeln.", en: "Whenever I look at old photos today, I often have to smile.", bn: "আজ যখনই আমি পুরনো ছবিগুলো দেখি, আমাকে প্রায়ই হাসতে হয়।" },
      { de: "Es war eine wunderbare Zeit, als wir noch keine großen Sorgen hatten.", en: "It was a wonderful time when we did not have any big worries yet.", bn: "সেটি একটি চমৎকার সময় ছিল, যখন আমাদের কোনো বড় দুশ্চিন্তা ছিল না।" },
      { de: "Wenn ich nächstes Jahr nach Bangladesch fliege, besuche ich meine alte Schule.", en: "When I fly to Bangladesh next year, I will visit my old school.", bn: "আগামী বছর যখন আমি বাংলাদেশে যাব, তখন আমি আমার পুরনো স্কুলটি দেখতে যাব।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-3",
    level: "A2",
    category: "Reflexive Verbs (sich beeilen, sich ärgern, sich anziehen)",
    titleDe: "3. Ein stressiger Morgen",
    titleEn: "A Stressful Morning",
    titleBn: "একটি ব্যস্ত ও চাপের সকাল",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Heute Morgen habe ich verschlafen und musste mich sehr beeilen.", en: "This morning I overslept and had to hurry a lot.", bn: "আজ সকালে আমার ঘুম ভাঙতে দেরি হয়ে গিয়েছিল এবং আমাকে খুব তাড়াহুড়ো করতে হয়েছিল।" },
      { de: "Zuerst habe ich mich schnell geduscht und mir die Zähne geputzt.", en: "First I showered quickly and brushed my teeth.", bn: "প্রথমে আমি দ্রুত গোসল করলাম এবং দাঁত ব্রাশ করলাম।" },
      { de: "Danach habe ich mich angezogen, aber ich konnte meinen Schlüssel nicht finden.", en: "Afterward I got dressed, but I could not find my key.", bn: "এরপর আমি জামাকাপড় পরলাম, কিন্তু আমার চাবি খুঁজে পাচ্ছিলাম না।" },
      { de: "Ich habe mich wirklich geärgert, weil der Bus in fünf Minuten abfuhr.", en: "I was really annoyed because the bus was departing in five minutes.", bn: "আমি সত্যিই বিরক্ত হয়েছিলাম, কারণ পাঁচ মিনিটের মধ্যে বাস ছেড়ে যাওয়ার কথা ছিল।" },
      { de: "Zum Glück erinnerte ich mich daran, dass der Schlüssel in meiner Jackentasche war.", en: "Fortunately I remembered that the key was in my jacket pocket.", bn: "সৌভাগ্যবশত আমার মনে পড়ল যে চাবিটি আমার জ্যাকেটের পকেটে ছিল।" },
      { de: "Auf dem Weg zur Haltestelle habe ich mich mit meinem Nachbarn unterhalten.", en: "On the way to the bus stop I chatted with my neighbor.", bn: "বাসস্টপে যাওয়ার পথে আমি আমার প্রতিবেশীর সাথে গল্প করলাম।" },
      { de: "Leider haben wir den Bus trotzdem verpasst und mussten auf den nächsten warten.", en: "Unfortunately we still missed the bus and had to wait for the next one.", bn: "দুর্ভাগ্যবশত তবুও আমরা বাসটি মিস করলাম এবং পরেরটির জন্য অপেক্ষা করতে হলো।" },
      { de: "Im Büro habe ich mich sofort bei meinem Chef für die Verspätung entschuldigt.", en: "At the office I immediately apologized to my boss for the delay.", bn: "অফিসে পৌঁছে আমি দেরির জন্য সাথে সাথে আমার বসের কাছে ক্ষমা চাইলাম।" },
      { de: "Mein Chef hat sich nicht aufgeregt, sondern hat freundlich gelächelt.", en: "My boss did not get upset, rather he smiled kindly.", bn: "আমার বস রাগ করেননি, বরং আন্তরিকভাবে হেসেছিলেন।" },
      { de: "Am Abend konnte ich mich endlich auf dem Sofa ausruhen.", en: "In the evening I could finally rest on the sofa.", bn: "সন্ধ্যায় অবশেষে আমি সোফায় বিশ্রাম নিতে পেরেছিলাম।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-4",
    level: "A2",
    category: "Comparative & Superlative Adjectives",
    titleDe: "4. Stadt oder Land?",
    titleEn: "City or Countryside?",
    titleBn: "শহর নাকি গ্রাম?",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Viele Menschen diskutieren darüber, ob das Leben in der Stadt oder auf dem Land besser ist.", en: "Many people discuss whether life in the city or in the countryside is better.", bn: "অনেক মানুষ আলোচনা করে যে শহরের জীবন ভালো নাকি গ্রামের জীবন ভালো।" },
      { de: "In einer Großstadt wie Frankfurt sind die Mieten deutlich teurer als in einem kleinen Dorf.", en: "In a big city like Frankfurt, rents are significantly more expensive than in a small village.", bn: "ফ্রাঙ্কফুর্টের মতো বড় শহরে বাড়িভাড়া ছোট গ্রামের তুলনায় অনেক বেশি ব্যয়বহুল।" },
      { de: "Dafür gibt es in der Stadt viel mehr Arbeitsplätze und kulturelle Angebote.", en: "In return, there are many more jobs and cultural offerings in the city.", bn: "এর বিনিময়ে শহরে অনেক বেশি চাকরির সুযোগ এবং সাংস্কৃতিক আয়োজন রয়েছে।" },
      { de: "Die öffentlichen Verkehrsmittel fahren hier schneller und öfter als auf dem Land.", en: "Public transportation runs faster and more frequently here than in the countryside.", bn: "গ্রামের তুলনায় এখানে গণপরিবহন দ্রুত এবং ঘনঘন চলাচল করে।" },
      { de: "Auf dem Land ist die Luft jedoch viel sauberer und die Umgebung ruhiger.", en: "In the countryside, however, the air is much cleaner and the surroundings are quieter.", bn: "তবে গ্রামে বাতাস অনেক বেশি পরিষ্কার এবং চারপাশ শান্ত থাকে।" },
      { de: "Mein Freund Thomas findet das Landleben am schönsten, weil er die Natur liebt.", en: "My friend Thomas finds country life the nicest because he loves nature.", bn: "আমার বন্ধু টমাস গ্রামের জীবনকে সবচেয়ে সুন্দর মনে করে, কারণ সে প্রকৃতি ভালোবাসে।" },
      { de: "Ich persönlich wohne lieber in der Stadt, weil alles näher und bequemer ist.", en: "I personally prefer living in the city because everything is closer and more convenient.", bn: "আমি ব্যক্তিগতভাবে শহরে থাকতে বেশি পছন্দ করি, কারণ সবকিছু কাছাকাছি এবং সুবিধাজনক।" },
      { de: "Am wichtigsten ist für mich ein kurzer Weg zur Arbeit und zur Universität.", en: "Most important for me is a short commute to work and to the university.", bn: "আমার কাছে সবচেয়ে গুরুত্বপূর্ণ হলো কর্মস্থল এবং বিশ্ববিদ্যালয়ে যাওয়ার পথ সংক্ষিপ্ত হওয়া।" },
      { de: "Im Sommer fahre ich aber gern ins Grüne, um mich zu erholen.", en: "In summer, however, I like to drive into the countryside to relax.", bn: "তবে গ্রীষ্মকালে আমি বিশ্রাম নিতে সবুজ প্রকৃতির মাঝে যেতে পছন্দ করি।" },
      { de: "Jede Wohnform hat eben ihre eigenen Vor- und Nachteile.", en: "Every type of living simply has its own advantages and disadvantages.", bn: "প্রতিটি জীবনযাত্রারই নিজস্ব সুবিধা এবং অসুবিধা রয়েছে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-5",
    level: "A2",
    category: "Adjective Endings (Definite & Indefinite Articles)",
    titleDe: "5. Einkaufen im Technikgeschäft",
    titleEn: "Shopping at the Electronics Store",
    titleBn: "ইলেকট্রনিক্স দোকানে কেনাকাটা",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Mein alter Laptop funktioniert nicht mehr richtig und ist viel zu langsam.", en: "My old laptop does not work properly anymore and is way too slow.", bn: "আমার পুরনো ল্যাপটপটি আর ঠিকমতো কাজ করছে না এবং অনেক বেশি ধীরগতির হয়ে গেছে।" },
      { de: "Deshalb gehe ich heute in ein großes Elektronikgeschäft in der Innenstadt.", en: "Therefore I am going into a big electronics store in the city center today.", bn: "তাই আজ আমি শহরের কেন্দ্রস্থলে একটি বড় ইলেকট্রনিক্সের দোকানে যাচ্ছি।" },
      { de: "Dort sehe ich viele moderne Geräte auf den langen Tischen.", en: "There I see many modern devices on the long tables.", bn: "সেখানে লম্বা টেবিলগুলোর ওপর আমি অনেক আধুনিক ডিভাইস দেখতে পাই।" },
      { de: "Ein freundlicher Verkäufer berät mich und zeigt mir ein neues Modell.", en: "A friendly salesman advises me and shows me a new model.", bn: "একজন বন্ধুত্বপূর্ণ বিক্রয়কর্মী আমাকে পরামর্শ দেন এবং একটি নতুন মডেল দেখান।" },
      { de: "Der leichte Laptop hat einen schnellen Prozessor und einen großen Bildschirm.", en: "The lightweight laptop has a fast processor and a large screen.", bn: "হালকা ল্যাপটপটির একটি দ্রুতগতির প্রসেসর এবং একটি বড় স্ক্রিন রয়েছে।" },
      { de: "Leider ist dieses teure Gerät über meinem geplanten Budget.", en: "Unfortunately this expensive device is above my planned budget.", bn: "দুর্ভাগ্যবশত এই দামি ডিভাইসটি আমার পরিকল্পিত বাজেটের বাইরে।" },
      { de: "Der Verkäufer zeigt mir dann ein anderes Angebot mit einem guten Preis-Leistungs-Verhältnis.", en: "The salesman then shows me another offer with a good price-performance ratio.", bn: "বিক্রয়কর্মী তখন আমাকে ভালো মান ও দামের অনুপাতসহ আরেকটি অফার দেখান।" },
      { de: "Der silberne Computer gefällt mir sofort sehr gut.", en: "I immediately like the silver computer very much.", bn: "রুপালি রঙের কম্পিউটারটি সাথে সাথেই আমার খুব পছন্দ হয়ে যায়।" },
      { de: "Ich kaufe auch noch eine kabellose Maus und eine schwarze Tasche dazu.", en: "I also buy a wireless mouse and a black bag to go with it.", bn: "এর সাথে আমি একটি ওয়্যারলেস মাউস এবং একটি কালো ব্যাগও কিনি।" },
      { de: "Mit meinem neuen Laptop kann ich jetzt wieder problemlos arbeiten.", en: "With my new laptop I can now work smoothly again.", bn: "আমার নতুন ল্যাপটপ দিয়ে আমি এখন আবার কোনো সমস্যা ছাড়াই কাজ করতে পারব।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-6",
    level: "A2",
    category: "Modal Verbs in Präteritum (konnte, musste, wollte, durfte)",
    titleDe: "6. Früher und heute",
    titleEn: "In the Past and Today",
    titleBn: "অতীত এবং বর্তমান",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Vor einem Jahr sah mein Alltag noch ganz anders aus als heute.", en: "One year ago my everyday life looked completely different than today.", bn: "এক বছর আগে আমার দৈনন্দিন জীবন আজকের চেয়ে সম্পূর্ণ আলাদা ছিল।" },
      { de: "Damals konnte ich noch fast kein Deutsch sprechen und verstand nur wenig.", en: "Back then I could still speak almost no German and understood only a little.", bn: "তখন আমি প্রায় কোনো জার্মানই বলতে পারতাম না এবং খুব কম বুঝতাম।" },
      { de: "Wenn ich zum Amt gehen musste, brauchte ich immer Hilfe von einem Freund.", en: "Whenever I had to go to the government office, I always needed help from a friend.", bn: "যখনই আমাকে সরকারি অফিসে যেতে হতো, তখনই আমার একজন বন্ধুর সাহায্যের প্রয়োজন হতো।" },
      { de: "Ich wollte unbedingt einen guten Job finden, aber ohne Sprachkenntnisse war es schwer.", en: "I really wanted to find a good job, but without language skills it was hard.", bn: "আমি যেকোনো মূল্যে একটি ভালো চাকরি খুঁজে পেতে চেয়েছিলাম, কিন্তু ভাষার দক্ষতা ছাড়া তা কঠিন ছিল।" },
      { de: "In meiner alten Wohnung durfte ich keine Haustiere halten und hatte wenig Platz.", en: "In my old apartment I was not allowed to keep pets and had little space.", bn: "আমার পুরনো ফ্ল্যাটে পোষা প্রাণী রাখার অনুমতি ছিল না এবং জায়গাও কম ছিল।" },
      { de: "Außerdem musste ich jeden Tag über eine Stunde zur Arbeit fahren.", en: "In addition, I had to commute over an hour to work every day.", bn: "তাছাড়া আমাকে প্রতিদিন কাজে যাওয়ার জন্য এক ঘণ্টারও বেশি সময় যাতায়াত করতে হতো।" },
      { de: "Heute kann ich schon fast alle Gespräche im Alltag gut verstehen.", en: "Today I can already understand almost all conversations in everyday life well.", bn: "আজ আমি দৈনন্দিন জীবনের প্রায় সব কথোপকথনই ভালোভাবে বুঝতে পারি।" },
      { de: "Ich durfte letzte Woche sogar einen neuen Arbeitsvertrag unterschreiben.", en: "Last week I was even allowed to sign a new employment contract.", bn: "গত সপ্তাহে এমনকি আমি একটি নতুন চাকরির চুক্তিতে স্বাক্ষর করার সুযোগ পেয়েছি।" },
      { de: "Jetzt will ich weiter lernen, damit ich bald das Niveau B1 erreiche.", en: "Now I want to keep studying so that I soon reach level B1.", bn: "এখন আমি আরও শিখতে চাই, যাতে শীঘ্রই বি১ স্তরে পৌঁছাতে পারি।" },
      { de: "Wenn man fleißig bleibt, kann man seine Ziele wirklich erreichen.", en: "If one stays diligent, one can really achieve one's goals.", bn: "মানুষ পরিশ্রমী থাকলে সত্যিই তার লক্ষ্যে পৌঁছাতে পারে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-7",
    level: "A2",
    category: "Two-Way Prepositions (Wo? vs. Wohin? & Positional Verbs)",
    titleDe: "7. Wohnung einrichten",
    titleEn: "Furnishing the Apartment",
    titleBn: "ফ্ল্যাট সাজানো",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Am Wochenende haben wir endlich unsere neuen Möbel für das Wohnzimmer bekommen.", en: "On the weekend we finally received our new furniture for the living room.", bn: "সপ্তাহান্তে অবশেষে আমরা বসার ঘরের জন্য আমাদের নতুন আসবাবপত্র পেয়েছি।" },
      { de: "Zuerst haben wir das große Sofa direkt an die weiße Wand gestellt.", en: "First we placed the big sofa directly against the white wall.", bn: "প্রথমে আমরা বড় সোফাটি সরাসরি সাদা দেয়ালের সাথে রেখেছি।" },
      { de: "Danach haben wir den weichen Teppich vor das Sofa auf den Boden gelegt.", en: "Afterward we laid the soft carpet in front of the sofa onto the floor.", bn: "এরপর আমরা নরম কার্পেটটি সোফার সামনে মেঝেতে বিছিয়েছি।" },
      { de: "Mein Bruder hat eine moderne Lampe über den Esstisch gehängt.", en: "My brother hung a modern lamp above the dining table.", bn: "আমার ভাই খাবার টেবিলের ওপরে একটি আধুনিক বাতি ঝুলিয়েছে।" },
      { de: "Jetzt hängt die Lampe genau in der Mitte des Raumes.", en: "Now the lamp hangs right in the middle of the room.", bn: "এখন বাতিটি ঘরের ঠিক মাঝখানে ঝুলছে।" },
      { de: "Meine Frau hat unsere Bücher ordentlich ins Regal gestellt.", en: "My wife placed our books neatly onto the bookshelf.", bn: "আমার স্ত্রী আমাদের বইগুলো সুন্দরভাবে তাকের মধ্যে সাজিয়ে রেখেছে।" },
      { de: "Die grünen Pflanzen stehen jetzt auf der Fensterbank in der Sonne.", en: "The green plants are now standing on the windowsill in the sun.", bn: "সবুজ গাছগুলো এখন জানালার ধারে রোদে দাঁড়িয়ে আছে।" },
      { de: "Vor dem Fenster hängt nun eine helle Gardine.", en: "In front of the window now hangs a bright curtain.", bn: "জানালার সামনে এখন একটি উজ্জ্বল পর্দা ঝুলছে।" },
      { de: "Am Abend haben wir uns müde, aber glücklich auf das neue Sofa gesetzt.", en: "In the evening we sat down tired, but happy onto the new sofa.", bn: "সন্ধ্যায় আমরা ক্লান্ত কিন্তু আনন্দিত মনে নতুন সোফায় বসেছি।" },
      { de: "Unser Wohnzimmer sieht jetzt richtig gemütlich und einladend aus.", en: "Our living room now looks really cozy and inviting.", bn: "আমাদের বসার ঘরটি এখন সত্যিই আরামদায়ক এবং আকর্ষণীয় দেখাচ্ছে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-8",
    level: "A2",
    category: "Dative Verbs (helfen, danken, gefallen, gehören, passen)",
    titleDe: "8. Ein Geschenk für meine Kollegin",
    titleEn: "A Gift for My Colleague",
    titleBn: "সহকর্মীর জন্য উপহার",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Nächste Woche feiert meine nette Kollegin Sarah ihren dreißigsten Geburtstag.", en: "Next week my nice colleague Sarah is celebrating her thirtieth birthday.", bn: "আগামী সপ্তাহে আমার ভালো সহকর্মী সারাহ তার ত্রিশতম জন্মদিন উদযাপন করবে।" },
      { de: "Unsere Abteilung möchte ihr gerne ein gemeinsames Geschenk kaufen.", en: "Our department would like to buy her a joint gift.", bn: "আমাদের বিভাগ তাকে সবাই মিলে একটি উপহার কিনে দিতে চায়।" },
      { de: "Leider wissen wir nicht genau, was ihr besonders gut gefällt.", en: "Unfortunately we do not know exactly what she likes particularly well.", bn: "দুর্ভাগ্যবশত আমরা ঠিক জানি না তার কী সবচেয়ে বেশি ভালো লাগে।" },
      { de: "Ich frage ihre beste Freundin Lisa, ob sie uns bei der Auswahl helfen kann.", en: "I ask her best friend Lisa whether she can help us with the selection.", bn: "আমি তার সেরা বন্ধু লিসাকে জিজ্ঞাসা করি, সে নির্বাচন করতে আমাদের সাহায্য করতে পারবে কিনা।" },
      { de: "Lisa sagt, dass Sarah Bücher über Reisen und schöne Schals mag.", en: "Lisa says that Sarah likes books about travel and nice scarves.", bn: "লিসা বলে যে সারাহ ভ্রমণ বিষয়ক বই এবং সুন্দর স্কার্ফ পছন্দ করে।" },
      { de: "Wir gehen in die Stadt und finden einen blauen Seidenschal.", en: "We go into the city and find a blue silk scarf.", bn: "আমরা শহরে যাই এবং একটি নীল সিল্কের স্কার্ফ খুঁজে পাই।" },
      { de: "Die Farbe passt hervorragend zu Sarahs dunklen Haaren und ihrem Mantel.", en: "The color matches Sarah's dark hair and her coat wonderfully.", bn: "রঙটি সারাহর কালো চুল এবং তার কোটের সাথে চমৎকার মানিয়েছে।" },
      { de: "Am Geburtstag überreichen wir ihr das Paket und gratulieren ihr herzlich.", en: "On her birthday we hand her the package and congratulate her warmly.", bn: "জন্মদিনে আমরা তাকে প্যাকেটটি দিই এবং আন্তরিকভাবে অভিনন্দন জানাই।" },
      { de: "Sarah freut sich riesig und dankt uns allen für die tolle Überraschung.", en: "Sarah is hugely happy and thanks all of us for the great surprise.", bn: "সারাহ ভীষণ খুশি হয় এবং এই দারুণ চমকের জন্য আমাদের সবাইকে ধন্যবাদ জানায়।" },
      { de: "Sie sagt, dass dieses Geschenk jetzt zu ihren Lieblingssachen gehört.", en: "She says that this gift now belongs to her favorite things.", bn: "সে বলে যে এই উপহারটি এখন তার প্রিয় জিনিসগুলোর তালিকায় যুক্ত হলো।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-9",
    level: "A2",
    category: "Konjunktiv II (könnten, würden, hätten, wären)",
    titleDe: "9. Höfliche Bitten im Hotel",
    titleEn: "Polite Requests at the Hotel",
    titleBn: "হোটেলে ভদ্র অনুরোধ",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Ich komme spät am Abend in meinem Hotel in München an.", en: "I arrive late in the evening at my hotel in Munich.", bn: "আমি গভীর সন্ধ্যায় মিউনিখে আমার হোটেলে পৌঁছাই।" },
      { de: "An der Rezeption begrüßt mich ein Mitarbeiter sehr höflich.", en: "At the reception an employee greets me very politely.", bn: "রিসেপশনে একজন কর্মচারী আমাকে খুব ভদ্রভাবে অভিবাদন জানান।" },
      { de: "Ich sage: „Guten Abend, ich hätte gern ein ruhiges Zimmer mit Balkon.“", en: "I say: \"Good evening, I would like to have a quiet room with a balcony.\"", bn: "আমি বলি: \"শুভ সন্ধ্যা, আমি ব্যালকনিসহ একটি শান্ত ঘর পেলে খুশি হতাম।\"" },
      { de: "Der Mitarbeiter prüft den Computer und antwortet: „Das wäre kein Problem.“", en: "The employee checks the computer and answers: \"That would not be a problem.\"", bn: "কর্মচারী কম্পিউটার পরীক্ষা করেন এবং উত্তর দেন: \"এটি কোনো সমস্যা হবে না।\"" },
      { de: "Dann frage ich: „Könnten Sie mir bitte auch das WLAN-Passwort geben?“", en: "Then I ask: \"Could you please also give me the Wi-Fi password?\"", bn: "তারপর আমি জিজ্ঞাসা করি: \"আপনি কি দয়া করে আমাকে ওয়াই-ফাই পাসওয়ার্ডটিও দিতে পারবেন?\"" },
      { de: "Er schreibt das Passwort auf eine Karte und gibt sie mir.", en: "He writes the password on a card and gives it to me.", bn: "তিনি পাসওয়ার্ডটি একটি কার্ডে লিখে আমাকে দেন।" },
      { de: "Ich frage weiter: „Würden Sie mich morgen früh um sieben Uhr wecken?“", en: "I ask further: \"Would you wake me up tomorrow morning at seven o'clock?\"", bn: "আমি আরও জিজ্ঞাসা করি: \"আপনি কি আগামীকাল সকালে আমাকে সাতটায় ঘুম থেকে ডেকে দেবেন?\"" },
      { de: "„Selbstverständlich, ich würde das sehr gern für Sie erledigen“, sagt er.", en: "\"Of course, I would very gladly take care of that for you,\" he says.", bn: "\"অবশ্যই, আমি আপনার জন্য আনন্দের সাথে এটি করে দেব,\" তিনি বলেন।" },
      { de: "Zum Schluss frage ich, wann es morgen Frühstück gibt.", en: "Finally I ask when breakfast is served tomorrow.", bn: "সবশেষে আমি জিজ্ঞাসা করি আগামীকাল কখন সকালের নাস্তা দেওয়া হবে।" },
      { de: "Nach diesem freundlichen Service fühle ich mich sofort wie zu Hause.", en: "After this friendly service I immediately feel right at home.", bn: "এই আন্তরিক সেবার পর আমার সাথে সাথেই নিজের বাড়ির মতো অনুভূতি হয়।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-10",
    level: "A2",
    category: "Indirect Questions (ob & W-Words)",
    titleDe: "10. Auskunft am Informationsschalter",
    titleEn: "Information at the Info Desk",
    titleBn: "তথ্যকেন্দ্রে অনুসন্ধান",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Ich stehe am Flughafen und möchte wissen, wann mein Flug geht.", en: "I am standing at the airport and want to know when my flight leaves.", bn: "আমি বিমানবন্দরে দাঁড়িয়ে আছি এবং জানতে চাই আমার ফ্লাইট কখন ছাড়বে।" },
      { de: "Auf der großen Anzeigetafel stehen heute sehr viele Informationen.", en: "On the big display board there is a lot of information today.", bn: "বড় ডিসপ্লে বোর্ডে আজ অনেক তথ্য লেখা আছে।" },
      { de: "Deshalb gehe ich zum Schalter und frage, ob der Flug pünktlich startet.", en: "Therefore I go to the counter and ask whether the flight is taking off on time.", bn: "তাই আমি কাউন্টারে যাই এবং জিজ্ঞাসা করি ফ্লাইটটি ঠিক সময়ে ছাড়বে কিনা।" },
      { de: "Die Mitarbeiterin erklärt mir, dass die Maschine zwanzig Minuten Verspätung hat.", en: "The female employee explains to me that the plane has a twenty-minute delay.", bn: "মহিলা কর্মী আমাকে বুঝিয়ে বলেন যে বিমানটি বিশ মিনিট দেরিতে ছাড়বে।" },
      { de: "Dann möchte ich wissen, an welchem Gate ich einsteigen muss.", en: "Then I want to know at which gate I have to board.", bn: "এরপর আমি জানতে চাই কোন গেট দিয়ে আমাকে বিমানে উঠতে হবে।" },
      { de: "Sie schaut nach und sagt mir, dass sich das Gate geändert hat.", en: "She checks and tells me that the gate has changed.", bn: "তিনি দেখে আমাকে বলেন যে গেট পরিবর্তন হয়েছে।" },
      { de: "Außerdem frage ich, ob ich mein Handgepäck noch aufgeben muss.", en: "In addition, I ask whether I still have to check in my hand luggage.", bn: "এছাড়া আমি জিজ্ঞাসা করি আমার হাতের ব্যাগটি জমা দিতে হবে কিনা।" },
      { de: "Sie antwortet, dass mein kleiner Rucksack mit in die Kabine darf.", en: "She answers that my small backpack is allowed into the cabin.", bn: "তিনি উত্তর দেন যে আমার ছোট ব্যাকপ্যাকটি কেবিনে নেওয়া যাবে।" },
      { de: "Zum Schluss erkundige ich mich, wo ich noch einen Kaffee kaufen kann.", en: "Finally I inquire where I can still buy a coffee.", bn: "সবশেষে আমি খোঁজ নিই কোথা থেকে আমি এক কাপ কফি কিনতে পারব।" },
      { de: "Dank ihrer Hilfe weiß ich jetzt genau, wohin ich gehen muss.", en: "Thanks to her help I now know exactly where I have to go.", bn: "তাঁর সাহায্যের কারণে আমি এখন ঠিক জানি আমাকে কোথায় যেতে হবে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-11",
    level: "A2",
    category: "Health Advice, sollen & Indirect Questions",
    titleDe: "11. In der Apotheke",
    titleEn: "At the Pharmacy",
    titleBn: "ফার্মেসিতে",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Nach meinem Arztbesuch gehe ich direkt in die nächste Apotheke, um meine Medikamente zu holen.", en: "After my doctor's visit I go directly to the nearest pharmacy to pick up my medication.", bn: "ডাক্তার দেখানোর পর আমি আমার ওষুধ নেওয়ার জন্য সরাসরি পাশের ফার্মেসিতে যাই।" },
      { de: "Der Apotheker begrüßt mich freundlich und nimmt mein Rezept entgegen.", en: "The pharmacist greets me kindly and takes my prescription.", bn: "ফার্মাসিস্ট আমাকে আন্তরিকভাবে অভিবাদন জানান এবং আমার প্রেসক্রিপশনটি নেন।" },
      { de: "Er schaut kurz im Computer nach und holt eine Packung Tabletten sowie einen Hustensaft aus dem Regal.", en: "He checks briefly in the computer and fetches a pack of tablets as well as cough syrup from the shelf.", bn: "তিনি কম্পিউটারে সংক্ষেপে দেখে তাক থেকে এক পাতা ট্যাবলেট এবং একটি কাশির সিরাপ বের করেন।" },
      { de: "Ich frage ihn, wie oft ich diese Tabletten am Tag einnehmen soll.", en: "I ask him how often I should take these tablets per day.", bn: "আমি তাঁকে জিজ্ঞাসা করি দিনে কতবার আমার এই ট্যাবলেটগুলো খাওয়া উচিত।" },
      { de: "Er erklärt mir genau, dass ich morgens und abends jeweils eine Tablette nach dem Essen nehmen muss.", en: "He explains to me in detail that I must take one tablet each in the morning and evening after meals.", bn: "তিনি আমাকে বিস্তারিত বুঝিয়ে বলেন যে সকালে এবং সন্ধ্যায় খাবারের পর একটি করে ট্যাবলেট খেতে হবে।" },
      { de: "Außerdem empfiehlt er mir, den Hustensaft vor dem Schlafengehen zu trinken, damit ich besser schlafen kann.", en: "In addition, he recommends that I drink the cough syrup before going to sleep so that I can sleep better.", bn: "এছাড়া তিনি ঘুমাতে যাওয়ার আগে কাশির সিরাপটি পান করার পরামর্শ দেন, যাতে আমি ভালোভাবে ঘুমাতে পারি।" },
      { de: "Da ich auch ein leichtes Nasenspray ohne Rezept brauche, kaufe ich dieses noch dazu.", en: "Since I also need a mild nasal spray without a prescription, I buy this in addition.", bn: "যেহেতু প্রেসক্রিপশন ছাড়া আমার একটি হালকা নাকের স্প্রে-ও প্রয়োজন, তাই আমি সেটিও সাথে কিনে নিই।" },
      { de: "Der Apotheker schreibt die genaue Dosierung zur Sicherheit direkt auf die Verpackung.", en: "To be safe, the pharmacist writes the exact dosage directly onto the packaging.", bn: "নিরাপত্তার জন্য ফার্মাসিস্ট সরাসরি প্যাকেটের গায়ে সঠিক মাত্রা লিখে দেন।" },
      { de: "An der Kasse bezahle ich nur die gesetzliche Zuzahlung von fünf Euro für das Rezept.", en: "At the checkout I only pay the statutory co-payment of five euros for the prescription.", bn: "ক্যাশ কাউন্টারে আমি প্রেসক্রিপশনের জন্য মাত্র পাঁচ ইউরো সরকারি নির্ধারিত ফি পরিশোধ করি।" },
      { de: "Mit der kleinen Tüte gehe ich nach Hause und lege mich sofort ins Bett.", en: "With the small bag I go home and immediately go to bed.", bn: "ছোট ব্যাগটি নিয়ে আমি বাড়ি ফিরি এবং সাথে সাথেই বিছানায় শুয়ে পড়ি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-12",
    level: "A2",
    category: "Infinitive Clauses with zu (including Separable Verbs)",
    titleDe: "12. Gesunde Gewohnheiten",
    titleEn: "Healthy Habits",
    titleBn: "স্বাস্থ্যকর অভ্যাস",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Seit diesem Jahr versuche ich, viel gesünder zu leben.", en: "Since this year I have been trying to live much healthier.", bn: "এ বছর থেকে আমি আরও অনেক স্বাস্থ্যকরভাবে জীবনযাপন করার চেষ্টা করছি।" },
      { de: "Es ist nicht immer einfach, im Alltag genug Sport zu treiben.", en: "It is not always easy to do enough sports in everyday life.", bn: "দৈনন্দিন জীবনে পর্যাপ্ত খেলাধুলা বা ব্যায়াম করা সবসময় সহজ নয়।" },
      { de: "Trotzdem habe ich mir vorgenommen, dreimal pro Woche joggen zu gehen.", en: "Nevertheless, I have resolved to go jogging three times a week.", bn: "তবুও আমি সপ্তাহে তিনবার জগিং করতে যাওয়ার সংকল্প করেছি।" },
      { de: "Morgens ist es wichtig, gesund zu frühstücken und viel Wasser zu trinken.", en: "In the morning it is important to have a healthy breakfast and drink a lot of water.", bn: "সকালে স্বাস্থ্যকর নাস্তা করা এবং প্রচুর পানি পান করা গুরুত্বপূর্ণ।" },
      { de: "Ich habe aufgehört, abends spät noch süße Sachen zu essen.", en: "I have stopped eating sweet things late in the evening.", bn: "আমি গভীর রাতে মিষ্টি জাতীয় খাবার খাওয়া বন্ধ করে দিয়েছি।" },
      { de: "Stattdessen macht es mir Spaß, frisches Gemüse selbst zu kochen.", en: "Instead, I enjoy cooking fresh vegetables myself.", bn: "এর পরিবর্তে নিজে তাজা শাকসবজি রান্না করতে আমার ভালো লাগে।" },
      { de: "Mein Arzt hat mir empfohlen, auch regelmäßig an der frischen Luft spazieren zu gehen.", en: "My doctor recommended to me to also go for walks regularly in the fresh air.", bn: "আমার ডাক্তার আমাকে নিয়মিত তাজা বাতাসে হাঁটতে যাওয়ার পরামর্শ দিয়েছেন।" },
      { de: "Außerdem versuche ich, am Wochenende früher aufzustehen und nicht so lange fernzusehen.", en: "In addition, I try to get up earlier on the weekend and not watch TV for so long.", bn: "তাছাড়া আমি সপ্তাহান্তে তাড়াতাড়ি ঘুম থেকে ওঠার এবং বেশিক্ষণ টিভি না দেখার চেষ্টা করি।" },
      { de: "Ich merke schon, wie gut es tut, mehr auf meine Gesundheit zu achten.", en: "I already notice how good it feels to pay more attention to my health.", bn: "আমি ইতিমধ্যেই বুঝতে পারছি নিজের স্বাস্থ্যের প্রতি বেশি যত্ন নেওয়া কতটা ভালো লাগে।" },
      { de: "Es lohnt sich wirklich, diese guten Gewohnheiten beizubehalten.", en: "It is really worth maintaining these good habits.", bn: "এই ভালো অভ্যাসগুলো বজায় রাখা সত্যিই সার্থক।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-13",
    level: "A2",
    category: "Relative Clauses (der, die, das, den, dem)",
    titleDe: "13. Neue Bekanntschaften im Kurs",
    titleEn: "New Acquaintances in Class",
    titleBn: "ক্লাসে নতুন পরিচিতি",
    readingTimeMinutes: 3,
    sentences: [
      { de: "In meinem A2-Kurs gibt es viele interessante Menschen aus aller Welt.", en: "In my A2 course there are many interesting people from all over the world.", bn: "আমার এ২ কোর্সে সারা বিশ্ব থেকে আসা অনেক আকর্ষণীয় মানুষ রয়েছে।" },
      { de: "Das ist Maria, die aus Brasilien kommt und sehr gut tanzen kann.", en: "That is Maria, who comes from Brazil and can dance very well.", bn: "এই হলো মারিয়া, যে ব্রাজিল থেকে এসেছে এবং খুব ভালো নাচতে পারে।" },
      { de: "Neben ihr sitzt Ahmed, der in seinem Heimatland als Ingenieur gearbeitet hat.", en: "Next to her sits Ahmed, who worked as an engineer in his home country.", bn: "তার পাশে বসে আছে আহমেদ, যে তার নিজের দেশে একজন প্রকৌশলী হিসেবে কাজ করেছে।" },
      { de: "Der Lehrer, den wir alle sehr mögen, erklärt die Grammatik immer mit Humor.", en: "The teacher, whom we all like very much, always explains grammar with humor.", bn: "শিক্ষক, যাঁকে আমরা সবাই খুব পছন্দ করি, তিনি সবসময় রসিকতার সাথে ব্যাকরণ বোঝান।" },
      { de: "Das Buch, das wir im Unterricht benutzen, hat viele spannende Texte.", en: "The book that we use in class has many exciting texts.", bn: "আমরা ক্লাসে যে বইটি ব্যবহার করি, সেটিতে অনেক রোমাঞ্চকর লেখা আছে।" },
      { de: "Gestern habe ich mit einer Studentin gesprochen, der ich bei den Hausaufgaben geholfen habe.", en: "Yesterday I spoke with a female student whom I helped with homework.", bn: "গতকাল আমি একজন ছাত্রীর সাথে কথা বলেছি, যাকে আমি বাড়ির কাজে সাহায্য করেছিলাম।" },
      { de: "Wir haben ein Café besucht, das direkt gegenüber unserer Sprachschule liegt.", en: "We visited a café that is located right across from our language school.", bn: "আমরা একটি ক্যাফেতে গিয়েছিলাম, যা আমাদের ভাষা স্কুলের ঠিক বিপরীতে অবস্থিত।" },
      { de: "Der Kuchen, den ich dort bestellt habe, war unglaublich lecker.", en: "The cake that I ordered there was unbelievably delicious.", bn: "আমি সেখানে যে কেকটি অর্ডার করেছিলাম, সেটি অবিশ্বাস্যরকম সুস্বাদু ছিল।" },
      { de: "Es ist toll, Freunde zu haben, mit denen man auf Deutsch reden kann.", en: "It is great to have friends with whom one can talk in German.", bn: "এমন বন্ধু থাকা দারুণ ব্যাপার, যাদের সাথে জার্মান ভাষায় কথা বলা যায়।" },
      { de: "Solche Begegnungen machen das Lernen zu einem echten Vergnügen.", en: "Such encounters turn learning into a real pleasure.", bn: "এই ধরনের পরিচয় শেখাকে এক প্রকৃত আনন্দে পরিণত করে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-14",
    level: "A2",
    category: "Future Tense (Futur I with werden)",
    titleDe: "14. Pläne für das nächste Jahr",
    titleEn: "Plans for Next Year",
    titleBn: "আগামী বছরের পরিকল্পনা",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Das aktuelle Jahr geht bald zu Ende und ich habe große Pläne.", en: "The current year is coming to an end soon and I have big plans.", bn: "বর্তমান বছরটি শীঘ্রই শেষ হতে চলেছে এবং আমার বড় পরিকল্পনা রয়েছে।" },
      { de: "Im Januar werde ich die A2-Prüfung am Goethe-Institut ablegen.", en: "In January I will take the A2 exam at the Goethe-Institut.", bn: "জানুয়ারিতে আমি গোয়েথে-ইনস্টিটিউটে এ২ পরীক্ষা দেব।" },
      { de: "Danach werde ich sofort mit dem B1-Kurs weitermachen.", en: "Afterward I will immediately continue with the B1 course.", bn: "এরপর আমি সাথে সাথেই বি১ কোর্স শুরু করব।" },
      { de: "Im Frühling wird meine Frau endlich ihr Visum bekommen und nach Frankfurt fliegen.", en: "In spring my wife will finally receive her visa and fly to Frankfurt.", bn: "বসন্তকালে আমার স্ত্রী অবশেষে তার ভিসা পাবে এবং বিমানে ফ্রাঙ্কফুর্টে আসবে।" },
      { de: "Wir werden zusammen eine größere Wohnung in der Nähe vom Park suchen.", en: "Together we will look for a bigger apartment near the park.", bn: "আমরা একসাথে পার্কের কাছে একটি বড় ফ্ল্যাট খুঁজব।" },
      { de: "Im Sommer werden wir gemeinsam unsere ersten Ferien in Europa machen.", en: "In summer we will take our first vacation in Europe together.", bn: "গ্রীষ্মকালে আমরা একসাথে ইউরোপে আমাদের প্রথম ছুটি কাটাব।" },
      { de: "Außerdem werde ich mich im Herbst für ein Praktikum bei einer IT-Firma bewerben.", en: "In addition, I will apply for an internship at an IT company in autumn.", bn: "তাছাড়া শরৎকালে আমি একটি আইটি কোম্পানিতে ইন্টার্নশিপের জন্য আবেদন করব।" },
      { de: "Mein Bruder wird uns im Dezember besuchen und Weihnachten mit uns feiern.", en: "My brother will visit us in December and celebrate Christmas with us.", bn: "আমার ভাই ডিসেম্বরে আমাদের দেখতে আসবে এবং আমাদের সাথে বড়দিন উদযাপন করবে।" },
      { de: "Ich weiß, dass ich im nächsten Jahr viel arbeiten und lernen muss.", en: "I know that I will have to work and study a lot next year.", bn: "আমি জানি যে আগামী বছর আমাকে প্রচুর কাজ করতে এবং পড়াশোনা করতে হবে।" },
      { de: "Trotzdem bin ich optimistisch, dass alles gut klappen wird.", en: "Nevertheless, I am optimistic that everything will work out well.", bn: "তবুও আমি আশাবাদী যে সবকিছু ভালোভাবেই সম্পন্ন হবে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-15",
    level: "A2",
    category: "Verbs with Prepositions & wo(r)- / da(r)-",
    titleDe: "15. Träume und Wünsche",
    titleEn: "Dreams and Wishes",
    titleBn: "স্বপ্ন এবং ইচ্ছা",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Jeder Mensch träumt von einer glücklichen und erfolgreichen Zukunft.", en: "Every person dreams of a happy and successful future.", bn: "প্রতিটি মানুষই একটি সুখী এবং সফল ভবিষ্যতের স্বপ্ন দেখে।" },
      { de: "Ich denke oft darüber nach, wie mein Leben in fünf Jahren aussehen wird.", en: "I often think about what my life will look like in five years.", bn: "আমি প্রায়ই ভাবি যে পাঁচ বছর পর আমার জীবন কেমন দেখাবে।" },
      { de: "Meine Freunde fragen mich manchmal: „Wofür interessierst du dich am meisten?“", en: "My friends sometimes ask me: \"What are you most interested in?\"", bn: "আমার বন্ধুরা মাঝে মাঝে আমাকে জিজ্ঞাসা করে: \"তুমি কোন বিষয়ে সবচেয়ে বেশি আগ্রহী?\"" },
      { de: "Ich antworte dann, dass ich mich besonders für Softwareentwicklung begeistere.", en: "I then answer that I am particularly enthusiastic about software development.", bn: "আমি তখন উত্তর দিই যে আমি বিশেষ করে সফটওয়্যার ডেভেলপমেন্ট নিয়ে উৎসাহী।" },
      { de: "Gerade warte ich auf eine wichtige Antwort von einer Firma in Frankfurt.", en: "Right now I am waiting for an important answer from a company in Frankfurt.", bn: "এই মুহূর্তে আমি ফ্রাঙ্কফুর্টের একটি কোম্পানির কাছ থেকে একটি গুরুত্বপূর্ণ উত্তরের জন্য অপেক্ষা করছি।" },
      { de: "Ich habe mich dort um eine Stelle als Werkstudent beworben.", en: "I applied there for a position as a working student.", bn: "আমি সেখানে একজন ওয়ার্কিং স্টুডেন্ট পদের জন্য আবেদন করেছি।" },
      { de: "Meine Familie unterstützt mich und freut sich sehr darüber, dass ich so motiviert bin.", en: "My family supports me and is very happy about the fact that I am so motivated.", bn: "আমার পরিবার আমাকে সমর্থন করে এবং আমি যে এতটা অনুপ্রাণিত তা নিয়ে তারা খুব খুশি।" },
      { de: "Manchmal ärgere ich mich zwar über die schwierige deutsche Bürokratie.", en: "Sometimes I admittedly get annoyed about the difficult German bureaucracy.", bn: "মাঝে মাঝে আমি অবশ্য জটিল জার্মান আমলাতন্ত্র নিয়ে বিরক্ত হই।" },
      { de: "Aber ich glaube fest daran, dass sich meine Geduld am Ende lohnt.", en: "But I firmly believe that my patience will pay off in the end.", bn: "কিন্তু আমি দৃঢ়ভাবে বিশ্বাস করি যে শেষ পর্যন্ত আমার ধৈর্যের ফল পাওয়া যাবে।" },
      { de: "Worauf freust du dich in deiner Zukunft am meisten?", en: "What are you looking forward to most in your future?", bn: "তোমার ভবিষ্যতে তুমি কোন বিষয়টির জন্য সবচেয়ে বেশি অপেক্ষা করছ?" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-16",
    level: "A2",
    category: "Demonstrative Pronouns (dieser, welcher, derselbe)",
    titleDe: "16. Welches Smartphone ist besser?",
    titleEn: "Which Smartphone Is Better?",
    titleBn: "কোন স্মার্টফোনটি ভালো?",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Mein altes Handy hat einen kaputten Bildschirm und der Akku hält nicht mehr lange.", en: "My old mobile phone has a broken screen and the battery does not last long anymore.", bn: "আমার পুরনো মোবাইল ফোনটির স্ক্রিন ভেঙে গেছে এবং ব্যাটারিও আর বেশিক্ষণ থাকে না।" },
      { de: "Deshalb vergleiche ich im Internet verschiedene neue Modelle.", en: "Therefore I am comparing various new models on the internet.", bn: "তাই আমি ইন্টারনেটে বিভিন্ন নতুন মডেলের তুলনা করছি।" },
      { de: "Mein Freund fragt mich: „Welches Smartphone möchtest du dir denn kaufen?“", en: "My friend asks me: \"Which smartphone would you like to buy, then?\"", bn: "আমার বন্ধু আমাকে জিজ্ঞাসা করে: \"তা তুমি কোন স্মার্টফোনটি কিনতে চাও?\"" },
      { de: "Ich zeige auf mein Tablet und sage: „Dieses Modell hier hat eine fantastische Kamera.“", en: "I point to my tablet and say: \"This model here has a fantastic camera.\"", bn: "আমি আমার ট্যাবলেটের দিকে ইশারা করে বলি: \"এই মডেলটির ক্যামেরা অসাধারণ।\"" },
      { de: "Allerdings gefällt mir auch jenes Gerät dort wegen des größeren Speichers.", en: "However, I also like that device over there because of the larger storage.", bn: "তবে বেশি স্টোরেজের কারণে ওই ডিভাইসটিও আমার পছন্দ হয়েছে।" },
      { de: "Welcher Preis ist für ein gutes Telefon eigentlich angemessen?", en: "Which price is actually reasonable for a good phone?", bn: "একটি ভালো ফোনের জন্য আসলে কোন দামটি যুক্তিসঙ্গত?" },
      { de: "Mein Freund hat genau dasselbe Handy wie mein Bruder und ist sehr zufrieden damit.", en: "My friend has the exact same mobile phone as my brother and is very satisfied with it.", bn: "আমার বন্ধুর কাছে আমার ভাইয়ের মতো ঠিক একই ফোন আছে এবং সে এটি নিয়ে খুব সন্তুষ্ট।" },
      { de: "Er sagt: „Mit diesem Telefon kannst du auch bei Nacht tolle Fotos machen.“", en: "He says: \"With this phone you can also take great photos at night.\"", bn: "সে বলে: \"এই ফোন দিয়ে তুমি রাতেও দারুণ ছবি তুলতে পারবে।\"" },
      { de: "Am Ende entscheide ich mich für das Modell mit dem besseren Akku.", en: "In the end I decide on the model with the better battery.", bn: "শেষ পর্যন্ত আমি ভালো ব্যাটারিসহ মডেলটিই বেছে নিই।" },
      { de: "Dieses neue Gerät wird mir im Alltag sicher eine große Hilfe sein.", en: "This new device will surely be a great help to me in everyday life.", bn: "এই নতুন ডিভাইসটি দৈনন্দিন জীবনে নিশ্চিতভাবেই আমার জন্য অনেক সহায়ক হবে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-17",
    level: "A2",
    category: "Genitive Preposition wegen, Konjunktiv II & Complaints",
    titleDe: "17. Umtausch und Reklamation im Geschäft",
    titleEn: "Returning & Exchanging a Defective Item",
    titleBn: "দোকানে পণ্য পরিবর্তন ও অভিযোগ",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Letzte Woche habe ich mir in einem Kaufhaus eine neue Kaffeemaschine gekauft.", en: "Last week I bought myself a new coffee machine at a department store.", bn: "গত সপ্তাহে আমি একটি ডিপার্টমেন্টাল স্টোর থেকে নিজের জন্য একটি নতুন কফি মেশিন কিনেছিলাম।" },
      { de: "Leider funktionierte das Gerät schon nach zwei Tagen nicht mehr richtig.", en: "Unfortunately, after just two days the device no longer worked properly.", bn: "দুর্ভাগ্যবশত মাত্র দুই দিন পরেই যন্ত্রটি আর ঠিকমতো কাজ করছিল না।" },
      { de: "Deshalb gehe ich heute mit der Originalverpackung und dem Kassenbon zurück ins Geschäft.", en: "Therefore I go back to the store today with the original packaging and the receipt.", bn: "তাই আজ আমি আসল প্যাকেট এবং রসিদ (Kassenbon) নিয়ে দোকানে ফিরে যাই।" },
      { de: "Am Kundenservice-Schalter erkläre ich dem Mitarbeiter höflich mein Problem.", en: "At the customer service desk I politely explain my problem to the employee.", bn: "কাস্টমার সার্ভিস কাউন্টারে আমি কর্মচারীকে ভদ্রভাবে আমার সমস্যার কথা খুলে বলি।" },
      { de: "Ich sage: „Guten Tag, ich möchte diese Kaffeemaschine wegen eines technischen Defekts umtauschen.“", en: "I say: \"Good day, I would like to exchange this coffee machine because of a technical defect.\"", bn: "আমি বলি: \"শুভ দিন, যান্ত্রিক ত্রুটির কারণে আমি এই কফি মেশিনটি পরিবর্তন করতে চাই।\"" },
      { de: "Der Mitarbeiter prüft den Kassenbon und schaut sich das Gerät genau an.", en: "The employee checks the receipt and looks closely at the device.", bn: "কর্মচারী রসিদটি পরীক্ষা করেন এবং যন্ত্রটি ভালোভাবে দেখেন।" },
      { de: "Er entschuldigt sich für die Unannehmlichkeiten und fragt, ob ich ein neues Gerät möchte.", en: "He apologizes for the inconvenience and asks whether I would like a new device.", bn: "তিনি অসুবিধার জন্য দুঃখ প্রকাশ করেন এবং জিজ্ঞাসা করেন আমি একটি নতুন যন্ত্র চাই কিনা।" },
      { de: "Da ich diese Marke sehr mag, nehme ich gerne eine neue Maschine mit.", en: "Since I like this brand very much, I gladly take a new machine with me.", bn: "যেহেতু আমি এই ব্র্যান্ডটি খুব পছন্দ করি, তাই আমি আনন্দের সাথে একটি নতুন মেশিন নিই।" },
      { de: "Falls auch dieses Gerät kaputt wäre, könnte ich mein Geld zurückbekommen.", en: "If this device were broken too, I could get my money back.", bn: "যদি এই যন্ত্রটিও নষ্ট হতো, তবে আমি আমার টাকা ফেরত পেতে পারতাম।" },
      { de: "Zu Hause probiere ich die neue Kaffeemaschine sofort aus und sie funktioniert einwandfrei.", en: "At home I immediately try out the new coffee machine and it works flawlessly.", bn: "বাড়িতে ফিরে আমি সাথে সাথেই নতুন কফি মেশিনটি চালিয়ে দেখি এবং এটি নিখুঁতভাবে কাজ করছে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-18",
    level: "A2",
    category: "Extended Time Prepositions (seit, vor, für, ab, über)",
    titleDe: "18. Eine Zeitreise durch mein Leben",
    titleEn: "A Time Travel Through My Life",
    titleBn: "আমার জীবনের সময়ের ভ্রমণ",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Vor genau zwei Jahren habe ich meinen Koffer gepackt und bin nach Deutschland geflogen.", en: "Exactly two years ago I packed my suitcase and flew to Germany.", bn: "ঠিক দুই বছর আগে আমি আমার স্যুটকেস গুছিয়ে বিমানে জার্মানিতে এসেছিলাম।" },
      { de: "Seit diesem Tag hat sich mein ganzes Leben stark verändert.", en: "Since that day my entire life has changed significantly.", bn: "সেই দিন থেকে আমার পুরো জীবন অনেক বদলে গেছে।" },
      { de: "In den ersten Monaten musste ich für meine Prüfungen sehr hart lernen.", en: "In the first months I had to study very hard for my exams.", bn: "প্রথম মাসগুলোতে আমাকে পরীক্ষার জন্য খুব কঠোর পড়াশোনা করতে হয়েছিল।" },
      { de: "Vor sechs Monaten habe ich endlich meine erste Stelle als Werkstudent gefunden.", en: "Six months ago I finally found my first position as a working student.", bn: "ছয় মাস আগে অবশেষে আমি ওয়ার্কিং স্টুডেন্ট হিসেবে আমার প্রথম চাকরি খুঁজে পেয়েছি।" },
      { de: "Seit einem halben Jahr arbeite ich nun zwanzig Stunden pro Woche im IT-Bereich.", en: "For half a year now I have been working twenty hours per week in the IT sector.", bn: "ছয় মাস ধরে আমি এখন আইটি খাতে প্রতি সপ্তাহে বিশ ঘণ্টা কাজ করছি।" },
      { de: "Ab nächstem Monat übernehme ich sogar ein eigenes kleines Projekt im Team.", en: "Starting next month I will even take over my own small project in the team.", bn: "আগামী মাস থেকে আমি এমনকি দলে আমার নিজের একটি ছোট প্রকল্পের দায়িত্ব নেব।" },
      { de: "Mein Arbeitsvertrag läuft zunächst für ein weiteres Jahr.", en: "My employment contract initially runs for another year.", bn: "আমার চাকরির চুক্তি প্রাথমিকভাবে আরও এক বছরের জন্য চলবে।" },
      { de: "Über das Wochenende fahre ich oft nach Köln, um meinen Cousin zu besuchen.", en: "Over the weekend I often travel to Cologne to visit my cousin.", bn: "সপ্তাহান্তে আমি প্রায়ই আমার কাজিনের সাথে দেখা করতে কোলনে যাই।" },
      { de: "Vor einer Woche haben wir zusammen ein tolles Fußballspiel im Stadion gesehen.", en: "One week ago we watched a great football match together in the stadium.", bn: "এক সপ্তাহ আগে আমরা স্টেডিয়ামে একসাথে একটি দারুণ ফুটবল খেলা দেখেছি।" },
      { de: "Ab morgen beginnt für mich wieder eine neue, spannende Arbeitswoche.", en: "Starting tomorrow a new, exciting workweek begins for me again.", bn: "আগামীকাল থেকে আমার জন্য আবার একটি নতুন, রোমাঞ্চকর কর্মসপ্তাহ শুরু হচ্ছে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-19",
    level: "A2",
    category: "Local Prepositions (nach, zu, in, an, auf, aus, von)",
    titleDe: "19. Ein Wochenende in den Bergen",
    titleEn: "A Weekend in the Mountains",
    titleBn: "পাহাড়ে একটি সপ্তাহান্ত",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Am Freitagabend sind wir mit dem Auto aus Frankfurt in Richtung Süden gestartet.", en: "On Friday evening we set off by car from Frankfurt heading south.", bn: "শুক্রবার সন্ধ্যায় আমরা গাড়ি নিয়ে ফ্রাঙ্কফুর্ট থেকে দক্ষিণের দিকে রওনা দিয়েছিলাম।" },
      { de: "Unser Ziel war ein kleines Dorf in den bayerischen Alpen.", en: "Our destination was a small village in the Bavarian Alps.", bn: "আমাদের গন্তব্য ছিল বাভারিয়ান আল্পসের একটি ছোট গ্রাম।" },
      { de: "Nach vier Stunden Fahrt sind wir endlich im Hotel angekommen.", en: "After a four-hour drive we finally arrived at the hotel.", bn: "চার ঘণ্টা গাড়ি চালানোর পর অবশেষে আমরা হোটেলে পৌঁছালাম।" },
      { de: "Am Samstagmorgen sind wir früh auf einen hohen Berg gewandert.", en: "On Saturday morning we hiked early up a high mountain.", bn: "শনিবার সকালে আমরা ভোরে একটি উঁচু পাহাড়ে হাইকিং করতে উঠলাম।" },
      { de: "Oben auf dem Gipfel hatte man einen fantastischen Blick über das Tal.", en: "Up on the summit one had a fantastic view over the valley.", bn: "চূড়ার ওপরে দাঁড়িয়ে উপত্যকার এক অসাধারণ দৃশ্য দেখা যাচ্ছিল।" },
      { de: "Danach sind wir an einen klaren Bergsee gefahren und haben dort Pause gemacht.", en: "Afterward we drove to a clear mountain lake and took a break there.", bn: "এরপর আমরা একটি স্বচ্ছ পাহাড়ি হ্রদের ধারে গেলাম এবং সেখানে বিরতি নিলাম।" },
      { de: "Am Nachmittag sind wir noch zu einem traditionellen Bauernhof gegangen.", en: "In the afternoon we also walked to a traditional farm.", bn: "বিকেলে আমরা একটি ঐতিহ্যবাহী খামারেও গিয়েছিলাম।" },
      { de: "Dort haben wir frischen Käse direkt vom Bauern gekauft.", en: "There we bought fresh cheese directly from the farmer.", bn: "সেখানে আমরা সরাসরি কৃষকের কাছ থেকে তাজা পনির কিনেছিলাম।" },
      { de: "Am Sonntagabend sind wir glücklich wieder nach Hause zurückgekehrt.", en: "On Sunday evening we happily returned home again.", bn: "রবিবার সন্ধ্যায় আমরা আনন্দের সাথে আবার বাড়ি ফিরে এলাম।" },
      { de: "Dieser Ausflug in die Berge war die perfekte Erholung für uns.", en: "This trip into the mountains was the perfect relaxation for us.", bn: "পাহাড়ের এই ভ্রমণটি আমাদের জন্য নিখুঁত বিশ্রাম ছিল।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-20",
    level: "A2",
    category: "Indefinite Pronouns (man, jemand, niemand, etwas, nichts, alles)",
    titleDe: "20. Niemand weiß alles",
    titleEn: "Nobody Knows Everything",
    titleBn: "কেউই সবকিছু জানে না",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Wenn man in ein neues Land zieht, ist am Anfang alles ungewohnt.", en: "When one moves to a new country, everything is unfamiliar at the beginning.", bn: "মানুষ যখন একটি নতুন দেশে চলে যায়, তখন শুরুতে সবকিছুই অপরিচিত লাগে।" },
      { de: "Manchmal versteht man etwas nicht und braucht Hilfe von anderen Menschen.", en: "Sometimes one does not understand something and needs help from other people.", bn: "মাঝে মাঝে মানুষ কোনো কিছু বুঝতে পারে না এবং অন্য মানুষের সাহায্যের প্রয়োজন হয়।" },
      { de: "Zum Glück findet man fast immer jemand, der freundlich den Weg erklärt.", en: "Fortunately one almost always finds someone who kindly explains the way.", bn: "সৌভাগ্যবশত প্রায় সবসময়ই এমন কাউকে পাওয়া যায় যে আন্তরিকভাবে পথ দেখিয়ে দেয়।" },
      { de: "Niemand kann eine fremde Sprache in nur wenigen Wochen perfekt lernen.", en: "Nobody can learn a foreign language perfectly in just a few weeks.", bn: "কেউই মাত্র কয়েক সপ্তাহের মধ্যে একটি বিদেশি ভাষা নিখুঁতভাবে শিখতে পারে না।" },
      { de: "Aber wenn man jeden Tag etwas übt, macht man schnell Fortschritte.", en: "But if one practices something every day, one makes rapid progress.", bn: "কিন্তু প্রতিদিন কিছু না কিছু অনুশীলন করলে দ্রুত উন্নতি করা যায়।" },
      { de: "Gestern hat mir jemand im Zug ein interessantes Buch empfohlen.", en: "Yesterday someone on the train recommended an interesting book to me.", bn: "গতকাল ট্রেনে কেউ একজন আমাকে একটি আকর্ষণীয় বই পড়ার পরামর্শ দিয়েছিল।" },
      { de: "Ich habe nichts Besseres zu tun gehabt und habe sofort angefangen zu lesen.", en: "I had nothing better to do and immediately started reading.", bn: "আমার করার মতো ভালো কিছু ছিল না এবং আমি সাথে সাথেই পড়া শুরু করেছিলাম।" },
      { de: "In diesem Buch lernt man alles Wichtige über die deutsche Kultur.", en: "In this book one learns everything important about German culture.", bn: "এই বইটিতে জার্মান সংস্কৃতি সম্পর্কে গুরুত্বপূর্ণ সবকিছু জানা যায়।" },
      { de: "Am Ende merkt man, dass niemand Angst vor Fehlern haben muss.", en: "In the end one notices that nobody needs to be afraid of mistakes.", bn: "শেষ পর্যন্ত বোঝা যায় যে ভুল করার ভয় কারোই পাওয়া উচিত নয়।" },
      { de: "Jeder hat einmal klein angefangen und Schritt für Schritt dazugelernt.", en: "Everyone once started small and learned more step by step.", bn: "সবাই একসময় ছোট থেকেই শুরু করেছিল এবং ধাপে ধাপে শিখেছে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-21",
    level: "A2",
    category: "Education Vocabulary, Passive Basics & Subordinate Clauses",
    titleDe: "21. Schule und Ausbildung in Deutschland",
    titleEn: "School and Vocational Training in Germany",
    titleBn: "জার্মানিতে স্কুল এবং বৃত্তিমূলক প্রশিক্ষণ",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Das Schulsystem in Deutschland ist für viele Neuankömmlinge zunächst etwas kompliziert.", en: "The school system in Germany is at first somewhat complicated for many newcomers.", bn: "জার্মানির স্কুল ব্যবস্থা অনেক নবাগতদের কাছে শুরুতে কিছুটা জটিল মনে হয়।" },
      { de: "Nach der Grundschule wechseln die Kinder je nach ihren Noten auf verschiedene weiterführende Schulen.", en: "After elementary school, children transfer to different secondary schools depending on their grades.", bn: "প্রাথমিক বিদ্যালয়ের পর শিশুরা তাদের ফলাফলের ওপর ভিত্তি করে বিভিন্ন মাধ্যমিক বিদ্যালয়ে যায়।" },
      { de: "Wer studieren möchte, besucht meistens das Gymnasium und macht dort das Abitur.", en: "Those who want to study at a university mostly attend the Gymnasium and take the Abitur there.", bn: "যারা বিশ্ববিদ্যালয়ে পড়াশোনা করতে চায়, তারা সাধারণত জিমনেসিয়ামে (Gymnasium) পড়ে এবং সেখানে আবিটুর (Abitur) পরীক্ষা দেয়।" },
      { de: "Viele junge Leute entscheiden sich aber auch für eine duale Ausbildung.", en: "However, many young people also decide on a dual vocational training program.", bn: "তবে অনেক তরুণ-তরুণী দ্বৈত বৃত্তিমূলক প্রশিক্ষণও (Ausbildung) বেছে নেয়।" },
      { de: "Bei einer Ausbildung lernt man zwei Tage pro Woche in der Berufsschule und arbeitet drei Tage im Betrieb.", en: "In a vocational training program, one learns two days a week at vocational school and works three days at a company.", bn: "এই প্রশিক্ষণে সপ্তাহে দুই দিন ভোকেশনাল স্কুলে পড়াশোনা করতে হয় এবং তিন দিন কোম্পানিতে কাজ করতে হয়।" },
      { de: "Gestern war mein Cousin auf einem Elternabend in der Schule seines Sohnes.", en: "Yesterday my cousin attended a parents' evening at his son's school.", bn: "গতকাল আমার কাজিন তার ছেলের স্কুলে অভিভাবক সভায় (Elternabend) গিয়েছিল।" },
      { de: "Dort hat die Klassenlehrerin erklärt, welche Fächer in diesem Schuljahr besonders wichtig sind.", en: "There the homeroom teacher explained which subjects are particularly important in this school year.", bn: "সেখানে শ্রেণিশিক্ষিকা বুঝিয়ে বলেছেন এই শিক্ষাবর্ষে কোন বিষয়গুলো বিশেষভাবে গুরুত্বপূর্ণ।" },
      { de: "Außerdem haben die Eltern gemeinsam den nächsten Klassenausflug geplant.", en: "In addition, the parents jointly planned the next class trip.", bn: "এছাড়া অভিভাবকরা মিলে পরবর্তী ক্লাস পিকনিকের পরিকল্পনা করেছেন।" },
      { de: "Mein Cousin findet es gut, dass die Lehrer so eng mit den Eltern zusammenarbeiten.", en: "My cousin thinks it is good that the teachers cooperate so closely with the parents.", bn: "আমার কাজিনের কাছে এটি ভালো লাগে যে শিক্ষকরা অভিভাবকদের সাথে এত ঘনিষ্ঠভাবে কাজ করেন।" },
      { de: "Eine gute Bildung und Ausbildung sind in Deutschland der beste Weg zu einem sicheren Arbeitsplatz.", en: "A good education and vocational training are the best path to a secure job in Germany.", bn: "জার্মানিতে একটি ভালো শিক্ষা এবং প্রশিক্ষণ হলো নিরাপদ চাকরির সবচেয়ে ভালো পথ।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-22",
    level: "A2",
    category: "Real-World A2 Scenario (Housing & Viewing)",
    titleDe: "22. Wohnungssuche in Frankfurt",
    titleEn: "Apartment Hunting in Frankfurt",
    titleBn: "ফ্রাঙ্কফুর্টে ফ্ল্যাট খোঁজা",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Eine bezahlbare Wohnung in Frankfurt zu finden, ist momentan eine große Herausforderung.", en: "Finding an affordable apartment in Frankfurt is currently a big challenge.", bn: "ফ্রাঙ্কফুর্টে একটি সাশ্রয়ী মূল্যের ফ্ল্যাট খুঁজে পাওয়া বর্তমানে একটি বড় চ্যালেঞ্জ।" },
      { de: "Seit drei Wochen suche ich jeden Tag auf verschiedenen Immobilienportalen im Internet.", en: "For three weeks I have been searching every day on various real estate portals on the internet.", bn: "তিন সপ্তাহ ধরে আমি প্রতিদিন ইন্টারনেটে বিভিন্ন আবাসন পোর্টালে খুঁজছি।" },
      { de: "Viele Angebote sind leider zu teuer oder liegen weit außerhalb des Zentrums.", en: "Many offers are unfortunately too expensive or are located far outside the center.", bn: "দুর্ভাগ্যবশত অনেক অফারই খুব দামি অথবা শহরের কেন্দ্র থেকে অনেক দূরে অবস্থিত।" },
      { de: "Gestern habe ich endlich eine Einladung zu einer Besichtigung bekommen.", en: "Yesterday I finally received an invitation for a viewing.", bn: "গতকাল অবশেষে আমি একটি ফ্ল্যাট দেখার আমন্ত্রণ পেয়েছি।" },
      { de: "Die Zweizimmerwohnung liegt im dritten Stock und hat einen schönen Balkon.", en: "The two-room apartment is on the third floor and has a nice balcony.", bn: "দুই রুমের ফ্ল্যাটটি চতুর্থ তলায় (জার্মান নিয়মে ৩য় তলা) এবং এর একটি সুন্দর ব্যালকনি আছে।" },
      { de: "Als ich ankam, warteten schon zehn andere Interessenten vor der Haustür.", en: "When I arrived, ten other interested parties were already waiting in front of the front door.", bn: "আমি যখন পৌঁছালাম, তখন আরও দশজন আগ্রহী ব্যক্তি সদর দরজার সামনে অপেক্ষা করছিলেন।" },
      { de: "Die Vermieterin zeigte uns die hellen Zimmer und die moderne Einbauküche.", en: "The landlady showed us the bright rooms and the modern fitted kitchen.", bn: "বাড়িওয়ালি আমাদের আলোকিত ঘরগুলো এবং আধুনিক রান্নাঘরটি দেখালেন।" },
      { de: "Ich habe sofort meine Bewerbungsunterlagen und meine Gehaltsabrechnung abgegeben.", en: "I immediately handed in my application documents and my payslip.", bn: "আমি সাথে সাথেই আমার আবেদনের কাগজপত্র এবং বেতনের বিবরণী জমা দিয়েছি।" },
      { de: "Heute Morgen hat mich die Vermieterin angerufen und mir die Wohnung zugesagt!", en: "This morning the landlady called me and offered me the apartment!", bn: "আজ সকালে বাড়িওয়ালি আমাকে ফোন করেছেন এবং ফ্ল্যাটটি আমাকে দেওয়ার সম্মতি জানিয়েছেন!" },
      { de: "Ich bin überglücklich, weil ich nächste Woche schon den Mietvertrag unterschreiben kann.", en: "I am overjoyed because I can already sign the rental contract next week.", bn: "আমি ভীষণ আনন্দিত, কারণ আগামী সপ্তাহেই আমি ভাড়ার চুক্তিতে স্বাক্ষর করতে পারব।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-23",
    level: "A2",
    category: "Past Events (Perfekt & Präteritum Mix)",
    titleDe: "23. Ein Unfall mit dem Fahrrad",
    titleEn: "A Bicycle Accident",
    titleBn: "সাইকেল নিয়ে একটি দুর্ঘটনা",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Gestern Nachmittag ist mir auf dem Heimweg ein kleines Missgeschick passiert.", en: "Yesterday afternoon a small mishap happened to me on the way home.", bn: "গতকাল বিকেলে বাড়ি ফেরার পথে আমার সাথে একটি ছোট দুর্ঘটনা ঘটেছে।" },
      { de: "Ich fuhr mit meinem Fahrrad auf dem Radweg entlang des Parks.", en: "I was riding my bicycle on the bike path along the park.", bn: "আমি পার্কের পাশের সাইকেল লেন দিয়ে আমার সাইকেল চালাচ্ছিলাম।" },
      { de: "Plötzlich lief ein kleiner Hund direkt vor mein Vorderrad.", en: "Suddenly a small dog ran right in front of my front wheel.", bn: "হঠাৎ একটি ছোট কুকুর সরাসরি আমার সামনের চাকার সামনে চলে এল।" },
      { de: "Ich musste sofort stark bremsen, damit ich das Tier nicht verletzte.", en: "I had to brake hard immediately so that I would not injure the animal.", bn: "প্রাণীটি যাতে আঘাত না পায় সেজন্য আমাকে সাথে সাথেই জোরে ব্রেক করতে হলো।" },
      { de: "Dabei verlor ich das Gleichgewicht und fiel auf den Asphalt.", en: "In doing so, I lost my balance and fell onto the asphalt.", bn: "এতে আমি ভারসাম্য হারিয়ে পিচঢালা রাস্তায় পড়ে গেলাম।" },
      { de: "Zum Glück trug ich einen Helm, weshalb mein Kopf gut geschützt war.", en: "Fortunately I was wearing a helmet, which is why my head was well protected.", bn: "সৌভাগ্যবশত আমি হেলমেট পরেছিলাম, যে কারণে আমার মাথা ভালোভাবে সুরক্ষিত ছিল।" },
      { de: "Die Besitzerin des Hundes rannte sofort zu mir und half mir auf.", en: "The owner of the dog immediately ran to me and helped me up.", bn: "কুকুরটির মালিক সাথে সাথেই আমার কাছে ছুটে এলেন এবং আমাকে উঠে দাঁড়াতে সাহায্য করলেন।" },
      { de: "Sie entschuldigte sich vielmals und fragte, ob ich Schmerzen hätte.", en: "She apologized profusely and asked whether I was in pain.", bn: "তিনি বারবার ক্ষমা চাইলেন এবং জিজ্ঞাসা করলেন আমার কোনো ব্যথা লাগছে কিনা।" },
      { de: "Außer einem kleinen Kratzer am Knie war mir zum Glück nichts passiert.", en: "Apart from a small scratch on my knee, fortunately nothing had happened to me.", bn: "হাঁটুতে সামান্য আঁচড় লাগা ছাড়া সৌভাগ্যবশত আমার আর কিছু হয়নি।" },
      { de: "Trotzdem war ich froh, als ich endlich sicher zu Hause ankam.", en: "Nevertheless, I was glad when I finally arrived home safely.", bn: "তবুও আমি খুশি হয়েছিলাম যখন অবশেষে নিরাপদে বাড়ি পৌঁছালাম।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-24",
    level: "A2",
    category: "Polite Requests & Dative Objects",
    titleDe: "24. Nachbarschaftshilfe",
    titleEn: "Neighborhood Help",
    titleBn: "প্রতিবেশীদের পারস্পরিক সাহায্য",
    readingTimeMinutes: 3,
    sentences: [
      { de: "In unserem Wohnhaus verstehen sich alle Nachbarn wirklich ausgezeichnet.", en: "In our apartment building all neighbors get along really wonderfully.", bn: "আমাদের অ্যাপার্টমেন্ট ভবনে সব প্রতিবেশীর মধ্যে সম্পর্ক সত্যিই চমৎকার।" },
      { de: "Besonders Frau Weber, die im Erdgeschoss wohnt, ist immer sehr hilfsbereit.", en: "Especially Ms. Weber, who lives on the ground floor, is always very helpful.", bn: "বিশেষ করে নিচতলায় থাকা মিসেস ওয়েবার সবসময় খুব সাহায্য করেন।" },
      { de: "Als ich letzte Woche im Urlaub war, hat sie sich um meine Blumen gekümmert.", en: "When I was on vacation last week, she took care of my flowers.", bn: "গত সপ্তাহে আমি যখন ছুটিতে ছিলাম, তিনি আমার ফুলগাছগুলোর যত্ন নিয়েছিলেন।" },
      { de: "Außerdem hat sie jeden Tag meine Post aus dem Briefkasten geholt.", en: "In addition, she took my mail out of the mailbox every day.", bn: "তাছাড়া তিনি প্রতিদিন আমার ডাকবাক্স থেকে চিঠিপত্র তুলে রেখেছিলেন।" },
      { de: "Gestern hat sie mich gefragt, ob ich ihr mit ihrem neuen Fernseher helfen kann.", en: "Yesterday she asked me whether I can help her with her new television.", bn: "গতকাল তিনি আমাকে জিজ্ঞাসা করলেন যে আমি তাঁর নতুন টেলিভিশনটি ঠিক করতে সাহায্য করতে পারব কিনা।" },
      { de: "Die Fernbedienung funktionierte nicht und sie fand ihre Lieblingssendung nicht mehr.", en: "The remote control was not working and she could no longer find her favorite show.", bn: "রিমোট কন্ট্রোল কাজ করছিল না এবং তিনি তাঁর প্রিয় অনুষ্ঠানটি আর খুঁজে পাচ্ছিলেন না।" },
      { de: "Ich bin sofort hinuntergegangen und habe die Sender neu eingestellt.", en: "I went downstairs immediately and reset the channels.", bn: "আমি সাথে সাথেই নিচে গেলাম এবং চ্যানেলগুলো নতুন করে সেট করে দিলাম।" },
      { de: "Frau Weber war sehr dankbar und hat mir ein Stück selbstgebackenen Kuchen geschenkt.", en: "Ms. Weber was very grateful and gave me a piece of homemade cake.", bn: "মিসেস ওয়েবার খুব কৃতজ্ঞ হলেন এবং আমাকে নিজের তৈরি এক টুকরো কেক উপহার দিলেন।" },
      { de: "Es ist ein schönes Gefühl, wenn man sich auf seine Nachbarn verlassen kann.", en: "It is a nice feeling when one can rely on one's neighbors.", bn: "প্রতিবেশীদের ওপর ভরসা করতে পারাটা খুব সুন্দর একটি অনুভূতি।" },
      { de: "Gute Nachbarschaft macht das Leben in der Stadt viel angenehmer.", en: "Good neighborhood relations make life in the city much more pleasant.", bn: "ভালো প্রতিবেশী শহরের জীবনকে অনেক বেশি আনন্দময় করে তোলে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-25",
    level: "A2",
    category: "Formal German & Official Procedures",
    titleDe: "25. Ein Besuch im Bürgeramt",
    titleEn: "A Visit to the Citizens' Office",
    titleBn: "নাগরিক অফিসে (Bürgeramt) যাওয়া",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Wenn man in Deutschland umzieht, muss man seine neue Adresse anmelden.", en: "When one moves in Germany, one must register one's new address quickly.", bn: "জার্মানিতে কেউ বাসা বদল করলে দ্রুত তার নতুন ঠিকানা নিবন্ধন করতে হয়।" },
      { de: "Dafür braucht man zuerst einen Termin beim zuständigen Bürgeramt.", en: "For that one first needs an appointment at the responsible citizens' office.", bn: "এর জন্য প্রথমে সংশ্লিষ্ট নাগরিক অফিসে (Bürgeramt) একটি অ্যাপয়েন্টমেন্ট নিতে হয়।" },
      { de: "Ich habe meinen Termin schon vor zwei Wochen online gebucht.", en: "I booked my appointment online two weeks ago.", bn: "আমি দুই সপ্তাহ আগেই অনলাইনে আমার অ্যাপয়েন্টমেন্ট বুক করেছিলাম।" },
      { de: "Heute Morgen bin ich pünktlich mit allen wichtigen Unterlagen dort erschienen.", en: "This morning I appeared there punctually with all important documents.", bn: "আজ সকালে আমি সব গুরুত্বপূর্ণ কাগজপত্র নিয়ে ঠিক সময়ে সেখানে উপস্থিত হলাম।" },
      { de: "Ich hatte meinen Reisepass, meinen Mietvertrag und die Bestätigung vom Vermieter dabei.", en: "I had my passport, my rental contract, and the confirmation from the landlord with me.", bn: "আমার সাথে আমার পাসপোর্ট, ভাড়ার চুক্তিপত্র এবং বাড়িওয়ালার দেওয়া নিশ্চিতকরণ পত্র ছিল।" },
      { de: "Im Wartebereich musste ich nur zehn Minuten warten, bis meine Nummer aufgerufen wurde.", en: "In the waiting area I only had to wait ten minutes until my number was called.", bn: "অপেক্ষমাণ এলাকায় আমার নম্বর ডাকার আগ পর্যন্ত আমাকে মাত্র দশ মিনিট অপেক্ষা করতে হয়েছিল।" },
      { de: "Der Sachbearbeiter prüfte meine Papiere und trug die neue Adresse in den Computer ein.", en: "The clerk checked my documents and entered the new address into the computer.", bn: "কর্মকর্তা আমার কাগজপত্র পরীক্ষা করলেন এবং কম্পিউটারে নতুন ঠিকানাটি লিখে নিলেন।" },
      { de: "Danach druckte er meine neue Meldebescheinigung aus und stempelte sie ab.", en: "Afterward he printed out my new registration certificate and stamped it.", bn: "এরপর তিনি আমার নতুন নিবন্ধন সনদ প্রিন্ট করলেন এবং তাতে সিল দিলেন।" },
      { de: "Zum Schluss gab er mir noch einen Aufkleber mit der neuen Adresse für meinen Ausweis.", en: "Finally he also gave me a sticker with the new address for my ID card.", bn: "সবশেষে তিনি আমার পরিচয়পত্রের জন্য নতুন ঠিকানাসম্বলিত একটি স্টিকারও দিলেন।" },
      { de: "Der gesamte Termin dauerte nur fünfzehn Minuten und lief völlig reibungslos ab.", en: "The entire appointment took only fifteen minutes and went completely smoothly.", bn: "পুরো প্রক্রিয়াটি মাত্র পনেরো মিনিট সময় নিয়েছিল এবং সম্পূর্ণ নির্বিঘ্নে সম্পন্ন হয়েছিল।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-26",
    level: "A2",
    category: "Reflexive Verbs & Sports Vocabulary",
    titleDe: "26. Im Fitnessstudio",
    titleEn: "At the Gym",
    titleBn: "জিমনেসিয়ামে",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Da ich im Büro den ganzen Tag am Schreibtisch sitze, brauche ich Bewegung.", en: "Since I sit at a desk all day in the office, I need exercise.", bn: "যেহেতু আমি অফিসে সারাদিন ডেস্কে বসে থাকি, তাই আমার শারীরিক ব্যায়ামের প্রয়োজন।" },
      { de: "Deshalb habe ich mich letzten Monat in einem modernen Fitnessstudio angemeldet.", en: "Therefore I registered at a modern gym last month.", bn: "তাই গত মাসে আমি একটি আধুনিক জিমে ভর্তি হয়েছি।" },
      { de: "Zuerst hat mir ein Trainer alle Geräte genau erklärt und einen Trainingsplan erstellt.", en: "First a trainer explained all the machines to me in detail and created a training plan.", bn: "প্রথমে একজন প্রশিক্ষক আমাকে সব যন্ত্রপাতি ভালোভাবে বুঝিয়ে দিয়েছেন এবং একটি ব্যায়ামের তালিকা তৈরি করে দিয়েছেন।" },
      { de: "Jetzt trainiere ich dreimal pro Woche jeweils für eineinhalb Stunden.", en: "Now I work out three times a week for one and a half hours each.", bn: "এখন আমি সপ্তাহে তিনবার দেড় ঘণ্টা করে ব্যায়াম করি।" },
      { de: "Vor dem Training wärme ich mich immer zehn Minuten auf dem Laufband auf.", en: "Before training I always warm up for ten minutes on the treadmill.", bn: "ব্যায়াম শুরু করার আগে আমি সবসময় ট্রেডমিলে দশ মিনিট ওয়ার্ম-আপ করে নিই।" },
      { de: "Danach mache ich verschiedene Übungen für meinen Rücken und meine Schultern.", en: "Afterward I do various exercises for my back and my shoulders.", bn: "এরপর আমি আমার পিঠ এবং কাঁধের জন্য বিভিন্ন ব্যায়াম করি।" },
      { de: "Am Anfang hatte ich oft Muskelkater, weil mein Körper das Training nicht gewohnt war.", en: "In the beginning I often had sore muscles because my body was not used to the workout.", bn: "শুরুতে আমার প্রায়ই পেশিতে ব্যথা হতো, কারণ আমার শরীর এই ব্যায়ামে অভ্যস্ত ছিল না।" },
      { de: "Inzwischen fühle ich mich aber viel fitter und habe deutlich mehr Energie.", en: "In the meantime, however, I feel much fitter and have significantly more energy.", bn: "তবে ইতিমধ্যে আমি অনেক বেশি সুস্থ বোধ করছি এবং আমার শরীরে উল্লেখযোগ্যভাবে বেশি শক্তি অনুভব করছি।" },
      { de: "Nach dem Sport entspanne ich mich gerne noch kurz in der Sauna.", en: "After sports I also like to relax briefly in the sauna.", bn: "ব্যায়ামের পর আমি সনা-তে (sauna) কিছুক্ষণ বিশ্রাম নিতে পছন্দ করি।" },
      { de: "Regelmäßige Bewegung hilft mir auch dabei, Stress nach der Arbeit abzubauen.", en: "Regular exercise also helps me to reduce stress after work.", bn: "নিয়মিত শরীরচর্চা কাজের পর মানসিক চাপ কমাতেও আমাকে সাহায্য করে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-27",
    level: "A2",
    category: "Making Suggestions, Polite Refusals & Compromises",
    titleDe: "27. Einen Termin vereinbaren und verschieben",
    titleEn: "Making & Rescheduling Plans",
    titleBn: "পরিকল্পনা করা ও সময় পরিবর্তন করা",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Mein Studienfreund Jonas hat mir gestern eine Nachricht geschickt, weil wir uns lange nicht gesehen haben.", en: "My university friend Jonas sent me a message yesterday because we haven't seen each other for a long time.", bn: "আমার বিশ্ববিদ্যালয়ের বন্ধু জোনাস গতকাল আমাকে একটি মেসেজ পাঠিয়েছে, কারণ অনেক দিন আমাদের দেখা হয়নি।" },
      { de: "Er schlug vor, dass wir uns am Freitagabend im Kino treffen.", en: "He suggested that we meet at the cinema on Friday evening.", bn: "সে প্রস্তাব দিয়েছিল যে আমরা শুক্রবার সন্ধ্যায় সিনেমা হলে দেখা করব।" },
      { de: "Leider musste ich seinen Vorschlag ablehnen, weil ich am Freitag bis zwanzig Uhr arbeiten muss.", en: "Unfortunately I had to decline his suggestion because I have to work until eight PM on Friday.", bn: "দুর্ভাগ্যবশত আমাকে তার প্রস্তাবটি প্রত্যাখ্যান করতে হলো, কারণ শুক্রবার আমাকে রাত আটটা পর্যন্ত কাজ করতে হবে।" },
      { de: "Deshalb schrieb ich zurück: „Schade, am Freitag klappt es bei mir leider nicht, aber wie wäre es am Samstag?“", en: "Therefore I wrote back: \"Too bad, unfortunately Friday doesn't work for me, but how about Saturday?\"", bn: "তাই আমি উত্তরে লিখলাম: \"দুঃখিত, শুক্রবার আমার পক্ষে সম্ভব হচ্ছে না, তবে শনিবার কেমন হয়?\"" },
      { de: "Jonas antwortete schnell, dass er am Samstagnachmittag schon zum Fußballtraining geht.", en: "Jonas answered quickly that he is already going to football practice on Saturday afternoon.", bn: "জোনাস দ্রুত উত্তর দিল যে শনিবার বিকেলে তার ইতিমধ্যেই ফুটবল অনুশীলন আছে।" },
      { de: "Er fragte, ob wir stattdessen am Sonntagmorgen zusammen brunchen gehen könnten.", en: "He asked whether we could go for brunch together on Sunday morning instead.", bn: "সে জিজ্ঞাসা করল এর পরিবর্তে আমরা রবিবার সকালে একসাথে ব্রাঞ্চ (সকাল-দুপুরের খাবার) করতে যেতে পারি কিনা।" },
      { de: "Dieser Gegenvorschlag passte mir ausgezeichnet, weil ich am Sonntag nichts vorhatte.", en: "This counter-proposal suited me wonderfully because I had nothing planned on Sunday.", bn: "এই পাল্টা প্রস্তাবটি আমার জন্য চমৎকার ছিল, কারণ রবিবারে আমার কোনো কাজ ছিল না।" },
      { de: "Wir einigten uns darauf, uns um elf Uhr in unserem Lieblingscafé am Main zu treffen.", en: "We agreed to meet at eleven o'clock in our favorite café by the Main river.", bn: "আমরা মাইন নদীর তীরে আমাদের প্রিয় ক্যাফেতে এগারোটায় দেখা করার বিষয়ে একমত হলাম।" },
      { de: "Ich freue mich schon sehr darauf, mit ihm über unsere aktuellen Projekte zu plaudern.", en: "I am already looking forward very much to chatting with him about our current projects.", bn: "তার সাথে আমাদের বর্তমান প্রকল্পগুলো নিয়ে আড্ডা দেওয়ার জন্য আমি অধীর আগ্রহে অপেক্ষা করছি।" },
      { de: "Wenn beide Seiten flexibel sind, findet man immer einen guten Kompromiss.", en: "When both sides are flexible, one always finds a good compromise.", bn: "উভয় পক্ষ নমনীয় হলে সবসময়ই একটি ভালো সমঝোতা খুঁজে পাওয়া যায়।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-28",
    level: "A2",
    category: "Imperative & Kitchen Vocabulary",
    titleDe: "28. Kochen mit Freunden",
    titleEn: "Cooking with Friends",
    titleBn: "বন্ধুদের সাথে রান্না করা",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Am Samstagabend haben wir unsere deutschen Freunde zum Essen eingeladen.", en: "On Saturday evening we invited our German friends for dinner.", bn: "শনিবার সন্ধ্যায় আমরা আমাদের জার্মান বন্ধুদের রাতের খাবারের জন্য আমন্ত্রণ জানিয়েছি।" },
      { de: "Wir möchten ihnen gerne ein traditionelles Gericht aus Bangladesch kochen.", en: "We would like to cook a traditional dish from Bangladesh for them.", bn: "আমরা তাদের জন্য বাংলাদেশের একটি ঐতিহ্যবাহী খাবার রান্না করতে চাই।" },
      { de: "Schon am Nachmittag kaufen wir auf dem Markt frisches Hähnchen, Reis und viele Gewürze.", en: "Already in the afternoon we buy fresh chicken, rice, and many spices at the market.", bn: "বিকেলেই আমরা বাজার থেকে তাজা মুরগির মাংস, চাল এবং অনেক মসলা কিনে আনি।" },
      { de: "Zu Hause schneiden wir gemeinsam Zwiebeln, Knoblauch und Ingwer in kleine Stücke.", en: "At home we chop onions, garlic, and ginger into small pieces together.", bn: "বাড়িতে আমরা একসাথে পেঁয়াজ, রসুন এবং আদা ছোট ছোট টুকরো করে কাটি।" },
      { de: "Mein Freund Lukas hilft uns und rührt die Soße im großen Topf um.", en: "My friend Lukas helps us and stirs the sauce in the big pot.", bn: "আমার বন্ধু লুকাস আমাদের সাহায্য করে এবং বড় হাঁড়িতে ঝোল নেড়ে দেয়।" },
      { de: "Es duftet in der ganzen Wohnung herrlich nach Kardamom, Zimt und Koriander.", en: "The entire apartment smells wonderful of cardamom, cinnamon, and coriander.", bn: "এলাচ, দারুচিনি এবং ধনেপাতার চমৎকার সুবাসে পুরো ফ্ল্যাট ভরে ওঠে।" },
      { de: "Als alle Gäste pünktlich um neunzehn Uhr ankommen, ist das Essen fertig.", en: "When all guests arrive punctually at seven PM, the food is ready.", bn: "সব অতিথিরা ঠিক সন্ধ্যা সাতটায় পৌঁছালে খাবার প্রস্তুত হয়ে যায়।" },
      { de: "Unsere Freunde probieren das Curry und sind vom Geschmack total begeistert.", en: "Our friends try the curry and are totally thrilled by the taste.", bn: "আমাদের বন্ধুরা কারি খেয়ে দেখে এবং স্বাদে পুরোপুরি মুগ্ধ হয়ে যায়।" },
      { de: "Sie fragen sofort nach dem Rezept, weil sie es auch zu Hause kochen wollen.", en: "They immediately ask for the recipe because they also want to cook it at home.", bn: "তারা সাথে সাথেই রেসিপিটি চায়, কারণ তারা নিজেরাও বাড়িতে এটি রান্না করতে চায়।" },
      { de: "Gemeinsam zu kochen und zu essen verbindet verschiedene Kulturen auf wunderbare Weise.", en: "Cooking and eating together connects different cultures in a wonderful way.", bn: "একসাথে রান্না করা এবং খাওয়া চমৎকারভাবে বিভিন্ন সংস্কৃতিকে যুক্ত করে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-29",
    level: "A2",
    category: "Customer Service & Subordinate Clauses",
    titleDe: "29. Probleme mit dem Internet",
    titleEn: "Problems with the Internet",
    titleBn: "ইন্টারনেট সমস্যা",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Seit gestern Abend funktioniert unser WLAN zu Hause leider überhaupt nicht mehr.", en: "Since yesterday evening our Wi-Fi at home unfortunately does not work at all anymore.", bn: "গতকাল সন্ধ্যা থেকে দুর্ভাগ্যবশত আমাদের বাসার ওয়াই-ফাই একদমই কাজ করছে না।" },
      { de: "Da ich oft im Homeoffice arbeite, ist eine stabile Internetverbindung für mich unverzichtbar.", en: "Since I often work from home, a stable internet connection is indispensable for me.", bn: "যেহেতু আমি প্রায়ই বাসা থেকে অফিসের কাজ (হোম অফিস) করি, তাই একটি স্থিতিশীল ইন্টারনেট সংযোগ আমার জন্য অপরিহার্য।" },
      { de: "Zuerst habe ich den Router neu gestartet und alle Kabel überprüft.", en: "First I restarted the router and checked all cables.", bn: "প্রথমে আমি রাউটারটি রিস্টার্ট করলাম এবং সব তার পরীক্ষা করলাম।" },
      { de: "Als das nicht geholfen hat, habe ich beim Kundenservice angerufen.", en: "When that did not help, I called customer service.", bn: "যখন এতে কোনো কাজ হলো না, তখন আমি কাস্টমার সার্ভিসে ফোন করলাম।" },
      { de: "Eine freundliche Mitarbeiterin erklärte mir, dass es in unserem Stadtteil eine Störung gibt.", en: "A female employee explained to me that there is an outage in our district.", bn: "একজন আন্তরিক মহিলা কর্মী আমাকে বুঝিয়ে বললেন যে আমাদের এলাকায় একটি যান্ত্রিক ত্রুটি দেখা দিয়েছে।" },
      { de: "Sie sagte, dass Techniker bereits intensiv an der Reparatur arbeiten.", en: "She said that technicians are already working intensively on the repair.", bn: "তিনি বললেন যে টেকনিশিয়ানরা ইতিমধ্যেই মেরামতের কাজ জোরেশোরে চালিয়ে যাচ্ছেন।" },
      { de: "Bis das Problem gelöst ist, benutze ich mein Smartphone als mobilen Hotspot.", en: "Until the problem is solved, I am using my smartphone as a mobile hotspot.", bn: "সমস্যাটি সমাধান না হওয়া পর্যন্ত আমি আমার স্মার্টফোনটি মোবাইল হটস্পট হিসেবে ব্যবহার করছি।" },
      { de: "Glücklicherweise habe ich einen Vertrag mit ausreichend Datenvolumen für solche Notfälle.", en: "Fortunately I have a contract with enough data volume for such emergencies.", bn: "সৌভাগ্যবশত এই ধরনের জরুরি অবস্থার জন্য আমার সিমে পর্যাপ্ত ডেটা প্যাক রয়েছে।" },
      { de: "Heute Nachmittag kam eine SMS, dass das Netz wieder normal läuft.", en: "This afternoon a text message arrived saying that the network is running normally again.", bn: "আজ বিকেলে একটি এসএমএস এসেছে যে নেটওয়ার্ক আবার স্বাভাবিক হয়েছে।" },
      { de: "Jetzt kann ich meine Online-Meetings wieder ohne Unterbrechung durchführen.", en: "Now I can conduct my online meetings again without interruption.", bn: "এখন আমি কোনো বাধা ছাড়াই আবার আমার অনলাইন মিটিংগুলো করতে পারব।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-30",
    level: "A2",
    category: "Passive Voice Basics & Media Vocabulary",
    titleDe: "30. Medien und Nachrichten",
    titleEn: "Media and News",
    titleBn: "গণমাধ্যম এবং সংবাদ",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Jeden Morgen beim Frühstück informiere ich mich über die aktuellen Nachrichten.", en: "Every morning at breakfast I inform myself about the current news.", bn: "প্রতিদিন সকালে নাস্তার সময় আমি সাম্প্রতিক খবরাখবর জেনে নিই।" },
      { de: "Früher habe ich immer eine gedruckte Zeitung aus Papier gelesen.", en: "In the past I always read a printed newspaper made of paper.", bn: "আগে আমি সবসময় কাগজের ছাপানো সংবাদপত্র পড়তাম।" },
      { de: "Heute lese ich die Artikel meistens direkt auf meinem Smartphone oder Tablet.", en: "Today I mostly read the articles directly on my smartphone or tablet.", bn: "আজকাল আমি সাধারণত সরাসরি আমার স্মার্টফোন বা ট্যাবলেটে নিবন্ধগুলো পড়ি।" },
      { de: "Außerdem höre ich auf dem Weg zur Arbeit gern informative Podcasts.", en: "In addition, I like listening to informative podcasts on the way to work.", bn: "এছাড়া কাজে যাওয়ার পথে আমি তথ্যমূলক পডকাস্ট শুনতে পছন্দ করি।" },
      { de: "Im Fernsehen schaue ich mir abends oft die Tagesschau an, um auf dem Laufenden zu bleiben.", en: "On television I often watch the evening news in the evening to stay up to date.", bn: "সন্ধ্যায় আমি হালনাগাদ থাকতে প্রায়ই টেলিভিশনে সংবাদ দেখি।" },
      { de: "Es ist wichtig, dass man verschiedene Quellen nutzt, um sich eine eigene Meinung zu bilden.", en: "It is important that one uses different sources in order to form one's own opinion.", bn: "নিজের মতামত তৈরি করার জন্য বিভিন্ন উৎস ব্যবহার করা গুরুত্বপূর্ণ।" },
      { de: "In den sozialen Medien werden nämlich oft auch falsche Informationen verbreitet.", en: "On social media, you see, false information is often spread as well.", bn: "কারণ সামাজিক যোগাযোগ মাধ্যমে প্রায়ই ভুল তথ্যও ছড়ানো হয়।" },
      { de: "Deshalb prüfe ich kritisch, woher eine Nachricht eigentlich stammt.", en: "Therefore I critically check where a piece of news actually comes from.", bn: "তাই আমি সমালোচনামূলক দৃষ্টিতে যাচাই করি যে একটি খবর আসলে কোথা থেকে এসেছে।" },
      { de: "Am Wochenende sehe ich mir zur Entspannung lieber spannende Dokumentationen an.", en: "On the weekend I prefer watching exciting documentaries to relax.", bn: "সপ্তাহান্তে বিশ্রামের জন্য আমি রোমাঞ্চকর তথ্যচিত্র দেখতে বেশি পছন্দ করি।" },
      { de: "Moderne Medien machen es leicht, weltweit mit allem verbunden zu bleiben.", en: "Modern media make it easy to stay connected with everything worldwide.", bn: "আধুনিক গণমাধ্যম বিশ্বজুড়ে সবকিছুর সাথে যুক্ত থাকা সহজ করে দিয়েছে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-31",
    level: "A2",
    category: "man + Modal Verbs & um ... zu",
    titleDe: "31. Umwelt schützen im Alltag",
    titleEn: "Protecting the Environment in Everyday Life",
    titleBn: "দৈনন্দিন জীবনে পরিবেশ রক্ষা",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Der Schutz unserer Umwelt ist ein Thema, das uns alle betrifft.", en: "Protecting our environment is a topic that affects us all.", bn: "আমাদের পরিবেশ রক্ষা করা এমন একটি বিষয় যা আমাদের সবাইকে প্রভাবিত করে।" },
      { de: "Auch im kleinen Alltag kann jeder Mensch etwas für die Natur tun.", en: "Even in small everyday life, every person can do something for nature.", bn: "ছোটখাটো দৈনন্দিন জীবনেও প্রতিটি মানুষ প্রকৃতির জন্য কিছু করতে পারে।" },
      { de: "Beim Einkaufen nehme ich immer eine eigene Stofftasche mit, um Plastiktüten zu vermeiden.", en: "When shopping I always bring my own cloth bag in order to avoid plastic bags.", bn: "কেনাকাটার সময় প্লাস্টিকের ব্যাগ এড়াতে আমি সবসময় নিজের কাপড়ের ব্যাগ সাথে নিই।" },
      { de: "Außerdem kaufe ich bevorzugt Obst und Gemüse aus der Region ohne Verpackung.", en: "In addition, I prefer buying fruit and vegetables from the region without packaging.", bn: "তাছাড়া আমি প্যাকেট ছাড়া স্থানীয় ফলমূল ও শাকসবজি কিনতে পছন্দ করি।" },
      { de: "Zu Hause achten wir darauf, das Licht auszuschalten, wenn wir ein Zimmer verlassen.", en: "At home we make sure to turn off the light when we leave a room.", bn: "বাড়িতে আমরা ঘর থেকে বের হওয়ার সময় বাতি নিভিয়ে রাখার বিষয়ে খেয়াল রাখি।" },
      { de: "Im Winter drehen wir die Heizung nachts herunter, damit wir Energie sparen.", en: "In winter we turn down the heating at night so that we save energy.", bn: "শীতকালে আমরা রাতে হিটার কমিয়ে রাখি, যাতে বিদ্যুৎ বা জ্বালানি সাশ্রয় হয়।" },
      { de: "Für kurze Strecken in der Stadt benutze ich meistens das Fahrrad statt des Autos.", en: "For short distances in the city I mostly use the bicycle instead of the car.", bn: "শহরের ভেতরে অল্প দূরত্বের জন্য আমি গাড়ির পরিবর্তে সাধারণত সাইকেল ব্যবহার করি।" },
      { de: "Die Mülltrennung funktioniert in Deutschland sehr gut, wenn alle richtig mitmachen.", en: "Trash separation works very well in Germany when everyone participates properly.", bn: "সবাই সঠিকভাবে অংশ নিলে জার্মানিতে বর্জ্য পৃথকীকরণ খুব ভালোভাবে কাজ করে।" },
      { de: "Alte Kleidung und funktionierende Geräte werfe ich nicht weg, sondern spende sie.", en: "I do not throw away old clothes and working devices, rather I donate them.", bn: "পুরনো জামাকাপড় এবং সচল যন্ত্রপাতি আমি ফেলে না দিয়ে দান করে দিই।" },
      { de: "Wenn viele Menschen kleine Schritte machen, können wir gemeinsam viel erreichen.", en: "When many people take small steps, we can achieve a lot together.", bn: "অনেক মানুষ ছোট ছোট পদক্ষেপ নিলে আমরা একসাথে অনেক কিছু অর্জন করতে পারি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-32",
    level: "A2",
    category: "Formal Language & Indirect Questions",
    titleDe: "32. Ein Vorstellungsgespräch",
    titleEn: "A Job Interview",
    titleBn: "চাকরির ইন্টারভিউ",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Letzte Woche hatte ich ein wichtiges Vorstellungsgespräch für eine Stelle als IT-Support.", en: "Last week I had an important job interview for a position as IT support.", bn: "গত সপ্তাহে আইটি সাপোর্ট পদের জন্য আমার একটি গুরুত্বপূর্ণ চাকরির ইন্টারভিউ ছিল।" },
      { de: "Ich habe mich tagelang intensiv auf die möglichen Fragen vorbereitet.", en: "I prepared intensively for days for the possible questions.", bn: "সম্ভাব্য প্রশ্নগুলোর জন্য আমি কয়েক দিন ধরে নিবিড়ভাবে প্রস্তুতি নিয়েছিলাম।" },
      { de: "Am Tag des Gesprächs habe ich einen dunklen Anzug angezogen und bin früh losgefahren.", en: "On the day of the interview I put on a dark suit and left early.", bn: "ইন্টারভিউয়ের দিন আমি একটি গাঢ় রঙের স্যুট পরেছিলাম এবং তাড়াতাড়ি রওনা দিয়েছিলাম।" },
      { de: "Im Unternehmen wurde ich sehr freundlich von der Personalleiterin begrüßt.", en: "At the company I was greeted very kindly by the HR manager.", bn: "কোম্পানিতে মানবসম্পদ ব্যবস্থাপক আমাকে খুব আন্তরিকভাবে অভিবাদন জানালেন।" },
      { de: "Zuerst bat sie mich, etwas über meine bisherigen Berufserfahrungen zu erzählen.", en: "First she asked me to tell something about my previous work experiences.", bn: "প্রথমে তিনি আমাকে আমার পূর্ববর্তী কাজের অভিজ্ঞতা সম্পর্কে কিছু বলতে অনুরোধ করলেন।" },
      { de: "Danach fragte sie, warum ich gerne in ihrer Firma arbeiten möchte.", en: "Afterward she asked why I would like to work in their company.", bn: "এরপর তিনি জিজ্ঞাসা করলেন কেন আমি তাঁদের কোম্পানিতে কাজ করতে চাই।" },
      { de: "Ich erklärte, dass ich meine technischen Fähigkeiten in einem internationalen Team einbringen will.", en: "I explained that I want to contribute my technical skills in an international team.", bn: "আমি ব্যাখ্যা করলাম যে আমি একটি আন্তর্জাতিক দলে আমার কারিগরি দক্ষতা কাজে লাগাতে চাই।" },
      { de: "Zum Schluss durfte ich auch eigene Fragen zu den Arbeitszeiten und Aufgaben stellen.", en: "Finally I was also allowed to ask my own questions about working hours and tasks.", bn: "সবশেষে আমাকে কাজের সময় এবং দায়িত্ব সম্পর্কে নিজের প্রশ্ন করারও সুযোগ দেওয়া হলো।" },
      { de: "Das Gespräch verlief in einer sehr angenehmen Atmosphäre und dauerte vierzig Minuten.", en: "The interview took place in a very pleasant atmosphere and lasted forty minutes.", bn: "ইন্টারভিউটি খুব মনোরম পরিবেশে হয়েছিল এবং চল্লিশ মিনিট স্থায়ী হয়েছিল।" },
      { de: "Gestern habe ich endlich die erfreuliche Nachricht erhalten, dass ich den Job bekomme!", en: "Yesterday I finally received the pleasing news that I am getting the job!", bn: "গতকাল অবশেষে আমি সুখবরটি পেয়েছি যে আমি চাকরিটি পাচ্ছি!" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-33",
    level: "A2",
    category: "Cultural Comparisons & Temporal Clauses",
    titleDe: "33. Feste und Traditionen",
    titleEn: "Festivals and Traditions",
    titleBn: "উৎসব এবং ঐতিহ্য",
    readingTimeMinutes: 3,
    sentences: [
      { de: "In jedem Land gibt es besondere Feste, die für die Menschen sehr wichtig sind.", en: "In every country there are special festivals that are very important to people.", bn: "প্রতিটি দেশেই বিশেষ কিছু উৎসব রয়েছে যা মানুষের কাছে অত্যন্ত গুরুত্বপূর্ণ।" },
      { de: "In Deutschland ist Weihnachten im Dezember das größte Familienfest des Jahres.", en: "In Germany, Christmas in December is the biggest family celebration of the year.", bn: "জার্মানিতে ডিসেম্বর মাসে বড়দিন হলো বছরের সবচেয়ে বড় পারিবারিক উৎসব।" },
      { de: "Schon im November werden die Straßen und Häuser mit vielen Lichtern geschmückt.", en: "Already in November the streets and houses are decorated with many lights.", bn: "নভেম্বর মাস থেকেই রাস্তাঘাট এবং বাড়িঘর অনেক আলোকসজ্জায় সাজানো হয়।" },
      { de: "Auf den Weihnachtsmärkten trinken die Leute heißen Glühwein und essen gebrannte Mandeln.", en: "At the Christmas markets people drink hot mulled wine and eat roasted almonds.", bn: "ক্রিসমাস মার্কেটগুলোতে মানুষ গরম গ্লুভাইন পান করে এবং ভাজা কাঠবাদাম খায়।" },
      { de: "In meiner Heimat Bangladesch feiern wir das Zuckerfest Eid-ul-Fitr besonders groß.", en: "In my home country Bangladesh we celebrate the Sugar Festival Eid-ul-Fitr particularly grandly.", bn: "আমার নিজের দেশ বাংলাদেশে আমরা ঈদুল ফিতর খুব জাঁকজমকপূর্ণভাবে উদযাপন করি।" },
      { de: "Wenn dieses Fest stattfindet, ziehen alle neue Kleidung an und besuchen Verwandte.", en: "When this festival takes place, everyone puts on new clothes and visits relatives.", bn: "যখন এই উৎসব অনুষ্ঠিত হয়, সবাই নতুন জামাকাপড় পরে এবং আত্মীয়স্বজনদের বাড়িতে বেড়াতে যায়।" },
      { de: "Es gibt überall köstliche Süßigkeiten und traditionelle Speisen für alle Gäste.", en: "Everywhere there are delicious sweets and traditional dishes for all guests.", bn: "সব অতিথিদের জন্য চারদিকে সুস্বাদু মিষ্টান্ন এবং ঐতিহ্যবাহী খাবারের আয়োজন থাকে।" },
      { de: "Obwohl ich jetzt in Deutschland lebe, feiere ich beide Feste mit meinen Freunden.", en: "Although I now live in Germany, I celebrate both festivals with my friends.", bn: "যদিও আমি এখন জার্মানিতে থাকি, আমি আমার বন্ধুদের সাথে দুটি উৎসবই উদযাপন করি।" },
      { de: "Ich lade meine deutschen Kollegen zum Eid-Essen ein und besuche mit ihnen den Weihnachtsmarkt.", en: "I invite my German colleagues to an Eid meal and visit the Christmas market with them.", bn: "আমি আমার জার্মান সহকর্মীদের ঈদের খাবারে আমন্ত্রণ জানাই এবং তাদের সাথে ক্রিসমাস মার্কেটে ঘুরতে যাই।" },
      { de: "So verbinden wir die schönsten Traditionen aus beiden Kulturen miteinander.", en: "In this way we connect the nicest traditions from both cultures with each other.", bn: "এভাবে আমরা দুটি সংস্কৃতির সবচেয়ে সুন্দর ঐতিহ্যগুলোকে একসাথে যুক্ত করি।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-34",
    level: "A2",
    category: "Complete A2 Grammar Review",
    titleDe: "34. Ein unvergesslicher Ausflug ans Meer",
    titleEn: "An Unforgettable Trip to the Sea",
    titleBn: "সমুদ্রের ধারে একটি অবিস্মরণীয় ভ্রমণ",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Letztes Wochenende haben wir einen spontanen Ausflug an die Nordsee gemacht.", en: "Last weekend we took a spontaneous trip to the North Sea.", bn: "গত সপ্তাহান্তে আমরা হঠাৎ করেই উত্তর সাগরে (North Sea) একটি ভ্রমণে গিয়েছিলাম।" },
      { de: "Obwohl die Fahrt mit dem Zug fast fünf Stunden dauerte, verging die Zeit schnell.", en: "Although the train ride took almost five hours, time passed quickly.", bn: "যদিও ট্রেনের যাত্রায় প্রায় পাঁচ ঘণ্টা সময় লেগেছিল, তবুও সময় দ্রুত কেটে গিয়েছিল।" },
      { de: "Als wir am Strand ankamen, wehte ein frischer Wind und die Wellen rauschten laut.", en: "When we arrived at the beach, a fresh wind was blowing and the waves roared loudly.", bn: "যখন আমরা সৈকতে পৌঁছালাম, তখন তাজা বাতাস বইছিল এবং ঢেউগুলো জোরে গর্জন করছিল।" },
      { de: "Wir sind barfuß durch den weichen Sand gelaufen und haben Muscheln gesammelt.", en: "We walked barefoot through the soft sand and collected seashells.", bn: "আমরা নরম বালির ওপর দিয়ে খালি পায়ে হেঁটেছি এবং ঝিনুক কুড়িয়েছি।" },
      { de: "Danach haben wir uns in einen gemütlichen Strandkorb gesetzt und ein Fischbrötchen gegessen.", en: "Afterward we sat down in a cozy beach chair and ate a fish roll.", bn: "এরপর আমরা একটি আরামদায়ক বিচ চেয়ারে বসেছি এবং ফিশ রোল খেয়েছি।" },
      { de: "Mein Freund meinte, dass das Meer noch schöner ist, als er es sich vorgestellt hatte.", en: "My friend thought that the sea is even more beautiful than he had imagined it.", bn: "আমার বন্ধু বলল যে সমুদ্র সে যতটা কল্পনা করেছিল তার চেয়েও অনেক বেশি সুন্দর।" },
      { de: "Am Nachmittag haben wir eine kleine Bootstour gemacht und sogar Seehunde gesehen.", en: "In the afternoon we took a short boat tour and even saw seals.", bn: "বিকেলে আমরা একটি ছোট নৌকা ভ্রমণ করেছি এবং এমনকি সিল মাছও দেখেছি।" },
      { de: "Bevor wir am Abend zurückfuhren, haben wir den bunten Sonnenuntergang fotografiert.", en: "Before we traveled back in the evening, we photographed the colorful sunset.", bn: "সন্ধ্যায় ফিরে আসার আগে আমরা রঙিন সূর্যাস্তের ছবি তুলেছি।" },
      { de: "Ich bin sehr froh, dass wir dieses Wochenende zusammen verbracht haben.", en: "I am very glad that we spent this weekend together.", bn: "আমি খুব খুশি যে আমরা এই সপ্তাহান্তটি একসাথে কাটিয়েছি।" },
      { de: "Nächsten Sommer werden wir bestimmt noch einmal an die Küste reisen!", en: "Next summer we will definitely travel to the coast once more!", bn: "আগামী গ্রীষ্মে আমরা নিশ্চিতভাবেই আরও একবার সমুদ্র উপকূলে বেড়াতে যাব!" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-35",
    level: "A2",
    category: "Banking Vocabulary & Formal Questions",
    titleDe: "35. Kontoeröffnung bei der Bank",
    titleEn: "Opening a Bank Account",
    titleBn: "ব্যাংকে অ্যাকাউন্ট খোলা",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Um in Deutschland Gehalt zu bekommen, braucht man ein eigenes Girokonto.", en: "In order to receive a salary in Germany, one needs one's own checking account.", bn: "জার্মানিতে বেতন পাওয়ার জন্য নিজের একটি ব্যাংক অ্যাকাউন্ট (Girokonto) প্রয়োজন।" },
      { de: "Deshalb habe ich heute einen Termin bei einer Filiale meiner Bank vereinbart.", en: "Therefore I arranged an appointment at a branch of my bank today.", bn: "তাই আজ আমি আমার ব্যাংকের একটি শাখায় অ্যাপয়েন্টমেন্ট নিয়েছি।" },
      { de: "Der Bankberater begrüßt mich freundlich und bittet mich in sein Büro.", en: "The bank advisor greets me kindly and invites me into his office.", bn: "ব্যাংক উপদেষ্টা আমাকে আন্তরিকভাবে অভিবাদন জানান এবং তাঁর অফিসে আমন্ত্রণ জানান।" },
      { de: "Er erklärt mir genau, welche Gebühren für das Konto und die EC-Karte anfallen.", en: "He explains to me in detail which fees apply for the account and the debit card.", bn: "তিনি আমাকে বিস্তারিতভাবে বুঝিয়ে বলেন অ্যাকাউন্ট এবং ডেবিট কার্ডের জন্য কী কী চার্জ প্রযোজ্য।" },
      { de: "Da ich noch Student bin, ist die Kontoführung für mich glücklicherweise kostenlos.", en: "Since I am still a student, account management is fortunately free of charge for me.", bn: "যেহেতু আমি এখনো ছাত্র, তাই সৌভাগ্যবশত আমার জন্য অ্যাকাউন্ট পরিচালনা সম্পূর্ণ বিনামূল্যে।" },
      { de: "Ich gebe ihm meinen Reisepass und meine aktuelle Meldebescheinigung zur Prüfung.", en: "I give him my passport and my current registration certificate for verification.", bn: "যাচাইয়ের জন্য আমি তাঁকে আমার পাসপোর্ট এবং বর্তমান নিবন্ধন সনদ দিই।" },
      { de: "Danach füllen wir gemeinsam das Antragsformular am Computer aus.", en: "Afterward we fill out the application form together on the computer.", bn: "এরপর আমরা একসাথে কম্পিউটারে আবেদন ফর্মটি পূরণ করি।" },
      { de: "Ich muss an drei Stellen unterschreiben, bevor der Vertrag gültig ist.", en: "I have to sign in three places before the contract is valid.", bn: "চুক্তিটি কার্যকর হওয়ার আগে আমাকে তিনটি জায়গায় স্বাক্ষর করতে হয়।" },
      { de: "Der Berater sagt, dass ich meine Bankkarte und die PIN nächste Woche per Post bekomme.", en: "The advisor says that I will receive my bank card and the PIN by mail next week.", bn: "উপদেষ্টা বলেন যে আমি আগামী সপ্তাহে ডাকযোগে আমার ব্যাংক কার্ড এবং পিন নম্বর পাব।" },
      { de: "Mit dem Online-Banking kann ich dann alle Überweisungen bequem von zu Hause erledigen.", en: "With online banking I can then handle all transfers conveniently from home.", bn: "অনলাইন ব্যাংকিংয়ের মাধ্যমে আমি তখন বাড়িতে বসেই স্বাচ্ছন্দ্যে সব লেনদেন করতে পারব।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-36",
    level: "A2",
    category: "Post Office & Shipping Vocabulary",
    titleDe: "36. Ein Paket nach Hause schicken",
    titleEn: "Sending a Parcel Home",
    titleBn: "বাড়িতে একটি পার্সেল পাঠানো",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Nächsten Monat hat meine Mutter Geburtstag und ich möchte ihr ein Paket schicken.", en: "Next month is my mother's birthday and I want to send her a parcel.", bn: "আগামী মাসে আমার মায়ের জন্মদিন এবং আমি তাঁকে একটি পার্সেল পাঠাতে চাই।" },
      { de: "Ich habe schon viele kleine Geschenke wie deutsche Schokolade und Tee gekauft.", en: "I have already bought many small gifts like German chocolate and tea.", bn: "আমি ইতিমধ্যেই জার্মান চকলেট এবং চায়ের মতো অনেক ছোট উপহার কিনেছি।" },
      { de: "Zu Hause verpacke ich alles sicher in einen stabilen Karton aus Pappe.", en: "At home I pack everything safely into a sturdy cardboard box.", bn: "বাড়িতে আমি সবকিছু একটি মজবুত কার্ডবোর্ডের বাক্সে নিরাপদে প্যাক করি।" },
      { de: "Dann schreibe ich die Adresse in Dhaka deutlich und groß auf das Paket.", en: "Then I write the address in Dhaka clearly and large onto the parcel.", bn: "তারপর আমি পার্সেলের গায়ে স্পষ্ট এবং বড় অক্ষরে ঢাকার ঠিকানা লিখি।" },
      { de: "In der Postfiliale lege ich das Paket auf die Waage am Schalter.", en: "At the post office branch I place the parcel onto the scale at the counter.", bn: "পোস্ট অফিসের শাখায় আমি কাউন্টারের ওজন মাপার যন্ত্রে পার্সেলটি রাখি।" },
      { de: "Der Mitarbeiter sagt, dass das Paket genau drei Kilogramm wiegt.", en: "The employee says that the parcel weighs exactly three kilograms.", bn: "কর্মচারী বলেন যে পার্সেলটির ওজন ঠিক তিন কেজি।" },
      { de: "Da es nach Bangladesch geht, muss ich auch eine Zollerklärung ausfüllen.", en: "Since it is going to Bangladesh, I also have to fill out a customs declaration.", bn: "যেহেতু এটি বাংলাদেশে যাচ্ছে, তাই আমাকে একটি কাস্টমস ঘোষণা ফর্মও পূরণ করতে হয়।" },
      { de: "Ich bezahle das Porto und bekomme eine Quittung mit einer Sendungsnummer.", en: "I pay the postage and receive a receipt with a tracking number.", bn: "আমি ডাকমাশুল পরিশোধ করি এবং একটি ট্র্যাকিং নম্বরসহ রসিদ পাই।" },
      { de: "Mit dieser Nummer kann ich im Internet verfolgen, wo sich das Paket gerade befindet.", en: "With this number I can track on the internet where the parcel is currently located.", bn: "এই নম্বর দিয়ে আমি ইন্টারনেটে দেখতে পারব পার্সেলটি বর্তমানে কোথায় আছে।" },
      { de: "Ich hoffe sehr, dass das Paket rechtzeitig zu ihrem Geburtstag ankommt.", en: "I very much hope that the parcel arrives in time for her birthday.", bn: "আমি খুব আশা করছি যে পার্সেলটি ঠিক সময়ে তাঁর জন্মদিনের আগেই পৌঁছে যাবে।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-37",
    level: "A2",
    category: "Health, Appointments & Konjunktiv II",
    titleDe: "37. Beim Zahnarzt",
    titleEn: "At the Dentist's",
    titleBn: "দাঁতের ডাক্তারের কাছে",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Seit zwei Tagen habe ich beim Essen von kalten Sachen leichte Zahnschmerzen.", en: "For two days I have had slight toothache when eating cold things.", bn: "দুই দিন ধরে ঠান্ডা কিছু খাওয়ার সময় আমার দাঁতে হালকা ব্যথা হচ্ছে।" },
      { de: "Deshalb habe ich gestern in einer Zahnarztpraxis angerufen und um einen Termin gebeten.", en: "Therefore I called a dental practice yesterday and asked for an appointment.", bn: "তাই গতকাল আমি একটি ডেন্টাল ক্লিনিকে ফোন করে একটি অ্যাপয়েন্টমেন্ট চেয়েছিলাম।" },
      { de: "Heute Nachmittag sitze ich nun etwas nervös im modernen Wartezimmer.", en: "This afternoon I am now sitting somewhat nervously in the modern waiting room.", bn: "আজ বিকেলে আমি আধুনিক ওয়েটিং রুমে কিছুটা নার্ভাস হয়ে বসে আছি।" },
      { de: "Als ich aufgerufen werde, begrüßt mich die Zahnärztin sehr ruhig und freundlich.", en: "When I am called in, the female dentist greets me very calmly and kindly.", bn: "যখন আমাকে ভেতরে ডাকা হলো, মহিলা ডেন্টিস্ট আমাকে খুব শান্ত এবং আন্তরিকভাবে অভিবাদন জানালেন।" },
      { de: "Ich setze mich auf den Behandlungsstuhl und beschreibe ihr genau, wo es wehtut.", en: "I sit down on the treatment chair and describe to her exactly where it hurts.", bn: "আমি চিকিৎসার চেয়ারে বসলাম এবং তাঁকে ঠিক কোথায় ব্যথা করছে তা বর্ণনা করলাম।" },
      { de: "Sie untersucht meine Zähne mit einem kleinen Spiegel und macht ein Röntgenbild.", en: "She examines my teeth with a small mirror and takes an X-ray.", bn: "তিনি একটি ছোট আয়না দিয়ে আমার দাঁত পরীক্ষা করলেন এবং একটি এক্স-রে করলেন।" },
      { de: "Zum Glück sagt sie, dass es nur eine kleine Füllung ist, die erneuert werden muss.", en: "Fortunately she says that it is only a small filling that needs to be renewed.", bn: "সৌভাগ্যবশত তিনি বললেন যে এটি কেবল একটি ছোট ফিলিং যা নতুন করে দিতে হবে।" },
      { de: "Sie gibt mir eine lokale Betäubung, sodass ich während der Behandlung nichts spüre.", en: "She gives me a local anesthetic so that I feel nothing during the treatment.", bn: "তিনি আমাকে লোকাল অ্যানেস্থেশিয়া দিলেন, যাতে চিকিৎসার সময় আমি কোনো ব্যথা অনুভব না করি।" },
      { de: "Nach zwanzig Minuten ist alles schon vorbei und der Zahn ist wieder repariert.", en: "After twenty minutes everything is already over and the tooth is repaired again.", bn: "বিশ মিনিট পর সবকিছু শেষ হয়ে গেল এবং দাঁতটি আবার ঠিক হয়ে গেল।" },
      { de: "Zum Schluss empfiehlt sie mir, zweimal im Jahr zur professionellen Zahnreinigung zu kommen.", en: "Finally she recommends to me to come twice a year for professional teeth cleaning.", bn: "সবশেষে তিনি আমাকে বছরে দুবার পেশাদার দাঁত পরিষ্কারের জন্য আসার পরামর্শ দিলেন।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-38",
    level: "A2",
    category: "Travel Problems & Subordinate Clauses",
    titleDe: "38. Eine Zugverspätung",
    titleEn: "A Train Delay",
    titleBn: "ট্রেনের বিলম্ব",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Heute wollte ich eigentlich pünktlich um zehn Uhr bei einem wichtigen Meeting in Hamburg sein.", en: "Today I actually wanted to be punctually at ten o'clock at an important meeting in Hamburg.", bn: "আজ আমার আসলে ঠিক দশটায় হামবুর্গে একটি গুরুত্বপূর্ণ মিটিংয়ে উপস্থিত থাকার কথা ছিল।" },
      { de: "Ich war schon früh am Bahnhof, aber auf der Anzeigetafel stand „Verspätung“.", en: "I was already at the train station early, but on the display board it said \"Delay\".", bn: "আমি আগেই রেলস্টেশনে পৌঁছে গিয়েছিলাম, কিন্তু ডিসপ্লে বোর্ডে লেখা ছিল \"বিলম্ব\" (Verspätung)।" },
      { de: "Wegen einer Baustelle auf der Strecke hatte mein ICE vierzig Minuten Verspätung.", en: "Because of a construction site on the track, my ICE train had a forty-minute delay.", bn: "রেললাইনে নির্মাণকাজের কারণে আমার আইসিই ট্রেনটি চল্লিশ মিনিট দেরিতে চলছিল।" },
      { de: "Viele Reisende am Gleis waren verärgert, weil sie ihre Anschlusszüge verpassen würden.", en: "Many travelers on the platform were annoyed because they would miss their connecting trains.", bn: "প্ল্যাটফর্মে থাকা অনেক যাত্রী বিরক্ত হয়েছিলেন, কারণ তাঁরা তাঁদের সংযোগকারী ট্রেনগুলো মিস করবেন।" },
      { de: "Ich habe sofort meinen Kollegen in Hamburg angerufen und ihm Bescheid gesagt.", en: "I immediately called my colleague in Hamburg and let him know.", bn: "আমি সাথে সাথেই হামবুর্গে আমার সহকর্মীকে ফোন করলাম এবং তাঁকে বিষয়টি জানালাম।" },
      { de: "Glücklicherweise hatte er Verständnis und wir haben das Meeting um eine Stunde verschoben.", en: "Fortunately he was understanding and we postponed the meeting by one hour.", bn: "সৌভাগ্যবশত তিনি বিষয়টি বুঝলেন এবং আমরা মিটিংটি এক ঘণ্টা পিছিয়ে দিলাম।" },
      { de: "Im Zug habe ich mir beim Schaffner ein Formular für die Fahrgastrechte geholt.", en: "On the train I got a form for passenger rights from the conductor.", bn: "ট্রেনে আমি কন্ডাক্টরের কাছ থেকে যাত্রী অধিকারের একটি ফর্ম সংগ্রহ করলাম।" },
      { de: "Wenn ein Zug mehr als sechzig Minuten zu spät kommt, bekommt man Geld zurück.", en: "When a train arrives more than sixty minutes late, one gets money back.", bn: "কোনো ট্রেন ষাট মিনিটের বেশি দেরিতে পৌঁছালে কিছু টাকা ফেরত পাওয়া যায়।" },
      { de: "Während der Fahrt habe ich die Zeit genutzt, um meine Präsentation noch einmal durchzulesen.", en: "During the ride I used the time to read through my presentation once more.", bn: "যাত্রার সময়টুকু আমি আমার প্রেজেন্টেশনটি আরও একবার পড়ে নেওয়ার কাজে লাগালাম।" },
      { de: "Am Ende bin ich zwar später angekommen, aber das Meeting lief trotzdem erfolgreich.", en: "In the end I arrived later, admittedly, but the meeting still went successfully.", bn: "শেষ পর্যন্ত আমি দেরিতে পৌঁছালেও মিটিংটি সফলভাবেই সম্পন্ন হয়েছিল।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-39",
    level: "A2",
    category: "Describing Objects & Adjective Endings",
    titleDe: "39. Im Fundbüro",
    titleEn: "At the Lost and Found Office",
    titleBn: "লস্ট অ্যান্ড ফাউন্ড অফিসে",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Gestern Abend habe ich nach dem Einkaufen bemerkt, dass mein Regenschirm weg war.", en: "Yesterday evening after shopping I noticed that my umbrella was gone.", bn: "গতকাল সন্ধ্যায় কেনাকাটার পর আমি লক্ষ্য করলাম যে আমার ছাতাটি হারিয়ে গেছে।" },
      { de: "Ich habe ihn wahrscheinlich in der Straßenbahn auf dem Sitz vergessen.", en: "I probably forgot it on the seat in the tram.", bn: "আমি সম্ভবত ট্রামের সিটে এটি ভুলে ফেলে এসেছি।" },
      { de: "Deshalb gehe ich heute Morgen zum zentralen Fundbüro der Stadt Frankfurt.", en: "Therefore I go to the central lost and found office of the city of Frankfurt this morning.", bn: "তাই আজ সকালে আমি ফ্রাঙ্কফুর্ট শহরের কেন্দ্রীয় লস্ট অ্যান্ড ফাউন্ড অফিসে (Fundbüro) যাই।" },
      { de: "Dort gebe ich eine Verlustmeldung auf und beschreibe den Gegenstand genau.", en: "There I file a loss report and describe the item in detail.", bn: "সেখানে আমি একটি হারানোর রিপোর্ট জমা দিই এবং জিনিসটির বিস্তারিত বর্ণনা দিই।" },
      { de: "Ich sage: „Es ist ein großer, dunkelblauer Schirm mit einem braunen Holzgriff.“", en: "I say: \"It is a large, dark blue umbrella with a brown wooden handle.\"", bn: "আমি বলি: \"এটি একটি বড়, গাঢ় নীল রঙের ছাতা যার একটি বাদামী কাঠের হাতল আছে।\"" },
      { de: "Die Mitarbeiterin sucht in ihrem Computer nach allen abgegebenen Fundsachen von gestern.", en: "The female employee searches in her computer for all found items handed in yesterday.", bn: "মহিলা কর্মী তাঁর কম্পিউটারে গতকাল জমা পড়া সব হারানো জিনিসের তালিকা খোঁজেন।" },
      { de: "Nach kurzem Suchen sagt sie: „Wir haben tatsächlich einen solchen Schirm gefunden!“", en: "After a brief search she says: \"We actually found such an umbrella!\"", bn: "কিছুক্ষণ খোঁজার পর তিনি বলেন: \"আমরা সত্যিই এমন একটি ছাতা খুঁজে পেয়েছি!\"" },
      { de: "Sie geht ins Lager und bringt meinen verlorenen Regenschirm zurück.", en: "She goes into the storage room and brings back my lost umbrella.", bn: "তিনি স্টোররুমে যান এবং আমার হারিয়ে যাওয়া ছাতাটি ফিরিয়ে আনেন।" },
      { de: "Ich muss meinen Ausweis zeigen und zehn Euro Bearbeitungsgebühr bezahlen.", en: "I have to show my ID card and pay a ten-euro processing fee.", bn: "আমাকে আমার পরিচয়পত্র দেখাতে হয় এবং দশ ইউরো প্রসেসিং ফি দিতে হয়।" },
      { de: "Ich bin sehr erleichtert, weil dieser Schirm ein Geschenk von meinem Vater war.", en: "I am very relieved because this umbrella was a gift from my father.", bn: "আমি খুব স্বস্তি পেয়েছি, কারণ এই ছাতাটি আমার বাবার দেওয়া উপহার ছিল।" }
    ],
    dictionary: {}
  },
  {
    id: "passage-a2-40",
    level: "A2",
    category: "Complete A2 Recap & Future Outlook",
    titleDe: "40. Bereit für das Niveau B1!",
    titleEn: "Ready for Level B1!",
    titleBn: "বি১ (B1) স্তরের জন্য প্রস্তুত!",
    readingTimeMinutes: 3,
    sentences: [
      { de: "Heute habe ich meine letzte Unterrichtsstunde im A2-Deutschkurs abgeschlossen.", en: "Today I finished my last lesson in the A2 German course.", bn: "আজ আমি আমার এ২ জার্মান কোর্সের শেষ ক্লাসটি সম্পন্ন করেছি।" },
      { de: "Wenn ich zurückblicke, bin ich wirklich erstaunt, wie viel ich gelernt habe.", en: "When I look back, I am really amazed at how much I have learned.", bn: "যখন আমি পেছনের দিকে তাকাই, তখন আমি সত্যিই অবাক হই যে আমি কত কিছু শিখেছি।" },
      { de: "Ich kann jetzt komplexe Sätze mit Nebensätzen bilden und meine Meinung begründen.", en: "I can now form complex sentences with subordinate clauses and justify my opinion.", bn: "আমি এখন অধীন বাক্য (Nebensätze) দিয়ে জটিল বাক্য তৈরি করতে পারি এবং আমার মতামতের পক্ষে যুক্তি দিতে পারি।" },
      { de: "Auch im Alltag fühle ich mich viel sicherer, wenn ich mit Behörden oder Ärzten spreche.", en: "Also in everyday life I feel much more confident when I speak with authorities or doctors.", bn: "এছাড়া দৈনন্দিন জীবনে সরকারি অফিস বা ডাক্তারদের সাথে কথা বলার সময় আমি অনেক বেশি আত্মবিশ্বাসী বোধ করি।" },
      { de: "Meine Lehrerin hat uns heute viele Tipps gegeben, wie wir uns optimal auf die Prüfung vorbereiten.", en: "Today our teacher gave us many tips on how we can prepare optimally for the exam.", bn: "আমাদের শিক্ষিকা আজ আমাদের অনেক পরামর্শ দিয়েছেন কীভাবে আমরা পরীক্ষার জন্য সর্বোত্তম প্রস্তুতি নিতে পারি।" },
      { de: "Am Wochenende werde ich noch einmal alle wichtigen Grammatikregeln und Verben wiederholen.", en: "On the weekend I will review all important grammar rules and verbs once more.", bn: "সপ্তাহান্তে আমি আরও একবার সব গুরুত্বপূর্ণ ব্যাকরণের নিয়ম এবং ক্রিয়াগুলো পুনরাবৃত্তি করব।" },
      { de: "Nächsten Monat beginnt dann schon mein neuer B1-Kurs an der Volkshochschule.", en: "Next month my new B1 course at the adult education center already begins.", bn: "আগামী মাসেই ভোকসহকশুলে-তে (VHS) আমার নতুন বি১ কোর্স শুরু হবে।" },
      { de: "Ich weiß, dass die Texte und Themen auf dem Niveau B1 noch anspruchsvoller werden.", en: "I know that the texts and topics at level B1 will become even more demanding.", bn: "আমি জানি যে বি১ স্তরের লেখা এবং বিষয়গুলো আরও বেশি চ্যালেঞ্জিং হবে।" },
      { de: "Aber mit einer guten Lernroutine und viel Geduld werde ich auch diese Stufe meistern.", en: "But with a good study routine and a lot of patience I will master this level too.", bn: "কিন্তু একটি ভালো পড়াশোনার রুটিন এবং প্রচুর ধৈর্যের মাধ্যমে আমি এই স্তরটিও জয় করব।" },
      { de: "Das Lernen einer neuen Sprache öffnet mir jeden Tag neue Türen in Deutschland!", en: "Learning a new language opens new doors for me in Germany every day!", bn: "একটি নতুন ভাষা শেখা জার্মানিতে প্রতিদিন আমার জন্য নতুন নতুন দরজা খুলে দিচ্ছে!" }
    ],
    dictionary: {}
  },

  // ===================== B1 (40 Passages) =====================
  {
    id: "passage-b1-1",
    level: "B1",
    category: "Präteritum",
    titleDe: "Eine unerwartete Begegnung",
    titleEn: "An Unexpected Encounter",
    titleBn: "একটি অপ্রত্যাশিত সাক্ষাৎ",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Gestern Nachmittag ging ich nach der Vorlesung gemütlich durch die Frankfurter Innenstadt.",
        en: "Yesterday afternoon I walked leisurely through downtown Frankfurt after the lecture.",
        bn: "গতকাল বিকেলে লেকচারের পর আমি ফ্রাঙ্কফুর্টের শহরের কেন্দ্র দিয়ে ধীরেসুস্থে হাঁটছিলাম।"
      },
      {
        de: "Die Sonne schien warm, obwohl es schon Mitte Oktober war.",
        en: "The sun was shining warmly, although it was already mid-October.",
        bn: "অক্টোবরের মাঝামাঝি হওয়া সত্ত্বেও সূর্য উষ্ণ কিরণ দিচ্ছিল।"
      },
      {
        de: "Plötzlich sah ich vor einem kleinen Buchladen ein bekanntes Gesicht.",
        en: "Suddenly I saw a familiar face in front of a small bookstore.",
        bn: "হঠাৎ একটি ছোট বইয়ের দোকানের সামনে আমি একটি পরিচিত মুখ দেখতে পেলাম।"
      },
      {
        de: "Es war mein alter Schulfreund Tariq, den ich seit fünf Jahren nicht mehr getroffen hatte.",
        en: "It was my old school friend Tariq, whom I had not met for five years.",
        bn: "সে ছিল আমার পুরনো স্কুলবন্ধু তারিক, যার সাথে পাঁচ বছর ধরে আমার দেখা হয়নি।"
      },
      {
        de: "Ich rief seinen Namen laut und lief schnell zu ihm hinüber.",
        en: "I called his name loudly and ran quickly over to him.",
        bn: "আমি জোরে তার নাম ধরে ডাকলাম এবং দ্রুত তার দিকে ছুটে গেলাম।"
      },
      {
        de: "Tariq drehte sich überrascht um und erkannte mich sofort.",
        en: "Tariq turned around surprised and recognized me immediately.",
        bn: "তারিক অবাক হয়ে পেছনে তাকাল এবং সাথে সাথেই আমাকে চিনতে পারল।"
      },
      {
        de: "Wir umarmten uns herzlich und beschlossen, gemeinsam einen Kaffee zu trinken.",
        en: "We hugged each other warmly and decided to drink a coffee together.",
        bn: "আমরা আন্তরিকভাবে কোলাকুলি করলাম এবং একসাথে কফি পান করার সিদ্ধান্ত নিলাম।"
      },
      {
        de: "In einem ruhigen Café erzählten wir uns alles über unser Leben in den letzten Jahren.",
        en: "In a quiet café we told each other everything about our lives over the last few years.",
        bn: "একটি শান্ত ক্যাফেতে বসে আমরা গত কয়েক বছরের জীবনের সব গল্প একে অপরকে শোনালাম।"
      },
      {
        de: "Es stellte sich heraus, dass er erst vor zwei Wochen für seinen Master nach Deutschland gekommen war.",
        en: "It turned out that he had come to Germany for his master's degree only two weeks ago.",
        bn: "জানা গেল যে সে মাত্র দুই সপ্তাহ আগে তার মাস্টার্স ডিগ্রির জন্য জার্মানিতে এসেছে।"
      },
      {
        de: "Wir tauschten unsere Telefonnummern aus und versprachen, uns ab jetzt regelmäßig zu treffen.",
        en: "We exchanged our phone numbers and promised to meet regularly from now on.",
        bn: "আমরা আমাদের ফোন নম্বর বিনিময় করলাম এবং এখন থেকে নিয়মিত দেখা করার প্রতিশ্রুতি দিলাম।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-2",
    level: "B1",
    category: "Plusquamperfekt & nachdem",
    titleDe: "Nachdem der Zug abgefahren war",
    titleEn: "After the Train Had Departed",
    titleBn: "ট্রেনটি ছেড়ে যাওয়ার পর",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Letzten Freitag wollte ich meinen Bruder in Berlin besuchen.",
        en: "Last Friday I wanted to visit my brother in Berlin.",
        bn: "গত শুক্রবার আমি বার্লিনে আমার ভাইয়ের সাথে দেখা করতে চেয়েছিলাম।"
      },
      {
        de: "Nachdem ich meinen Koffer sorgfältig gepackt hatte, fuhr ich mit der U-Bahn zum Hauptbahnhof.",
        en: "After I had carefully packed my suitcase, I took the subway to the central station.",
        bn: "যত্নসহকারে আমার স্যুটকেস গোছানোর পর আমি সাবওয়েতে করে প্রধান রেলস্টেশনে গেলাম।"
      },
      {
        de: "Leider gab es auf der Strecke eine technische Störung, weshalb die Bahn zwanzig Minuten stehen blieb.",
        en: "Unfortunately there was a technical fault on the track, which is why the train stood still for twenty minutes.",
        bn: "দুর্ভাগ্যবশত রেললাইনে একটি যান্ত্রিক ত্রুটি দেখা দিয়েছিল, যে কারণে ট্রেনটি বিশ মিনিট দাঁড়িয়ে ছিল।"
      },
      {
        de: "Als ich endlich völlig außer Atem am Gleis ankam, war mein ICE gerade abgefahren.",
        en: "When I finally arrived at the platform completely out of breath, my ICE train had just departed.",
        bn: "আমি যখন অবশেষে হাঁপাতে হাঁপাতে প্ল্যাটফর্মে পৌঁছালাম, তখন আমার আইসিই ট্রেনটি মাত্র ছেড়ে গিয়েছিল।"
      },
      {
        de: "Ich ärgerte mich sehr, weil ich das Ticket schon vor zwei Monaten gebucht hatte.",
        en: "I was very annoyed because I had already booked the ticket two months ago.",
        bn: "আমি খুব বিরক্ত হয়েছিলাম, কারণ আমি দুই মাস আগেই টিকিটটি বুক করেছিলাম।"
      },
      {
        de: "Nachdem ich mich kurz beruhigt hatte, ging ich zum Reisezentrum der Deutschen Bahn.",
        en: "After I had calmed down briefly, I went to the Deutsche Bahn travel center.",
        bn: "কিছুক্ষণ নিজেকে শান্ত করার পর আমি ডয়চে বানের ট্রাভেল সেন্টারে গেলাম।"
      },
      {
        de: "Dort erklärte ich einer freundlichen Mitarbeiterin, was passiert war.",
        en: "There I explained to a friendly employee what had happened.",
        bn: "সেখানে আমি একজন আন্তরিক মহিলা কর্মীকে কী ঘটেছিল তা বুঝিয়ে বললাম।"
      },
      {
        de: "Da ich eine Flexpreis-Fahrkarte gekauft hatte, durfte ich problemlos den nächsten Zug nehmen.",
        en: "Since I had bought a flexible-fare ticket, I was allowed to take the next train without any problem.",
        bn: "যেহেতু আমি ফ্লেক্সিবল ভাড়ার টিকিট কিনেছিলাম, তাই কোনো সমস্যা ছাড়াই পরবর্তী ট্রেনে ওঠার অনুমতি পেলাম।"
      },
      {
        de: "Nachdem ich zwei Stunden im Bahnhofscafé gewartet hatte, stieg ich schließlich in den nächsten ICE ein.",
        en: "After I had waited two hours in the station café, I finally boarded the next ICE.",
        bn: "স্টেশন ক্যাফেতে দুই ঘণ্টা অপেক্ষা করার পর অবশেষে আমি পরবর্তী আইসিই ট্রেনে উঠলাম।"
      },
      {
        de: "Trotz der Verspätung erreichte ich Berlin noch rechtzeitig zum gemeinsamen Abendessen.",
        en: "Despite the delay, I reached Berlin still in time for dinner together.",
        bn: "দেরি হওয়া সত্ত্বেও আমি একসাথে রাতের খাবার খাওয়ার ঠিক সময়েই বার্লিনে পৌঁছেছিলাম।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-3",
    level: "B1",
    category: "Passiv",
    titleDe: "Wie ein Smartphone hergestellt wird",
    titleEn: "How a Smartphone Is Manufactured",
    titleBn: "কীভাবে একটি স্মার্টফোন তৈরি করা হয়",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Moderne Smartphones werden heute von Milliarden Menschen auf der ganzen Welt genutzt.",
        en: "Modern smartphones are used today by billions of people all over the world.",
        bn: "আধুনিক স্মার্টফোন আজ সারা বিশ্বের কোটি কোটি মানুষ ব্যবহার করে।"
      },
      {
        de: "Doch nur wenige wissen, wie viele Arbeitsschritte für die Produktion nötig sind.",
        en: "Yet only a few know how many work steps are necessary for production.",
        bn: "তবে খুব কম মানুষই জানে যে এটি উৎপাদনের জন্য কতগুলো ধাপ প্রয়োজন।"
      },
      {
        de: "Zuerst werden wertvolle Rohstoffe wie Lithium und Kobalt in verschiedenen Ländern abgebaut.",
        en: "First, valuable raw materials such as lithium and cobalt are mined in various countries.",
        bn: "প্রথমে বিভিন্ন দেশে লিথিয়াম এবং কোবাল্টের মতো মূল্যবান কাঁচামাল খনি থেকে উত্তোলন করা হয়।"
      },
      {
        de: "Danach werden die winzigen Mikrochips in hochmodernen Fabriken unter strengen Bedingungen produziert.",
        en: "Afterward, the tiny microchips are produced in ultra-modern factories under strict conditions.",
        bn: "এরপর কঠোর পরিবেশে অত্যাধুনিক কারখানায় ক্ষুদ্র মাইক্রোচিপগুলো তৈরি করা হয়।"
      },
      {
        de: "Alle Einzelteile werden anschließend zu großen Montagewerken in Asien transportiert.",
        en: "All individual parts are subsequently transported to large assembly plants in Asia.",
        bn: "পরবর্তীতে সব আলাদা যন্ত্রাংশ এশিয়ার বড় অ্যাসেম্বলি কারখানাগুলোতে পরিবহন করা হয়।"
      },
      {
        de: "Dort wird das Gehäuse zusammengebaut und der empfindliche Bildschirm eingesetzt.",
        en: "There the casing is assembled and the sensitive screen is inserted.",
        bn: "সেখানে ফোনের কাঠামো জোড়া লাগানো হয় এবং সংবেদনশীল স্ক্রিনটি বসানো হয়।"
      },
      {
        de: "Bevor das Gerät verpackt wird, muss jede Funktion genau geprüft werden.",
        en: "Before the device is packaged, every function must be tested precisely.",
        bn: "ডিভাইসটি প্যাকেটজাত করার আগে প্রতিটি ফাংশন নিখুঁতভাবে পরীক্ষা করতে হয়।"
      },
      {
        de: "Wenn alle Tests erfolgreich abgeschlossen sind, ist das Smartphone bereit für den Verkauf.",
        en: "When all tests are successfully completed, the smartphone is ready for sale.",
        bn: "যখন সব পরীক্ষা সফলভাবে সম্পন্ন হয়, তখন স্মার্টফোনটি বিক্রির জন্য প্রস্তুত থাকে।"
      },
      {
        de: "Schließlich werden Millionen Geräte per Schiff oder Flugzeug nach Europa geliefert.",
        en: "Finally, millions of devices are delivered to Europe by ship or airplane.",
        bn: "অবশেষে জাহাজ বা উড়োজাহাজে করে লক্ষ লক্ষ ডিভাইস ইউরোপে পাঠানো হয়।"
      },
      {
        de: "Im Geschäft werden sie dann von begeisterten Kunden gekauft und sofort eingerichtet.",
        en: "In the store they are then bought by enthusiastic customers and set up immediately.",
        bn: "দোকানে তখন আগ্রহী ক্রেতারা সেগুলো কেনেন এবং সাথে সাথেই সেটআপ করেন।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-4",
    level: "B1",
    category: "Genitiv & Präpositionen",
    titleDe: "Wegen des schlechten Wetters",
    titleEn: "Because of the Bad Weather",
    titleBn: "খারাপ আবহাওয়ার কারণে",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Für das letzte Wochenende hatten wir eigentlich eine große Wanderung im Taunus geplant.",
        en: "For last weekend we had actually planned a big hike in the Taunus mountains.",
        bn: "গত সপ্তাহান্তের জন্য আমরা আসলে টাউনাস পর্বতমালায় একটি বড় হাইকিংয়ের পরিকল্পনা করেছিলাম।"
      },
      {
        de: "Doch wegen des starken Sturms mussten wir unseren Ausflug leider absagen.",
        en: "Yet because of the strong storm we unfortunately had to cancel our trip.",
        bn: "কিন্তু প্রবল ঝড়ের কারণে দুর্ভাগ্যবশত আমাদের ভ্রমণটি বাতিল করতে হলো।"
      },
      {
        de: "Trotz der Enttäuschung beschlossen wir, das Beste aus dem verregneten Tag zu machen.",
        en: "Despite the disappointment, we decided to make the best of the rainy day.",
        bn: "হতাশা সত্ত্বেও আমরা বৃষ্টির দিনটিকে সেরা উপায়ে কাজে লাগানোর সিদ্ধান্ত নিলাম।"
      },
      {
        de: "Statt einer langen Bergtour besuchten wir das historische Museum in der Altstadt.",
        en: "Instead of a long mountain tour, we visited the historical museum in the old town.",
        bn: "দীর্ঘ পাহাড়ি ভ্রমণের পরিবর্তে আমরা পুরনো শহরের ঐতিহাসিক জাদুঘরটি পরিদর্শন করলাম।"
      },
      {
        de: "Während des interessanten Rundgangs erfuhren wir viel über die Geschichte der Region.",
        en: "During the interesting guided tour we learned a lot about the history of the region.",
        bn: "আকর্ষণীয় এই ভ্রমণের সময় আমরা অঞ্চলটির ইতিহাস সম্পর্কে অনেক কিছু জানতে পারলাম।"
      },
      {
        de: "Die Ausstellung der alten Gemälde beeindruckte besonders meine Frau.",
        en: "The exhibition of the old paintings particularly impressed my wife.",
        bn: "পুরনো চিত্রকর্মগুলোর প্রদর্শনী বিশেষ করে আমার স্ত্রীকে মুগ্ধ করেছিল।"
      },
      {
        de: "Nach dem Besuch des Museums gingen wir in ein traditionelles Restaurant.",
        en: "After the visit to the museum we went into a traditional restaurant.",
        bn: "জাদুঘর পরিদর্শনের পর আমরা একটি ঐতিহ্যবাহী রেস্তোরাঁয় গেলাম।"
      },
      {
        de: "Trotz des hohen Preises bestellten wir ein typisches Frankfurter Gericht.",
        en: "Despite the high price, we ordered a typical Frankfurt dish.",
        bn: "উচ্চ মূল্য সত্ত্বেও আমরা ফ্রাঙ্কফুর্টের একটি ঐতিহ্যবাহী খাবার অর্ডার করলাম।"
      },
      {
        de: "Während des Essens beobachteten wir durch das Fenster die nassen Straßen draußen.",
        en: "During the meal we watched the wet streets outside through the window.",
        bn: "খাওয়ার সময় আমরা জানালা দিয়ে বাইরের ভেজা রাস্তাগুলো দেখছিলাম।"
      },
      {
        de: "Am Ende waren wir froh, dass wir uns trotz des Wetters einen schönen Tag gemacht hatten.",
        en: "In the end we were glad that we had made ourselves a nice day despite the weather.",
        bn: "শেষ পর্যন্ত আমরা খুশি ছিলাম যে খারাপ আবহাওয়া সত্ত্বেও আমরা একটি সুন্দর দিন কাটাতে পেরেছি।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-5",
    level: "B1",
    category: "Finalsätze & Konzessivsätze",
    titleDe: "Ziele erreichen im Studium",
    titleEn: "Achieving Goals in Studies",
    titleBn: "পড়াশোনায় লক্ষ্য অর্জন",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Ein Studium im Ausland ist eine wunderbare Chance, erfordert aber auch viel Disziplin.",
        en: "Studying abroad is a wonderful opportunity, but it also requires a lot of discipline.",
        bn: "বিদেশে পড়াশোনা করা একটি চমৎকার সুযোগ, তবে এর জন্য প্রচুর শৃঙ্খলারও প্রয়োজন।"
      },
      {
        de: "Ich stehe jeden Morgen früh auf, um vor der Vorlesung noch eine Stunde zu lernen.",
        en: "I get up early every morning in order to study for another hour before the lecture.",
        bn: "লেকচারের আগে আরও এক ঘণ্টা পড়াশোনা করার উদ্দেশ্যে আমি প্রতিদিন সকালে তাড়াতাড়ি ঘুম থেকে উঠি।"
      },
      {
        de: "Außerdem schreibe ich mir alle wichtigen Termine in einen Kalender, damit ich nichts vergesse.",
        en: "In addition, I write all important dates into a calendar so that I do not forget anything.",
        bn: "তাছাড়া আমি সব গুরুত্বপূর্ণ তারিখ একটি ক্যালেন্ডারে লিখে রাখি, যাতে আমি কোনো কিছু ভুলে না যাই।"
      },
      {
        de: "Obwohl die Fachliteratur auf Deutsch manchmal kompliziert ist, lese ich jeden Tag ein Kapitel.",
        en: "Although the specialized literature in German is sometimes complicated, I read one chapter every day.",
        bn: "যদিও জার্মান ভাষার বিষয়ভিত্তিক বইগুলো মাঝে মাঝে জটিল মনে হয়, তবুও আমি প্রতিদিন একটি করে অধ্যায় পড়ি।"
      },
      {
        de: "Ich habe mir eine Lerngruppe gesucht, damit wir uns gegenseitig vor den Prüfungen helfen können.",
        en: "I looked for a study group so that we can help each other before the exams.",
        bn: "আমি একটি স্টাডি গ্রুপ খুঁজে নিয়েছি, যাতে পরীক্ষার আগে আমরা একে অপরকে সাহায্য করতে পারি।"
      },
      {
        de: "Wir treffen uns zweimal pro Woche, um schwierige Aufgaben gemeinsam zu lösen.",
        en: "We meet twice a week in order to solve difficult tasks together.",
        bn: "কঠিন কাজগুলো একসাথে সমাধান করার উদ্দেশ্যে আমরা সপ্তাহে দুবার মিলিত হই।"
      },
      {
        de: "Obwohl ich nebenbei auch noch arbeite, habe ich bisher alle Klausuren bestanden.",
        en: "Although I also work on the side, I have passed all exams so far.",
        bn: "যদিও আমি পাশাপাশি কাজও করি, তবুও এখন পর্যন্ত সব পরীক্ষায় উত্তীর্ণ হয়েছি।"
      },
      {
        de: "Meine Eltern unterstützen mich moralisch, damit ich auch in stressigen Phasen motiviert bleibe.",
        en: "My parents support me morally so that I stay motivated even in stressful phases.",
        bn: "আমার বাবা-মা আমাকে মানসিকভাবে সমর্থন দেন, যাতে চাপের সময়গুলোতেও আমি অনুপ্রাণিত থাকি।"
      },
      {
        de: "Manchmal verzichte ich am Wochenende auf Partys, um genug Zeit für meine Hausarbeiten zu haben.",
        en: "Sometimes I skip parties on the weekend in order to have enough time for my term papers.",
        bn: "অ্যাসাইনমেন্টের জন্য পর্যাপ্ত সময় পাওয়ার উদ্দেশ্যে আমি মাঝে মাঝে সপ্তাহান্তে পার্টি বাদ দিই।"
      },
      {
        de: "Wer ein klares Ziel vor Augen hat, schafft es auch, große Hindernisse zu überwinden.",
        en: "Whoever has a clear goal in mind also manages to overcome big obstacles.",
        bn: "যার সামনে একটি স্পষ্ট লক্ষ্য থাকে, সে বড় বাধাগুলোও অতিক্রম করতে সক্ষম হয়।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-6",
    level: "B1",
    category: "Zweiteilige Konjunktionen",
    titleDe: "Homeoffice oder Büro?",
    titleEn: "Working from Home or Office?",
    titleBn: "হোম অফিস নাকি অফিস?",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "In der modernen Arbeitswelt wird viel darüber diskutiert, ob Homeoffice besser als Büroarbeit ist.",
        en: "In the modern working world there is much discussion about whether working from home is better than office work.",
        bn: "আধুনিক কর্মজগতে হোম অফিস নাকি অফিসের কাজ ভালো, তা নিয়ে অনেক আলোচনা হয়।"
      },
      {
        de: "Das Arbeiten von zu Hause bietet sowohl zeitliche Flexibilität als auch eine ruhige Arbeitsumgebung.",
        en: "Working from home offers both temporal flexibility and a quiet working environment.",
        bn: "বাড়ি থেকে কাজ করা সময়ের নমনীয়তা এবং একটি শান্ত কাজের পরিবেশ উভয়ই প্রদান করে।"
      },
      {
        de: "Man verliert weder Zeit im morgendlichen Berufsverkehr noch Geld für teure Fahrkarten.",
        en: "One loses neither time in morning rush-hour traffic nor money for expensive tickets.",
        bn: "এতে সকালের অফিস সময়ের যানজটে সময় নষ্ট হয় না, আবার দামি টিকিটের জন্য টাকাও খরচ হয় না।"
      },
      {
        de: "Allerdings hat das Büro nicht nur soziale Vorteile, sondern auch eine bessere technische Ausstattung.",
        en: "However, the office has not only social advantages, but also better technical equipment.",
        bn: "তবে অফিসের শুধু সামাজিক সুবিধাই নেই, বরং উন্নত কারিগরি সরঞ্জামও রয়েছে।"
      },
      {
        de: "Im direkten Gespräch mit Kollegen lassen sich Probleme oft entweder schneller lösen oder ganz vermeiden.",
        en: "In direct conversation with colleagues, problems can often either be solved faster or avoided completely.",
        bn: "সহকর্মীদের সাথে সরাসরি কথা বললে সমস্যাগুলো প্রায়ই হয় দ্রুত সমাধান করা যায় অথবা পুরোপুরি এড়ানো যায়।"
      },
      {
        de: "Mein Chef findet, dass eine Mischung aus beidem zwar organisatorischen Aufwand bedeutet, aber die Mitarbeiter zufriedener macht.",
        en: "My boss thinks that a mix of both admittedly means organizational effort, but makes employees more satisfied.",
        bn: "আমার বস মনে করেন যে দুটির সংমিশ্রণে যদিও সাংগঠনিক পরিশ্রম হয়, কিন্তু এটি কর্মীদের আরও বেশি সন্তুষ্ট করে।"
      },
      {
        de: "Je besser die Kommunikation im Team funktioniert, desto erfolgreicher sind unsere gemeinsamen Projekte.",
        en: "The better communication works in the team, the more successful our joint projects are.",
        bn: "দলে যোগাযোগ যত ভালোভাবে কাজ করে, আমাদের যৌথ প্রকল্পগুলো তত বেশি সফল হয়।"
      },
      {
        de: "Deshalb arbeite ich montags und dienstags im Büro und bleibe den Rest der Woche zu Hause.",
        en: "Therefore I work in the office on Mondays and Tuesdays and stay at home the rest of the week.",
        bn: "তাই আমি সোমবার ও মঙ্গলবার অফিসে কাজ করি এবং সপ্তাহের বাকি দিনগুলো বাড়িতে থাকি।"
      },
      {
        de: "Weder meine Produktivität noch der Kontakt zum Team leiden unter diesem hybriden Modell.",
        en: "Neither my productivity nor contact with the team suffers under this hybrid model.",
        bn: "এই হাইব্রিড মডেলে আমার উৎপাদনশীলতা বা দলের সাথে যোগাযোগ কোনোটিই ক্ষতিগ্রস্ত হয় না।"
      },
      {
        de: "Je länger ich so arbeite, desto mehr schätze ich diese moderne Freiheit.",
        en: "The longer I work like this, the more I appreciate this modern freedom.",
        bn: "আমি যত বেশি দিন এভাবে কাজ করছি, ততই এই আধুনিক স্বাধীনতাকে উপলব্ধি করছি।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-7",
    level: "B1",
    category: "Relativsätze",
    titleDe: "Menschen, die mich inspirieren",
    titleEn: "People Who Inspire Me",
    titleBn: "যে মানুষেরা আমাকে অনুপ্রাণিত করেন",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Im Leben begegnet man manchmal Menschen, deren Geschichten einen tief beeindrucken.",
        en: "In life one sometimes meets people whose stories deeply impress one.",
        bn: "জীবনে মাঝে মাঝে এমন মানুষের সাথে দেখা হয়, যাদের গল্প আমাদের গভীরভাবে মুগ্ধ করে।"
      },
      {
        de: "Meine Nachbarin Frau Lindner ist eine ältere Dame, mit der ich mich oft im Garten unterhalte.",
        en: "My neighbor Ms. Lindner is an elderly lady with whom I often chat in the garden.",
        bn: "আমার প্রতিবেশী মিসেস লিন্ডনার একজন বয়স্ক ভদ্রমহিলা, যাঁর সাথে আমি প্রায়ই বাগানে গল্প করি।"
      },
      {
        de: "Sie hat einen Sohn, dessen Firma weltweit erfolgreiche Umweltprojekte entwickelt.",
        en: "She has a son whose company develops successful environmental projects worldwide.",
        bn: "তাঁর একটি ছেলে আছে, যার কোম্পানি বিশ্বজুড়ে সফল পরিবেশগত প্রকল্প তৈরি করে।"
      },
      {
        de: "Außerdem engagiert sie sich in einem Verein, der neu angekommenen Migranten bei Behördengängen hilft.",
        en: "In addition, she is involved in an association that helps newly arrived migrants with visits to authorities.",
        bn: "তাছাড়া তিনি এমন একটি সংগঠনের সাথে যুক্ত আছেন, যা নতুন আসা অভিবাসীদের সরকারি অফিসের কাজে সাহায্য করে।"
      },
      {
        de: "Gestern stellte sie mir einen jungen Mann vor, dem sie beim Deutschlernen geholfen hatte.",
        en: "Yesterday she introduced me to a young man whom she had helped with learning German.",
        bn: "গতকাল তিনি আমাকে এমন এক তরুণের সাথে পরিচয় করিয়ে দিলেন, যাকে তিনি জার্মান শিখতে সাহায্য করেছিলেন।"
      },
      {
        de: "Das sind genau die Menschen, denen unsere Gesellschaft viel zu verdanken hat.",
        en: "Those are precisely the people to whom our society owes a great deal.",
        bn: "এঁরাই ঠিক সেই মানুষ, যাঁদের কাছে আমাদের সমাজ অনেক ঋণী।"
      },
      {
        de: "Im Wohnzimmer von Frau Lindner steht ein altes Klavier, auf dem sie jeden Nachmittag klassische Musik spielt.",
        en: "In Ms. Lindner's living room stands an old piano on which she plays classical music every afternoon.",
        bn: "মিসেস লিন্ডনারের বসার ঘরে একটি পুরনো পিয়ানো আছে, যেটিতে তিনি প্রতিদিন বিকেলে ধ্রুপদী সংগীত বাজান।"
      },
      {
        de: "Die Bücher, aus denen sie mir manchmal vorliest, stammen noch aus ihrer Studienzeit.",
        en: "The books from which she sometimes reads aloud to me still date back to her university days.",
        bn: "তিনি মাঝে মাঝে যে বইগুলো থেকে আমাকে পড়ে শোনান, সেগুলো তাঁর ছাত্রজীবনের।"
      },
      {
        de: "Es gibt nur wenige Personen, vor denen ich so großen Respekt habe wie vor ihr.",
        en: "There are only a few people for whom I have as much respect as for her.",
        bn: "এমন খুব কম মানুষই আছেন, যাঁদের প্রতি আমার তাঁর মতো এত গভীর শ্রদ্ধা রয়েছে।"
      },
      {
        de: "Solche Vorbilder zeigen mir, wie wichtig Hilfsbereitschaft und Offenheit im Alltag sind.",
        en: "Such role models show me how important helpfulness and openness are in everyday life.",
        bn: "এই ধরনের আদর্শ মানুষেরা আমাকে দেখান যে দৈনন্দিন জীবনে পরোপকারিতা এবং উদারতা কতটা গুরুত্বপূর্ণ।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-8",
    level: "B1",
    category: "Konjunktiv II",
    titleDe: "Wenn ich im Lotto gewinnen würde",
    titleEn: "If I Won the Lottery",
    titleBn: "আমি যদি লটারি জিততাম",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Gestern Abend saßen meine Freunde und ich zusammen und träumten von der Zukunft.",
        en: "Last night my friends and I sat together and dreamed of the future.",
        bn: "গতকাল সন্ধ্যায় আমি এবং আমার বন্ধুরা একসাথে বসে ভবিষ্যতের স্বপ্ন দেখছিলাম।"
      },
      {
        de: "Wir fragten uns, was wir tun würden, wenn wir plötzlich eine Million Euro gewinnen würden.",
        en: "We asked ourselves what we would do if we suddenly won a million euros.",
        bn: "আমরা নিজেদের জিজ্ঞাসা করছিলাম, হঠাৎ যদি আমরা এক মিলিয়ন ইউরো জিতে যেতাম, তবে আমরা কী করতাম।"
      },
      {
        de: "Ich sagte, ich würde zuerst meinen Eltern in Bangladesch ein großes Haus kaufen.",
        en: "I said I would first buy my parents in Bangladesh a big house.",
        bn: "আমি বললাম, আমি প্রথমে বাংলাদেশে আমার বাবা-মায়ের জন্য একটি বড় বাড়ি কিনতাম।"
      },
      {
        de: "Außerdem würde ich eine eigene Softwarefirma gründen, wenn ich genug Startkapital hätte.",
        en: "In addition, I would found my own software company if I had enough starting capital.",
        bn: "তাছাড়া আমার কাছে পর্যাপ্ত মূলধন থাকলে আমি নিজের একটি সফটওয়্যার কোম্পানি প্রতিষ্ঠা করতাম।"
      },
      {
        de: "Mein Freund Lukas meinte, er wäre sofort für ein Jahr um die Welt gereist.",
        en: "My friend Lukas said he would have immediately traveled around the world for a year.",
        bn: "আমার বন্ধু লুকাস বলল, সে সাথে সাথেই এক বছরের জন্য বিশ্বভ্রমণে বেরিয়ে পড়ত।"
      },
      {
        de: "Wenn ich schon früher mit dem Sparen angefangen hätte, hätte ich heute sicher ein größeres Polster.",
        en: "If I had started saving earlier, I would surely have a bigger financial cushion today.",
        bn: "আমি যদি আরও আগে থেকে সঞ্চয় শুরু করতাম, তবে আজ নিশ্চিতভাবেই আমার কাছে আরও বেশি সঞ্চয় থাকত।"
      },
      {
        de: "Aber wir waren uns einig, dass Geld allein nicht glücklich macht.",
        en: "But we agreed that money alone does not make one happy.",
        bn: "কিন্তু আমরা একমত হলাম যে শুধু টাকা মানুষকে সুখী করতে পারে না।"
      },
      {
        de: "Wenn man keine guten Freunde und keine Gesundheit hätte, wäre der ganze Reichtum wertlos.",
        en: "If one had no good friends and no health, all the wealth would be worthless.",
        bn: "মানুষের যদি ভালো বন্ধু এবং সুস্বাস্থ্য না থাকত, তবে সব সম্পদ মূল্যহীন হতো।"
      },
      {
        de: "Trotzdem wäre es natürlich schön, sich keine Sorgen mehr um die Miete machen zu müssen.",
        en: "Nevertheless, it would of course be nice not to have to worry about rent anymore.",
        bn: "তবুও বাড়িভাড়া নিয়ে আর চিন্তা করতে না হলে ব্যাপারটা অবশ্যই দারুণ হতো।"
      },
      {
        de: "Am Ende lachten wir und beschlossen, lieber fleißig für unseren eigenen Erfolg zu arbeiten.",
        en: "In the end we laughed and decided to rather work diligently for our own success.",
        bn: "শেষ পর্যন্ত আমরা হাসলাম এবং নিজেদের সাফল্যের জন্য মনোযোগ দিয়ে কাজ করার সিদ্ধান্ত নিলাম।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-9",
    level: "B1",
    category: "Infinitivsätze",
    titleDe: "Ein unhöflicher Besuch",
    titleEn: "An Impolite Visit",
    titleBn: "একজন অভদ্র অতিথি",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Letzte Woche hatten wir Besuch von einem entfernten Bekannten, der sich sehr seltsam benahm.",
        en: "Last week we had a visit from a distant acquaintance who behaved very strangely.",
        bn: "গত সপ্তাহে আমাদের বাড়িতে এক দূরসম্পর্কের পরিচিত ব্যক্তি বেড়াতে এসেছিলেন, যিনি খুব অদ্ভুত আচরণ করেছিলেন।"
      },
      {
        de: "Er kam eine Stunde zu spät, ohne uns vorher kurz anzurufen.",
        en: "He arrived an hour late without calling us briefly beforehand.",
        bn: "আগে থেকে আমাদের সংক্ষেপে ফোন না করেই তিনি এক ঘণ্টা দেরিতে এসেছিলেন।"
      },
      {
        de: "Als er die Wohnung betrat, ging er direkt ins Wohnzimmer, ohne seine schmutzigen Schuhe auszuziehen.",
        en: "When he entered the apartment, he walked straight into the living room without taking off his dirty shoes.",
        bn: "ফ্ল্যাটে ঢোকার সময় নোংরা জুতো না খুলেই তিনি সরাসরি বসার ঘরে চলে গেলেন।"
      },
      {
        de: "Anstatt ein kleines Gastgeschenk mitzubringen, beschwerte er sich sofort über die engen Parkplätze vor dem Haus.",
        en: "Instead of bringing a small host gift, he immediately complained about the tight parking spaces in front of the house.",
        bn: "সামান্য কোনো উপহার নিয়ে আসার পরিবর্তে তিনি সাথে সাথেই বাড়ির সামনের সংকীর্ণ পার্কিং জায়গা নিয়ে অভিযোগ করতে শুরু করলেন।"
      },
      {
        de: "Während des Abendessens schaute er ununterbrochen auf sein Handy, anstatt sich mit uns zu unterhalten.",
        en: "During dinner he looked continuously at his mobile phone instead of conversing with us.",
        bn: "রাতের খাবারের সময় আমাদের সাথে গল্প করার পরিবর্তে তিনি একটানা তাঁর মোবাইল ফোনের দিকে তাকিয়ে ছিলেন।"
      },
      {
        de: "Er nahm sich das letzte Stück Kuchen, ohne die anderen Gäste zu fragen.",
        en: "He took the last piece of cake without asking the other guests.",
        bn: "অন্য অতিথিদের জিজ্ঞাসা না করেই তিনি কেকের শেষ টুকরোটি নিয়ে নিলেন।"
      },
      {
        de: "Als ich ihm einen Tee anbot, lehnte er ab, ohne „Danke“ zu sagen.",
        en: "When I offered him a tea, he declined without saying \"thank you\".",
        bn: "আমি যখন তাঁকে চা সাধলাম, তিনি \"ধন্যবাদ\" না বলেই তা প্রত্যাখ্যান করলেন।"
      },
      {
        de: "Nach zwei Stunden stand er plötzlich auf und ging, ohne sich richtig zu verabschieden.",
        en: "After two hours he suddenly stood up and left without saying goodbye properly.",
        bn: "দুই ঘণ্টা পর তিনি হঠাৎ উঠে দাঁড়ালেন এবং ঠিকমতো বিদায় না নিয়েই চলে গেলেন।"
      },
      {
        de: "Wir sahen uns nur sprachlos an und konnten dieses Verhalten kaum glauben.",
        en: "We just looked at each other speechlessly and could hardly believe this behavior.",
        bn: "আমরা কেবল নির্বাক হয়ে একে অপরের দিকে তাকালাম এবং এই আচরণ বিশ্বাসই করতে পারছিলাম না।"
      },
      {
        de: "Anstatt uns lange darüber zu ärgern, räumten wir zusammen auf und lachten schließlich darüber.",
        en: "Instead of being annoyed about it for long, we tidied up together and finally laughed about it.",
        bn: "এটি নিয়ে বেশিক্ষণ বিরক্ত হওয়ার পরিবর্তে আমরা একসাথে ঘর গোছালাম এবং অবশেষে বিষয়টি নিয়ে হাসলাম।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-10",
    level: "B1",
    category: "Partizipien als Adjektive",
    titleDe: "Ein Spaziergang durch den Park",
    titleEn: "A Walk Through the Park",
    titleBn: "পার্কের মধ্য দিয়ে হাঁটা",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Am Sonntagmorgen ging ich bei strahlendem Sonnenschein durch den großen Stadtpark.",
        en: "On Sunday morning I walked through the big city park in radiant sunshine.",
        bn: "রবিবার সকালে ঝলমলে রোদের মধ্যে আমি শহরের বড় পার্কটির মধ্য দিয়ে হাঁটছিলাম।"
      },
      {
        de: "Auf den gepflegten Wegen begegneten mir viele joggende Sportler und spazierende Familien.",
        en: "On the well-kept paths I encountered many jogging athletes and strolling families.",
        bn: "পরিপাটি রাস্তাগুলোতে অনেক দৌড়রত ক্রীড়াবিদ এবং ভ্রমণরত পরিবারের সাথে আমার দেখা হলো।"
      },
      {
        de: "Auf einer Bank saß eine ältere Frau, die den singenden Vögeln in den Bäumen zuhörte.",
        en: "On a bench sat an elderly woman listening to the singing birds in the trees.",
        bn: "একটি বেঞ্চে একজন বয়স্ক মহিলা বসে ছিলেন, যিনি গাছের ডালে গান গাওয়া পাখিদের ডাক শুনছিলেন।"
      },
      {
        de: "Neben dem kleinen Teich spielten mehrere lachende Kinder mit einem bunten Ball.",
        en: "Next to the small pond several laughing children were playing with a colorful ball.",
        bn: "ছোট পুকুরটির পাশে বেশ কয়েকজন হাস্যোজ্জ্বল শিশু একটি রঙিন বল নিয়ে খেলছিল।"
      },
      {
        de: "Ein erschöpfter Hund lag im Schatten und trank aus einer mitgebrachten Wasserschüssel.",
        en: "An exhausted dog lay in the shade and drank from a water bowl brought along.",
        bn: "একটি ক্লান্ত কুকুর ছায়ায় শুয়ে ছিল এবং সাথে আনা পানির বাটি থেকে পানি পান করছিল।"
      },
      {
        de: "Auf dem glitzernden Wasser schwammen einige weiße Schwäne majestätisch vorbei.",
        en: "On the glittering water some white swans swam majestically past.",
        bn: "চকচকে পানির ওপর দিয়ে কয়েকটি সাদা রাজহাঁস রাজকীয় ভঙ্গিতে সাঁতরে যাচ্ছিল।"
      },
      {
        de: "Plötzlich entdeckte ich unter einem blühenden Baum ein verlorenes Portemonnaie.",
        en: "Suddenly I discovered a lost wallet under a blooming tree.",
        bn: "হঠাৎ একটি ফুল ফোটা গাছের নিচে আমি একটি হারানো মানিব্যাগ দেখতে পেলাম।"
      },
      {
        de: "Ich hob die gefundene Geldbörse auf und sah mir den darin liegenden Ausweis an.",
        en: "I picked up the found purse and looked at the ID card lying inside it.",
        bn: "আমি কুড়িয়ে পাওয়া মানিব্যাগটি তুললাম এবং ভেতরে থাকা পরিচয়পত্রটি দেখলাম।"
      },
      {
        de: "Glücklicherweise entdeckte ich den suchenden Besitzer nur wenige Meter weiter auf dem Weg.",
        en: "Fortunately I spotted the searching owner only a few meters further down the path.",
        bn: "সৌভাগ্যবশত কয়েক মিটার দূরেই রাস্তায় আমি খুঁজতে থাকা মালিককে দেখতে পেলাম।"
      },
      {
        de: "Der erleichterte Mann bedankte sich herzlich und lud mich spontan auf ein Eis ein.",
        en: "The relieved man thanked me warmly and spontaneously invited me for an ice cream.",
        bn: "স্বস্তি পাওয়া লোকটি আমাকে আন্তরিক ধন্যবাদ জানালেন এবং তাৎক্ষণিকভাবে আমাকে আইসক্রিম খাওয়ার আমন্ত্রণ জানালেন।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-11",
    level: "B1",
    category: "N-Deklination",
    titleDe: "Im Kundengespräch",
    titleEn: "In a Client Conversation",
    titleBn: "ক্লায়েন্টের সাথে কথোপকথনে",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "In meinem Beruf habe ich täglich Kontakt mit vielen verschiedenen Menschen.",
        en: "In my profession I have daily contact with many different people.",
        bn: "আমার পেশায় প্রতিদিন অনেক বিভিন্ন মানুষের সাথে আমার যোগাযোগ হয়।"
      },
      {
        de: "Gestern besuchte ich einen wichtigen Kunden in seinem Büro in Wiesbaden.",
        en: "Yesterday I visited an important client in his office in Wiesbaden.",
        bn: "গতকাল আমি ভিসবাডেনে এক গুরুত্বপূর্ণ ক্লায়েন্টের অফিসে গিয়েছিলাম।"
      },
      {
        de: "Am Empfang begrüßte mich ein freundlicher Herr und begleitete mich in den Konferenzraum.",
        en: "At the reception a friendly gentleman greeted me and accompanied me into the conference room.",
        bn: "রিসেপশনে একজন ভদ্রলোক আমাকে আন্তরিকভাবে অভিবাদন জানালেন এবং কনফারেন্স রুমে নিয়ে গেলেন।"
      },
      {
        de: "Dort stellte ich dem Kunden und seinem Kollegen unsere neue Softwarelösung vor.",
        en: "There I presented our new software solution to the client and his colleague.",
        bn: "সেখানে আমি ক্লায়েন্ট এবং তাঁর সহকর্মীর সামনে আমাদের নতুন সফটওয়্যার সমাধানটি উপস্থাপন করলাম।"
      },
      {
        de: "Da ich kein Experte für alle Steuerfragen bin, hatte ich einen Spezialisten mitgebracht.",
        en: "Since I am not an expert on all tax questions, I had brought a specialist along.",
        bn: "যেহেতু আমি সব কর-সংক্রান্ত বিষয়ের বিশেষজ্ঞ নই, তাই আমি একজন বিশেষজ্ঞকে সাথে নিয়ে গিয়েছিলাম।"
      },
      {
        de: "Der Kunde hörte dem Spezialisten aufmerksam zu und stellte viele kluge Fragen.",
        en: "The client listened attentively to the specialist and asked many smart questions.",
        bn: "ক্লায়েন্ট মনোযোগ দিয়ে বিশেষজ্ঞের কথা শুনলেন এবং অনেক বুদ্ধিদীপ্ত প্রশ্ন করলেন।"
      },
      {
        de: "Danach fragte ich den Praktikanten unserer Firma, ob er die Unterlagen kopieren könne.",
        en: "Afterward I asked the intern of our company whether he could copy the documents.",
        bn: "এরপর আমি আমাদের কোম্পানির ইন্টার্নকে জিজ্ঞাসা করলাম সে কাগজপত্রগুলো ফটোকপি করতে পারবে কিনা।"
      },
      {
        de: "Auf dem Rückweg traf ich im Zug einen alten Bekannten, der jetzt als Journalist arbeitet.",
        en: "On the way back I met an old acquaintance on the train who now works as a journalist.",
        bn: "ফেরার পথে ট্রেনে আমার এক পুরনো পরিচিতের সাথে দেখা হলো, যিনি এখন সাংবাদিক হিসেবে কাজ করেন।"
      },
      {
        de: "Wir sprachen über einen interessanten Artikel über einen jungen Präsidenten in Südamerika.",
        en: "We talked about an interesting article about a young president in South America.",
        bn: "আমরা দক্ষিণ আমেরিকার একজন তরুণ রাষ্ট্রপতি সম্পর্কে একটি আকর্ষণীয় নিবন্ধ নিয়ে কথা বললাম।"
      },
      {
        de: "Am Abend erzählte ich meinem Nachbarn, wie erfolgreich der Termin verlaufen war.",
        en: "In the evening I told my neighbor how successfully the appointment had gone.",
        bn: "সন্ধ্যায় আমি আমার প্রতিবেশীকে বললাম মিটিংটি কতটা সফলভাবে সম্পন্ন হয়েছে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-12",
    level: "B1",
    category: "Präpositionen",
    titleDe: "Der Weg zur Konferenz",
    titleEn: "The Way to the Conference",
    titleBn: "সম্মেলনে যাওয়ার পথ",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Letzten Monat nahm ich an einer großen IT-Konferenz in Düsseldorf teil.",
        en: "Last month I participated in a big IT conference in Düsseldorf.",
        bn: "গত মাসে আমি ডুসেলডর্ফে একটি বড় আইটি সম্মেলনে অংশ নিয়েছিলাম।"
      },
      {
        de: "Mein Hotel lag direkt dem Hauptbahnhof gegenüber, was sehr praktisch war.",
        en: "My hotel was located directly across from the central train station, which was very practical.",
        bn: "আমার হোটেলটি ঠিক প্রধান রেলস্টেশনের বিপরীতে অবস্থিত ছিল, যা খুব সুবিধাজনক ছিল।"
      },
      {
        de: "Morgens ging ich zu Fuß am Rhein vorbei zum modernen Kongresszentrum.",
        en: "In the morning I walked on foot past the Rhine to the modern convention center.",
        bn: "সকালে আমি রাইন নদীর পাশ দিয়ে হেঁটে আধুনিক কনভেনশন সেন্টারে গেলাম।"
      },
      {
        de: "Auf dem Weg musste ich durch einen langen Fußgängertunnel gehen.",
        en: "On the way I had to walk through a long pedestrian tunnel.",
        bn: "যাওয়ার পথে আমাকে একটি লম্বা পথচারী টানেলের মধ্য দিয়ে যেতে হয়েছিল।"
      },
      {
        de: "Innerhalb weniger Minuten erreichte ich das Gebäude und holte mein Namensschild ab.",
        en: "Within a few minutes I reached the building and picked up my name badge.",
        bn: "কয়েক মিনিটের মধ্যেই আমি ভবনে পৌঁছালাম এবং আমার নেম ব্যাজ সংগ্রহ করলাম।"
      },
      {
        de: "Im großen Saal saßen hunderte Teilnehmer um die runden Tische herum.",
        en: "In the big hall hundreds of participants sat around the round tables.",
        bn: "বড় হলরুমে শত শত অংশগ্রহণকারী গোল টেবিলগুলোর চারপাশে বসে ছিলেন।"
      },
      {
        de: "Als mein Name für den ersten Vortrag aufgerufen wurde, zitterte ich ein wenig vor Aufregung.",
        en: "When my name was called for the first presentation, I trembled a little with excitement.",
        bn: "প্রথম উপস্থাপনার জন্য যখন আমার নাম ডাকা হলো, আমি উত্তেজনায় একটু কাঁপছিলাম।"
      },
      {
        de: "Doch nach den ersten Sätzen sprach ich völlig ruhig und aus voller Überzeugung.",
        en: "Yet after the first sentences I spoke completely calmly and out of full conviction.",
        bn: "তবে প্রথম কয়েকটি বাক্যের পর আমি সম্পূর্ণ শান্তভাবে এবং পূর্ণ আত্মবিশ্বাসের সাথে কথা বললাম।"
      },
      {
        de: "Außerhalb der Vortragszeiten konnte ich viele wertvolle Kontakte zu anderen Entwicklern knüpfen.",
        en: "Outside of the lecture times I was able to make many valuable contacts with other developers.",
        bn: "লেকচারের সময়ের বাইরে আমি অন্যান্য ডেভেলপারদের সাথে অনেক মূল্যবান যোগাযোগ তৈরি করতে পেরেছিলাম।"
      },
      {
        de: "Am Ende des Tages strahlte ich vor Freude über das positive Feedback.",
        en: "At the end of the day I beamed with joy over the positive feedback.",
        bn: "দিনের শেষে ইতিবাচক প্রতিক্রিয়া পেয়ে আমি আনন্দে উজ্জ্বল হয়ে উঠেছিলাম।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-13",
    level: "B1",
    category: "Modalpartikeln",
    titleDe: "Ein Gespräch unter Freunden",
    titleEn: "A Conversation Among Friends",
    titleBn: "বন্ধুদের মাঝে কথোপকথন",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Am Samstagabend traf ich mich mit meinem Freund Jonas in unserer Lieblingspizzeria.",
        en: "On Saturday evening I met with my friend Jonas in our favorite pizzeria.",
        bn: "শনিবার সন্ধ্যায় আমি আমার বন্ধু জোনাসের সাথে আমাদের প্রিয় পিৎজা রেস্তোরাঁয় দেখা করলাম।"
      },
      {
        de: "Als ich ankam, rief er überrascht: „Du bist ja schon pünktlich da!“",
        en: "When I arrived, he called out surprised: \"Oh, you're already here on time!\"",
        bn: "আমি যখন পৌঁছালাম, সে অবাক হয়ে বলে উঠল: \"আরে, তুমি তো ঠিক সময়েই চলে এসেছ!\""
      },
      {
        de: "Ich lachte und antwortete: „Ich komme doch fast immer pünktlich, oder?“",
        en: "I laughed and answered: \"I almost always arrive on time, after all, don't I?\"",
        bn: "আমি হাসলাম এবং উত্তর দিলাম: \"আমি তো প্রায় সবসময়ই ঠিক সময়ে আসি, তাই না?\""
      },
      {
        de: "Wir setzten uns an einen freien Tisch und bestellten erst mal zwei kalte Getränke.",
        en: "We sat down at a free table and first ordered two cold drinks.",
        bn: "আমরা একটি খালি টেবিলে বসলাম এবং প্রথমে দুটি ঠান্ডা পানীয় অর্ডার করলাম।"
      },
      {
        de: "Dann fragte Jonas neugierig: „Wie läuft es denn eigentlich bei deinem neuen Job?“",
        en: "Then Jonas asked curiously: \"How is it actually going at your new job, then?\"",
        bn: "তারপর জোনাস কৌতূহলী হয়ে জিজ্ঞাসা করল: \"তা তোমার নতুন চাকরিতে সবকিছু আসলে কেমন চলছে?\""
      },
      {
        de: "Ich erzählte ihm, dass die Arbeit super ist, aber die Einarbeitung viel Zeit kostet.",
        en: "I told him that the work is great, but the onboarding takes a lot of time.",
        bn: "আমি তাকে বললাম যে কাজ দারুণ, তবে কাজ বুঝে নিতে অনেক সময় লাগছে।"
      },
      {
        de: "Jonas meinte: „Schau dir mal diesen neuen Projektplan an, den ich dir geschickt habe.“",
        en: "Jonas said: \"Just take a look at this new project plan that I sent you.\"",
        bn: "জোনাস বলল: \"আমি তোমাকে যে নতুন প্রজেক্ট প্ল্যানটি পাঠিয়েছি, সেটি একটু দেখো তো।\""
      },
      {
        de: "„Das habe ich doch gestern Abend schon gemacht“, erwiderte ich grinsend.",
        en: "\"I already did that last night, after all,\" I replied grinning.",
        bn: "\"আমি তো গতকাল রাতেই ওটা দেখে ফেলেছি,\" আমি মুচকি হেসে উত্তর দিলাম।"
      },
      {
        de: "„Ach ja, das hatte ich ganz vergessen“, sagte er und bestellte unsere Pizzen.",
        en: "\"Oh yes, I had completely forgotten that,\" he said and ordered our pizzas.",
        bn: "\"ওহ হ্যাঁ, আমি তো একদমই ভুলে গিয়েছিলাম,\" সে বলল এবং আমাদের পিৎজা অর্ডার করল।"
      },
      {
        de: "Solche entspannten Gespräche zeigen mir immer wieder, wie wertvoll echte Freundschaft ist.",
        en: "Such relaxed conversations show me time and again how valuable true friendship is.",
        bn: "এই ধরনের স্বচ্ছন্দ কথোপকথন আমাকে বারবার দেখিয়ে দেয় যে প্রকৃত বন্ধুত্ব কতটা মূল্যবান।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-14",
    level: "B1",
    category: "Reflexivpronomen",
    titleDe: "Reflexive Handlungen im Alltag",
    titleEn: "Reflexive Actions in Everyday Life",
    titleBn: "দৈনন্দিন জীবনে নিজের কাজগুলো",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Jeden Morgen nach dem Aufwachen habe ich eine feste Routine im Badezimmer.",
        en: "Every morning after waking up I have a fixed routine in the bathroom.",
        bn: "প্রতিদিন সকালে ঘুম থেকে ওঠার পর বাথরুমে আমার একটি নির্দিষ্ট রুটিন থাকে।"
      },
      {
        de: "Zuerst wasche ich mich gründlich mit kaltem Wasser, um richtig wach zu werden.",
        en: "First I wash myself thoroughly with cold water in order to wake up properly.",
        bn: "প্রথমে পুরোপুরি সজাগ হওয়ার জন্য আমি ঠান্ডা পানি দিয়ে ভালোভাবে হাত-মুখ ধুয়ে নিই।"
      },
      {
        de: "Danach putze ich mir drei Minuten lang sorgfältig die Zähne.",
        en: "Afterward I brush my teeth carefully for three minutes.",
        bn: "এরপর আমি তিন মিনিট ধরে যত্নসহকারে দাঁত ব্রাশ করি।"
      },
      {
        de: "Bevor ich mir die Haare kämme, rasiere ich mich noch schnell vor dem Spiegel.",
        en: "Before I comb my hair, I quickly shave in front of the mirror.",
        bn: "চুল আঁচড়ানোর আগে আমি আয়নার সামনে দ্রুত শেভ করে নিই।"
      },
      {
        de: "Im Schlafzimmer ziehe ich mir dann ein frisches Hemd und eine dunkle Hose an.",
        en: "In the bedroom I then put on a fresh shirt and dark trousers.",
        bn: "শোবার ঘরে গিয়ে আমি তখন একটি পরিষ্কার শার্ট এবং গাঢ় রঙের প্যান্ট পরি।"
      },
      {
        de: "Mein Mitbewohner Lukas beeilt sich morgens meistens nicht so sehr wie ich.",
        en: "My roommate Lukas usually does not hurry as much in the morning as I do.",
        bn: "আমার রুমমেট লুকাস সকালে সাধারণত আমার মতো এত তাড়াহুড়ো করে না।"
      },
      {
        de: "Er setzt sich erst einmal gemütlich an den Küchentisch und kocht sich einen starken Kaffee.",
        en: "He first sits down comfortably at the kitchen table and makes himself a strong coffee.",
        bn: "সে প্রথমে আরাম করে রান্নাঘরের টেবিলে বসে এবং নিজের জন্য কড়া এক কাপ কফি বানায়।"
      },
      {
        de: "Manchmal frage ich mich, wie er morgens immer so entspannt bleiben kann.",
        en: "Sometimes I ask myself how he can always stay so relaxed in the morning.",
        bn: "মাঝে মাঝে আমি নিজেকে প্রশ্ন করি যে সে সকালে সবসময় এত শান্ত থাকে কীভাবে।"
      },
      {
        de: "Wenn ich mir jedoch abends schon meine Kleidung bereitlege, spare ich morgens viel Zeit.",
        en: "However, if I already lay out my clothes in the evening, I save a lot of time in the morning.",
        bn: "তবে আমি যদি রাতেই আমার জামাকাপড় গুছিয়ে রাখি, তবে সকালে আমার অনেক সময় বেঁচে যায়।"
      },
      {
        de: "So kann ich mich in Ruhe auf den kommenden Arbeitstag vorbereiten.",
        en: "That way I can prepare myself in peace for the upcoming workday.",
        bn: "এভাবে আমি শান্ত মনে আসন্ন কর্মদিবসের জন্য নিজেকে প্রস্তুত করতে পারি।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-15",
    level: "B1",
    category: "Adjektivdeklination",
    titleDe: "Ein Blick in die Statistik",
    titleEn: "A Look at the Statistics",
    titleBn: "পরিসংখ্যানের দিকে এক নজর",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "In unserer letzten Unterrichtsstunde haben wir eine interessante Grafik über das Lernverhalten untersucht.",
        en: "In our last class lesson we examined an interesting chart about learning behavior.",
        bn: "আমাদের শেষ ক্লাসে আমরা শেখার অভ্যাস সম্পর্কে একটি আকর্ষণীয় গ্রাফ পরীক্ষা করেছি।"
      },
      {
        de: "Viele junge Menschen nutzen heute digitale Apps, um fremde Sprachen zu lernen.",
        en: "Many young people today use digital apps in order to learn foreign languages.",
        bn: "আজকাল অনেক তরুণ-তরুণী বিদেশি ভাষা শেখার জন্য ডিজিটাল অ্যাপ ব্যবহার করে।"
      },
      {
        de: "Einige Teilnehmer bevorzugen jedoch weiterhin klassische Lehrbücher aus gedrucktem Papier.",
        en: "Some participants, however, continue to prefer classic textbooks made of printed paper.",
        bn: "তবে কিছু অংশগ্রহণকারী এখনো ছাপানো কাগজের প্রথাগত পাঠ্যবই বেশি পছন্দ করে।"
      },
      {
        de: "Manche Studenten lernen am besten mit lautem Vorlesen und regelmäßigen Schreibübungen.",
        en: "Several students learn best with reading aloud and regular writing exercises.",
        bn: "বেশ কিছু শিক্ষার্থী জোরে পড়ে এবং নিয়মিত লেখার অনুশীলনের মাধ্যমে সবচেয়ে ভালো শেখে।"
      },
      {
        de: "Nur wenige Personen verlassen sich ausschließlich auf Filme ohne deutsche Untertitel.",
        en: "Only a few people rely exclusively on movies without German subtitles.",
        bn: "খুব কম মানুষই কেবল জার্মান সাবটাইটেল ছাড়া সিনেমার ওপর নির্ভর করে।"
      },
      {
        de: "Mit großem Interesse diskutierten wir über die Vor- und Nachteile moderner Lerntechnologien.",
        en: "With great interest we discussed the advantages and disadvantages of modern learning technologies.",
        bn: "গভীর আগ্রহের সাথে আমরা আধুনিক শিক্ষণ প্রযুক্তির সুবিধা এবং অসুবিধা নিয়ে আলোচনা করেছি।"
      },
      {
        de: "Alle Schüler waren sich einig, dass regelmäßiges Üben der wichtigste Faktor für Erfolg ist.",
        en: "All students agreed that regular practice is the most important factor for success.",
        bn: "সব শিক্ষার্থী একমত হয়েছিল যে নিয়মিত অনুশীলনই সাফল্যের সবচেয়ে গুরুত্বপূর্ণ উপাদান।"
      },
      {
        de: "Ohne tägliche Wiederholung vergisst man neue Vokabeln leider viel zu schnell.",
        en: "Without daily repetition one unfortunately forgets new vocabulary way too quickly.",
        bn: "প্রতিদিন পুনরাবৃত্তি না করলে দুর্ভাগ্যবশত নতুন শব্দগুলো খুব দ্রুত ভুলে যাওয়া হয়।"
      },
      {
        de: "Am Ende der Stunde hatten wir viele neue Ideen für unsere eigene Prüfungsvorbereitung.",
        en: "At the end of the lesson we had many new ideas for our own exam preparation.",
        bn: "ক্লাসের শেষে আমাদের নিজস্ব পরীক্ষার প্রস্তুতির জন্য অনেক নতুন ধারণা তৈরি হয়েছিল।"
      },
      {
        de: "Mit frischer Motivation gingen wir danach gemeinsam in die Mensa zum Mittagessen.",
        en: "With fresh motivation we then went together to the student cafeteria for lunch.",
        bn: "নতুন উদ্দীপনা নিয়ে এরপর আমরা একসাথে দুপুরের খাবারের জন্য ক্যান্টিনে গেলাম।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-16",
    level: "B1",
    category: "Verben mit Präpositionen",
    titleDe: "Worauf man beim Mietvertrag achten muss",
    titleEn: "What to Watch Out for in a Rental Contract",
    titleBn: "ভাড়ার চুক্তিতে যেসব বিষয়ে নজর দিতে হয়",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Wer in Deutschland eine Wohnung mieten möchte, sollte den Mietvertrag vor der Unterschrift genau prüfen.",
        en: "Whoever wants to rent an apartment in Germany should carefully check the rental contract before signing.",
        bn: "জার্মানিতে যারা ফ্ল্যাট ভাড়া নিতে চান, তাঁদের স্বাক্ষর করার আগে ভাড়ার চুক্তিপত্রটি ভালোভাবে পরীক্ষা করা উচিত।"
      },
      {
        de: "Viele Mieter achten zuerst nur auf die Kaltmiete, ohne an die hohen Nebenkosten zu denken.",
        en: "Many tenants initially pay attention only to the base rent without thinking about the high utility costs.",
        bn: "অনেক ভাড়াটিয়া অতিরিক্ত ইউটিলিটি খরচের কথা না ভেবে প্রথমে কেবল মূল ভাড়ার দিকে নজর দেন।"
      },
      {
        de: "Man sollte sich unbedingt danach erkundigen, wie hoch die monatlichen Vorauszahlungen für Heizung und Wasser sind.",
        en: "One should definitely inquire about how high the monthly advance payments for heating and water are.",
        bn: "হিটিং এবং পানির জন্য মাসিক অগ্রিম অর্থপ্রদান কত হবে সে সম্পর্কে অবশ্যই খোঁজ নেওয়া উচিত।"
      },
      {
        de: "Außerdem kommt es oft darauf an, welche Kündigungsfrist im Vertrag vereinbart wurde.",
        en: "In addition, it often depends on what notice period was agreed upon in the contract.",
        bn: "তাছাড়া চুক্তিতে নোটিশের সময়সীমা কত দিন নির্ধারণ করা হয়েছে তার ওপরও অনেক কিছু নির্ভর করে।"
      },
      {
        de: "Mein Freund Lukas hat sich kürzlich darüber geärgert, dass er eine Renovierungsklausel übersehen hatte.",
        en: "My friend Lukas was recently annoyed about the fact that he had overlooked a renovation clause.",
        bn: "আমার বন্ধু লুকাস সম্প্রতি এই ভেবে বিরক্ত হয়েছিল যে সে সংস্কার সংক্রান্ত একটি শর্ত চোখ এড়িয়ে গিয়েছিল।"
      },
      {
        de: "Als er ausziehen wollte, musste er die gesamte Wohnung noch einmal weiß streichen.",
        en: "When he wanted to move out, he had to paint the entire apartment white once more.",
        bn: "যখন সে বাসা ছাড়তে চেয়েছিল, তখন তাকে পুরো ফ্ল্যাটটি আবার সাদা রঙ করতে হয়েছিল।"
      },
      {
        de: "Worauf man ebenfalls achten sollte, ist das detaillierte Übergabeprotokoll beim Einzug.",
        en: "What one should also pay attention to is the detailed handover protocol when moving in.",
        bn: "আরও যে বিষয়ের প্রতি নজর দেওয়া উচিত তা হলো বাসায় ওঠার সময়কার বিস্তারিত হ্যান্ডওভার প্রোটোকল।"
      },
      {
        de: "Darin wird festgehalten, ob bereits kleine Kratzer am Boden oder Schäden an den Fenstern vorhanden sind.",
        en: "In it, it is recorded whether small scratches on the floor or damage to the windows are already present.",
        bn: "এতে লেখা থাকে যে মেঝেতে ইতিমধ্যেই ছোট আঁচড় বা জানালায় কোনো ক্ষতি আছে কি না।"
      },
      {
        de: "Wenn man sich unsicher ist, kann man sich an den lokalen Mieterverein wenden.",
        en: "If one is unsure, one can turn to the local tenants' association.",
        bn: "কেউ যদি অনিশ্চিত থাকেন, তবে স্থানীয় ভাড়াটিয়া সমিতির (Mieterverein) শরণাপন্ন হতে পারেন।"
      },
      {
        de: "Dort erhält man kompetente Beratung, damit es später keinen unnötigen Streit mit dem Vermieter gibt.",
        en: "There one receives competent advice so that later there is no unnecessary dispute with the landlord.",
        bn: "সেখানে দক্ষ পরামর্শ পাওয়া যায়, যাতে পরবর্তীতে বাড়িওয়ালার সাথে কোনো অপ্রয়োজনীয় বিবাদ না হয়।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-17",
    level: "B1",
    category: "Temporalsätze",
    titleDe: "Die Bedeutung von Pünktlichkeit",
    titleEn: "The Importance of Punctuality",
    titleBn: "সময়ানুবর্তিতার গুরুত্ব",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "In der deutschen Kultur spielt Pünktlichkeit sowohl im Berufsleben als auch im privaten Bereich eine große Rolle.",
        en: "In German culture, punctuality plays a major role both in professional life and in the private sphere.",
        bn: "জার্মান সংস্কৃতিতে পেশাগত এবং ব্যক্তিগত উভয় ক্ষেত্রেই সময়ানুবর্তিতা একটি বড় ভূমিকা পালন করে।"
      },
      {
        de: "Seitdem ich in Frankfurt lebe, plane ich für jeden Termin immer zehn Minuten Reservezeit ein.",
        en: "Since I have been living in Frankfurt, I always plan ten minutes of buffer time for every appointment.",
        bn: "যেহেতু আমি ফ্রাঙ্কফুর্টে বসবাস করছি, তাই প্রতিটি অ্যাপয়েন্টমেন্টের জন্য আমি সবসময় দশ মিনিট বাড়তি সময় হাতে রাখি।"
      },
      {
        de: "Bevor ich morgens das Haus verlasse, prüfe ich auf meinem Handy die aktuellen Abfahrtszeiten der S-Bahn.",
        en: "Before I leave the house in the morning, I check the current departure times of the S-Bahn on my mobile phone.",
        bn: "সকালে বাড়ি থেকে বের হওয়ার আগে আমি মোবাইলে এস-বানের বর্তমান ছাড়ার সময় পরীক্ষা করি।"
      },
      {
        de: "Sobald eine Störung gemeldet wird, nehme ich lieber sofort den Bus oder das Fahrrad.",
        en: "As soon as a disruption is reported, I prefer taking the bus or bicycle immediately.",
        bn: "কোনো যান্ত্রিক ত্রুটির খবর পাওয়া মাত্রই আমি সাথে সাথে বাস বা সাইকেল নেওয়াকেই শ্রেয় মনে করি।"
      },
      {
        de: "Während in manchen Ländern eine Verspätung von fünfzehn Minuten als völlig normal gilt, wirkt das hier oft unhöflich.",
        en: "While in some countries a delay of fifteen minutes is considered completely normal, here it often comes across as impolite.",
        bn: "যেখানে কিছু দেশে পনেরো মিনিট দেরি হওয়াটা একদম স্বাভাবিক বলে গণ্য হয়, সেখানে এখানে এটি প্রায়ই অভদ্রতা মনে হয়।"
      },
      {
        de: "Wenn man merkt, dass man es nicht rechtzeitig schafft, sollte man unbedingt vorher anrufen.",
        en: "If one notices that one will not make it on time, one should definitely call ahead.",
        bn: "কেউ যদি বুঝতে পারেন যে তিনি ঠিক সময়ে পৌঁছাতে পারবেন না, তবে অবশ্যই আগে থেকে ফোন করা উচিত।"
      },
      {
        de: "Ich warte meistens am Bahnhof, bis mein Freund ankommt, aber ich freue mich über eine kurze Nachricht.",
        en: "I usually wait at the train station until my friend arrives, but I appreciate a short message.",
        bn: "আমার বন্ধু না আসা পর্যন্ত আমি সাধারণত স্টেশনে অপেক্ষা করি, তবে একটি ছোট মেসেজ পেলে খুশি হই।"
      },
      {
        de: "Nachdem ich einmal zu spät zu einem wichtigen Vorstellungsgespräch gekommen war, habe ich meine Lektion gelernt.",
        en: "After I had once arrived late for an important job interview, I learned my lesson.",
        bn: "একবার একটি গুরুত্বপূর্ণ চাকরির ইন্টারভিউয়ে দেরি করে পৌঁছানোর পর আমি আমার শিক্ষা পেয়েছি।"
      },
      {
        de: "Damals musste ich mich vielmals entschuldigen, bevor das Gespräch überhaupt beginnen konnte.",
        en: "Back then I had to apologize profusely before the interview could even begin.",
        bn: "সেদিন ইন্টারভিউ শুরু হওয়ার আগেই আমাকে বারবার ক্ষমা চাইতে হয়েছিল।"
      },
      {
        de: "Inzwischen schätzen meine Kollegen meine Zuverlässigkeit sehr, weil man sich immer auf mich verlassen kann.",
        en: "Meanwhile my colleagues greatly appreciate my reliability because one can always rely on me.",
        bn: "ইতিমধ্যে আমার সহকর্মীরা আমার নির্ভরযোগ্যতাকে খুব মূল্যায়ন করেন, কারণ আমার ওপর সবসময় ভরসা করা যায়।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-18",
    level: "B1",
    category: "Wortbildung",
    titleDe: "Nachhaltig leben im Alltag",
    titleEn: "Living Sustainably in Everyday Life",
    titleBn: "দৈনন্দিন জীবনে টেকসই জীবনযাপন",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Immer mehr Menschen machen sich Gedanken darüber, wie sie ihren Alltag umweltfreundlicher gestalten können.",
        en: "More and more people are thinking about how they can make their everyday life more environmentally friendly.",
        bn: "আরও বেশি মানুষ এখন ভাবছেন কীভাবে তাঁরা তাঁদের দৈনন্দিন জীবনকে আরও পরিবেশবান্ধব করে তুলতে পারেন।"
      },
      {
        de: "Ein wichtiger Schritt ist die Vermeidung von unnötigem Plastikmüll beim täglichen Einkauf.",
        en: "An important step is avoiding unnecessary plastic waste during daily shopping.",
        bn: "প্রতিদিনের কেনাকাটায় অপ্রয়োজনীয় প্লাস্টিক বর্জ্য এড়িয়ে চলা একটি গুরুত্বপূর্ণ পদক্ষেপ।"
      },
      {
        de: "Viele Supermärkte bieten inzwischen unverpacktes Obst und Gemüse an, was eine großartige Möglichkeit zur Müllreduzierung ist.",
        en: "Many supermarkets meanwhile offer unpackaged fruit and vegetables, which is a great opportunity for waste reduction.",
        bn: "অনেক সুপারমার্কেট ইতিমধ্যে প্যাকেটবিহীন ফলমূল ও শাকসবজি বিক্রি করছে, যা বর্জ্য কমানোর একটি দারুণ সুযোগ।"
      },
      {
        de: "Zudem greifen viele Kunden zu wiederverwendbaren Glasflaschen statt zu Einwegplastik.",
        en: "Moreover, many consumers reach for reusable glass bottles instead of single-use plastic.",
        bn: "তদুপরি, অনেক ক্রেতা একবার ব্যবহারযোগ্য প্লাস্টিকের পরিবর্তে পুনঃব্যবহারযোগ্য কাঁচের বোতল বেছে নিচ্ছেন।"
      },
      {
        de: "Auch im Bereich der Mobilität gibt es zahlreiche nachhaltige Alternativen zum eigenen Auto.",
        en: "In the area of mobility too, there are numerous sustainable alternatives to one's own car.",
        bn: "যাতায়াতের ক্ষেত্রেও নিজস্ব গাড়ির অসংখ্য টেকসই বিকল্প রয়েছে।"
      },
      {
        de: "In vielen Städten ist der öffentliche Nahverkehr gut ausgebaut und für Studenten sogar kostenlos.",
        en: "In many cities public transportation is well developed and even free of charge for students.",
        bn: "অনেক শহরে গণপরিবহন ব্যবস্থা সুগঠিত এবং শিক্ষার্থীদের জন্য এমনকি বিনামূল্যে।"
      },
      {
        de: "Wer kurze Strecken mit dem Fahrrad fährt, tut nicht nur etwas für die Umwelt, sondern auch für seine Gesundheit.",
        en: "Whoever rides short distances by bicycle does something not only for the environment, but also for their health.",
        bn: "যারা স্বল্প দূরত্ব সাইকেলে যাতায়াত করেন, তাঁরা কেবল পরিবেশের জন্যই নয়, বরং নিজের সুস্বাস্থ্যের জন্যও উপকার করেন।"
      },
      {
        de: "Zu Hause lässt sich durch moderne LED-Lampen und bewusstes Heizen viel Energie sparen.",
        en: "At home, a lot of energy can be saved through modern LED lamps and conscious heating.",
        bn: "বাড়িতে আধুনিক এলইডি বাতি এবং সচেতনভাবে হিটার ব্যবহারের মাধ্যমে প্রচুর জ্বালানি সাশ্রয় করা যায়।"
      },
      {
        de: "Natürlich ist ein völlig fehlerfreies, komplett klimaneutrales Leben im Alltag kaum machbar.",
        en: "Of course, a completely flawless, entirely climate-neutral life is hardly doable in everyday life.",
        bn: "অবশ্যই দৈনন্দিন জীবনে সম্পূর্ণ ত্রুটিমুক্ত এবং পুরোপুরি জলবায়ু-নিরপেক্ষ জীবনযাপন করা প্রায় অসম্ভব।"
      },
      {
        de: "Dennoch zeigt die Erfahrung, dass viele kleine Veränderungen gemeinsam eine enorme Wirkung erzielen können.",
        en: "Nevertheless, experience shows that many small changes together can achieve an enormous impact.",
        bn: "তবুও অভিজ্ঞতা দেখায় যে অনেক ছোট ছোট পরিবর্তন একসাথে বিশাল প্রভাব ফেলতে পারে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-19",
    level: "B1",
    category: "Gesellschaft & Passiv",
    titleDe: "Ehrenamtliches Engagement",
    titleEn: "Voluntary Engagement",
    titleBn: "স্বেচ্ছাসেবী কর্মকাণ্ড",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "In Deutschland engagieren sich Millionen Bürgerinnen und Bürger freiwillig in Vereinen und sozialen Projekten.",
        en: "In Germany, millions of citizens volunteer in clubs and social projects.",
        bn: "জার্মানিতে লক্ষ লক্ষ নাগরিক স্বেচ্ছায় বিভিন্ন ক্লাব এবং সামাজিক প্রকল্পে কাজ করেন।"
      },
      {
        de: "Ohne diese unbezahlte Arbeit könnten viele wichtige Aufgaben in unserer Gesellschaft gar nicht bewältigt werden.",
        en: "Without this unpaid work, many important tasks in our society could not be managed at all.",
        bn: "এই অবৈতনিক শ্রম ছাড়া আমাদের সমাজের অনেক গুরুত্বপূর্ণ কাজ সামলানোই সম্ভব হতো না।"
      },
      {
        de: "Mein Kommilitone Jonas arbeitet beispielsweise zweimal pro Woche in einer Organisation, die bedürftige Menschen mit Lebensmitteln versorgt.",
        en: "My fellow student Jonas, for example, works twice a week in an organization that supplies needy people with groceries.",
        bn: "উদাহরণস্বরূপ, আমার সহপাঠী জোনাস সপ্তাহে দুবার এমন একটি সংগঠনে কাজ করে, যা অভাবী মানুষদের খাদ্যসামগ্রী সরবরাহ করে।"
      },
      {
        de: "Dort werden gespendete Waren von Supermärkten sortiert und an Familien mit geringem Einkommen verteilt.",
        en: "There, donated goods from supermarkets are sorted and distributed to families with low incomes.",
        bn: "সেখানে সুপারমার্কেট থেকে দান করা পণ্যগুলো বাছাই করা হয় এবং স্বল্প আয়ের পরিবারগুলোর মাঝে বিতরণ করা হয়।"
      },
      {
        de: "Jonas sagt, dass ihm diese Tätigkeit ein tiefes Gefühl von Sinn und Zufriedenheit gibt.",
        en: "Jonas says that this activity gives him a deep sense of purpose and satisfaction.",
        bn: "জোনাস বলে যে এই কাজটি তাকে উদ্দেশ্য এবং সন্তুষ্টির এক গভীর অনুভূতি দেয়।"
      },
      {
        de: "Auch ich habe mich kürzlich einem Projekt angeschlossen, das neu angekommene Studenten bei der Wohnungssuche unterstützt.",
        en: "I too recently joined a project that supports newly arrived students in their apartment search.",
        bn: "আমিও সম্প্রতি এমন একটি প্রকল্পে যুক্ত হয়েছি, যা নতুন আসা শিক্ষার্থীদের বাসা খুঁজতে সাহায্য করে।"
      },
      {
        de: "Viele internationale Studierende, denen die deutschen Regeln noch fremd sind, sind für diese Hilfe sehr dankbar.",
        en: "Many international students, to whom German rules are still unfamiliar, are very grateful for this help.",
        bn: "অনেক আন্তর্জাতিক শিক্ষার্থী, যাঁদের কাছে জার্মান নিয়মকানুন এখনো অপরিচিত, তাঁরা এই সাহায্যের জন্য খুব কৃতজ্ঞ।"
      },
      {
        de: "Durch das Ehrenamt lernt man nicht nur neue Menschen kennen, sondern entwickelt auch wichtige soziale Kompetenzen.",
        en: "Through volunteering one not only gets to know new people, but also develops important social skills.",
        bn: "স্বেচ্ছাসেবী কাজের মাধ্যমে মানুষ কেবল নতুন মানুষের সাথে পরিচিতই হয় না, বরং গুরুত্বপূর্ণ সামাজিক দক্ষতাও অর্জন করে।"
      },
      {
        de: "Viele Arbeitgeber schätzen Bewerber, die neben ihrem Studium gesellschaftliche Verantwortung übernehmen.",
        en: "Many employers appreciate applicants who take on social responsibility alongside their studies.",
        bn: "অনেক নিয়োগকর্তা এমন চাকরিপ্রার্থীদের মূল্যায়ন করেন, যাঁরা পড়াশোনার পাশাপাশি সামাজিক দায়িত্ব পালন করেন।"
      },
      {
        de: "So profitieren am Ende sowohl die Gemeinschaft als auch die freiwilligen Helfer selbst.",
        en: "Thus, in the end, both the community and the voluntary helpers themselves benefit.",
        bn: "এভাবে শেষ পর্যন্ত সমাজ এবং স্বেচ্ছাসেবী কর্মী উভয়ই উপকৃত হন।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-20",
    level: "B1",
    category: "Reisen & Konjunktiv II",
    titleDe: "Ein Missverständnis auf Reisen",
    titleEn: "A Misunderstanding While Traveling",
    titleBn: "ভ্রমণের সময় একটি ভুল বোঝাবুঝি",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Letzten Sommer unternahm ich mit meinem Freund eine Rundreise durch Süddeutschland.",
        en: "Last summer I took a round trip through southern Germany with my friend.",
        bn: "গত গ্রীষ্মে আমি আমার বন্ধুর সাথে দক্ষিণ জার্মানি ভ্রমণে গিয়েছিলাম।"
      },
      {
        de: "Wir hatten im Voraus ein gemütliches Hotelzimmer am Bodensee gebucht, zumindest dachten wir das.",
        en: "We had booked a cozy hotel room at Lake Constance in advance, at least so we thought.",
        bn: "আমরা আগে থেকেই কনস্ট্যান্স হ্রদের (Bodensee) তীরে একটি আরামদায়ক হোটেল রুম বুক করেছিলাম, অন্তত আমরা তেমনটাই ভেবেছিলাম।"
      },
      {
        de: "Als wir spät am Abend müde an der Rezeption ankamen, fand die Mitarbeiterin unsere Reservierung nicht.",
        en: "When we arrived tired at the reception late in the evening, the female employee could not find our reservation.",
        bn: "গভীর সন্ধ্যায় আমরা যখন ক্লান্ত হয়ে রিসেপশনে পৌঁছালাম, তখন মহিলা কর্মী আমাদের বুকিং খুঁজে পেলেন না।"
      },
      {
        de: "Nachdem wir unsere Buchungsbestätigung auf dem Handy gezeigt hatten, klärte sich das Missverständnis schnell auf.",
        en: "After we had shown our booking confirmation on the mobile phone, the misunderstanding quickly cleared up.",
        bn: "মোবাইলে আমাদের বুকিং নিশ্চিতকরণ দেখানোর পর ভুল বোঝাবুঝি দ্রুত দূর হলো।"
      },
      {
        de: "Wir hatten das Zimmer versehentlich für den nächsten Monat statt für das aktuelle Wochenende reserviert!",
        en: "We had accidentally reserved the room for the next month instead of for the current weekend!",
        bn: "আমরা বর্তমান সপ্তাহান্তের পরিবর্তে ভুলবশত আগামী মাসের জন্য ঘরটি বুক করেছিলাম!"
      },
      {
        de: "Obwohl das Hotel fast ausgebucht war, bemühte sich die freundliche Rezeptionistin sofort um eine Lösung.",
        en: "Although the hotel was almost fully booked, the friendly receptionist immediately worked to find a solution.",
        bn: "যদিও হোটেলটি প্রায় পূর্ণ ছিল, তবুও আন্তরিক রিসেপশনিস্ট সাথে সাথেই একটি সমাধানের চেষ্টা করলেন।"
      },
      {
        de: "Sie telefonierte mit einem benachbarten Gasthaus, das glücklicherweise noch ein freies Doppelzimmer hatte.",
        en: "She called a neighboring guesthouse, which fortunately still had a free double room.",
        bn: "তিনি পাশের একটি গেস্টহাউসে ফোন করলেন, যেখানে সৌভাগ্যবশত তখনও একটি ডাবল রুম খালি ছিল।"
      },
      {
        de: "Hätte sie uns nicht so hilfsbereit unterstützt, hätten wir wohl im Auto übernachten müssen.",
        en: "Had she not supported us so helpfully, we would probably have had to spend the night in the car.",
        bn: "তিনি যদি আমাদের এত সাহায্য না করতেন, তবে আমাদের সম্ভবত গাড়িতেই রাত কাটাতে হতো।"
      },
      {
        de: "Wir bedankten uns herzlich und fuhren die wenigen Kilometer zu unserer neuen Unterkunft.",
        en: "We thanked her warmly and drove the few kilometers to our new accommodation.",
        bn: "আমরা তাঁকে আন্তরিক ধন্যবাদ জানালাম এবং কয়েক কিলোমিটার দূরে আমাদের নতুন থাকার জায়গায় চলে গেলাম।"
      },
      {
        de: "Am nächsten Morgen lachten wir über unsere Schusseligkeit und genossen den herrlichen Blick auf den See.",
        en: "The next morning we laughed about our scatterbrainedness and enjoyed the magnificent view of the lake.",
        bn: "পরদিন সকালে আমরা নিজেদের ভুলোমনা স্বভাব নিয়ে হাসলাম এবং হ্রদের চমৎকার দৃশ্য উপভোগ করলাম।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-21",
    level: "B1",
    category: "Werbung & Medien",
    titleDe: "Die Rolle der Werbung im Alltag",
    titleEn: "The Role of Advertising in Everyday Life",
    titleBn: "দৈনন্দিন জীবনে বিজ্ঞাপনের ভূমিকা",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Ob auf Plakaten an der Bushaltestelle, im Fernsehen oder beim Scrollen durch soziale Medien – Werbung begegnet uns überall.",
        en: "Whether on posters at the bus stop, on television, or while scrolling through social media – advertising encounters us everywhere.",
        bn: "বাসস্টপের পোস্টারে হোক, টেলিভিশনে হোক বা সামাজিক যোগাযোগ মাধ্যমে স্ক্রল করার সময়—বিজ্ঞাপন সব জায়গায় আমাদের চোখে পড়ে।"
      },
      {
        de: "Unternehmen investieren jedes Jahr Milliarden Euro, um ihre Produkte möglichst attraktiv zu präsentieren.",
        en: "Companies invest billions of euros every year in order to present their products as attractively as possible.",
        bn: "কোম্পানিগুলো তাদের পণ্য যতটা সম্ভব আকর্ষণীয়ভাবে উপস্থাপন করার জন্য প্রতি বছর বিলিয়ন বিলিয়ন ইউরো বিনিয়োগ করে।"
      },
      {
        de: "Moderne Werbekampagnen sind oft so geschickt gestaltet, dass man sie auf den ersten Blick kaum als Reklame erkennt.",
        en: "Modern advertising campaigns are often designed so cleverly that at first glance one hardly recognizes them as ads.",
        bn: "আধুনিক বিজ্ঞাপনী প্রচারণাগুলো প্রায়ই এত চতুরভাবে তৈরি করা হয় যে প্রথম দেখায় সেগুলোকে বিজ্ঞাপন বলে চেনাই কঠিন।"
      },
      {
        de: "Durch bunte Bilder und emotionale Geschichten soll beim Verbraucher das Gefühl geweckt werden, ein bestimmtes Produkt unbedingt zu brauchen.",
        en: "Through colorful images and emotional stories, the feeling is supposed to be awakened in the consumer of urgently needing a specific product.",
        bn: "রঙিন ছবি এবং আবেগঘন গল্পের মাধ্যমে ভোক্তার মনে এমন অনুভূতি জাগানোর চেষ্টা করা হয় যে নির্দিষ্ট পণ্যটি তাঁর অবশ্যই প্রয়োজন।"
      },
      {
        de: "Besonders Jugendliche werden häufig gezielt über bekannte Influencer angesprochen, damit neue Trends schnell verbreitet werden.",
        en: "Young people in particular are frequently targeted via well-known influencers so that new trends are spread quickly.",
        bn: "বিশেষ করে তরুণদের লক্ষ্য করে পরিচিত ইনফ্লুয়েন্সারদের মাধ্যমে প্রচার চালানো হয়, যাতে নতুন ট্রেন্ড দ্রুত ছড়িয়ে পড়ে।"
      },
      {
        de: "Kritiker bemängeln jedoch, dass durch ständige Kaufanreize unnötiger Konsum gefördert wird.",
        en: "Critics complain, however, that constant buying incentives promote unnecessary consumption.",
        bn: "তবে সমালোচকরা অভিযোগ করেন যে নিরন্তর কেনার প্ররোচনার মাধ্যমে অপ্রয়োজনীয় ভোগবাদকে উৎসাহিত করা হচ্ছে।"
      },
      {
        de: "Deshalb ist es wichtig, Werbeversprechen kritisch zu hinterfragen und Preise vor dem Kauf zu vergleichen.",
        en: "Therefore it is important to critically question advertising promises and compare prices before buying.",
        bn: "তাই কেনার আগে বিজ্ঞাপনের প্রতিশ্রুতিগুলো সমালোচনামূলকভাবে যাচাই করা এবং দাম তুলনা করা গুরুত্বপূর্ণ।"
      },
      {
        de: "In manchen Städten wird mittlerweile sogar darüber diskutiert, Außenwerbung im öffentlichen Raum stark einzuschränken.",
        en: "In some cities it is meanwhile even being discussed whether to severely restrict outdoor advertising in public spaces.",
        bn: "কিছু শহরে ইতিমধ্যে জনসমক্ষে আউটডোর বিজ্ঞাপন কঠোরভাবে সীমিত করার বিষয়েও আলোচনা হচ্ছে।"
      },
      {
        de: "Letztlich entscheidet aber jeder Konsument selbst, ob er sich von bunten Versprechen beeinflussen lässt oder nicht.",
        en: "Ultimately, however, every consumer decides for themselves whether they let themselves be influenced by colorful promises or not.",
        bn: "তবে শেষ পর্যন্ত প্রতিটি ভোক্তা নিজেই সিদ্ধান্ত নেন যে তিনি চটকদার প্রতিশ্রুতিতে প্রভাবিত হবেন কি না।"
      },
      {
        de: "Ein bewusster Umgang mit Werbung schont sowohl den eigenen Geldbeutel als auch wertvolle Ressourcen.",
        en: "Conscious handling of advertising protects both one's own wallet and valuable resources.",
        bn: "বিজ্ঞাপনের প্রতি সচেতন আচরণ নিজের মানিব্যাগ এবং মূল্যবান প্রাকৃতিক সম্পদ উভয়কেই রক্ষা করে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-22",
    level: "B1",
    category: "Beruf & Bewerbung",
    titleDe: "Tipps für ein erfolgreiches Vorstellungsgespräch",
    titleEn: "Tips for a Successful Job Interview",
    titleBn: "সফল চাকরির ইন্টারভিউয়ের জন্য টিপস",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Wer nach dem Studium oder einer Ausbildung eine gute Stelle sucht, muss im Vorstellungsgespräch überzeugen.",
        en: "Whoever looks for a good position after university or vocational training must convince in the job interview.",
        bn: "পড়াশোনা বা প্রশিক্ষণ শেষে যারা একটি ভালো চাকরি খুঁজছেন, তাঁদের চাকরির ইন্টারভিউয়ে নিজেদের যোগ্যতা প্রমাণ করতে হবে।"
      },
      {
        de: "Eine gründliche Vorbereitung ist dabei die halbe Miete, damit man vor den Personalverantwortlichen sicher auftreten kann.",
        en: "Thorough preparation is half the battle here so that one can appear confident in front of the HR managers.",
        bn: "মানবসম্পদ কর্মকর্তাদের সামনে আত্মবিশ্বাসের সাথে নিজেকে উপস্থাপন করার জন্য ভালো প্রস্তুতি নেওয়াটাই অর্ধেক সাফল্য।"
      },
      {
        de: "Zuerst sollte man sich intensiv über die Geschichte, die Produkte und die Werte des Unternehmens informieren.",
        en: "First, one should inform oneself intensively about the history, products, and values of the company.",
        bn: "প্রথমে কোম্পানিটির ইতিহাস, পণ্য এবং মূল্যবোধ সম্পর্কে গভীরভাবে জেনে নেওয়া উচিত।"
      },
      {
        de: "Außerdem empfiehlt es sich, typische Fragen nach den eigenen Stärken und Schwächen vorab zu üben.",
        en: "In addition, it is advisable to practice typical questions about one's own strengths and weaknesses in advance.",
        bn: "তাছাড়া নিজের শক্তি এবং দুর্বলতা সম্পর্কে সাধারণ প্রশ্নগুলোর উত্তর আগে থেকেই অনুশীলন করা ভালো।"
      },
      {
        de: "Am Tag des Termins sollte man auf gepflegte und der Branche angemessene Kleidung achten.",
        en: "On the day of the appointment one should pay attention to neat clothing appropriate for the industry.",
        bn: "ইন্টারভিউয়ের দিন পরিপাটি এবং পেশার সাথে মানানসই পোশাকের দিকে নজর দেওয়া উচিত।"
      },
      {
        de: "Während des Gesprächs ist es wichtig, Blickkontakt zu halten und freundlich, aber nicht überheblich zu wirken.",
        en: "During the interview it is important to maintain eye contact and appear friendly, yet not arrogant.",
        bn: "কথোপকথনের সময় চোখে চোখ রেখে কথা বলা এবং বিনয়ী হওয়া গুরুত্বপূর্ণ, তবে অহংকারী হওয়া চলবে না।"
      },
      {
        de: "Wenn man eine Frage einmal nicht sofort versteht, darf man ruhig höflich nachfragen.",
        en: "If one does not immediately understand a question once, one may calmly ask politely for clarification.",
        bn: "কোনো প্রশ্ন সাথে সাথে বুঝতে না পারলে শান্তভাবে ও ভদ্রভাবে আবার জিজ্ঞাসা করা যেতে পারে।"
      },
      {
        de: "Am Ende des Interviews wird fast immer gefragt, ob man selbst noch Fragen an das Unternehmen hat.",
        en: "At the end of the interview one is almost always asked whether one has any questions for the company oneself.",
        bn: "ইন্টারভিউয়ের শেষে প্রায় সবসময়ই জিজ্ঞাসা করা হয় যে কোম্পানি সম্পর্কে আপনার নিজের কোনো প্রশ্ন আছে কি না।"
      },
      {
        de: "Hier sollte man unbedingt Interesse zeigen und sich nach dem Team oder den Einarbeitungsprozessen erkundigen.",
        en: "Here one should definitely show interest and inquire about the team or the onboarding processes.",
        bn: "এখানে অবশ্যই আগ্রহ দেখানো উচিত এবং দল বা কাজ শেখার প্রক্রিয়া সম্পর্কে খোঁজ নেওয়া উচিত।"
      },
      {
        de: "Mit einer Mischung aus Fachkompetenz, Ehrlichkeit und Motivation hinterlässt man garantiert einen bleibenden Eindruck.",
        en: "With a mix of professional competence, honesty, and motivation, one is guaranteed to leave a lasting impression.",
        bn: "পেশাগত দক্ষতা, সততা এবং অনুপ্রেরণার সমন্বয়ে আপনি নিশ্চিতভাবেই একটি স্থায়ী ছাপ রেখে আসতে পারবেন।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-23",
    level: "B1",
    category: "Sport & Gesundheit",
    titleDe: "Sport als Ausgleich zum Alltag",
    titleEn: "Sports as a Balance to Everyday Life",
    titleBn: "দৈনন্দিন জীবনের ভারসাম্য হিসেবে খেলাধুলা",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Viele Menschen verbringen heute den größten Teil ihres Arbeitstages sitzend vor dem Computerbildschirm.",
        en: "Many people today spend the largest part of their workday sitting in front of the computer screen.",
        bn: "আজকাল অনেক মানুষ তাঁদের কর্মদিবসের অধিকাংশ সময় কম্পিউটার স্ক্রিনের সামনে বসে কাটান।"
      },
      {
        de: "Dieser Bewegungsmangel führt auf Dauer oft zu Verspannungen und sinkender Konzentrationsfähigkeit.",
        en: "This lack of exercise often leads in the long run to muscle tension and declining ability to concentrate.",
        bn: "ব্যায়ামের এই অভাব দীর্ঘমেয়াদে প্রায়ই পেশিতে টান এবং মনোযোগের ক্ষমতা হ্রাসের কারণ হয়ে দাঁড়ায়।"
      },
      {
        de: "Regelmäßiger Sport bietet hierfür einen idealen Ausgleich, da er sowohl den Körper stärkt als auch den Geist entspannt.",
        en: "Regular sport offers an ideal balance for this, as it both strengthens the body and relaxes the mind.",
        bn: "নিয়মিত খেলাধুলা বা ব্যায়াম এর জন্য একটি আদর্শ ভারসাম্য প্রদান করে, কারণ এটি শরীরকে শক্তিশালী করার পাশাপাশি মনকেও প্রশান্ত করে।"
      },
      {
        de: "Dabei muss man weder teure Fitnessgeräte kaufen noch täglich stundenlang trainieren.",
        en: "In doing so, one needs neither to buy expensive fitness equipment nor to train for hours every day.",
        bn: "এর জন্য দামি ফিটনেস যন্ত্রপাতি কেনারও প্রয়োজন নেই, আবার প্রতিদিন ঘণ্টার পর ঘণ্টা ব্যায়াম করারও দরকার নেই।"
      },
      {
        de: "Schon ein zügiger Spaziergang oder eine halbe Stunde Joggen im Park wirkt oft wahre Wunder.",
        en: "Even a brisk walk or half an hour of jogging in the park often works true wonders.",
        bn: "পার্কে দ্রুত হাঁটা বা আধা ঘণ্টা জগিং করাও প্রায়ই জাদুর মতো কাজ করে।"
      },
      {
        de: "Je regelmäßiger man sich bewegt, desto widerstandsfähiger wird das eigene Immunsystem gegen Erkältungen.",
        en: "The more regularly one exercises, the more resilient one's own immune system becomes against colds.",
        bn: "মানুষ যত নিয়মিত শরীরচর্চা করে, সর্দি-কাশির বিরুদ্ধে তার রোগ প্রতিরোধ ক্ষমতা তত বেশি শক্তিশালী হয়।"
      },
      {
        de: "Besonders viel Spaß macht Bewegung in der Gruppe, etwa beim Fußball, Volleyball oder in einem Laufverein.",
        en: "Exercise in a group is particularly fun, for instance in football, volleyball, or in a running club.",
        bn: "দলগতভাবে ব্যায়াম করা বিশেষ আনন্দের, যেমন ফুটবল, ভলিবল বা কোনো রানিং ক্লাবে।"
      },
      {
        de: "Beim gemeinsamen Training knüpft man schnell neue soziale Kontakte und motiviert sich gegenseitig.",
        en: "When training together, one quickly makes new social contacts and motivates one another.",
        bn: "একসাথে অনুশীলনের সময় দ্রুত নতুন সামাজিক যোগাযোগ তৈরি হয় এবং একে অপরকে অনুপ্রাণিত করা যায়।"
      },
      {
        de: "Wichtig ist vor allem, eine Sportart zu finden, die wirklich zu den eigenen Interessen passt.",
        en: "Most important above all is finding a type of sport that truly matches one's own interests.",
        bn: "সবচেয়ে গুরুত্বপূর্ণ হলো এমন একটি খেলা খুঁজে বের করা, যা সত্যিই নিজের আগ্রহের সাথে মিলে যায়।"
      },
      {
        de: "Wer Freude an der Bewegung hat, bleibt langfristig aktiv und fühlt sich im Alltag deutlich ausgeglichener.",
        en: "Whoever enjoys movement stays active in the long term and feels significantly more balanced in everyday life.",
        bn: "যারা শরীরচর্চায় আনন্দ পান, তাঁরা দীর্ঘমেয়াদে সক্রিয় থাকেন এবং দৈনন্দিন জীবনে অনেক বেশি ভারসাম্যপূর্ণ বোধ করেন।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-24",
    level: "B1",
    category: "Ernährung & Alltag",
    titleDe: "Gesunde Ernährung trotz Zeitmangel",
    titleEn: "Healthy Nutrition Despite Lack of Time",
    titleBn: "সময়ের অভাব সত্ত্বেও স্বাস্থ্যকর খাবার",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Im hektischen Berufs- oder Studienalltag bleibt oft nur wenig Zeit für aufwendiges Kochen.",
        en: "In hectic professional or university everyday life, there is often little time left for elaborate cooking.",
        bn: "ব্যস্ত কর্মজীবন বা পড়াশোনার দৈনন্দিন চাপে সময় নিয়ে রান্না করার সুযোগ প্রায়ই কম থাকে।"
      },
      {
        de: "Viele greifen deshalb mittags schnell zu ungesundem Fast Food, ohne auf die Nährwerte zu achten.",
        en: "Many therefore quickly reach for unhealthy fast food at lunchtime without paying attention to nutritional values.",
        bn: "তাই অনেকেই পুষ্টিগুণের দিকে না তাকিয়ে দুপুরে দ্রুত অস্বাস্থ্যকর ফাস্ট ফুড খেয়ে নেন।"
      },
      {
        de: "Dabei lässt sich eine ausgewogene Mahlzeit mit etwas Planung auch in kurzer Zeit zubereiten.",
        en: "Yet a balanced meal can also be prepared in a short time with a little planning.",
        bn: "অথচ সামান্য পরিকল্পনার মাধ্যমে অল্প সময়েও একটি সুষম খাবার তৈরি করা সম্ভব।"
      },
      {
        de: "Anstatt jeden Tag in der Kantine zu essen, kann man abends einfach eine größere Portion vorkochen.",
        en: "Instead of eating in the cafeteria every day, one can simply pre-cook a larger portion in the evening.",
        bn: "প্রতিদিন ক্যান্টিনে খাওয়ার পরিবর্তে রাতে সহজেই একটু বেশি পরিমাণে খাবার রান্না করে রাখা যায়।"
      },
      {
        de: "Frisches Gemüse, Vollkornprodukte und pflanzliche Proteine liefern wichtige Energie für den ganzen Nachmittag.",
        en: "Fresh vegetables, whole-grain products, and plant-based proteins provide important energy for the entire afternoon.",
        bn: "তাজা শাকসবজি, হোল-গ্রেইন খাবার এবং উদ্ভিজ্জ প্রোটিন পুরো বিকেলের জন্য গুরুত্বপূর্ণ শক্তি জোগায়।"
      },
      {
        de: "Wer zwischendurch Hunger bekommt, sollte lieber zu knackigen Nüssen oder frischem Obst statt zu süßen Schokoriegeln greifen.",
        en: "Whoever gets hungry in between should rather reach for crunchy nuts or fresh fruit instead of sweet chocolate bars.",
        bn: "কাজের ফাঁকে ক্ষুধা লাগলে মিষ্টি চকলেট বারের পরিবর্তে মচমচে বাদাম বা তাজা ফল খাওয়া উচিত।"
      },
      {
        de: "Außerdem vergessen viele Menschen im Stress, ausreichend klares Wasser oder ungesüßten Tee zu trinken.",
        en: "In addition, many people forget in the stress to drink enough plain water or unsweetened tea.",
        bn: "তাছাড়া ব্যস্ততার চাপে অনেক মানুষ পর্যাপ্ত পরিষ্কার পানি বা চিনি ছাড়া চা পান করতে ভুলে যান।"
      },
      {
        de: "Ein guter Trick ist es, immer eine gefüllte Trinkflasche direkt auf den Schreibtisch zu stellen.",
        en: "A good trick is to always place a filled water bottle right on the desk.",
        bn: "একটি ভালো কৌশল হলো সবসময় পানির বোতল ভরে সরাসরি পড়ার বা কাজের টেবিলে রাখা।"
      },
      {
        de: "Gesunde Ernährung bedeutet keineswegs, auf leckeres Essen verzichten zu müssen.",
        en: "Healthy nutrition by no means means having to give up delicious food.",
        bn: "স্বাস্থ্যকর খাবার মানে মোটেও সুস্বাদু খাবার ত্যাগ করা নয়।"
      },
      {
        de: "Mit frischen Kräutern und guten Gewürzen schmecken selbst einfache Gerichte ganz hervorragend.",
        en: "With fresh herbs and good spices, even simple dishes taste absolutely wonderful.",
        bn: "তাজা ভেষজ এবং ভালো মসলার ব্যবহারে এমনকি সাধারণ খাবারও চমৎকার সুস্বাদু হয়ে ওঠে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-25",
    level: "B1",
    category: "Verkehr & Mobilität",
    titleDe: "Öffentliche Verkehrsmittel vs. Auto",
    titleEn: "Public Transport vs. Car",
    titleBn: "গণপরিবহন বনাম ব্যক্তিগত গাড়ি",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Die Frage, ob man in der Stadt lieber das Auto oder öffentliche Verkehrsmittel nutzen sollte, sorgt oft für Diskussionen.",
        en: "The question of whether one should prefer using a car or public transportation in the city often sparks discussions.",
        bn: "শহরে গাড়ি নাকি গণপরিবহন ব্যবহার করা শ্রেয়—এই প্রশ্নটি প্রায়ই আলোচনার জন্ম দেয়।"
      },
      {
        de: "Ein eigenes Auto bietet zweifellos ein hohes Maß an Flexibilität, besonders wenn man schwere Einkäufe transportieren muss.",
        en: "Having one's own car undoubtedly offers a high degree of flexibility, especially when one has to transport heavy groceries.",
        bn: "নিজস্ব গাড়ি নিঃসন্দেহে উচ্চ মাত্রার স্বাধীনতা দেয়, বিশেষ করে যখন ভারী বাজারসদাই বহন করতে হয়।"
      },
      {
        de: "Andererseits steht man in Großstädten während des Berufsverkehrs oft stundenlang im Stau.",
        en: "On the other hand, in major cities one often sits in traffic jams for hours during rush hour.",
        bn: "অন্যদিকে বড় শহরগুলোতে অফিস সময়ে মানুষকে প্রায়ই ঘণ্টার পর ঘণ্টা যানজটে আটকে থাকতে হয়।"
      },
      {
        de: "Zudem gestaltet sich die Parkplatzsuche in belebten Wohnvierteln zunehmend schwierig und teuer.",
        en: "Moreover, searching for a parking space in lively residential areas is becoming increasingly difficult and expensive.",
        bn: "তদুপরি, ব্যস্ত আবাসিক এলাকাগুলোতে পার্কিংয়ের জায়গা খোঁজা ক্রমশ কঠিন এবং ব্যয়বহুল হয়ে উঠছে।"
      },
      {
        de: "Öffentliche Verkehrsmittel wie U-Bahn, Straßenbahn und Bus sind hingegen deutlich umweltfreundlicher und oft schneller.",
        en: "Public transportation such as subway, tram, and bus, by contrast, is significantly more environmentally friendly and often faster.",
        bn: "পক্ষান্তরে সাবওয়ে, ট্রাম এবং বাসের মতো গণপরিবহন উল্লেখযোগ্যভাবে বেশি পরিবেশবান্ধব এবং প্রায়ই দ্রুততর।"
      },
      {
        de: "Während der Fahrt kann man entspannt ein Buch lesen oder Musik hören, anstatt sich über andere Autofahrer zu ärgern.",
        en: "During the ride one can relaxedly read a book or listen to music instead of getting annoyed about other drivers.",
        bn: "যাত্রার সময় অন্য চালকদের নিয়ে বিরক্ত হওয়ার পরিবর্তে আরাম করে একটি বই পড়া বা গান শোনা যায়।"
      },
      {
        de: "Obwohl es gelegentlich zu Verspätungen kommt, überwiegen für viele Stadtbewohner die Vorteile von Bus und Bahn.",
        en: "Although delays occasionally occur, for many city dwellers the advantages of buses and trains outweigh them.",
        bn: "যদিও মাঝে মাঝে ট্রেন বা বাস দেরি করে, তবুও অনেক শহরবাসীর কাছে বাস ও ট্রেনের সুবিধাই বেশি।"
      },
      {
        de: "Dank günstiger Monatskarten spart man im Vergleich zu Benzin, Versicherung und Reparaturen zudem viel Geld.",
        en: "Thanks to affordable monthly passes, one also saves a lot of money compared to gasoline, insurance, and repairs.",
        bn: "সাশ্রয়ী মাসিক পাসের কল্যাণে পেট্রোল, বিমা এবং মেরামতের খরচের তুলনায় প্রচুর টাকাও সাশ্রয় হয়।"
      },
      {
        de: "Für gelegentliche Ausflüge aufs Land nutzen immer mehr Menschen praktische Carsharing-Angebote.",
        en: "For occasional trips into the countryside, more and more people use practical car-sharing offers.",
        bn: "মাঝেমধ্যে গ্রামে ঘুরতে যাওয়ার জন্য আরও বেশি মানুষ এখন সুবিধাজনক কার-শেয়ারিং সেবা ব্যবহার করছেন।"
      },
      {
        de: "Auf diese Weise kombiniert man die Vorteile beider Welten auf äußerst vernünftige Art.",
        en: "In this way one combines the advantages of both worlds in an extremely sensible manner.",
        bn: "এভাবে অত্যন্ত বুদ্ধিমত্তার সাথে উভয় ব্যবস্থার সুবিধাগুলো একসাথে কাজে লাগানো যায়।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-26",
    level: "B1",
    category: "Kultur & Tradition",
    titleDe: "Traditionelle Feste und moderne Bräuche",
    titleEn: "Traditional Festivals and Modern Customs",
    titleBn: "ঐতিহ্যবাহী উৎসব এবং আধুনিক রীতিনীতি",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Feste und Traditionen verbinden Menschen über Generationen hinweg und schaffen ein starkes Gefühl der Zusammengehörigkeit.",
        en: "Festivals and traditions connect people across generations and create a strong sense of belonging.",
        bn: "উৎসব এবং ঐতিহ্য প্রজন্মের পর প্রজন্ম ধরে মানুষকে যুক্ত করে এবং একাত্মতার এক শক্তিশালী অনুভূতি তৈরি করে।"
      },
      {
        de: "In Deutschland hat jede Region ihre eigenen Bräuche, die oft bis ins Mittelalter zurückreichen.",
        en: "In Germany, every region has its own customs, which often date back to the Middle Ages.",
        bn: "জার্মানিতে প্রতিটি অঞ্চলের নিজস্ব রীতিনীতি রয়েছে, যেগুলোর ইতিহাস প্রায়ই মধ্যযুগ পর্যন্ত বিস্তৃত।"
      },
      {
        de: "Im Rheinland wird beispielsweise jedes Jahr im Februar ausgelassen Karneval mit bunten Umzügen und Kostümen gefeiert.",
        en: "In the Rhineland, for example, Carnival is celebrated exuberantly every year in February with colorful parades and costumes.",
        bn: "উদাহরণস্বরূপ, রাইনল্যান্ডে প্রতি বছর ফেব্রুয়ারিতে রঙিন শোভাযাত্রা এবং পোশাকের মাধ্যমে আনন্দঘন কার্নিভাল উদযাপিত হয়।"
      },
      {
        de: "Im Süden des Landes findet im Herbst das weltberühmte Oktoberfest statt, das Millionen Besucher anzieht.",
        en: "In the south of the country, the world-famous Oktoberfest takes place in autumn, attracting millions of visitors.",
        bn: "দেশের দক্ষিণে শরৎকালে বিশ্বখ্যাত অক্টোবরফেস্ট অনুষ্ঠিত হয়, যা লক্ষ লক্ষ দর্শনার্থীকে আকর্ষণ করে।"
      },
      {
        de: "Neben diesen großen öffentlichen Festen spielen auch private Feiern wie runde Geburtstage oder Hochzeiten eine wichtige Rolle.",
        en: "Alongside these large public festivals, private celebrations such as milestone birthdays or weddings also play an important role.",
        bn: "এই বড় জনসাধারণের উৎসবগুলোর পাশাপাশি বিশেষ জন্মদিন বা বিয়ের মতো ব্যক্তিগত অনুষ্ঠানগুলোও গুরুত্বপূর্ণ ভূমিকা পালন করে।"
      },
      {
        de: "Früher wurden solche Feste meistens im kleinen Familienkreis zu Hause gefeiert.",
        en: "In the past, such celebrations were mostly held in a small family circle at home.",
        bn: "আগে এই ধরনের উৎসবগুলো সাধারণত বাড়িতে ছোট পারিবারিক পরিসরে উদযাপিত হতো।"
      },
      {
        de: "Heute werden oft professionelle Eventlocations gemietet, damit alle Freunde und Verwandten Platz finden.",
        en: "Today professional event venues are often rented so that all friends and relatives find space.",
        bn: "আজকাল প্রায়ই পেশাদার ইভেন্ট ভেন্যু ভাড়া নেওয়া হয়, যাতে সব বন্ধু এবং আত্মীয়স্বজনের জায়গা হয়।"
      },
      {
        de: "Dennoch bleiben bestimmte traditionelle Elemente, wie das gemeinsame Anschneiden der Torte, bis heute unverändert.",
        en: "Nevertheless, certain traditional elements, such as cutting the cake together, remain unchanged to this day.",
        bn: "তবুও একসাথে কেক কাটার মতো নির্দিষ্ট কিছু ঐতিহ্যবাহী রীতি আজও অপরিবর্তিত রয়েছে।"
      },
      {
        de: "Gleichzeitig entstehen durch das Zusammenleben verschiedener Kulturen auch viele neue, bereichernde Traditionen.",
        en: "At the same time, living together across different cultures also gives rise to many new, enriching traditions.",
        bn: "একই সাথে বিভিন্ন সংস্কৃতির সহাবস্থানের ফলে অনেক নতুন ও সমৃদ্ধ ঐতিহ্যও গড়ে উঠছে।"
      },
      {
        de: "So feiern heute viele Freundeskreise ganz selbstverständlich sowohl Weihnachten als auch das Zuckerfest oder Diwali miteinander.",
        en: "Thus today many circles of friends quite naturally celebrate both Christmas and Eid or Diwali together.",
        bn: "তাই আজ অনেক বন্ধুমহল স্বাভাবিকভাবেই বড়দিন এবং ঈদ বা দিওয়ালি উভয় উৎসবই একসাথে উদযাপন করে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-27",
    level: "B1",
    category: "Studium & Psychologie",
    titleDe: "Umgang mit Stress vor Prüfungen",
    titleEn: "Dealing with Stress Before Exams",
    titleBn: "পরীক্ষার আগে মানসিক চাপ সামলানো",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Kurz vor wichtigen Prüfungen kennen fast alle Studierenden dieses unangenehme Gefühl von Nervosität und Zeitdruck.",
        en: "Shortly before important exams, almost all students know this unpleasant feeling of nervousness and time pressure.",
        bn: "গুরুত্বপূর্ণ পরীক্ষার ঠিক আগে প্রায় সব শিক্ষার্থীই নার্ভাসনেস এবং সময়ের চাপের এই অস্বস্তিকর অনুভূতির সাথে পরিচিত।"
      },
      {
        de: "Ein gewisses Maß an Aufregung ist zwar völlig normal und steigert sogar die Aufmerksamkeit.",
        en: "A certain degree of excitement is admittedly completely normal and even increases alertness.",
        bn: "কিছুটা উত্তেজনা অবশ্য একদম স্বাভাবিক এবং এটি এমনকি মনোযোগও বাড়িয়ে দেয়।"
      },
      {
        de: "Wenn die Prüfungsangst jedoch zu groß wird, kann sie das Abrufen von gelerntem Wissen blockieren.",
        en: "However, if exam anxiety becomes too great, it can block the recall of learned knowledge.",
        bn: "তবে পরীক্ষার ভয় যদি অতিরিক্ত বেড়ে যায়, তবে তা শেখা বিষয়গুলো মনে করার ক্ষমতাকে আটকে দিতে পারে।"
      },
      {
        de: "Deshalb ist es entscheidend, rechtzeitig geeignete Strategien zur Stressbewältigung zu entwickeln.",
        en: "Therefore it is crucial to develop suitable strategies for stress management in good time.",
        bn: "তাই সময়মতো মানসিক চাপ মোকাবিলার উপযুক্ত কৌশল তৈরি করা অত্যন্ত জরুরি।"
      },
      {
        de: "Man sollte sich nicht erst zwei Tage vor der Klausur hinsetzen und versuchen, den gesamten Stoff auf einmal zu lernen.",
        en: "One should not sit down just two days before the exam and try to learn the entire material all at once.",
        bn: "পরীক্ষার মাত্র দুই দিন আগে বসে পুরো সিলেবাস একসাথে শেখার চেষ্টা করা উচিত নয়।"
      },
      {
        de: "Stattdessen hilft es enorm, den Lernstoff in kleine, überschaubare Etappen einzuteilen.",
        en: "Instead, it helps enormously to divide the study material into small, manageable stages.",
        bn: "এর পরিবর্তে পড়াশোনার বিষয়বস্তুকে ছোট ছোট ও সহজবোধ্য ধাপে ভাগ করে নিলে দারুণ উপকার পাওয়া যায়।"
      },
      {
        de: "Regelmäßige Pausen an der frischen Luft sorgen dafür, dass das Gehirn neue Informationen besser verarbeiten kann.",
        en: "Regular breaks in the fresh air ensure that the brain can process new information better.",
        bn: "খোলা বাতাসে নিয়মিত বিরতি নিলে মস্তিষ্ক নতুন তথ্যগুলো আরও ভালোভাবে প্রক্রিয়াজাত করতে পারে।"
      },
      {
        de: "Am Abend vor der Prüfung sollte man die Bücher irgendwann schließen und sich etwas Entspannendes gönnen.",
        en: "On the evening before the exam one should close the books at some point and treat oneself to something relaxing.",
        bn: "পরীক্ষার আগের সন্ধ্যায় একসময় বইপত্র বন্ধ করে নিজেকে একটু বিশ্রাম দেওয়া উচিত।"
      },
      {
        de: "Wer ausgeschlafen und ruhig in den Prüfungssaal geht, kann sich deutlich besser auf die Aufgaben konzentrieren.",
        en: "Whoever enters the exam hall well-rested and calm can concentrate significantly better on the tasks.",
        bn: "যারা পর্যাপ্ত ঘুম নিয়ে শান্ত মনে পরীক্ষার হলে প্রবেশ করেন, তাঁরা প্রশ্নগুলোর ওপর উল্লেখযোগ্যভাবে বেশি মনোযোগ দিতে পারেন।"
      },
      {
        de: "Nach der abgegebenen Klausur sollte man sich dann ruhig auch einmal selbst für die geleistete Arbeit belohnen.",
        en: "After handing in the exam, one should then calmly reward oneself once in a while for the work accomplished.",
        bn: "পরীক্ষা দেওয়ার পর নিজের পরিশ্রমের জন্য নিজেকে একটু পুরস্কৃত করাও উচিত।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-28",
    level: "B1",
    category: "Digitalisierung & Bildung",
    titleDe: "Digitales Lernen und Online-Kurse",
    titleEn: "Digital Learning and Online Courses",
    titleBn: "ডিজিটাল শিক্ষা এবং অনলাইন কোর্স",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Das Internet hat die Möglichkeiten des Lernens in den letzten Jahren revolutioniert.",
        en: "The internet has revolutionized learning opportunities in recent years.",
        bn: "ইন্টারনেট সাম্প্রতিক বছরগুলোতে শেখার সুযোগগুলোতে বিপ্লব ঘটিয়েছে।"
      },
      {
        de: "Heute kann jeder von zu Hause aus an Online-Kursen renommierter Universitäten teilnehmen oder eine neue Sprache lernen.",
        en: "Today anyone can participate from home in online courses from renowned universities or learn a new language.",
        bn: "আজ যে কেউ ঘরে বসেই স্বনামধন্য বিশ্ববিদ্যালয়ের অনলাইন কোর্সে অংশ নিতে পারেন বা একটি নতুন ভাষা শিখতে পারেন।"
      },
      {
        de: "Digitale Lernplattformen bieten interaktive Übungen, erklärende Videos und sofortiges Feedback zu den eigenen Lösungen.",
        en: "Digital learning platforms offer interactive exercises, explanatory videos, and immediate feedback on one's own solutions.",
        bn: "ডিজিটাল লার্নিং প্ল্যাটফর্মগুলো ইন্টারেক্টিভ অনুশীলন, ব্যাখ্যামূলক ভিডিও এবং নিজের সমাধানের ওপর তাৎক্ষণিক ফলাফল প্রদান করে।"
      },
      {
        de: "Besonders für berufstätige Menschen ist diese zeitliche und räumliche Flexibilität ein unschätzbarer Vorteil.",
        en: "Especially for working people, this temporal and spatial flexibility is an invaluable advantage.",
        bn: "বিশেষ করে কর্মজীবী মানুষদের জন্য সময় এবং স্থানের এই নমনীয়তা একটি অমূল্য সুবিধা।"
      },
      {
        de: "Man kann genau dann lernen, wenn man am aufnahmefähigsten ist, ohne lange Anfahrtswege in Kauf nehmen zu müssen.",
        en: "One can study precisely when one is most receptive, without having to put up with long commutes.",
        bn: "দীর্ঘ যাতায়াতের ঝামেলা ছাড়াই ঠিক যখন মন সবচেয়ে সতেজ থাকে, তখনই পড়াশোনা করা যায়।"
      },
      {
        de: "Dennoch erfordert das selbstständige Lernen am Bildschirm ein hohes Maß an Eigenmotivation und Selbstdisziplin.",
        en: "Nevertheless, independent learning on a screen requires a high degree of self-motivation and self-discipline.",
        bn: "তবুও স্ক্রিনে নিজে নিজে শেখার জন্য উচ্চ মাত্রার আত্ম-অনুপ্রেরণা এবং আত্ম-শৃঙ্খলার প্রয়োজন হয়।"
      },
      {
        de: "Ohne feste Unterrichtszeiten und den persönlichen Austausch mit einer Lerngruppe fällt es manchen schwer, dranzubleiben.",
        en: "Without fixed class times and personal exchange with a study group, some find it difficult to stick with it.",
        bn: "নির্দিষ্ট ক্লাসের সময় এবং স্টাডি গ্রুপের সাথে ব্যক্তিগত মতবিনিময় ছাড়া অনেকের পক্ষেই ধারাবাহিকতা বজায় রাখা কঠিন হয়ে পড়ে।"
      },
      {
        de: "Deshalb kombinieren viele moderne Sprachschulen mittlerweile digitale Selbstlernphasen mit regelmäßigen Live-Sitzungen.",
        en: "Therefore many modern language schools meanwhile combine digital self-study phases with regular live sessions.",
        bn: "তাই অনেক আধুনিক ভাষা স্কুল ইতিমধ্যে ডিজিটাল স্ব-শিক্ষার ধাপগুলোর সাথে নিয়মিত লাইভ সেশনের সমন্বয় করছে।"
      },
      {
        de: "In diesen Online-Treffen können Fragen direkt geklärt und das freie Sprechen aktiv geübt werden.",
        en: "In these online meetings questions can be clarified directly and free speaking can be actively practiced.",
        bn: "এই অনলাইন মিটিংগুলোতে সরাসরি প্রশ্ন সমাধান করা যায় এবং সাবলীলভাবে কথা বলার অনুশীলন করা যায়।"
      },
      {
        de: "So verbindet das digitale Lernen moderne Technologie mit persönlicher Betreuung auf ideale Weise.",
        en: "Thus digital learning combines modern technology with personal support in an ideal way.",
        bn: "এভাবে ডিজিটাল শিক্ষা আধুনিক প্রযুক্তির সাথে ব্যক্তিগত তত্ত্বাবধানের এক আদর্শ মেলবন্ধন ঘটায়।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-29",
    level: "B1",
    category: "Wohnen & Gesellschaft",
    titleDe: "Nachbarschaft und Zusammenleben in der Stadt",
    titleEn: "Neighborhood and Living Together in the City",
    titleBn: "শহরে প্রতিবেশী ও একসাথে বসবাস",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "In großen Mietshäusern wohnen oft Dutzende Menschen auf engem Raum zusammen, ohne sich näher zu kennen.",
        en: "In large apartment buildings, dozens of people often live close together without knowing each other well.",
        bn: "বড় অ্যাপার্টমেন্ট ভবনগুলোতে প্রায়ই ডজনখানেক মানুষ খুব কাছাকাছি বসবাস করেন, কিন্তু একে অপরকে ভালোভাবে চেনেন না।"
      },
      {
        de: "Dabei kann ein gutes Verhältnis zu den Nachbarn den Alltag erheblich erleichtern und bereichern.",
        en: "Yet a good relationship with the neighbors can make everyday life considerably easier and richer.",
        bn: "অথচ প্রতিবেশীদের সাথে সুসম্পর্ক দৈনন্দিন জীবনকে উল্লেখযোগ্যভাবে সহজ এবং সমৃদ্ধ করতে পারে।"
      },
      {
        de: "Schon ein freundliches „Guten Morgen“ im Treppenhaus schafft eine angenehme und vertrauensvolle Atmosphäre im Haus.",
        en: "Even a friendly \"Good morning\" in the stairwell creates a pleasant and trusting atmosphere in the building.",
        bn: "সিঁড়িঘরে একটি আন্তরিক \"সুপ্রভাত\" বিনিময়ই ভবনে একটি মনোরম এবং বিশ্বাসযোগ্য পরিবেশ তৈরি করে।"
      },
      {
        de: "Wenn man einmal im Urlaub ist, freut man sich über einen hilfsbereiten Nachbarn, der die Blumen gießt und den Briefkasten leert.",
        en: "When one is away on vacation, one appreciates a helpful neighbor who waters the flowers and empties the mailbox.",
        bn: "মানুষ যখন ছুটিতে বাইরে যান, তখন এমন একজন সাহায্যকারী প্রতিবেশীকে পেয়ে খুশি হন যিনি ফুলগাছে পানি দেন এবং ডাকবাক্স খালি করে রাখেন।"
      },
      {
        de: "Umgekehrt hilft man älteren Bewohnern gern dabei, schwere Einkaufstaschen in die oberen Stockwerke zu tragen.",
        en: "Conversely, one gladly helps elderly residents carry heavy shopping bags to the upper floors.",
        bn: "বিপরীতে, বয়স্ক বাসিন্দাদের ভারী বাজারের ব্যাগ ওপরের তলায় তুলে দিতে সবাই আনন্দের সাথে সাহায্য করেন।"
      },
      {
        de: "Natürlich erfordert das Zusammenleben in einem Mehrfamilienhaus auch gegenseitige Rücksichtnahme.",
        en: "Of course, living together in an apartment building also requires mutual consideration.",
        bn: "অবশ্যই একটি বহুতল ভবনে একসাথে বসবাসের জন্য পারস্পরিক সহমর্মিতারও প্রয়োজন।"
      },
      {
        de: "Besonders beim Musikhören oder bei Feiern am Wochenende sollte man die Ruhezeiten respektieren.",
        en: "Especially when listening to music or having parties on the weekend, one should respect quiet hours.",
        bn: "বিশেষ করে সপ্তাহান্তে গান শোনার সময় বা পার্টির ক্ষেত্রে বিশ্রামের সময়ের প্রতি সম্মান দেখানো উচিত।"
      },
      {
        de: "Wenn doch einmal ein Problem auftritt, lässt sich dieses meist durch ein ruhiges Gespräch unter Nachbarn schnell klären.",
        en: "If a problem does arise once in a while, it can usually be clarified quickly through a calm conversation among neighbors.",
        bn: "যদি কখনো কোনো সমস্যা দেখা দেয়, তবে প্রতিবেশীদের মধ্যে শান্ত আলোচনার মাধ্যমেই তা দ্রুত সমাধান করা যায়।"
      },
      {
        de: "In vielen Stadtteilen organisieren Bewohner inzwischen sogar gemeinsame Sommerfeste oder Flohmärkte im Hinterhof.",
        en: "In many neighborhoods residents meanwhile even organize joint summer festivals or flea markets in the courtyard.",
        bn: "অনেক এলাকায় বাসিন্দারা ইতিমধ্যে বাড়ির আঙিনায় যৌথ গ্রীষ্মকালীন উৎসব বা ফ্লি মার্কেটেরও আয়োজন করছেন।"
      },
      {
        de: "Solche Initiativen zeigen, dass auch in einer anonymen Großstadt echte Gemeinschaft entstehen kann.",
        en: "Such initiatives show that even in an anonymous big city, genuine community can emerge.",
        bn: "এই ধরনের উদ্যোগ দেখায় যে একটি অচেনা বড় শহরেও প্রকৃত সামাজিক বন্ধন গড়ে উঠতে পারে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-30",
    level: "B1",
    category: "Geschichte",
    titleDe: "Ein Blick in die Geschichte – Die Wiedervereinigung",
    titleEn: "A Look into History – The Reunification",
    titleBn: "ইতিহাসের পাতায় – জার্মানির পুনরেকত্রীকরণ",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Der neunte November 1989 gilt als eines der bedeutendsten Daten in der modernen deutschen Geschichte.",
        en: "The ninth of November 1989 is considered one of the most significant dates in modern German history.",
        bn: "১৯৮৯ সালের ৯ই নভেম্বর আধুনিক জার্মান ইতিহাসের অন্যতম গুরুত্বপূর্ণ তারিখ হিসেবে বিবেচিত হয়।"
      },
      {
        de: "Nachdem Deutschland nach dem Zweiten Weltkrieg über vierzig Jahre lang in zwei Staaten geteilt gewesen war, fiel an diesem Abend die Berliner Mauer.",
        en: "After Germany had been divided into two states for over forty years following World War II, the Berlin Wall fell on this evening.",
        bn: "দ্বিতীয় বিশ্বযুদ্ধের পর চল্লিশ বছরেরও বেশি সময় ধরে জার্মানি দুটি রাষ্ট্রে বিভক্ত থাকার পর সেই সন্ধ্যায় বার্লিন প্রাচীরের পতন ঘটে।"
      },
      {
        de: "Monatelang hatten zuvor hunderttausende Menschen in der DDR friedlich für Reisefreiheit und demokratische Reformen demonstriert.",
        en: "For months beforehand, hundreds of thousands of people in the GDR had demonstrated peacefully for freedom to travel and democratic reforms.",
        bn: "এর আগে মাসের পর মাস পূর্ব জার্মানির (DDR) লক্ষ লক্ষ মানুষ ভ্রমণের স্বাধীনতা এবং গণতান্ত্রিক সংস্কারের দাবিতে শান্তিপূর্ণভাবে বিক্ষোভ করেছিলেন।"
      },
      {
        de: "Als die Grenzübergänge schließlich geöffnet wurden, lagen sich fremde Menschen in Berlin weinend und jubelnd in den Armen.",
        en: "When the border crossings were finally opened, strangers in Berlin fell into each other's arms crying and cheering.",
        bn: "অবশেষে যখন সীমান্ত পথগুলো খুলে দেওয়া হলো, তখন বার্লিনে অচেনা মানুষেরাও আনন্দে ও কান্নায় একে অপরকে জড়িয়ে ধরেছিলেন।"
      },
      {
        de: "Familien und Freunde, die jahrzehntelang voneinander getrennt gelebt hatten, konnten sich endlich wieder frei besuchen.",
        en: "Families and friends who had lived separated from one another for decades could finally visit each other freely again.",
        bn: "যে পরিবার এবং বন্ধুরা দশকের পর দশক ধরে একে অপরের থেকে বিচ্ছিন্ন ছিলেন, তাঁরা অবশেষে আবার স্বাধীনভাবে দেখা করতে পেরেছিলেন।"
      },
      {
        de: "Weniger als ein Jahr später, am dritten Oktober 1990, wurde die deutsche Wiedervereinigung offiziell vollzogen.",
        en: "Less than a year later, on the third of October 1990, German reunification was officially completed.",
        bn: "এক বছরেরও কম সময় পর, ১৯৯০ সালের ৩রা অক্টোবর আনুষ্ঠানিকভাবে জার্মানির পুনরেকত্রীকরণ সম্পন্ন হয়।"
      },
      {
        de: "Seitdem wird dieser Tag jedes Jahr als nationaler Feiertag, der Tag der Deutschen Einheit, begangen.",
        en: "Since then, this day has been celebrated every year as a national holiday, the Day of German Unity.",
        bn: "তখন থেকে প্রতি বছর এই দিনটি জাতীয় ছুটির দিন বা 'জার্মান ঐক্য দিবস' হিসেবে পালিত হয়।"
      },
      {
        de: "Der friedliche Verlauf dieser Revolution beeindruckt Menschen auf der ganzen Welt bis heute.",
        en: "The peaceful course of this revolution impresses people all over the world to this day.",
        bn: "এই বিপ্লবের শান্তিপূর্ণ গতিপথ আজও সারা বিশ্বের মানুষকে মুগ্ধ করে।"
      },
      {
        de: "Natürlich brachte das Zusammenwachsen der beiden Landesteile auch wirtschaftliche und soziale Herausforderungen mit sich.",
        en: "Of course, the growing together of the two parts of the country also brought economic and social challenges with it.",
        bn: "অবশ্যই দেশের দুটি অংশের একসাথে বেড়ে ওঠা অর্থনৈতিক এবং সামাজিক চ্যালেঞ্জও নিয়ে এসেছিল।"
      },
      {
        de: "Dennoch bleibt der Mauerfall ein eindrucksvolles Symbol dafür, dass Mut und Zusammenhalt selbst scheinbar unüberwindbare Grenzen überwinden können.",
        en: "Nevertheless, the fall of the Wall remains an impressive symbol that courage and solidarity can overcome even seemingly insurmountable borders.",
        bn: "তবুও প্রাচীরের পতন এই চিত্তাকর্ষক প্রতীক হয়ে আছে যে সাহস এবং একতা আপাতদৃষ্টিতে অজেয় সীমানাকেও জয় করতে পারে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-31",
    level: "B1",
    category: "Berufsorientierung",
    titleDe: "Freiwilliges Soziales Jahr",
    titleEn: "Voluntary Social Year",
    titleBn: "স্বেচ্ছাসেবী সামাজিক বছর (FSJ)",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Nach dem Schulabschluss wissen viele junge Menschen noch nicht genau, welchen Beruf sie später ergreifen möchten.",
        en: "After graduating from school, many young people do not yet know exactly which profession they want to take up later.",
        bn: "স্কুল শেষ করার পর অনেক তরুণ-তরুণীই ঠিক জানেন না যে তাঁরা পরবর্তীতে কোন পেশা বেছে নেবেন।"
      },
      {
        de: "Eine beliebte Möglichkeit zur Orientierung ist das sogenannte Freiwillige Soziale Jahr, kurz FSJ.",
        en: "A popular option for orientation is the so-called Voluntary Social Year, or FSJ for short.",
        bn: "দিকনির্দেশনার জন্য একটি জনপ্রিয় সুযোগ হলো তথাকথিত 'স্বেচ্ছাসেবী সামাজিক বছর' বা সংক্ষেপে FSJ।"
      },
      {
        de: "Dabei arbeiten junge Erwachsene zwölf Monate lang in einem Krankenhaus, einem Kindergarten oder einer Umweltschutzorganisation.",
        en: "In it, young adults work for twelve months in a hospital, a kindergarten, or an environmental protection organization.",
        bn: "এতে তরুণ-তরুণীরা বারো মাস ধরে একটি হাসপাতাল, কিন্ডারগার্টেন বা পরিবেশ সুরক্ষা সংস্থায় কাজ করেন।"
      },
      {
        de: "Sie erhalten ein monatliches Taschengeld und werden während des gesamten Jahres pädagogisch begleitet.",
        en: "They receive monthly pocket money and are pedagogically supported throughout the entire year.",
        bn: "তাঁরা মাসিক হাতখরচ পান এবং পুরো বছর জুড়ে শিক্ষামূলক তত্ত্বাবধানে থাকেন।"
      },
      {
        de: "Viele Teilnehmer berichten, dass sie in dieser Zeit enorm an Selbstständigkeit und Lebenserfahrung gewonnen haben.",
        en: "Many participants report that during this time they gained enormously in independence and life experience.",
        bn: "অনেক অংশগ্রহণকারী জানান যে এই সময়ে তাঁদের স্বনির্ভরতা এবং জীবনের অভিজ্ঞতা অনেক বেড়েছে।"
      },
      {
        de: "Wer beispielsweise im Pflegebereich mithilft, lernt schnell, Verantwortung für andere Menschen zu übernehmen.",
        en: "Whoever helps out in the care sector, for example, quickly learns to take responsibility for other people.",
        bn: "উদাহরণস্বরূপ, যারা সেবা খাতে সাহায্য করেন, তাঁরা দ্রুত অন্য মানুষের দায়িত্ব নিতে শেখেন।"
      },
      {
        de: "Zudem wird ein absolviertes FSJ bei vielen Hochschulen als praktischer Vorteil bei der Studienplatzvergabe anerkannt.",
        en: "In addition, a completed FSJ is recognized by many universities as a practical advantage when allocating study places.",
        bn: "তাছাড়া একটি সম্পন্ন করা FSJ অনেক বিশ্ববিদ্যালয়ে ভর্তির ক্ষেত্রে ব্যবহারিক সুবিধা হিসেবে স্বীকৃত হয়।"
      },
      {
        de: "Meine deutsche Bekannte Clara hat vor ihrem Medizinstudium ein Jahr in einer Kinderklinik gearbeitet.",
        en: "My German acquaintance Clara worked for a year in a children's hospital before her medical studies.",
        bn: "আমার জার্মান পরিচিত ক্লারা তার মেডিকেল পড়াশোনা শুরুর আগে এক বছর একটি শিশু হাসপাতালে কাজ করেছিল।"
      },
      {
        de: "Sie sagte, diese praktische Erfahrung habe ihren Berufswunsch endgültig bestätigt.",
        en: "She said this practical experience had definitively confirmed her career aspiration.",
        bn: "সে বলেছে যে এই বাস্তব অভিজ্ঞতা তার পেশাগত ইচ্ছাকে চূড়ান্তভাবে নিশ্চিত করেছে।"
      },
      {
        de: "Ein solches Orientierungsjahr ist also eine wunderbare Investition in die eigene persönliche und berufliche Zukunft.",
        en: "Such an orientation year is thus a wonderful investment in one's own personal and professional future.",
        bn: "এই ধরনের দিকনির্দেশনামূলক বছর তাই নিজের ব্যক্তিগত এবং পেশাগত ভবিষ্যতের জন্য একটি চমৎকার বিনিয়োগ।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-32",
    level: "B1",
    category: "Konsum & Umwelt",
    titleDe: "Konsum und Nachhaltigkeit bei Kleidung",
    titleEn: "Consumption and Sustainability in Clothing",
    titleBn: "পোশাকের ক্ষেত্রে ভোগ এবং স্থায়িত্ব",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "In vielen Kleiderschränken hängen heute unzählige Kleidungsstücke, die nur ein- oder zweimal getragen wurden.",
        en: "In many wardrobes today hang countless items of clothing that have been worn only once or twice.",
        bn: "আজকাল অনেক আলমারিতে অসংখ্য জামাকাপড় ঝোলানো থাকে, যেগুলো মাত্র একবার বা দুবার পরা হয়েছে।"
      },
      {
        de: "Durch das Phänomen der sogenannten Fast Fashion bringen Modeketten fast jede Woche neue, extrem billige Kollektionen auf den Markt.",
        en: "Through the phenomenon of so-called fast fashion, fashion chains bring new, extremely cheap collections onto the market almost every week.",
        bn: "তথাকথিত 'ফাস্ট ফ্যাশন'-এর কারণে ফ্যাশন ব্র্যান্ডগুলো প্রায় প্রতি সপ্তাহেই নতুন এবং অত্যন্ত সস্তা কালেকশন বাজারে নিয়ে আসছে।"
      },
      {
        de: "Hinter diesen niedrigen Preisen verbergen sich jedoch oft schlechte Arbeitsbedingungen und eine enorme Umweltbelastung in den Produktionsländern.",
        en: "Behind these low prices, however, poor working conditions and enormous environmental pollution in the producing countries are often hidden.",
        bn: "তবে এই কম দামের পেছনে প্রায়ই উৎপাদনকারী দেশগুলোতে খারাপ কর্মপরিবেশ এবং বিশাল পরিবেশ দূষণ লুকিয়ে থাকে।"
      },
      {
        de: "Für die Herstellung einer einzigen Jeans werden beispielsweise tausende Liter Wasser verbraucht.",
        en: "For the production of a single pair of jeans, for example, thousands of liters of water are consumed.",
        bn: "উদাহরণস্বরূপ, একটি মাত্র জিন্স তৈরির জন্য হাজার হাজার লিটার পানি খরচ হয়।"
      },
      {
        de: "Immer mehr Verbraucher beginnen daher, ihr eigenes Einkaufsverhalten kritisch zu überdenken.",
        en: "More and more consumers are therefore beginning to critically rethink their own shopping behavior.",
        bn: "তাই আরও বেশি ভোক্তা এখন তাঁদের নিজেদের কেনাকাটার অভ্যাস নিয়ে সমালোচনামূলকভাবে নতুন করে ভাবতে শুরু করেছেন।"
      },
      {
        de: "Anstatt ständig neue Billigkleidung zu kaufen, achten viele wieder stärker auf langlebige Qualität und faire Produktion.",
        en: "Instead of constantly buying new cheap clothes, many are again paying closer attention to durable quality and fair production.",
        bn: "সারাক্ষণ নতুন সস্তা জামাকাপড় কেনার পরিবর্তে অনেকেই আবার টেকসই মান এবং ন্যায্য উৎপাদনের দিকে বেশি নজর দিচ্ছেন।"
      },
      {
        de: "Zudem erfreuen sich Secondhand-Läden und Online-Plattformen für gebrauchte Mode wachsender Beliebtheit.",
        en: "In addition, second-hand shops and online platforms for used fashion are enjoying growing popularity.",
        bn: "তাছাড়া সেকেন্ড-হ্যান্ড দোকান এবং ব্যবহৃত পোশাকের অনলাইন প্ল্যাটফর্মগুলো ক্রমশ জনপ্রিয় হয়ে উঠছে।"
      },
      {
        de: "Dort lassen sich oft hochwertige Markenkleidung und besondere Einzelstücke zu fairen Preisen entdecken.",
        en: "There, high-quality brand clothing and special unique pieces can often be discovered at fair prices.",
        bn: "সেখানে প্রায়ই ন্যায্য দামে উচ্চমানের ব্র্যান্ডের পোশাক এবং বিশেষ কিছু সংগ্রহ খুঁজে পাওয়া যায়।"
      },
      {
        de: "Auch das Reparieren kaputter Reißverschlüsse oder das Tauschen von Kleidung mit Freunden liegt voll im Trend.",
        en: "Repairing broken zippers or swapping clothes with friends is also completely in trend.",
        bn: "নষ্ট চেইন মেরামত করা বা বন্ধুদের সাথে পোশাক বদল করাও এখন বেশ জনপ্রিয়।"
      },
      {
        de: "Ein bewusster Umgang mit Mode schont nicht nur die Umwelt, sondern verleiht auch einen ganz individuellen Stil.",
        en: "A conscious approach to fashion not only protects the environment, but also lends a completely individual style.",
        bn: "ফ্যাশনের প্রতি সচেতন দৃষ্টিভঙ্গি কেবল পরিবেশকেই রক্ষা করে না, বরং একটি স্বতন্ত্র স্টাইলও প্রদান করে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-33",
    level: "B1",
    category: "Sprachenlernen",
    titleDe: "Lesen als Schlüssel zur Sprache",
    titleEn: "Reading as the Key to Language",
    titleBn: "ভাষার চাবিকাঠি হিসেবে পড়া",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Wer eine Fremdsprache wirklich sicher beherrschen möchte, kommt am regelmäßigen Lesen kaum vorbei.",
        en: "Whoever wants to truly master a foreign language confidently can hardly get around regular reading.",
        bn: "যারা একটি বিদেশি ভাষা সত্যিই আত্মবিশ্বাসের সাথে আয়ত্ত করতে চান, তাঁদের জন্য নিয়মিত পড়ার কোনো বিকল্প নেই।"
      },
      {
        de: "Während man beim Hören oft unter Zeitdruck steht, kann man beim Lesen das eigene Tempo selbst bestimmen.",
        en: "While one is often under time pressure when listening, when reading one can determine one's own pace oneself.",
        bn: "শোনার সময় যেখানে প্রায়ই সময়ের চাপ থাকে, সেখানে পড়ার সময় মানুষ নিজেই নিজের গতি নির্ধারণ করতে পারেন।"
      },
      {
        de: "Durch spannende Geschichten begegnet man neuen Wörtern immer wieder in einem natürlichen Zusammenhang.",
        en: "Through exciting stories one encounters new words again and again in a natural context.",
        bn: "রোমাঞ্চকর গল্পের মাধ্যমে নতুন শব্দগুলোর সাথে বারবার একটি স্বাভাবিক প্রেক্ষাপটে পরিচয় ঘটে।"
      },
      {
        de: "Je häufiger man ein Wort in verschiedenen Sätzen liest, desto leichter prägt es sich im Gedächtnis ein.",
        en: "The more frequently one reads a word in different sentences, the more easily it imprints itself in memory.",
        bn: "মানুষ যত বেশিবার একটি শব্দ বিভিন্ন বাক্যে পড়ে, শব্দটি স্মৃতিতে তত সহজে গেঁথে যায়।"
      },
      {
        de: "Dabei sollte man nicht den Fehler machen, jedes unbekannte Wort sofort im Wörterbuch nachzuschlagen.",
        en: "In doing so, one should not make the mistake of immediately looking up every unknown word in the dictionary.",
        bn: "এক্ষেত্রে প্রতিটি অজানা শব্দ সাথে সাথে অভিধানে খোঁজার ভুল করা উচিত নয়।"
      },
      {
        de: "Viel effektiver ist es, die Bedeutung zuerst aus dem Kontext des Satzes zu erraten.",
        en: "It is much more effective to first guess the meaning from the context of the sentence.",
        bn: "এর চেয়ে বাক্যের প্রেক্ষাপট থেকে প্রথমে অর্থ অনুমান করার চেষ্টা করা অনেক বেশি কার্যকর।"
      },
      {
        de: "Viele Lernende greifen am Anfang gerne zu zweisprachigen Büchern oder speziellen Lektüren für ihr Sprachniveau.",
        en: "Many learners like to reach for bilingual books or special graded readers for their language level at the beginning.",
        bn: "অনেক শিক্ষার্থী শুরুতে দ্বিভাষিক বই বা তাঁদের ভাষার স্তরের উপযোগী বিশেষ পাঠ্যবই বেছে নিতে পছন্দ করেন।"
      },
      {
        de: "Sobald man erste Erfolgserlebnisse hat, wächst die Motivation, sich auch an längere Texte heranzuwagen.",
        en: "As soon as one has first experiences of success, motivation grows to also venture into longer texts.",
        bn: "প্রথম সাফল্যের অভিজ্ঞতা পাওয়া মাত্রই দীর্ঘ লেখা পড়ার সাহস ও অনুপ্রেরণা বেড়ে যায়।"
      },
      {
        de: "Auch das laute Mitlesen hilft dabei, die eigene Aussprache und das Sprachgefühl spürbar zu verbessern.",
        en: "Reading aloud along with the text also helps to noticeably improve one's own pronunciation and feel for the language.",
        bn: "জোরে জোরে পড়াও নিজের উচ্চারণ এবং ভাষার বোধগম্যতা উল্লেখযোগ্যভাবে উন্নত করতে সাহায্য করে।"
      },
      {
        de: "Lesen öffnet somit nicht nur das Tor zu fremden Welten, sondern macht das Sprachenlernen zu einem echten Genuss.",
        en: "Reading thus not only opens the gateway to foreign worlds, but turns language learning into a real pleasure.",
        bn: "পড়া তাই কেবল অজানা জগতের দরজাই খুলে দেয় না, বরং ভাষা শেখাকে এক প্রকৃত আনন্দে পরিণত করে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-34",
    level: "B1",
    category: "Klima & Umwelt",
    titleDe: "Wetterextreme und Klimawandel",
    titleEn: "Weather Extremes and Climate Change",
    titleBn: "চরম আবহাওয়া এবং জলবায়ু পরিবর্তন",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "In den letzten Jahren haben ungewöhnliche Wetterphänomene auch in Mitteleuropa spürbar zugenommen.",
        en: "In recent years, unusual weather phenomena have noticeably increased in Central Europe as well.",
        bn: "সাম্প্রতিক বছরগুলোতে মধ্য ইউরোপেও অস্বাভাবিক আবহাওয়ার ঘটনাগুলো উল্লেখযোগ্যভাবে বৃদ্ধি পেয়েছে।"
      },
      {
        de: "Auf extrem heiße und trockene Sommermonate folgen oft plötzliche Starkregenereignisse und Überschwemmungen.",
        en: "Extremely hot and dry summer months are often followed by sudden heavy rainfall events and flooding.",
        bn: "অত্যন্ত গরম এবং শুষ্ক গ্রীষ্মের মাসগুলোর পরপরই প্রায়ই হঠাৎ প্রবল বর্ষণ এবং বন্যার সৃষ্টি হচ্ছে।"
      },
      {
        de: "Wissenschaftler weisen seit Langem darauf hin, dass diese Entwicklungen direkte Folgen des globalen Klimawandels sind.",
        en: "Scientists have long pointed out that these developments are direct consequences of global climate change.",
        bn: "বিজ্ঞানীরা দীর্ঘদিন ধরে উল্লেখ করছেন যে এই পরিবর্তনগুলো বৈশ্বিক জলবায়ু পরিবর্তনের সরাসরি ফলাফল।"
      },
      {
        de: "Aufgrund der langanhaltenden Trockenheit leiden viele Wälder unter Schädlingen und Waldbränden.",
        en: "Due to the prolonged drought, many forests suffer from pests and forest fires.",
        bn: "দীর্ঘস্থায়ী খরার কারণে অনেক বনাঞ্চল পোকামাকড় এবং দাবানলের কবলে পড়ছে।"
      },
      {
        de: "Gleichzeitig stehen Landwirte vor großen Herausforderungen, weil ganze Ernten durch Hitze oder Hagel zerstört werden.",
        en: "At the same time, farmers face major challenges because entire harvests are destroyed by heat or hail.",
        bn: "একই সাথে কৃষকরা বড় চ্যালেঞ্জের মুখোমুখি হচ্ছেন, কারণ তাপদাহ বা শিলাবৃষ্টিতে পুরো ফসল নষ্ট হয়ে যাচ্ছে।"
      },
      {
        de: "Um die schlimmsten Auswirkungen noch abzuwenden, muss der Ausstoß von Treibhausgasen weltweit drastisch reduziert werden.",
        en: "In order to still avert the worst impacts, the emission of greenhouse gases must be drastically reduced worldwide.",
        bn: "সবচেয়ে ভয়াবহ প্রভাবগুলো এড়াতে বিশ্বব্যাপী গ্রিনহাউস গ্যাসের নির্গমন ব্যাপকভাবে কমাতে হবে।"
      },
      {
        de: "Neben politischen Entscheidungen kann jeder Einzelne im Alltag einen Beitrag zum Klimaschutz leisten.",
        en: "Alongside political decisions, every individual can make a contribution to climate protection in everyday life.",
        bn: "রাজনৈতিক সিদ্ধান্তের পাশাপাশি প্রতিটি মানুষ দৈনন্দিন জীবনে জলবায়ু সুরক্ষায় অবদান রাখতে পারেন।"
      },
      {
        de: "Würden beispielsweise mehr Menschen auf Kurzstreckenflüge verzichten und stattdessen die Bahn nutzen, ließe sich viel CO2 einsparen.",
        en: "If, for example, more people were to give up short-haul flights and use the train instead, a lot of CO2 could be saved.",
        bn: "উদাহরণস্বরূপ, আরও বেশি মানুষ যদি স্বল্প দূরত্বের বিমান ভ্রমণ ত্যাগ করে ট্রেন ব্যবহার করতেন, তবে প্রচুর কার্বন ডাই-অক্সাইড সাশ্রয় করা যেত।"
      },
      {
        de: "Auch der Ausbau von Wind- und Solarenergie schreitet in Deutschland kontinuierlich voran.",
        en: "The expansion of wind and solar energy is also progressing continuously in Germany.",
        bn: "জার্মানিতে বায়ু এবং সৌরশক্তির সম্প্রসারণও ক্রমাগত এগিয়ে চলেছে।"
      },
      {
        de: "Der Schutz unseres Planeten ist zweifellos die größte Gemeinschaftsaufgabe unserer Zeit.",
        en: "Protecting our planet is undoubtedly the greatest collective task of our time.",
        bn: "আমাদের গ্রহকে রক্ষা করা নিঃসন্দেহে আমাদের সময়ের সবচেয়ে বড় সম্মিলিত দায়িত্ব।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-35",
    level: "B1",
    category: "Finanzen & Alltag",
    titleDe: "Bankgeschäfte und Online-Banking",
    titleEn: "Banking and Online Banking",
    titleBn: "ব্যাংকিং এবং অনলাইন ব্যাংকিং",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Früher musste man für fast jede Überweisung oder Kontoauskunft persönlich in eine Bankfiliale gehen.",
        en: "In the past, one had to go personally to a bank branch for almost every transfer or account inquiry.",
        bn: "আগে প্রায় প্রতিটি টাকা পাঠানো বা অ্যাকাউন্টের তথ্যের জন্য সশরীরে ব্যাংকের শাখায় যেতে হতো।"
      },
      {
        de: "Heute lassen sich fast alle Bankgeschäfte bequem und rund um die Uhr per Smartphone-App erledigen.",
        en: "Today almost all banking transactions can be handled conveniently and around the clock via smartphone app.",
        bn: "আজকাল স্মার্টফোন অ্যাপের মাধ্যমে সারাক্ষণ এবং স্বাচ্ছন্দ্যে প্রায় সব ব্যাংকিং লেনদেন সম্পন্ন করা যায়।"
      },
      {
        de: "Mit wenigen Klicks kann man Rechnungen bezahlen, Daueraufträge einrichten oder seine Ausgaben analysieren.",
        en: "With a few clicks one can pay bills, set up standing orders, or analyze one's expenses.",
        bn: "মাত্র কয়েকটি ক্লিকের মাধ্যমে বিল পরিশোধ করা, স্থায়ী আদেশ (Dauerauftrag) সেট করা বা নিজের খরচ বিশ্লেষণ করা সম্ভব।"
      },
      {
        de: "Dennoch bringt das digitale Banking auch neue Risiken mit sich, vor denen man sich schützen muss.",
        en: "Nevertheless, digital banking also brings new risks with it from which one must protect oneself.",
        bn: "তবুও ডিজিটাল ব্যাংকিং কিছু নতুন ঝুঁকিও নিয়ে আসে, যা থেকে নিজেকে রক্ষা করতে হয়।"
      },
      {
        de: "Betrüger versuchen immer wieder, durch gefälschte E-Mails an vertrauliche Zugangsdaten zu gelangen.",
        en: "Fraudsters repeatedly try to obtain confidential access data through fake emails.",
        bn: "প্রতারকরা বারবার ভুয়া ইমেইলের মাধ্যমে গোপন লগইন তথ্য হাতিয়ে নেওয়ার চেষ্টা করে।"
      },
      {
        de: "Man sollte daher niemals auf verdächtige Links klicken oder seine PIN an Dritte weitergeben.",
        en: "One should therefore never click on suspicious links or pass on one's PIN to third parties.",
        bn: "তাই কখনোই সন্দেহজনক লিংকে ক্লিক করা বা তৃতীয় কোনো পক্ষকে নিজের পিন নম্বর দেওয়া উচিত নয়।"
      },
      {
        de: "Seriöse Banken fragen ihre Kunden nämlich niemals per E-Mail nach geheimen Passwörtern.",
        en: "Reputable banks, you see, never ask their customers for secret passwords via email.",
        bn: "কারণ নির্ভরযোগ্য ব্যাংকগুলো কখনোই ইমেইলের মাধ্যমে গ্রাহকদের কাছে গোপন পাসওয়ার্ড জানতে চায় না।"
      },
      {
        de: "Darüber hinaus empfiehlt es sich, für Online-Einkäufe sichere Bezahlverfahren mit Käuferschutz zu nutzen.",
        en: "In addition, it is advisable to use secure payment methods with buyer protection for online purchases.",
        bn: "তাছাড়া অনলাইন কেনাকাটার জন্য ক্রেতা সুরক্ষাসহ নিরাপদ পেমেন্ট পদ্ধতি ব্যবহার করা উচিত।"
      },
      {
        de: "Wer regelmäßig seine Kontoauszüge kontrolliert, bemerkt unberechtigte Abbuchungen sofort und kann rechtzeitig reagieren.",
        en: "Whoever regularly checks their bank statements notices unauthorized debits immediately and can react in time.",
        bn: "যারা নিয়মিত তাঁদের ব্যাংক স্টেটমেন্ট পরীক্ষা করেন, তাঁরা অননুমোদিত টাকা কাটা হলে সাথে সাথেই বুঝতে পারেন এবং সময়মতো ব্যবস্থা নিতে পারেন।"
      },
      {
        de: "Moderne Technik macht den Umgang mit Geld zwar deutlich einfacher, erfordert aber stets ein gesundes Maß an Vorsicht.",
        en: "Modern technology makes handling money significantly easier, admittedly, yet always requires a healthy degree of caution.",
        bn: "আধুনিক প্রযুক্তি টাকার লেনদেন অনেক সহজ করে দিলেও সবসময় সতর্ক থাকা প্রয়োজন।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-36",
    level: "B1",
    category: "Beschwerde",
    titleDe: "Eine Beschwerde im Restaurant",
    titleEn: "A Complaint in a Restaurant",
    titleBn: "রেস্তোরাঁয় একটি অভিযোগ",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Letzten Samstag wollten meine Frau und ich unseren Hochzeitstag in einem gehobenen Restaurant feiern.",
        en: "Last Saturday my wife and I wanted to celebrate our wedding anniversary in an upscale restaurant.",
        bn: "গত শনিবার আমি এবং আমার স্ত্রী একটি অভিজাত রেস্তোরাঁয় আমাদের বিবাহবার্ষিকী উদযাপন করতে চেয়েছিলাম।"
      },
      {
        de: "Wir hatten schon Wochen vorher einen Tisch reserviert und freuten uns auf einen schönen Abend.",
        en: "We had reserved a table weeks in advance and were looking forward to a lovely evening.",
        bn: "আমরা কয়েক সপ্তাহ আগেই একটি টেবিল বুক করেছিলাম এবং একটি সুন্দর সন্ধ্যার অপেক্ষায় ছিলাম।"
      },
      {
        de: "Leider begann der Abend bereits mit einer langen Wartezeit, obwohl kaum Gäste im Lokal waren.",
        en: "Unfortunately the evening began with a long wait, even though there were hardly any guests in the restaurant.",
        bn: "দুর্ভাগ্যবশত রেস্তোরাঁয় তেমন কোনো অতিথি না থাকা সত্ত্বেও সন্ধ্যাটি দীর্ঘ অপেক্ষার মধ্য দিয়ে শুরু হলো।"
      },
      {
        de: "Nachdem wir endlich unsere Bestellung aufgegeben hatten, dauerte es fast eine Stunde, bis das Essen kam.",
        en: "After we had finally placed our order, it took almost an hour until the food arrived.",
        bn: "অবশেষে আমরা খাবার অর্ডার করার পর খাবার আসতে প্রায় এক ঘণ্টা সময় লাগল।"
      },
      {
        de: "Zu unserer großen Enttäuschung war meine Suppe nur noch lauwarm und das Fleisch völlig versalzen.",
        en: "To our great disappointment, my soup was only lukewarm and the meat completely oversalted.",
        bn: "আমাদের চরম হতাশার কারণ হয়ে দাঁড়াল যে আমার স্যুপটি ছিল প্রায় ঠান্ডা এবং মাংস ছিল অতিরিক্ত লবণাক্ত।"
      },
      {
        de: "Ich rief den Kellner freundlich an unseren Tisch und schilderte ihm sachlich das Problem.",
        en: "I called the waiter politely to our table and objectively described the problem to him.",
        bn: "আমি ওয়েটারকে ভদ্রভাবে আমাদের টেবিলে ডাকলাম এবং বস্তুনিষ্ঠভাবে তাঁকে সমস্যার কথা জানালাম।"
      },
      {
        de: "Anstatt sich zu entschuldigen, reagierte der Kellner zunächst unfreundlich und meinte, das könne gar nicht sein.",
        en: "Instead of apologizing, the waiter initially reacted unfriendlily and claimed that could not be at all.",
        bn: "দুঃখ প্রকাশ করার পরিবর্তে ওয়েটার প্রথমে অভদ্র আচরণ করলেন এবং বললেন যে এমনটা হতেই পারে না।"
      },
      {
        de: "Daraufhin bat ich höflich darum, kurz mit dem Restaurantleiter sprechen zu dürfen.",
        en: "Thereupon I politely asked to be allowed to speak briefly with the restaurant manager.",
        bn: "এরপর আমি বিনয়ের সাথে রেস্তোরাঁর ম্যানেজারের সাথে সংক্ষেপে কথা বলার অনুমতি চাইলাম।"
      },
      {
        de: "Der Geschäftsführer hörte sich unsere Beschwerde aufmerksam an und zeigte sofort großes Verständnis.",
        en: "The manager listened attentively to our complaint and immediately showed great understanding.",
        bn: "ম্যানেজার মনোযোগ দিয়ে আমাদের অভিযোগ শুনলেন এবং সাথে সাথেই গভীর সহমর্মিতা দেখালেন।"
      },
      {
        de: "Er ließ uns umgehend frisch zubereitete Gerichte bringen und lud uns als Entschädigung auf das Dessert ein.",
        en: "He immediately had freshly prepared dishes brought to us and treated us to dessert as compensation.",
        bn: "তিনি অবিলম্বে আমাদের জন্য টাটকা তৈরি খাবার আনার ব্যবস্থা করলেন এবং ক্ষতিপূরণ হিসেবে আমাদের ডেজার্ট খাওয়ালেন।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-37",
    level: "B1",
    category: "Alltag & Arbeit",
    titleDe: "Verkehrsmittel und Pendleralltag",
    titleEn: "Transportation and Commuter Life",
    titleBn: "যানবাহন এবং নিত্যযাত্রীদের জীবন",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Millionen Menschen in Deutschland pendeln jeden Tag zwischen ihrem Wohnort und ihrem Arbeitsplatz hin und her.",
        en: "Millions of people in Germany commute back and forth every day between their place of residence and their workplace.",
        bn: "জার্মানিতে লক্ষ লক্ষ মানুষ প্রতিদিন তাঁদের বাসস্থান এবং কর্মস্থলের মধ্যে যাতায়াত করেন।"
      },
      {
        de: "Viele wohnen lieber etwas außerhalb im Grünen, weil die Mieten dort deutlich günstiger sind als in der Innenstadt.",
        en: "Many prefer living somewhat outside in the countryside because rents there are significantly cheaper than in the city center.",
        bn: "অনেকেই শহরের একটু বাইরে সবুজ পরিবেশে থাকতে বেশি পছন্দ করেন, কারণ সেখানে শহরের কেন্দ্রস্থলের তুলনায় বাড়িভাড়া অনেক কম।"
      },
      {
        de: "Dafür nehmen sie morgens und abends eine längere Fahrzeit mit dem Regionalzug oder dem Auto in Kauf.",
        en: "In return, they put up with a longer travel time in the morning and evening by regional train or car.",
        bn: "এর বিনিময়ে তাঁরা সকালে এবং সন্ধ্যায় আঞ্চলিক ট্রেন বা গাড়িতে দীর্ঘ ভ্রমণের সময় মেনে নেন।"
      },
      {
        de: "Mein Kollege Stefan fährt beispielsweise jeden Morgen vierzig Minuten mit der Bahn nach Frankfurt.",
        en: "My colleague Stefan, for example, takes the train to Frankfurt for forty minutes every morning.",
        bn: "উদাহরণস্বরূপ, আমার সহকর্মী স্টেফান প্রতিদিন সকালে চল্লিশ মিনিট ট্রেনে করে ফ্রাঙ্কফুর্টে আসেন।"
      },
      {
        de: "Er nutzt die Reisezeit jedoch sehr sinnvoll, indem er im Zug Nachrichten liest oder E-Mails beantwortet.",
        en: "However, he uses the travel time very sensibly by reading the news or answering emails on the train.",
        bn: "তবে তিনি ট্রেনে খবর পড়ে বা ইমেইলের উত্তর দিয়ে ভ্রমণের সময়টুকু খুব বুদ্ধিমত্তার সাথে কাজে লাগান।"
      },
      {
        de: "Manchmal kommt es im Winter wegen Schnee oder Bauarbeiten leider zu unangenehmen Zugausfällen.",
        en: "Sometimes in winter, due to snow or construction work, unpleasant train cancellations unfortunately occur.",
        bn: "শীতকালে তুষারপাত বা নির্মাণকাজের কারণে মাঝে মাঝে দুর্ভাগ্যবশত ট্রেন বাতিলের মতো অপ্রীতিকর ঘটনা ঘটে।"
      },
      {
        de: "In solchen Momenten muss man geduldig bleiben und flexibel auf andere Verkehrsmittel ausweichen.",
        en: "In such moments one has to remain patient and flexibly switch to other means of transport.",
        bn: "এই ধরনের মুহূর্তে ধৈর্য ধরতে হয় এবং নমনীয়ভাবে অন্য পরিবহনের ব্যবস্থা করতে হয়।"
      },
      {
        de: "Seit Einführung des deutschlandweiten Nahverkehrstickets sind viele Pendler vom Auto auf Bus und Bahn umgestiegen.",
        en: "Since the introduction of the nationwide local transport ticket, many commuters have switched from cars to buses and trains.",
        bn: "দেশব্যাপী লোকাল ট্রান্সপোর্ট টিকিট চালু হওয়ার পর থেকে অনেক নিত্যযাত্রী গাড়ি ছেড়ে বাস ও ট্রেনে যাতায়াত শুরু করেছেন।"
      },
      {
        de: "Das entlastet nicht nur die überfüllten Autobahnen, sondern schont auch die Nerven der Reisenden.",
        en: "This not only relieves the overcrowded highways, but also spares the nerves of travelers.",
        bn: "এটি কেবল জনাকীর্ণ মহাসড়কগুলোর চাপই কমায় না, বরং যাত্রীদের মানসিক চাপও কমায়।"
      },
      {
        de: "Ein gut funktionierendes Verkehrsnetz ist eben die Lebensader einer modernen Wirtschaftsregion.",
        en: "A well-functioning transport network is simply the lifeline of a modern economic region.",
        bn: "একটি সুপরিচালিত পরিবহন ব্যবস্থা হলো একটি আধুনিক অর্থনৈতিক অঞ্চলের প্রাণশক্তি।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-38",
    level: "B1",
    category: "Gesellschaft & Kultur",
    titleDe: "Interkulturelle Freundschaften",
    titleEn: "Intercultural Friendships",
    titleBn: "আন্তঃসাংস্কৃতিক বন্ধুত্ব",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Wenn man in einem fremden Land lebt, sind Freundschaften mit Einheimischen und anderen Internationalen von unschätzbarem Wert.",
        en: "When one lives in a foreign country, friendships with locals and other internationals are of inestimable value.",
        bn: "মানুষ যখন কোনো বিদেশি রাষ্ট্রে বসবাস করেন, তখন স্থানীয় এবং অন্যান্য আন্তর্জাতিক বন্ধুদের সাথে বন্ধুত্ব অমূল্য সম্পদ।"
      },
      {
        de: "Durch den regelmäßigen Austausch lernt man die Kultur des Gastlandes viel tiefer kennen als aus jedem Reiseführer.",
        en: "Through regular exchange one gets to know the culture of the host country much more deeply than from any travel guide.",
        bn: "নিয়মিত মতবিনিময়ের মাধ্যমে আশ্রয়দাতা দেশের সংস্কৃতিকে যেকোনো ভ্রমণ গাইডের চেয়ে অনেক গভীরভাবে জানা যায়।"
      },
      {
        de: "Ich habe im Laufe meines Studiums viele wunderbare Menschen kennengelernt, mit denen ich heute eng befreundet bin.",
        en: "Over the course of my studies I have met many wonderful people with whom I am close friends today.",
        bn: "আমার পড়াশোনার সময়কালে আমি অনেক চমৎকার মানুষের সাথে পরিচিত হয়েছি, যাঁদের সাথে আজ আমার গভীর বন্ধুত্ব রয়েছে।"
      },
      {
        de: "Wir treffen uns regelmäßig zum Kochen, Wandern oder einfach zum gemeinsamen Diskutieren über Gott und die Welt.",
        en: "We meet regularly to cook, hike, or simply to discuss everything under the sun together.",
        bn: "আমরা নিয়মিত রান্না করতে, হাইকিং করতে বা কেবল পৃথিবীর নানা বিষয় নিয়ে আড্ডা দিতে একত্রিত হই।"
      },
      {
        de: "Dabei stellen wir immer wieder fest, dass wir trotz unterschiedlicher Herkunft dieselben Werte teilen.",
        en: "In doing so, we repeatedly discover that despite different origins we share the same values.",
        bn: "এতে আমরা বারবার দেখতে পাই যে ভিন্ন পটভূমি থাকা সত্ত্বেও আমাদের মূল্যবোধ একই।"
      },
      {
        de: "Natürlich gibt es manchmal auch lustige sprachliche Missverständnisse, über die wir gemeinsam herzlich lachen.",
        en: "Of course there are sometimes also funny linguistic misunderstandings, about which we laugh heartily together.",
        bn: "অবশ্যই মাঝে মাঝে মজার ভাষাগত ভুল বোঝাবুঝিও হয়, যা নিয়ে আমরা সবাই মিলে প্রাণখুলে হাসি।"
      },
      {
        de: "Meine deutschen Freunde erklären mir geduldig typische Redewendungen, die man in keinem Lehrbuch findet.",
        en: "My German friends patiently explain typical idioms to me that one cannot find in any textbook.",
        bn: "আমার জার্মান বন্ধুরা আমাকে ধৈর্য ধরে এমন সব প্রবাদ-প্রবচন বুঝিয়ে দেয়, যা কোনো পাঠ্যবইয়ে পাওয়া যায় না।"
      },
      {
        de: "Im Gegenzug erzähle ich ihnen viel über die Geschichte, die Musik und die Gastfreundschaft Bangladeschs.",
        en: "In return, I tell them a lot about the history, music, and hospitality of Bangladesh.",
        bn: "বিনিময়ে আমি তাদের বাংলাদেশের ইতিহাস, সংগীত এবং আতিথেয়তা সম্পর্কে অনেক কিছু বলি।"
      },
      {
        de: "Solche Freundschaften bauen Vorurteile ab und zeigen, wie bereichernd kulturelle Vielfalt ist.",
        en: "Such friendships break down prejudices and show how enriching cultural diversity is.",
        bn: "এই ধরনের বন্ধুত্ব কুসংস্কার দূর করে এবং দেখায় যে সাংস্কৃতিক বৈচিত্র্য কতটা সমৃদ্ধশালী।"
      },
      {
        de: "Am Ende merkt man, dass echte Verbundenheit keine Ländergrenzen kennt.",
        en: "In the end one notices that true connection knows no national borders.",
        bn: "শেষ পর্যন্ত বোঝা যায় যে প্রকৃত আত্মিক বন্ধন কোনো দেশের সীমানা মানে না।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-39",
    level: "B1",
    category: "Medien",
    titleDe: "Medienkonsum und Nachrichtenkompetenz",
    titleEn: "Media Consumption and News Literacy",
    titleBn: "গণমাধ্যমের ব্যবহার এবং সংবাদ-সচেতনতা",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Noch nie in der Geschichte hatten Menschen so schnellen Zugang zu weltweiten Nachrichten wie im digitalen Zeitalter.",
        en: "Never before in history have people had such rapid access to worldwide news as in the digital age.",
        bn: "ইতিহাসে এর আগে কখনোই মানুষ ডিজিটাল যুগের মতো এত দ্রুত বিশ্বব্যাপী খবরাখবর পাওয়ার সুযোগ পায়নি।"
      },
      {
        de: "Innerhalb von Sekunden erfahren wir über Push-Mitteilungen, was auf der anderen Seite der Erde passiert.",
        en: "Within seconds we find out via push notifications what is happening on the other side of the earth.",
        bn: "পুশ নোটিফিকেশনের মাধ্যমে কয়েক সেকেন্ডের মধ্যেই আমরা জানতে পারি পৃথিবীর অন্য প্রান্তে কী ঘটছে।"
      },
      {
        de: "Diese ständige Informationsflut kann jedoch auch überfordernd wirken und zu Verunsicherung führen.",
        en: "However, this constant flood of information can also feel overwhelming and lead to uncertainty.",
        bn: "তবে তথ্যের এই নিরন্তর প্রবাহ অনেক সময় দিশেহারা করে দিতে পারে এবং অনিশ্চয়তা তৈরি করতে পারে।"
      },
      {
        de: "Im Internet verbreiten sich ungeprüfte Gerüchte und absichtliche Falschmeldungen oft schneller als seriöse Berichte.",
        en: "On the internet, unverified rumors and deliberate fake news often spread faster than serious reports.",
        bn: "ইন্টারনেটে যাচাইবিহীন গুজব এবং উদ্দেশ্যপ্রণোদিত ভুয়া খবর প্রায়ই নির্ভরযোগ্য প্রতিবেদনের চেয়ে দ্রুত ছড়িয়ে পড়ে।"
      },
      {
        de: "Deshalb ist es heute wichtiger denn je, Quellen kritisch zu prüfen, bevor man eine Nachricht teilt.",
        en: "Therefore it is more important today than ever to critically check sources before sharing a piece of news.",
        bn: "তাই কোনো খবর শেয়ার করার আগে উৎসগুলো সমালোচনামূলকভাবে যাচাই করা আজ আগের যেকোনো সময়ের চেয়ে বেশি গুরুত্বপূর্ণ।"
      },
      {
        de: "Man sollte sich immer fragen, wer einen Artikel verfasst hat und welche Absicht dahinterstecken könnte.",
        en: "One should always ask oneself who wrote an article and what intention might be behind it.",
        bn: "সবসময় নিজেকে প্রশ্ন করা উচিত যে নিবন্ধটি কে লিখেছেন এবং এর পেছনে কী উদ্দেশ্য থাকতে পারে।"
      },
      {
        de: "Öffentlich-rechtliche Sender und etablierte Qualitätszeitungen bieten in der Regel verlässliche und gut recherchierte Informationen.",
        en: "Public broadcasters and established quality newspapers generally offer reliable and well-researched information.",
        bn: "সরকারি সম্প্রচার মাধ্যম এবং প্রতিষ্ঠিত মানসম্মত সংবাদপত্রগুলো সাধারণত নির্ভরযোগ্য এবং সুগবেষিত তথ্য প্রদান করে।"
      },
      {
        de: "Trotzdem lohnt es sich, verschiedene Perspektiven zu einem Thema zu lesen, um sich ein umfassendes Bild zu machen.",
        en: "Nevertheless, it is worthwhile to read different perspectives on a topic in order to form a comprehensive picture.",
        bn: "তবুও একটি বিষয়ের ওপর সামগ্রিক ধারণা পাওয়ার জন্য বিভিন্ন দৃষ্টিভঙ্গি পড়া সার্থক।"
      },
      {
        de: "Viele Menschen legen mittlerweile auch bewusst nachrichtenfreie Tage ein, um ihren Geist zu entlasten.",
        en: "Many people meanwhile also consciously take news-free days in order to relieve their minds.",
        bn: "অনেক মানুষ ইতিমধ্যে মনকে হালকা রাখার জন্য সচেতনভাবে খবর-মুক্ত দিনও পালন করছেন।"
      },
      {
        de: "Ein kluger Medienkonsum hilft uns dabei, informiert zu bleiben, ohne die innere Ruhe zu verlieren.",
        en: "Smart media consumption helps us stay informed without losing inner peace.",
        bn: "বুদ্ধিদীপ্ত গণমাধ্যম ব্যবহার আমাদের মানসিক শান্তি না হারিয়েই সচেতন থাকতে সাহায্য করে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b1-40",
    level: "B1",
    category: "B1 Rückblick",
    titleDe: "Bereit für das Niveau B2!",
    titleEn: "Ready for Level B2!",
    titleBn: "বি২ স্তরের জন্য প্রস্তুত!",
    readingTimeMinutes: 4,
    sentences: [
      {
        de: "Wenn ich heute auf die letzten Monate im B1-Kurs zurückblicke, erfüllt mich ein Gefühl großer Zufriedenheit.",
        en: "When I look back today on the last months in the B1 course, a feeling of great satisfaction fills me.",
        bn: "আজ যখন আমি বি১ কোর্সের গত কয়েক মাসের দিকে ফিরে তাকাই, তখন এক গভীর সন্তুষ্টির অনুভূতি আমাকে ভরিয়ে দেয়।"
      },
      {
        de: "Nachdem ich anfangs oft nach den richtigen Worten suchen musste, kann ich mich jetzt flüssig unterhalten.",
        en: "After initially often having to search for the right words, I can now converse fluently.",
        bn: "শুরুতে যেখানে প্রায়ই সঠিক শব্দ খুঁজতে হতো, আজ সেখানে আমি সাবলীলভাবে কথোপকথন চালিয়ে যেতে পারি।"
      },
      {
        de: "Ich habe gelernt, meine Meinung zu komplexen Themen klar zu begründen und auf Gegenargumente einzugehen.",
        en: "I have learned to clearly justify my opinion on complex topics and respond to counterarguments.",
        bn: "আমি জটিল বিষয়গুলোতে নিজের মতামতের পক্ষে স্পষ্ট যুক্তি দিতে এবং পাল্টা যুক্তির জবাব দিতে শিখেছি।"
      },
      {
        de: "Besonders die Beschäftigung mit dem Passiv, dem Genitiv und dem Konjunktiv II hat meinen Ausdruck deutlich verfeinert.",
        en: "Dealing with the passive voice, the genitive case, and the subjunctive II in particular has significantly refined my expression.",
        bn: "বিশেষ করে প্যাসিভ ভয়েস, জেনিটিভ কারক এবং কনজাঙ্কটিভ ২-এর অনুশীলন আমার প্রকাশভঙ্গিকে উল্লেখযোগ্যভাবে মার্জিত করেছে।"
      },
      {
        de: "In unseren Schreibübungen haben wir formelle Beschwerdebriefe verfasst und Artikel über gesellschaftliche Fragen diskutiert.",
        en: "In our writing exercises we drafted formal complaint letters and discussed articles about social issues.",
        bn: "আমাদের লেখার অনুশীলনে আমরা আনুষ্ঠানিক অভিযোগপত্র লিখেছি এবং সামাজিক বিষয়গুলোর নিবন্ধ নিয়ে আলোচনা করেছি।"
      },
      {
        de: "Ohne die regelmäßigen Gespräche mit meinen Lernpartnern wäre dieser Fortschritt sicher nicht so schnell gelungen.",
        en: "Without the regular conversations with my study partners, this progress would certainly not have succeeded so quickly.",
        bn: "আমার সহপাঠীদের সাথে নিয়মিত কথোপকথন ছাড়া এই অগ্রগতি নিশ্চিতভাবেই এত দ্রুত সম্ভব হতো না।"
      },
      {
        de: "Nächste Woche findet nun die offizielle B1-Zertifikatsprüfung statt, auf die ich mich intensiv vorbereitet habe.",
        en: "Next week the official B1 certificate exam takes place, for which I have prepared intensively.",
        bn: "আগামী সপ্তাহে আনুষ্ঠানিক বি১ সার্টিফিকেট পরীক্ষা অনুষ্ঠিত হবে, যার জন্য আমি নিবিড়ভাবে প্রস্তুতি নিয়েছি।"
      },
      {
        de: "Sobald ich das Zertifikat in den Händen halte, möchte ich direkt mit dem Niveau B2 weitermachen.",
        en: "As soon as I hold the certificate in my hands, I want to continue directly with level B2.",
        bn: "সার্টিফিকেটটি হাতে পাওয়া মাত্রই আমি সরাসরি বি২ স্তর শুরু করতে চাই।"
      },
      {
        de: "Ich weiß, dass auf der nächsten Stufe noch anspruchsvollere Texte und feinere sprachliche Nuancen auf mich warten.",
        en: "I know that at the next level even more demanding texts and finer linguistic nuances await me.",
        bn: "আমি জানি যে পরবর্তী ধাপে আরও কঠিন পাঠ্য এবং ভাষার সূক্ষ্ম বিষয়গুলো আমার জন্য অপেক্ষা করছে।"
      },
      {
        de: "Mit Neugier, Ausdauer und Freude am Lernen freue ich mich schon jetzt auf dieses nächste Kapitel!",
        en: "With curiosity, perseverance, and joy in learning, I am already looking forward to this next chapter!",
        bn: "কৌতূহল, অধ্যবসায় এবং শেখার আনন্দের সাথে আমি এখনই এই পরবর্তী অধ্যায়ের জন্য অধীর আগ্রহে অপেক্ষা করছি!"
      }
    ],
    dictionary: {}
  },

  // ===================== B2 (40 Passages) =====================
  {
    id: "passage-b2-1",
    level: "B2",
    category: "Passiv & Passiversatz",
    titleDe: "Nachhaltige Stadtentwicklung in Frankfurt",
    titleEn: "Sustainable Urban Development in Frankfurt",
    titleBn: "ফ্রাঙ্কফুর্টে টেকসই নগর উন্নয়ন",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "In den letzten Jahren ist das Thema nachhaltige Stadtentwicklung in Frankfurt immer stärker in den Fokus gerückt.",
        en: "In recent years, the topic of sustainable urban development has moved increasingly into focus in Frankfurt.",
        bn: "সাম্প্রতিক বছরগুলোতে ফ্রাঙ্কফুর্টে টেকসই নগর উন্নয়নের বিষয়টি ক্রমশ আলোচনার কেন্দ্রবিন্দুতে চলে এসেছে।"
      },
      {
        de: "Zahlreiche ehemalige Industriegebiete sind inzwischen in moderne, grüne Wohnviertel umgewandelt worden.",
        en: "Numerous former industrial areas have meanwhile been transformed into modern, green residential districts.",
        bn: "ইতিমধ্যে অসংখ্য প্রাক্তন শিল্পাঞ্চলকে আধুনিক ও সবুজ আবাসিক এলাকায় রূপান্তরিত করা হয়েছে।"
      },
      {
        de: "Experten betonen jedoch, dass der öffentliche Nahverkehr in den kommenden Jahren noch weiter ausgebaut werden muss.",
        en: "Experts emphasize, however, that public transportation must be expanded even further in the coming years.",
        bn: "তবে বিশেষজ্ঞরা জোর দিয়ে বলছেন যে আগামী বছরগুলোতে গণপরিবহন ব্যবস্থার আরও প্রসার ঘটাতে হবে।"
      },
      {
        de: "Neue Fahrradwege sind überall im Stadtzentrum anzulegen, um den Autoverkehr spürbar zu reduzieren.",
        en: "New bike lanes are to be constructed everywhere in the city center in order to noticeably reduce car traffic.",
        bn: "গাড়ির চলাচল উল্লেখযোগ্যভাবে কমানোর জন্য শহরের কেন্দ্রস্থলের সর্বত্র নতুন সাইকেল লেন নির্মাণ করতে হবে।"
      },
      {
        de: "Durch intelligente Gebäudetechnik lässt sich der Energieverbrauch großer Bürohochhäuser erheblich senken.",
        en: "Through intelligent building technology, the energy consumption of large office skyscrapers can be reduced considerably.",
        bn: "বুদ্ধিমান ভবন প্রযুক্তির মাধ্যমে বড় অফিস ভবনগুলোর জ্বালানি খরচ উল্লেখযোগ্যভাবে কমানো সম্ভব।"
      },
      {
        de: "Viele ältere Gebäude sind bereits energetisch saniert worden, sodass weniger Wärme verloren geht.",
        en: "Many older buildings have already been energy-renovated so that less heat is lost.",
        bn: "অনেক পুরনো ভবন ইতিমধ্যেই জ্বালানি-সাশ্রয়ীভাবে সংস্কার করা হয়েছে, যাতে কম তাপ অপচয় হয়।"
      },
      {
        de: "Bis zum Jahr 2030 werden noch zahlreiche weitere Solarprojekte auf städtischen Dächern realisiert werden.",
        en: "By the year 2030, numerous additional solar projects will be realized on municipal roofs.",
        bn: "২০৩০ সালের মধ্যে শহরের ছাদগুলোতে আরও অসংখ্য সৌর প্রকল্প বাস্তবায়িত হবে।"
      },
      {
        de: "Dennoch lassen sich nicht alle ökologischen Herausforderungen allein durch technische Innovationen lösen.",
        en: "Nevertheless, not all ecological challenges can be solved through technical innovations alone.",
        bn: "তবুও কেবল প্রযুক্তিগত উদ্ভাবনের মাধ্যমে সব পরিবেশগত চ্যালেঞ্জ সমাধান করা সম্ভব নয়।"
      },
      {
        de: "Auch das Bewusstsein der Bürgerinnen und Bürger muss durch gezielte Aufklärungskampagnen gestärkt werden.",
        en: "The awareness of citizens must also be strengthened through targeted information campaigns.",
        bn: "লক্ষ্যভিত্তিক সচেতনতামূলক প্রচারণার মাধ্যমে নাগরিকদের সচেতনতাও বৃদ্ধি করতে হবে।"
      },
      {
        de: "Nur durch gemeinsames Handeln wird eine lebenswerte Zukunft für kommende Generationen gesichert werden können.",
        en: "Only through joint action will a livable future be able to be secured for coming generations.",
        bn: "কেবল যৌথ প্রচেষ্টার মাধ্যমেই আগামী প্রজন্মের জন্য একটি বাসযোগ্য ভবিষ্যৎ নিশ্চিত করা সম্ভব হবে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-2",
    level: "B2",
    category: "Konjunktiv I (Indirekte Rede)",
    titleDe: "Pressekonferenz zum Klimabericht",
    titleEn: "Press Conference on the Climate Report",
    titleBn: "জলবায়ু প্রতিবেদন নিয়ে সংবাদ সম্মেলন",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Gestern fand in Berlin eine vielbeachtete Pressekonferenz zur Vorstellung des aktuellen Klimaberichts statt.",
        en: "Yesterday a widely noted press conference took place in Berlin to present the current climate report.",
        bn: "গতকাল বার্লিনে বর্তমান জলবায়ু প্রতিবেদন উপস্থাপনের জন্য একটি বহুল আলোচিত সংবাদ সম্মেলন অনুষ্ঠিত হয়েছে।"
      },
      {
        de: "Die Umweltministerin erklärte vor den versammelten Journalisten, die Lage sei ernster als bisher angenommen.",
        en: "The Environment Minister stated before the assembled journalists that the situation was more serious than previously assumed.",
        bn: "পরিবেশমন্ত্রী উপস্থিত সাংবাদিকদের সামনে বলেন যে পরিস্থিতি আগের ধারণার চেয়েও বেশি গুরুতর।"
      },
      {
        de: "Die durchschnittliche Temperatur in Deutschland habe sich in den letzten Jahrzehnten deutlich erhöht.",
        en: "The average temperature in Germany had risen significantly in recent decades.",
        bn: "গত কয়েক দশকে জার্মানির গড় তাপমাত্রা উল্লেখযোগ্যভাবে বৃদ্ধি পেয়েছে।"
      },
      {
        de: "Besonders die Landwirtschaft leide unter den immer häufiger auftretenden Trockenperioden im Sommer.",
        en: "Agriculture in particular was suffering from the increasingly frequent dry periods in summer.",
        bn: "বিশেষ করে গ্রীষ্মকালে ক্রমবর্ধমান খরার কারণে কৃষিখাত ক্ষতিগ্রস্ত হচ্ছে।"
      },
      {
        de: "Auf die Frage eines Reporters antwortete sie, die Regierung plane bereits umfassende Hilfsprogramme für betroffene Betriebe.",
        en: "In response to a reporter's question, she answered that the government was already planning comprehensive aid programs for affected businesses.",
        bn: "একজন সাংবাদিকের প্রশ্নের জবাবে তিনি জানান যে সরকার ইতিমধ্যেই ক্ষতিগ্রস্ত প্রতিষ্ঠানগুলোর জন্য ব্যাপক সহায়তা কর্মসূচির পরিকল্পনা করছে।"
      },
      {
        de: "Kritiker hingegen behaupteten, die bisherigen Maßnahmen reichten bei Weitem nicht aus, um die Klimaziele zu erreichen.",
        en: "Critics, on the other hand, claimed that the previous measures were by far not sufficient to achieve the climate targets.",
        bn: "অন্যদিকে সমালোচকরা দাবি করেন যে জলবায়ু লক্ষ্যমাত্রা অর্জনের জন্য এখন পর্যন্ত গৃহীত পদক্ষেপগুলো মোটেও যথেষ্ট নয়।"
      },
      {
        de: "Umweltverbände forderten, man müsse den Ausbau erneuerbarer Energien sofort beschleunigen.",
        en: "Environmental associations demanded that the expansion of renewable energies had to be accelerated immediately.",
        bn: "পরিবেশবাদী সংগঠনগুলো দাবি জানায় যে নবায়নযোগ্য জ্বালানির সম্প্রসারণ অবিলম্বে ত্বরান্বিত করতে হবে।"
      },
      {
        de: "Die Ministerin betonte abschließend, alle gesellschaftlichen Gruppen müssten nun Verantwortung übernehmen.",
        en: "The minister emphasized in conclusion that all social groups now had to take responsibility.",
        bn: "মন্ত্রী পরিশেষে জোর দিয়ে বলেন যে সমাজের সব স্তরের মানুষকে এখন দায়িত্ব নিতে হবে।"
      },
      {
        de: "Niemand könne es sich mehr leisten, die wissenschaftlichen Warnungen zu ignorieren.",
        en: "Nobody could afford any longer to ignore the scientific warnings.",
        bn: "বৈজ্ঞানিক সতর্কবার্তাগুলো উপেক্ষা করার সামর্থ্য আর কারো নেই।"
      },
      {
        de: "In den kommenden Wochen werde das Parlament über ein neues Klimaschutzgesetz beraten.",
        en: "In the coming weeks parliament would deliberate on a new climate protection law.",
        bn: "আগামী সপ্তাহগুলোতে সংসদ একটি নতুন জলবায়ু সুরক্ষা আইন নিয়ে আলোচনা করবে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-3",
    level: "B2",
    category: "Subjektive Modalverben",
    titleDe: "Gerüchte im Unternehmen",
    titleEn: "Rumors in the Company",
    titleBn: "কোম্পানিতে গুঞ্জন",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Seit heute Morgen herrscht in unserer Abteilung eine ungewöhnlich aufgeregte Stimmung.",
        en: "Since this morning an unusually excited mood has prevailed in our department.",
        bn: "আজ সকাল থেকে আমাদের বিভাগে এক অস্বাভাবিক উত্তেজনাপূর্ণ পরিবেশ বিরাজ করছে।"
      },
      {
        de: "Unser Abteilungsleiter ist nicht zur Arbeit erschienen, was sofort zu wilden Spekulationen führte.",
        en: "Our department head did not show up for work, which immediately led to wild speculations.",
        bn: "আমাদের বিভাগীয় প্রধান কাজে উপস্থিত হননি, যা সাথে সাথেই নানা জল্পনা-কল্পনার জন্ম দিয়েছে।"
      },
      {
        de: "Eine Kollegin meinte, er müsse wegen einer dringenden Angelegenheit direkt in die Zentrale gerufen worden sein.",
        en: "A colleague thought he must have been called directly to headquarters because of an urgent matter.",
        bn: "এক সহকর্মী মনে করলেন, জরুরি কোনো বিষয়ের কারণে তাঁকে নিশ্চয়ই সরাসরি প্রধান কার্যালয়ে ডাকা হয়েছে।"
      },
      {
        de: "Ein anderer Mitarbeiter vermutete hingegen, er könnte sich vielleicht eine schwere Grippe eingefangen haben.",
        en: "Another employee suspected, on the other hand, that he might perhaps have caught a bad flu.",
        bn: "অন্যদিকে আরেক কর্মচারী অনুমান করলেন যে তিনি হয়তো মারাত্মক ফ্লু-তে আক্রান্ত হয়েছেন।"
      },
      {
        de: "Angeblich soll unsere Firma im nächsten Quartal mit einem großen internationalen Konzern fusionieren.",
        en: "Allegedly our company is said to merge with a large international corporation in the next quarter.",
        bn: "শোনা যাচ্ছে যে আগামী প্রান্তিকে আমাদের কোম্পানি একটি বড় আন্তর্জাতিক কর্পোরেশনের সাথে একীভূত হতে যাচ্ছে।"
      },
      {
        de: "Diese Nachricht dürfte für viele Kollegen eine enorme Überraschung darstellen.",
        en: "This news should represent an enormous surprise for many colleagues.",
        bn: "এই খবরটি অনেক সহকর্মীর জন্য এক বিশাল বিস্ময় হয়ে আসতে পারে।"
      },
      {
        de: "Ein Praktikant behauptete sogar, er wolle gestern Abend geheime Dokumente auf dem Schreibtisch gesehen haben.",
        en: "An intern even claimed to have seen secret documents on the desk yesterday evening.",
        bn: "একজন ইন্টার্ন এমনকি দাবি করল যে সে গতকাল সন্ধ্যায় ডেস্কে গোপন নথিপত্র দেখেছে।"
      },
      {
        de: "Ich persönlich glaube, dass an diesen Gerüchten nur sehr wenig Wahrheit sein dürfte.",
        en: "I personally believe that there is probably very little truth to these rumors.",
        bn: "আমি ব্যক্তিগতভাবে বিশ্বাস করি যে এই গুজবগুলোতে সম্ভবত খুব কমই সত্যতা রয়েছে।"
      },
      {
        de: "Solche Spekulationen könnten dem Arbeitsklima im Team ernsthaft schaden, wenn man ihnen blind vertraut.",
        en: "Such speculations could seriously harm the working atmosphere in the team if one trusts them blindly.",
        bn: "অন্ধভাবে বিশ্বাস করলে এই ধরনের জল্পনা-কল্পনা দলের কাজের পরিবেশের মারাত্মক ক্ষতি করতে পারে।"
      },
      {
        de: "Am Nachmittag schickte der Chef schließlich eine E-Mail, dass er lediglich wegen eines Zahnarzttermins fehlte.",
        en: "In the afternoon the boss finally sent an email saying he was merely absent due to a dental appointment.",
        bn: "বিকেলে বস অবশেষে একটি ইমেইল পাঠালেন যে তিনি কেবল দাঁতের ডাক্তারের অ্যাপয়েন্টমেন্টের কারণে অনুপস্থিত ছিলেন।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-4",
    level: "B2",
    category: "Futur II",
    titleDe: "Rückblick auf das Semester",
    titleEn: "Looking Back at the Semester",
    titleBn: "সেমিস্টারের দিকে ফিরে দেখা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Das aktuelle Wintersemester neigt sich langsam dem Ende zu und die Prüfungsphase beginnt.",
        en: "The current winter semester is slowly drawing to a close and the exam phase is beginning.",
        bn: "বর্তমান শীতকালীন সেমিস্টারটি ধীরে ধীরে শেষের দিকে এগোচ্ছে এবং পরীক্ষার সময় শুরু হচ্ছে।"
      },
      {
        de: "Bis Ende Februar werde ich hoffentlich alle fünf schriftlichen Klausuren erfolgreich bestanden haben.",
        en: "By the end of February I will hopefully have successfully passed all five written exams.",
        bn: "ফেব্রুয়ারির শেষ নাগাদ আশা করি আমি পাঁচটি লিখিত পরীক্ষাতেই সফলভাবে উত্তীর্ণ হয়ে যাব।"
      },
      {
        de: "Mein Kommilitone Lukas wird zu diesem Zeitpunkt bereits sein Praktikum in München angetreten haben.",
        en: "My fellow student Lukas will have already started his internship in Munich by that time.",
        bn: "আমার সহপাঠী লুকাস ততক্ষণে মিউনিখে তার ইন্টার্নশিপ শুরু করে দিয়েছে বলে ধরে নেওয়া যায়।"
      },
      {
        de: "Wenn wir uns im April wiedersehen, werden wir bestimmt viele spannende Erfahrungen gesammelt haben.",
        en: "When we see each other again in April, we will definitely have gathered many exciting experiences.",
        bn: "এপ্রিলে যখন আমাদের আবার দেখা হবে, তখন আমরা নিশ্চিতভাবেই অনেক রোমাঞ্চকর অভিজ্ঞতা অর্জন করে ফেলব।"
      },
      {
        de: "Manchmal frage ich mich, ob ich bis dahin auch meine Masterarbeit schon angemeldet haben werde.",
        en: "Sometimes I ask myself whether by then I will also have already registered my master's thesis.",
        bn: "মাঝে মাঝে আমি নিজেকে প্রশ্ন করি, ততদিনে আমি আমার মাস্টার্স থিসিসও নিবন্ধন করে ফেলব কিনা।"
      },
      {
        de: "Gestern kam mein Freund Ahmed nicht zum Seminar, weshalb wir uns Sorgen machten.",
        en: "Yesterday my friend Ahmed did not come to the seminar, which is why we worried.",
        bn: "গতকাল আমার বন্ধু আহমেদ সেমিনারে আসেনি, যে কারণে আমরা চিন্তিত হয়ে পড়েছিলাম।"
      },
      {
        de: "Er wird wohl wieder einmal den frühen Regionalzug aus Darmstadt verpasst haben.",
        en: "He will probably have missed the early regional train from Darmstadt once again.",
        bn: "সে সম্ভবত আবারও ডার্মস্ট্যাড থেকে আসা সকালের আঞ্চলিক ট্রেনটি মিস করেছে।"
      },
      {
        de: "Oder sein Wecker wird am Morgen einfach nicht geklingelt haben.",
        en: "Or his alarm clock simply will not have rung in the morning.",
        bn: "অথবা সকালে তার অ্যালগরিদম বা অ্যালার্ম ঘড়িটি হয়তো বাজেনি।"
      },
      {
        de: "Bis nächste Woche werden sich alle offenen Fragen bezüglich der Studienplanung geklärt haben.",
        en: "By next week all open questions regarding study planning will have been clarified.",
        bn: "আগামী সপ্তাহের মধ্যে পড়াশোনার পরিকল্পনা সংক্রান্ত সব অমীমাংসিত প্রশ্নের সমাধান হয়ে যাবে।"
      },
      {
        de: "Nach den Ferien wird hoffentlich wieder etwas mehr Ruhe in unseren Alltag eingekehrt sein.",
        en: "After the holidays, hopefully a bit more calm will have returned to our everyday life.",
        bn: "ছুটির পর আশা করি আমাদের দৈনন্দিন জীবনে আবার কিছুটা শান্তি ফিরে আসবে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-5",
    level: "B2",
    category: "Partizipialattribute",
    titleDe: "Moderne Arbeitswelten",
    titleEn: "Modern Working Worlds",
    titleBn: "আধুনিক কর্মজগৎ",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Die durch die Digitalisierung ausgelösten Veränderungen prägen unseren beruflichen Alltag heute stärker denn je.",
        en: "The changes triggered by digitalization shape our professional everyday life today more strongly than ever.",
        bn: "ডিজিটালাইজেশনের ফলে সৃষ্ট পরিবর্তনগুলো আজ আমাদের পেশাগত দৈনন্দিন জীবনকে আগের যেকোনো সময়ের চেয়ে বেশি প্রভাবিত করছে।"
      },
      {
        de: "Viele in internationalen Unternehmen tätige Fachkräfte schätzen die neue räumliche Unabhängigkeit sehr.",
        en: "Many specialists working in international companies greatly appreciate the new spatial independence.",
        bn: "আন্তর্জাতিক কোম্পানিগুলোতে কর্মরত অনেক বিশেষজ্ঞ এই নতুন স্থানিক স্বাধীনতাকে খুব মূল্যায়ন করেন।"
      },
      {
        de: "Die von modernen Softwarefirmen angebotenen Arbeitszeitmodelle ermöglichen eine bessere Vereinbarkeit von Familie und Beruf.",
        en: "The working-time models offered by modern software companies enable a better compatibility of family and career.",
        bn: "আধুনিক সফটওয়্যার কোম্পানিগুলোর দ্বারা প্রদত্ত কর্মঘণ্টার মডেলগুলো পরিবার এবং পেশার মধ্যে আরও ভালো সামঞ্জস্য বজায় রাখতে সাহায্য করে।"
      },
      {
        de: "Dennoch klagen viele ständig vor dem Bildschirm sitzende Angestellte über zunehmende Rückenschmerzen.",
        en: "Nevertheless, many employees constantly sitting in front of the screen complain about increasing back pain.",
        bn: "তবুও সারাক্ষণ স্ক্রিনের সামনে বসে থাকা অনেক কর্মচারী ক্রমবর্ধমান পিঠব্যথার অভিযোগ করেন।"
      },
      {
        de: "Ein gut strukturierter und regelmäßig durchgeführter Arbeitsablauf ist daher entscheidend für die Gesundheit.",
        en: "A well-structured and regularly executed workflow is therefore crucial for health.",
        bn: "তাই সুস্বাস্থ্যের জন্য একটি সুগঠিত এবং নিয়মিতভাবে পরিচালিত কর্মপ্রক্রিয়া অত্যন্ত গুরুত্বপূর্ণ।"
      },
      {
        de: "Die kürzlich von einer großen Krankenkasse veröffentlichte Studie bestätigt diesen besorgniserregenden Trend.",
        en: "The study recently published by a major health insurance company confirms this worrying trend.",
        bn: "সম্প্রতি একটি বড় স্বাস্থ্যবিমা কোম্পানির দ্বারা প্রকাশিত গবেষণা এই উদ্বেগজনক প্রবণতাটিকে নিশ্চিত করেছে।"
      },
      {
        de: "Auch die durch ständige E-Mails entstehende psychische Belastung darf nicht unterschätzt werden.",
        en: "The psychological strain arising from constant emails must also not be underestimated.",
        bn: "সারাক্ষণ ইমেইলের কারণে সৃষ্ট মানসিক চাপকেও অবমূল্যায়ন করা উচিত নয়।"
      },
      {
        de: "Immer mehr Firmen bieten deshalb speziell auf Stressbewältigung ausgerichtete Seminare für ihre Mitarbeiter an.",
        en: "More and more companies therefore offer seminars specifically geared toward stress management for their employees.",
        bn: "তাই আরও বেশি কোম্পানি তাদের কর্মীদের জন্য বিশেষভাবে মানসিক চাপ মোকাবিলার ওপর ভিত্তি করে সেমিনারের আয়োজন করছে।"
      },
      {
        de: "Die an diesen Kursen teilnehmenden Personen berichten oft von einer spürbaren Verbesserung ihres Wohlbefindens.",
        en: "The people participating in these courses often report a noticeable improvement in their well-being.",
        bn: "এই কোর্সগুলোতে অংশগ্রহণকারী ব্যক্তিরা প্রায়ই তাঁদের সুস্থতার উল্লেখযোগ্য উন্নতির কথা জানান।"
      },
      {
        de: "Eine ausgewogene Balance zwischen Arbeit und Erholung bleibt der Schlüssel zu langfristigem Erfolg.",
        en: "A balanced equilibrium between work and relaxation remains the key to long-term success.",
        bn: "কাজ এবং বিশ্রামের মধ্যে একটি সুষম ভারসাম্যই দীর্ঘমেয়াদী সাফল্যের চাবিকাঠি হিসেবে রয়ে গেছে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-6",
    level: "B2",
    category: "Nominalisierung & Verbalisierung",
    titleDe: "Von der Umgangssprache zum Amtsdeutsch",
    titleEn: "From Everyday Language to Official German",
    titleBn: "দৈনন্দিন ভাষা থেকে দাপ্তরিক জার্মান",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Wer in Deutschland studieren oder arbeiten möchte, muss oft zwischen lockerer Alltagssprache und formellem Amtsdeutsch wechseln.",
        en: "Whoever wants to study or work in Germany often has to switch between casual everyday language and formal official German.",
        bn: "যারা জার্মানিতে পড়াশোনা বা কাজ করতে চায়, তাদের প্রায়ই সহজ দৈনন্দিন ভাষা এবং আনুষ্ঠানিক দাপ্তরিক জার্মান ভাষার মধ্যে পরিবর্তন করতে হয়।"
      },
      {
        de: "Im Gespräch mit Freunden sagt man einfach: „Weil der Zug ausgefallen ist, komme ich später.“",
        en: "In conversation with friends one simply says: \"Because the train was canceled, I am arriving later.\"",
        bn: "বন্ধুদের সাথে কথা বলার সময় মানুষ সহজেই বলে: \"যেহেতু ট্রেনটি বাতিল হয়েছে, তাই আমি দেরিতে আসছি।\""
      },
      {
        de: "In einer offiziellen E-Mail schreibt man hingegen: „Wegen des Zugausfalls verzögert sich meine Ankunft.“",
        en: "In an official email, on the other hand, one writes: \"Due to the train cancellation, my arrival is delayed.\"",
        bn: "অন্যদিকে একটি আনুষ্ঠানিক ইমেইলে লেখা হয়: \"ট্রেন বাতিলের কারণে আমার পৌঁছাতে বিলম্ব হচ্ছে।\""
      },
      {
        de: "Während wir im Alltag sagen, dass wir das Problem schnell lösen wollen, heißt es im Bericht: „Zur schnellen Problemlösung werden Maßnahmen ergriffen.“",
        en: "While in everyday life we say that we want to solve the problem quickly, in the report it reads: \"Measures are being taken for rapid problem resolution.\"",
        bn: "দৈনন্দিন জীবনে আমরা যখন বলি যে আমরা সমস্যাটি দ্রুত সমাধান করতে চাই, প্রতিবেদনে তা লেখা হয়: \"দ্রুত সমস্যা সমাধানের লক্ষ্যে পদক্ষেপ গ্রহণ করা হচ্ছে।\""
      },
      {
        de: "Bevor ein neuer Vertrag unterschrieben wird, prüfen Juristen alle Details genau.",
        en: "Before a new contract is signed, lawyers check all details carefully.",
        bn: "কোনো নতুন চুক্তিতে স্বাক্ষর করার আগে আইনজীবীরা সব খুঁটিনাটি ভালোভাবে পরীক্ষা করেন।"
      },
      {
        de: "Im Nominalstil lautet dieser Satz: „Vor der Vertragsunterschrift erfolgt eine genaue Prüfung aller Details.“",
        en: "In nominal style this sentence reads: \"Prior to contract signature, a thorough examination of all details takes place.\"",
        bn: "বিশেষ্য-প্রধান শৈলীতে (Nominalstil) এই বাক্যটি হয়: \"চুক্তি স্বাক্ষরের পূর্বে সব বিবরণের পুঙ্খানুপুঙ্খ পরীক্ষা সম্পন্ন হয়।\""
      },
      {
        de: "Obwohl die gesetzlichen Vorschriften streng sind, finden sich oft praktische Lösungen.",
        en: "Although the legal regulations are strict, practical solutions are often found.",
        bn: "যদিও আইনি নিয়মকানুন কঠোর, তবুও প্রায়ই বাস্তবসম্মত সমাধান খুঁজে পাওয়া যায়।"
      },
      {
        de: "Das entspricht der Formulierung: „Trotz der Strenge der gesetzlichen Vorschriften lassen sich praktische Lösungen finden.“",
        en: "This corresponds to the phrasing: \"Despite the strictness of the legal regulations, practical solutions can be found.\"",
        bn: "এটি এই বাক্যাংশের অনুরূপ: \"আইনি বিধিমালার কঠোরতা সত্ত্বেও বাস্তবসম্মত সমাধান খুঁজে পাওয়া সম্ভব।\""
      },
      {
        de: "Nachdem der Antrag eingereicht worden war, erhielt ich rasch eine Bestätigung.",
        en: "After the application had been submitted, I quickly received a confirmation.",
        bn: "আবেদনপত্র জমা দেওয়ার পর আমি দ্রুত একটি নিশ্চিতকরণ পত্র পেয়েছিলাম।"
      },
      {
        de: "Nach Einreichung des Antrags erfolgte eine rasche Bestätigung durch die Behörde.",
        en: "Following submission of the application, a prompt confirmation by the authority took place.",
        bn: "আবেদন জমা দেওয়ার পর কর্তৃপক্ষের দ্বারা দ্রুত নিশ্চিতকরণ সম্পন্ন হয়েছিল।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-7",
    level: "B2",
    category: "Komplexe Konjunktionen",
    titleDe: "Erfolgreiches Zeitmanagement",
    titleEn: "Successful Time Management",
    titleBn: "সফল সময় ব্যবস্থাপনা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Viele Studierende fühlen sich im Prüfungssemester überfordert, als ob der Tag nur zwölf Stunden hätte.",
        en: "Many students feel overwhelmed during the exam semester, as if the day only had twelve hours.",
        bn: "পরীক্ষার সেমিস্টারে অনেক শিক্ষার্থী দিশেহারা বোধ করে, যেন দিনটি মাত্র বারো ঘণ্টার।"
      },
      {
        de: "Man kann jedoch viel Stress vermeiden, indem man seine Aufgaben rechtzeitig und realistisch plant.",
        en: "However, one can avoid a lot of stress by planning one's tasks on time and realistically.",
        bn: "তবে সময়মতো এবং বাস্তবসম্মতভাবে কাজের পরিকল্পনা করার মাধ্যমে অনেক মানসিক চাপ এড়ানো যায়।"
      },
      {
        de: "Ich erstelle jeden Sonntag einen detaillierten Wochenplan, sodass ich genau weiß, wann ich was erledige.",
        en: "Every Sunday I create a detailed weekly schedule so that I know exactly when I will get what done.",
        bn: "আমি প্রতি রবিবার একটি বিস্তারিত সাপ্তাহিক পরিকল্পনা তৈরি করি, যাতে আমি ঠিক জানি কখন কোন কাজটি শেষ করব।"
      },
      {
        de: "Während einige Kommilitonen bis tief in die Nacht lernen, achte ich auf ausreichend Schlaf.",
        en: "Whereas some fellow students study deep into the night, I make sure to get enough sleep.",
        bn: "যেখানে কিছু সহপাঠী গভীর রাত পর্যন্ত পড়াশোনা করে, সেখানে আমি পর্যাপ্ত ঘুমের দিকে খেয়াল রাখি।"
      },
      {
        de: "Es bringt nämlich wenig, stundenlang vor den Büchern zu sitzen, ohne dass man sich wirklich konzentrieren kann.",
        en: "For it accomplishes little to sit in front of books for hours without one actually being able to concentrate.",
        bn: " কারণ প্রকৃত মনোযোগ দিতে না পেরে ঘণ্টার পর ঘণ্টা বইয়ের সামনে বসে থাকায় খুব কমই লাভ হয়।"
      },
      {
        de: "Falls einmal ein unvorhergesehenes Problem auftritt, habe ich immer einen zeitlichen Puffer eingeplant.",
        en: "In case an unforeseen problem ever arises, I have always scheduled a time buffer.",
        bn: "যদি কখনো কোনো অপ্রত্যাশিত সমস্যা দেখা দেয়, তার জন্য আমি সবসময় বাড়তি সময় হাতে রাখি।"
      },
      {
        de: "Anstatt dass ich mich von sozialen Medien ablenken lasse, schalte ich mein Smartphone beim Lernen aus.",
        en: "Instead of letting myself be distracted by social media, I turn off my smartphone while studying.",
        bn: "সামাজিক যোগাযোগ মাধ্যমে মনোযোগ নষ্ট হতে দেওয়ার পরিবর্তে আমি পড়াশোনার সময় আমার স্মার্টফোন বন্ধ রাখি।"
      },
      {
        de: "So schaffe ich mein Lernpensum deutlich schneller, sodass am Wochenende genug Zeit zur Erholung bleibt.",
        en: "That way I get through my study workload significantly faster, so that enough time remains on the weekend for relaxation.",
        bn: "এভাবে আমি আমার পড়াশোনার চাপ অনেক দ্রুত শেষ করতে পারি, যার ফলে সপ্তাহান্তে বিশ্রামের জন্য পর্যাপ্ত সময় থাকে।"
      },
      {
        de: "Falls du deine Produktivität steigern möchtest, solltest du diese Methode unbedingt einmal ausprobieren.",
        en: "In case you want to increase your productivity, you should definitely try out this method once.",
        bn: "যদি তুমি তোমার কর্মদক্ষতা বাড়াতে চাও, তবে তোমার অবশ্যই একবার এই পদ্ধতিটি চেষ্টা করে দেখা উচিত।"
      },
      {
        de: "Mit der richtigen Struktur wirkt selbst der vollste Terminkalender plötzlich gut beherrschbar.",
        en: "With the right structure, even the fullest schedule suddenly appears well manageable.",
        bn: "সঠিক কাঠামোর মাধ্যমে এমনকি সবচেয়ে ব্যস্ত সময়সূচিও হঠাৎ করেই সুনিয়ন্ত্রিত মনে হয়।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-8",
    level: "B2",
    category: "Adverbiale Konnektoren",
    titleDe: "Globalisierung und Arbeitsmarkt",
    titleEn: "Globalization and the Labor Market",
    titleBn: "বিশ্বায়ন এবং শ্রমবাজার",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Die fortschreitende Globalisierung hat den internationalen Arbeitsmarkt in den letzten Jahrzehnten grundlegend verändert.",
        en: "Advancing globalization has fundamentally changed the international labor market in recent decades.",
        bn: "ক্রমবর্ধমান বিশ্বায়ন গত কয়েক দশকে আন্তর্জাতিক শ্রমবাজারকে আমূল পরিবর্তন করেছে।"
      },
      {
        de: "Viele Unternehmen agieren heute weltweit, deshalb suchen sie verstärkt nach Mitarbeitern mit interkultureller Kompetenz.",
        en: "Many companies operate worldwide today; therefore they increasingly look for employees with intercultural competence.",
        bn: "অনেক কোম্পানি আজ বিশ্বজুড়ে কার্যক্রম পরিচালনা করে, তাই তারা আন্তঃসাংস্কৃতিক দক্ষতাসম্পন্ন কর্মীদের বেশি করে খুঁজছে।"
      },
      {
        de: "Fremdsprachenkenntnisse sind in vielen Branchen inzwischen eine Grundvoraussetzung; folglich lernen immer mehr Menschen Englisch und Deutsch.",
        en: "Foreign language skills have meanwhile become a basic requirement in many industries; consequently more and more people are learning English and German.",
        bn: "অনেক শিল্পে বিদেশি ভাষার দক্ষতা ইতিমধ্যে একটি মৌলিক শর্ত হয়ে দাঁড়িয়েছে; ফলস্বরূপ আরও বেশি মানুষ ইংরেজি এবং জার্মান শিখছে।"
      },
      {
        de: "Allerdings reicht die bloße Beherrschung einer Sprache heute oft nicht mehr aus.",
        en: "However, merely mastering a language is often no longer enough today.",
        bn: "তবে আজকাল কেবল একটি ভাষা জানাই প্রায়ই যথেষ্ট নয়।"
      },
      {
        de: "Darüber hinaus erwarten Arbeitgeber ein hohes Maß an Flexibilität und digitaler Affinität.",
        en: "Furthermore, employers expect a high degree of flexibility and digital affinity.",
        bn: "অধিকন্তু, নিয়োগকর্তারা উচ্চ মাত্রার নমনীয়তা এবং ডিজিটাল দক্ষতা প্রত্যাশা করেন।"
      },
      {
        de: "Die Konkurrenz um attraktive Positionen ist zweifellos härter geworden; trotzdem bieten sich qualifizierten Fachkräften enorme Chancen.",
        en: "Competition for attractive positions has undoubtedly become tougher; nevertheless, enormous opportunities present themselves to qualified specialists.",
        bn: "আকর্ষণীয় পদের জন্য প্রতিযোগিতা নিঃসন্দেহে কঠিন হয়েছে; তা সত্ত্বেও যোগ্য বিশেষজ্ঞদের জন্য বিশাল সুযোগ তৈরি হচ্ছে।"
      },
      {
        de: "Man kann heute problemlos in einem internationalen Team arbeiten, ohne seinen Wohnort wechseln zu müssen.",
        en: "Today one can easily work in an international team without having to change one's place of residence.",
        bn: "আজ নিজের বাসস্থান পরিবর্তন না করেই অনায়াসে একটি আন্তর্জাতিক দলে কাজ করা সম্ভব।"
      },
      {
        de: "Infolgedessen entstehen völlig neue Formen der Zusammenarbeit über Kontinente hinweg.",
        en: "As a result, completely new forms of collaboration across continents are emerging.",
        bn: "এর ফলে মহাদেশজুড়ে সহযোগিতার সম্পূর্ণ নতুন রূপ তৈরি হচ্ছে।"
      },
      {
        de: "Ein Auslandssemester oder ein internationales Praktikum wertet den eigenen Lebenslauf erheblich auf; daher nutzen viele Studierende diese Möglichkeit.",
        en: "A semester abroad or an international internship enhances one's resume considerably; therefore many students use this opportunity.",
        bn: "বিদেশে এক সেমিস্টার পড়াশোনা বা একটি আন্তর্জাতিক ইন্টার্নশিপ নিজের জীবনবৃত্তান্তকে উল্লেখযোগ্যভাবে সমৃদ্ধ করে; অতএব অনেক শিক্ষার্থী এই সুযোগটি কাজে লাগায়।"
      },
      {
        de: "Wer offen für neue Kulturen bleibt, wird in dieser vernetzten Welt langfristig erfolgreich sein.",
        en: "Whoever remains open to new cultures will be successful in the long term in this interconnected world.",
        bn: "যারা নতুন সংস্কৃতির প্রতি উন্মুক্ত থাকে, তারা এই সংযুক্ত বিশ্বে দীর্ঘমেয়াদে সফল হবে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-9",
    level: "B2",
    category: "Relativsätze (was, wo, wer)",
    titleDe: "Was mich an Deutschland fasziniert",
    titleEn: "What Fascinates Me About Germany",
    titleBn: "জার্মানির যে বিষয়গুলো আমাকে মুগ্ধ করে",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Wenn ich über meine Erfahrungen in Deutschland nachdenke, gibt es vieles, was mich positiv überrascht hat.",
        en: "When I think about my experiences in Germany, there is much that has surprised me positively.",
        bn: "আমি যখন জার্মানিতে আমার অভিজ্ঞতার কথা ভাবি, তখন এমন অনেক কিছু আছে যা আমাকে ইতিবাচকভাবে অবাক করেছে।"
      },
      {
        de: "Besonders beeindruckend finde ich das ehrenamtliche Engagement, was in fast allen gesellschaftlichen Bereichen sichtbar ist.",
        en: "I find the voluntary commitment particularly impressive, which is visible in almost all areas of society.",
        bn: "আমি স্বেচ্ছাসেবী কর্মকাণ্ডকে বিশেষভাবে চিত্তাকর্ষক মনে করি, যা সমাজের প্রায় সব ক্ষেত্রেই দৃশ্যমান।"
      },
      {
        de: "In der Stadt, wo ich derzeit lebe, gibt es unzählige Vereine für Sport, Kultur und Umweltschutz.",
        en: "In the city where I currently live, there are countless clubs for sports, culture, and environmental protection.",
        bn: "আমি বর্তমানে যে শহরে বাস করি, সেখানে খেলাধুলা, সংস্কৃতি এবং পরিবেশ সুরক্ষার জন্য অসংখ্য ক্লাব রয়েছে।"
      },
      {
        de: "Wer neu in eine Stadt zieht, findet dort schnell Anschluss und knüpft wertvolle Freundschaften.",
        en: "Whoever moves newly into a city quickly finds connection there and forms valuable friendships.",
        bn: "যে কেউ নতুন কোনো শহরে আসে, সে সেখানে দ্রুত পরিচিতি খুঁজে পায় এবং মূল্যবান বন্ধুত্ব গড়ে তোলে।"
      },
      {
        de: "Das Beste, was mir am Anfang passieren konnte, war die Teilnahme an einem internationalen Sprachtandem.",
        en: "The best thing that could happen to me in the beginning was participating in an international language tandem.",
        bn: "শুরুতে আমার সাথে ঘটতে পারা সবচেয়ে ভালো বিষয়টি ছিল একটি আন্তর্জাতিক ল্যাঙ্গুয়েজ ট্যান্ডেমে অংশগ্রহণ।"
      },
      {
        de: "Dort traf ich Menschen aus aller Welt, wohin mich meine eigenen Reisen bisher noch nicht geführt hatten.",
        en: "There I met people from all over the world, where my own travels had not yet taken me so far.",
        bn: "সেখানে আমি সারা বিশ্বের মানুষের সাথে পরিচিত হয়েছি, যেখানে আমার নিজের ভ্রমণ এখন পর্যন্ত আমাকে নিয়ে যায়নি।"
      },
      {
        de: "Es gibt kaum etwas, was das Sprachgefühl so schnell verbessert wie regelmäßige Gespräche mit Muttersprachlern.",
        en: "There is hardly anything that improves one's feel for a language as quickly as regular conversations with native speakers.",
        bn: "স্থানীয় ভাষাভাষীদের সাথে নিয়মিত কথোপকথনের মতো দ্রুত ভাষার বোধগম্যতা বাড়াতে পারে এমন কিছু খুব কমই আছে।"
      },
      {
        de: "Natürlich gibt es auch Dinge, wie etwa die komplizierte Bürokratie, was manchmal Geduld erfordert.",
        en: "Of course there are also things, such as the complicated bureaucracy, which sometimes requires patience.",
        bn: "অবশ্যই জটিল আমলাতন্ত্রের মতো কিছু বিষয়ও আছে, যার জন্য মাঝে মাঝে ধৈর্যের প্রয়োজন হয়।"
      },
      {
        de: "Doch wer sich aktiv einbringt und Offenheit zeigt, wird hier überall mit offenen Armen empfangen.",
        en: "Yet whoever gets actively involved and shows openness is welcomed here everywhere with open arms.",
        bn: "তবে যে সক্রিয়ভাবে অংশগ্রহণ করে এবং উদারতা দেখায়, তাকে এখানে সর্বত্র সাদরে গ্রহণ করা হয়।"
      },
      {
        de: "All das, was ich hier gelernt habe, hat meinen persönlichen Horizont enorm erweitert.",
        en: "All that I have learned here has expanded my personal horizon enormously.",
        bn: "আমি এখানে যা কিছু শিখেছি, তার সবকিছুই আমার ব্যক্তিগত দৃষ্টিভঙ্গিকে বিশালভাবে প্রসারিত করেছে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-10",
    level: "B2",
    category: "Infinitivsätze mit zu",
    titleDe: "Herausforderungen im Studium",
    titleEn: "Challenges in University Studies",
    titleBn: "বিশ্ববিদ্যালয় পড়াশোনার চ্যালেঞ্জসমূহ",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Ein wissenschaftliches Studium an einer deutschen Hochschule stellt hohe Anforderungen an die Selbstständigkeit.",
        en: "Academic studies at a German university place high demands on independence.",
        bn: "একটি জার্মান বিশ্ববিদ্যালয়ে একাডেমিক পড়াশোনা স্বনির্ভরতার ওপর উচ্চ দাবি রাখে।"
      },
      {
        de: "Es ist eine großartige Erfahrung, in einem internationalen Umfeld studieren und forschen zu können.",
        en: "It is a great experience to be able to study and do research in an international environment.",
        bn: "একটি আন্তর্জাতিক পরিবেশে পড়াশোনা এবং গবেষণা করতে পারা একটি দারুণ অভিজ্ঞতা।"
      },
      {
        de: "Viele ausländische Studierende sind anfangs überrascht, kaum detaillierte Vorgaben für ihre Hausarbeiten zu bekommen.",
        en: "Many foreign students are initially surprised to receive hardly any detailed guidelines for their term papers.",
        bn: "অনেক বিদেশি শিক্ষার্থী শুরুতে তাদের অ্যাসাইনমেন্টের জন্য খুব কম বিস্তারিত নির্দেশিকা পেয়ে অবাক হন।"
      },
      {
        de: "Man erwartet von uns, eigene Fragestellungen zu entwickeln und kritisch hinterfragen zu lernen.",
        en: "We are expected to develop our own research questions and learn to question things critically.",
        bn: "আমাদের কাছ থেকে আশা করা হয় যে আমরা নিজেরাই গবেষণার প্রশ্ন তৈরি করব এবং সমালোচনামূলকভাবে প্রশ্ন করতে শিখব।"
      },
      {
        de: "Niemand mag es, während eines wichtigen Referats vom Professor unterbrochen zu werden.",
        en: "Nobody likes to be interrupted by the professor during an important presentation.",
        bn: "একটি গুরুত্বপূর্ণ প্রেজেন্টেশনের সময় প্রফেসরের দ্বারা বাধাপ্রাপ্ত হতে কেউই পছন্দ করে না।"
      },
      {
        de: "Deshalb bereite ich mich gründlich vor, um auf alle kritischen Rückfragen kompetent antworten zu können.",
        en: "Therefore I prepare thoroughly in order to be able to answer all critical follow-up questions competently.",
        bn: "তাই সব সমালোচনামূলক প্রশ্নের দক্ষতার সাথে উত্তর দিতে পারার জন্য আমি ভালোভাবে প্রস্তুতি নিই।"
      },
      {
        de: "Gestern war ich stolz darauf, meine erste Seminararbeit fristgerecht eingereicht zu haben.",
        en: "Yesterday I was proud to have submitted my first seminar paper on time.",
        bn: "গতকাল আমি সময়মতো আমার প্রথম সেমিনার পেপার জমা দিতে পেরে গর্বিত ছিলাম।"
      },
      {
        de: "Es ist ein beruhigendes Gefühl, diese anspruchsvolle Hürde erfolgreich gemeistert zu haben.",
        en: "It is a reassuring feeling to have successfully mastered this demanding hurdle.",
        bn: "এই কঠিন বাধাটি সফলভাবে অতিক্রম করতে পারা একটি স্বস্তিদায়ক অনুভূতি।"
      },
      {
        de: "Natürlich hofft jeder Student, am Ende des Semesters mit guten Noten belohnt zu werden.",
        en: "Of course every student hopes to be rewarded with good grades at the end of the semester.",
        bn: "অবশ্যই প্রতিটি শিক্ষার্থী আশা করে যে সেমিস্টারের শেষে ভালো ফলাফলের মাধ্যমে পুরস্কৃত হবে।"
      },
      {
        de: "Trotz aller Anstrengungen bin ich dankbar, diese wertvolle Bildungschance erhalten zu haben.",
        en: "Despite all efforts, I am grateful to have received this valuable educational opportunity.",
        bn: "সব পরিশ্রম সত্ত্বেও আমি কৃতজ্ঞ যে এই মূল্যবান শিক্ষার সুযোগটি পেয়েছি।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-11",
    level: "B2",
    category: "Vergleichssätze & Proportionen",
    titleDe: "Die Entwicklung der künstlichen Intelligenz",
    titleEn: "The Development of Artificial Intelligence",
    titleBn: "কৃত্রিম বুদ্ধিমত্তার বিকাশ",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Die Technologie der künstlichen Intelligenz entwickelt sich derzeit immer schneller und verändert ganze Branchen.",
        en: "The technology of artificial intelligence is currently developing faster and faster and changing entire industries.",
        bn: "কৃত্রিম বুদ্ধিমত্তার প্রযুক্তি বর্তমানে ক্রমশ দ্রুতগতিতে বিকশিত হচ্ছে এবং পুরো শিল্পখাতকে বদলে দিচ্ছে।"
      },
      {
        de: "Moderne Sprachmodelle arbeiten heute schon doppelt so präzise wie noch vor zwei Jahren.",
        en: "Modern language models already work twice as precisely today as just two years ago.",
        bn: "আধুনিক ল্যাঙ্গুয়েজ মডেলগুলো আজ মাত্র দুই বছর আগের তুলনায় দ্বিগুণ নিখুঁতভাবে কাজ করে।"
      },
      {
        de: "Je leistungsfähiger diese Systeme werden, umso intensiver diskutiert die Gesellschaft über ethische Grenzen.",
        en: "The more powerful these systems become, the more intensively society discusses ethical boundaries.",
        bn: "এই সিস্টেমগুলো যত বেশি শক্তিশালী হচ্ছে, সমাজ তত বেশি নৈতিক সীমারেখা নিয়ে আলোচনা করছে।"
      },
      {
        de: "Viele Aufgaben lassen sich mithilfe intelligenter Software deutlich effizienter erledigen als früher.",
        en: "Many tasks can be completed significantly more efficiently with the help of intelligent software than before.",
        bn: "বুদ্ধিমান সফটওয়্যারের সাহায্যে অনেক কাজ আগের চেয়ে উল্লেখযোগ্যভাবে বেশি দক্ষতার সাথে সম্পন্ন করা যায়।"
      },
      {
        de: "Dennoch funktioniert menschliche Kreativität grundlegend anders als ein mathematischer Algorithmus.",
        en: "Nevertheless, human creativity functions fundamentally differently from a mathematical algorithm.",
        bn: "তবুও মানুষের সৃজনশীলতা একটি গাণিতিক অ্যালগরিদমের চেয়ে মৌলিকভাবে ভিন্নভাবে কাজ করে।"
      },
      {
        de: "Je mehr Routinearbeiten von Maschinen übernommen werden, desto wichtiger werden soziale und emotionale Kompetenzen.",
        en: "The more routine tasks are taken over by machines, the more important social and emotional skills become.",
        bn: "মেশিনের দ্বারা যত বেশি রুটিন কাজ পরিচালিত হচ্ছে, সামাজিক এবং আবেগীয় দক্ষতা তত বেশি গুরুত্বপূর্ণ হয়ে উঠছে।"
      },
      {
        de: "In einigen Bereichen sind digitale Assistenten mittlerweile genauso zuverlässig wie menschliche Experten.",
        en: "In some areas, digital assistants are meanwhile just as reliable as human experts.",
        bn: "কিছু ক্ষেত্রে ডিজিটাল সহকারীরা ইতিমধ্যে মানব বিশেষজ্ঞদের মতোই নির্ভরযোগ্য হয়ে উঠেছে।"
      },
      {
        de: "Allerdings wird die Frage nach dem Datenschutz angesichts riesiger Datenmengen immer dringender.",
        en: "However, the question of data protection is becoming increasingly urgent in view of huge amounts of data.",
        bn: "তবে বিশাল পরিমাণ তথ্যের পরিপ্রেক্ষিতে ডেটা সুরক্ষার প্রশ্নটি দিন দিন আরও জরুরি হয়ে উঠছে।"
      },
      {
        de: "Es bleibt entscheidend, dass der Mensch die Kontrolle behält, anstatt sich blind auf Technik zu verlassen.",
        en: "It remains crucial that humans retain control instead of relying blindly on technology.",
        bn: "প্রযুক্তির ওপর অন্ধভাবে নির্ভর করার পরিবর্তে মানুষের নিয়ন্ত্রণ বজায় রাখাটাই সবচেয়ে গুরুত্বপূর্ণ।"
      },
      {
        de: "Letztlich ist künstliche Intelligenz ein Werkzeug, dessen Nutzen davon abhängt, wie verantwortungsvoll wir es einsetzen.",
        en: "Ultimately, artificial intelligence is a tool whose benefit depends on how responsibly we use it.",
        bn: "পরিশেষে, কৃত্রিম বুদ্ধিমত্তা হলো এমন একটি হাতিয়ার যার উপকারিতা নির্ভর করে আমরা কতটা দায়িত্বশীলভাবে এটি ব্যবহার করি তার ওপর।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-12",
    level: "B2",
    category: "Nomen-Verb-Verbindungen",
    titleDe: "Eine wichtige Entscheidung im Beruf",
    titleEn: "An Important Decision at Work",
    titleBn: "কর্মজীবনে একটি গুরুত্বপূর্ণ সিদ্ধান্ত",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Nach meinem erfolgreichen Studienabschluss stand ich vor der Aufgabe, eine wichtige berufliche Entscheidung zu treffen.",
        en: "After my successful graduation I faced the task of making an important professional decision.",
        bn: "আমার সফল স্নাতক ডিগ্রি অর্জনের পর আমি একটি গুরুত্বপূর্ণ পেশাগত সিদ্ধান্ত নেওয়ার মুখোমুখি হয়েছিলাম।"
      },
      {
        de: "Mir lagen zwei attraktive Jobangebote vor, die beide für meine Karriere in Frage kamen.",
        en: "I had two attractive job offers before me, both of which came into question for my career.",
        bn: "আমার সামনে দুটি আকর্ষণীয় চাকরির প্রস্তাব ছিল, যেগুলোর দুটিই আমার ক্যারিয়ারের জন্য বিবেচনায় এসেছিল।"
      },
      {
        de: "Das erste Unternehmen stellte mir sofort einen unbefristeten Arbeitsvertrag in Frankfurt zur Verfügung.",
        en: "The first company immediately made a permanent employment contract in Frankfurt available to me.",
        bn: "প্রথম কোম্পানিটি সাথে সাথেই ফ্রাঙ্কফুর্টে একটি স্থায়ী চাকরির চুক্তিপত্র আমার জন্য উপলব্ধ করেছিল।"
      },
      {
        de: "Das zweite Angebot kam von einem Start-up in Berlin, das großen Wert auf flache Hierarchien legte.",
        en: "The second offer came from a startup in Berlin that placed great value on flat hierarchies.",
        bn: "দ্বিতীয় প্রস্তাবটি এসেছিল বার্লিনের একটি স্টার্টআপ থেকে, যারা সমতল পদসোপানের (flat hierarchies) ওপর অনেক গুরুত্ব দিত।"
      },
      {
        de: "Ich nahm mir das ganze Wochenende Zeit, um alle Vor- und Nachteile in Betracht zu ziehen.",
        en: "I took the whole weekend to take all advantages and disadvantages into consideration.",
        bn: "সব সুবিধা এবং অসুবিধা বিবেচনায় নেওয়ার জন্য আমি পুরো সপ্তাহান্ত সময় নিয়েছিলাম।"
      },
      {
        de: "Dabei musste ich auch auf die Wünsche meiner Familie Rücksicht nehmen, da ein Umzug viel Aufwand bedeutet hätte.",
        en: "In doing so, I also had to be considerate of my family's wishes, since a move would have meant a lot of effort.",
        bn: "এই ক্ষেত্রে আমাকে আমার পরিবারের ইচ্ছার প্রতিও খেয়াল রাখতে হয়েছিল, কারণ বাসা বদলানো মানেই অনেক ঝামেলা।"
      },
      {
        de: "Am Montag nahm ich schließlich Kontakt mit der Personalabteilung in Frankfurt auf und sagte zu.",
        en: "On Monday I finally got in touch with the HR department in Frankfurt and accepted.",
        bn: "সোমবার অবশেষে আমি ফ্রাঙ্কফুর্টের মানবসম্পদ বিভাগের সাথে যোগাযোগ করলাম এবং সম্মতি জানালাম।"
      },
      {
        de: "Meine neue Vorgesetzte brachte sofort ihre Freude über meine Zusage zum Ausdruck.",
        en: "My new supervisor immediately expressed her joy about my acceptance.",
        bn: "আমার নতুন ঊর্ধ্বতন কর্মকর্তা সাথে সাথেই আমার সম্মতির বিষয়ে তাঁর আনন্দ প্রকাশ করলেন।"
      },
      {
        de: "In den ersten Wochen musste ich natürlich viele neue Informationen zur Kenntnis nehmen.",
        en: "In the first weeks I of course had to take note of a lot of new information.",
        bn: "প্রথম সপ্তাহগুলোতে আমাকে অবশ্যই অনেক নতুন তথ্য জেনে নিতে হয়েছিল।"
      },
      {
        de: "Heute weiß ich, dass ich damals die absolut richtige Wahl getroffen habe.",
        en: "Today I know that I made the absolutely right choice back then.",
        bn: "আজ আমি জানি যে আমি সেদিন একদম সঠিক সিদ্ধান্তই নিয়েছিলাম।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-13",
    level: "B2",
    category: "Nomen & Adjektive mit Präpositionen",
    titleDe: "Engagement im Ehrenamt",
    titleEn: "Voluntary Commitment",
    titleBn: "স্বেচ্ছাসেবী কাজে সম্পৃক্ততা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Viele Menschen in Deutschland zeigen ein großes Interesse an ehrenamtlicher Arbeit in ihrer Freizeit.",
        en: "Many people in Germany show a great interest in voluntary work in their free time.",
        bn: "জার্মানিতে অনেক মানুষ তাদের অবসর সময়ে স্বেচ্ছাসেবী কাজের প্রতি গভীর আগ্রহ দেখায়।"
      },
      {
        de: "Mein Freund Jonas engagiert sich seit zwei Jahren in einem Sportverein für Jugendliche.",
        en: "My friend Jonas has been involved for two years in a sports club for young people.",
        bn: "আমার বন্ধু জোনাস দুই বছর ধরে তরুণদের একটি স্পোর্টস ক্লাবে যুক্ত আছে।"
      },
      {
        de: "Er ist sehr stolz auf seine Mannschaft, die kürzlich ein regionales Turnier gewonnen hat.",
        en: "He is very proud of his team, which recently won a regional tournament.",
        bn: "সে তার দলকে নিয়ে খুব গর্বিত, যারা সম্প্রতি একটি আঞ্চলিক টুর্নামেন্ট জিতেছে।"
      },
      {
        de: "Der Erfolg eines solchen Vereins ist stark abhängig von der freiwilligen Hilfe vieler Bürger.",
        en: "The success of such a club is strongly dependent on the voluntary help of many citizens.",
        bn: "এই ধরনের ক্লাবের সাফল্য অনেক নাগরিকের স্বেচ্ছাসেবী সাহায্যের ওপর অনেকাংশে নির্ভরশীল।"
      },
      {
        de: "Natürlich gibt es manchmal auch Kritik an der Organisation, wenn nicht alles sofort perfekt klappt.",
        en: "Of course there is sometimes also criticism of the organization when not everything works out perfectly right away.",
        bn: "অবশ্যই সবকিছু সাথে সাথে নিখুঁতভাবে না হলে সংগঠনের বিরুদ্ধে মাঝে মাঝে সমালোচনাও হয়।"
      },
      {
        de: "Doch die meisten Mitglieder sind äußerst zufrieden mit dem gemeinsamen Zusammenhalt im Team.",
        en: "Yet most members are extremely satisfied with the mutual solidarity in the team.",
        bn: "তবে অধিকাংশ সদস্য দলের পারস্পরিক সংহতি নিয়ে অত্যন্ত সন্তুষ্ট।"
      },
      {
        de: "Ich selbst habe mich kürzlich für ein Projekt zur Sprachförderung von Kindern angemeldet.",
        en: "I myself recently signed up for a project for language support for children.",
        bn: "আমি নিজেও সম্প্রতি শিশুদের ভাষা উন্নয়নের একটি প্রকল্পে নাম লিখিয়েছি।"
      },
      {
        de: "Meine Begeisterung für soziale Projekte wächst, je mehr positive Rückmeldungen ich von den Eltern bekomme.",
        en: "My enthusiasm for social projects grows the more positive feedback I receive from the parents.",
        bn: "অভিভাবকদের কাছ থেকে আমি যত বেশি ইতিবাচক প্রতিক্রিয়া পাই, সামাজিক প্রকল্পগুলোর প্রতি আমার উৎসাহ তত বাড়তে থাকে।"
      },
      {
        de: "Niemand sollte Angst vor der zusätzlichen Verantwortung haben, denn man lernt dabei enorm viel.",
        en: "Nobody should be afraid of the additional responsibility, because one learns an enormous amount in the process.",
        bn: "অতিরিক্ত দায়িত্ব নিয়ে কারো ভয় পাওয়া উচিত নয়, কারণ এর মাধ্যমে মানুষ অনেক কিছু শিখতে পারে।"
      },
      {
        de: "Die Hoffnung auf eine solidarische Gesellschaft wird durch solches Engagement jeden Tag ein Stück lebendiger.",
        en: "The hope for a supportive society becomes a bit more alive every day through such commitment.",
        bn: "এই ধরনের অঙ্গীকারের মাধ্যমে একটি সহমর্মী সমাজের আশা প্রতিদিন একটু একটু করে আরও জীবন্ত হয়ে ওঠে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-14",
    level: "B2",
    category: "Präpositionen mit Genitiv & Dativ",
    titleDe: "Analyse einer aktuellen Studie",
    titleEn: "Analysis of a Current Study",
    titleBn: "একটি সাম্প্রতিক গবেষণার বিশ্লেষণ",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Im Rahmen eines wirtschaftswissenschaftlichen Seminars haben wir gestern eine neue Arbeitsmarktstudie analysiert.",
        en: "Within the framework of an economics seminar, we analyzed a new labor market study yesterday.",
        bn: "একটি অর্থনীতি বিষয়ক সেমিনারের আওতায় গতকাল আমরা একটি নতুন শ্রমবাজার গবেষণা বিশ্লেষণ করেছি।"
      },
      {
        de: "Dem aktuellen Bericht zufolge steigt die Nachfrage nach Fachkräften in technischen Berufen kontinuierlich an.",
        en: "According to the current report, the demand for skilled workers in technical professions is rising continuously.",
        bn: "বর্তমান প্রতিবেদন অনুযায়ী, কারিগরি পেশায় দক্ষ কর্মীদের চাহিদা ক্রমাগত বৃদ্ধি পাচ্ছে।"
      },
      {
        de: "Anhand mehrerer übersichtlicher Grafiken lässt sich diese Entwicklung über die letzten zehn Jahre genau verfolgen.",
        en: "By means of several clear charts, this development can be tracked precisely over the last ten years.",
        bn: "বেশ কয়েকটি স্পষ্ট গ্রাফের সাহায্যে গত দশ বছরের এই অগ্রগতি সঠিকভাবে পর্যবেক্ষণ করা যায়।"
      },
      {
        de: "Aufgrund des demografischen Wandels gehen in Deutschland bald Millionen erfahrene Arbeitnehmer in Rente.",
        en: "Due to demographic change, millions of experienced employees in Germany will soon retire.",
        bn: "জনসংখ্যাগত পরিবর্তনের কারণে জার্মানিতে শীঘ্রই লক্ষ লক্ষ অভিজ্ঞ কর্মী অবসরে যাবেন।"
      },
      {
        de: "Bezüglich möglicher Lösungsansätze schlagen die Autoren der Studie eine gezielte Förderung von Weiterbildungen vor.",
        en: "Regarding possible approaches to solutions, the authors of the study propose targeted funding for further training.",
        bn: "সম্ভাব্য সমাধানের উপায় সম্পর্কে গবেষণার লেখকরা উচ্চতর প্রশিক্ষণে লক্ষ্যভিত্তিক অর্থায়নের প্রস্তাব দিয়েছেন।"
      },
      {
        de: "Darüber hinaus müsse die Anerkennung ausländischer Berufsabschlüsse deutlich beschleunigt werden.",
        en: "In addition, the recognition of foreign professional qualifications had to be accelerated significantly.",
        bn: "তাছাড়া বিদেশি পেশাগত ডিগ্রির স্বীকৃতি প্রক্রিয়া উল্লেখযোগ্যভাবে ত্বরান্বিত করতে হবে।"
      },
      {
        de: "Hinsichtlich der Digitalisierung zeigt sich, dass kleinere Unternehmen oft noch Nachholbedarf haben.",
        en: "With regard to digitalization, it becomes apparent that smaller companies often still have catching up to do.",
        bn: "ডিজিটালাইজেশনের ক্ষেত্রে দেখা যাচ্ছে যে ছোট কোম্পানিগুলোর এখনো অনেক ঘাটতি পূরণ করার বাকি আছে।"
      },
      {
        de: "Entsprechend den Empfehlungen der Experten sollten Firmen stärker in die digitale Infrastruktur investieren.",
        en: "In accordance with the experts' recommendations, companies should invest more strongly in digital infrastructure.",
        bn: "বিশেষজ্ঞদের সুপারিশ অনুযায়ী, কোম্পানিগুলোর ডিজিটাল অবকাঠামোতে আরও বেশি বিনিয়োগ করা উচিত।"
      },
      {
        de: "Den Politikern gegenüber äußerten Wirtschaftsverbände den Wunsch nach weniger bürokratischen Hürden.",
        en: "Towards politicians, business associations expressed the wish for fewer bureaucratic hurdles.",
        bn: "রাজনীতিবিদদের প্রতি ব্যবসায়ী সংগঠনগুলো আমলাতান্ত্রিক জটিলতা কমানোর ইচ্ছা প্রকাশ করেছে।"
      },
      {
        de: "Die Diskussion machte deutlich, wie komplex die Herausforderungen für die Zukunft unseres Arbeitsmarktes sind.",
        en: "The discussion made clear how complex the challenges for the future of our labor market are.",
        bn: "আলোচনাটি স্পষ্ট করে দিয়েছে যে আমাদের শ্রমবাজারের ভবিষ্যতের চ্যালেঞ্জগুলো কতটা জটিল।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-15",
    level: "B2",
    category: "Wortstellung im Mittelfeld",
    titleDe: "Missverständnisse im Büroalltag",
    titleEn: "Misunderstandings in Everyday Office Life",
    titleBn: "অফিসের দৈনন্দিন জীবনে ভুল বোঝাবুঝি",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Gestern kam es in unserem Büro zu einem kleinen organisatorischen Missverständnis zwischen zwei Abteilungen.",
        en: "Yesterday a small organizational misunderstanding occurred in our office between two departments.",
        bn: "গতকাল আমাদের অফিসে দুটি বিভাগের মধ্যে একটি ছোট সাংগঠনিক ভুল বোঝাবুঝি হয়েছিল।"
      },
      {
        de: "Unser Projektleiter hatte dem neuen Praktikanten morgens wegen der bevorstehenden Präsentation wichtige Unterlagen gegeben.",
        en: "Our project manager had given the new intern important documents in the morning because of the upcoming presentation.",
        bn: "আসন্ন প্রেজেন্টেশনের কারণে আমাদের প্রজেক্ট ম্যানেজার সকালে নতুন ইন্টার্নকে গুরুত্বপূর্ণ কাগজপত্র দিয়েছিলেন।"
      },
      {
        de: "Da der Praktikant jedoch neu war, leitete er sie ihm versehentlich nicht rechtzeitig weiter.",
        en: "However, since the intern was new, he accidentally did not forward them to him on time.",
        bn: "তবে ইন্টার্ন নতুন হওয়ায় ভুলবশত সে সময়মতো সেগুলো তাঁকে ফরোয়ার্ড করেনি।"
      },
      {
        de: "Als unser Teamleiter am Nachmittag nach den Dokumenten fragte, wusste zunächst niemand Bescheid.",
        en: "When our team leader asked for the documents in the afternoon, nobody knew anything at first.",
        bn: "বিকেলে আমাদের টিম লিডার যখন নথিপত্রগুলোর কথা জিজ্ঞাসা করলেন, তখন প্রথমে কেউই কিছু জানত না।"
      },
      {
        de: "Glücklicherweise hatte ich mir gestern Abend aus Vorsicht eine Kopie auf meinem Laptop gespeichert.",
        en: "Fortunately I had saved a copy on my laptop yesterday evening out of caution.",
        bn: "সৌভাগ্যবশত সতর্কতামূলকভাবে গতকাল সন্ধ্যায় আমি আমার ল্যাপটপে একটি কপি সেভ করে রেখেছিলাম।"
      },
      {
        de: "Ich schickte es ihm sofort per E-Mail, sodass das Meeting pünktlich beginnen konnte.",
        en: "I sent it to him immediately by email so that the meeting could begin punctually.",
        bn: "আমি সাথে সাথেই ইমেইলের মাধ্যমে সেটি তাঁকে পাঠিয়ে দিলাম, যাতে মিটিংটি ঠিক সময়ে শুরু হতে পারে।"
      },
      {
        de: "Unser Chef bedankte sich anschließend herzlich bei mir für meine schnelle Reaktion.",
        en: "Our boss subsequently thanked me warmly for my quick reaction.",
        bn: "পরবর্তীতে আমাদের বস আমার দ্রুত পদক্ষেপের জন্য আমাকে আন্তরিক ধন্যবাদ জানালেন।"
      },
      {
        de: "Er erklärte dem Praktikanten ruhig, wie die internen Kommunikationswege in unserer Firma funktionieren.",
        en: "He calmly explained to the intern how internal communication channels work in our company.",
        bn: "তিনি ইন্টার্নকে শান্তভাবে বুঝিয়ে বললেন আমাদের কোম্পানিতে অভ্যন্তরীণ যোগাযোগের মাধ্যমগুলো কীভাবে কাজ করে।"
      },
      {
        de: "Danach fuhren wir alle zusammen wegen des erfolgreichen Projektabschlusses mit dem Taxi zum Abendessen.",
        en: "Afterward we all drove together by taxi to dinner because of the successful project completion.",
        bn: "এরপর সফলভাবে প্রকল্প সমাপ্তির কারণে আমরা সবাই মিলে ট্যাক্সিতে করে রাতের খাবারে গেলাম।"
      },
      {
        de: "Solche kleinen Pannen schweißen ein Team am Ende oft noch enger zusammen.",
        en: "Such small mishaps often bond a team even closer together in the end.",
        bn: "এই ধরনের ছোটখাটো ভুলগুলো শেষ পর্যন্ত একটি দলকে আরও ঘনিষ্ঠভাবে একত্রিত করে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-16",
    level: "B2",
    category: "Das Pronomen es & Korrelate",
    titleDe: "Die Rolle der sozialen Medien",
    titleEn: "The Role of Social Media",
    titleBn: "সামাজিক যোগাযোগ মাধ্যমের ভূমিকা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Es steht außer Frage, dass soziale Netzwerke unsere Art der Kommunikation grundlegend verändert haben.",
        en: "It is beyond question that social networks have fundamentally changed our way of communication.",
        bn: "এতে কোনো সন্দেহ নেই যে সামাজিক যোগাযোগ মাধ্যমগুলো আমাদের যোগাযোগের ধরনকে আমূল পরিবর্তন করেছে।"
      },
      {
        de: "Viele Menschen halten es heute für selbstverständlich, rund um die Uhr über ihr Smartphone erreichbar zu sein.",
        en: "Many people today take it for granted to be reachable around the clock via their smartphone.",
        bn: "আজকাল অনেক মানুষ স্মার্টফোনের মাধ্যমে সারাক্ষণ যোগাযোগের নাগালে থাকাটাকে স্বাভাবিক বলে মনে করে।"
      },
      {
        de: "Es freut mich zwar, dass ich dadurch leicht Kontakt zu meiner Familie in Bangladesch halten kann.",
        en: "I am admittedly glad that I can easily stay in touch with my family in Bangladesh through this.",
        bn: "আমি অবশ্য আনন্দিত যে এর মাধ্যমে আমি বাংলাদেশে থাকা আমার পরিবারের সাথে সহজেই যোগাযোগ রাখতে পারি।"
      },
      {
        de: "Dennoch finde ich es bedenklich, wie viel Zeit vor allem Jugendliche täglich vor Bildschirmen verbringen.",
        en: "Nevertheless, I find it concerning how much time young people in particular spend in front of screens every day.",
        bn: "তবুও আমি এটি উদ্বেগজনক মনে করি যে বিশেষ করে তরুণরা প্রতিদিন কতটা সময় স্ক্রিনের সামনে ব্যয় করে।"
      },
      {
        de: "Es fällt vielen Nutzern schwer, zwischen seriösen Nachrichten und manipulierten Inhalten zu unterscheiden.",
        en: "It is difficult for many users to distinguish between serious news and manipulated content.",
        bn: "অনেক ব্যবহারকারীর জন্য নির্ভরযোগ্য খবর এবং বিকৃত তথ্যের মধ্যে পার্থক্য করা কঠিন হয়ে পড়ে।"
      },
      {
        de: "Wissenschaftler weisen darauf hin, dass ständige Vergleiche im Internet zu Unzufriedenheit führen können.",
        en: "Scientists point out that constant comparisons on the internet can lead to dissatisfaction.",
        bn: "বিজ্ঞানীরা উল্লেখ করেছেন যে ইন্টারনেটে সারাক্ষণ তুলনা করা অসন্তুষ্টির কারণ হতে পারে।"
      },
      {
        de: "Ich habe es mir deshalb zur Gewohnheit gemacht, mein Handy abends bewusst auszuschalten.",
        en: "I have therefore made it a habit to consciously turn off my mobile phone in the evening.",
        bn: "তাই আমি সন্ধ্যায় সচেতনভাবে আমার ফোন বন্ধ রাখার অভ্যাস গড়ে তুলেছি।"
      },
      {
        de: "Es tut wirklich gut, einmal für mehrere Stunden nicht von Push-Nachrichten gestört zu werden.",
        en: "It really feels good not to be disturbed by push notifications for several hours once in a while.",
        bn: "মাঝে মাঝে কয়েক ঘণ্টার জন্য পুশ নোটিফিকেশনের বিরক্তি ছাড়া থাকাটা সত্যিই খুব ভালো লাগে।"
      },
      {
        de: "Letztendlich liegt es an jedem Einzelnen, digitale Medien kritisch und maßvoll zu nutzen.",
        en: "Ultimately, it is up to each individual to use digital media critically and in moderation.",
        bn: "পরিশেষে, সমালোচনামূলক দৃষ্টিতে এবং পরিমিতভাবে ডিজিটাল মাধ্যম ব্যবহার করা প্রতিটি ব্যক্তির নিজের ওপর নির্ভর করে।"
      },
      {
        de: "Wenn man bewusst damit umgeht, überwiegen die Vorteile dieser modernen Vernetzung deutlich.",
        en: "When one handles them consciously, the advantages of this modern networking clearly outweigh the disadvantages.",
        bn: "সচেতনভাবে ব্যবহার করলে এই আধুনিক নেটওয়ার্কিংয়ের সুবিধাগুলোই স্পষ্টভাবে প্রাধান্য পায়।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-17",
    level: "B2",
    category: "Negation & Indefinitpronomen",
    titleDe: "Zwischen Realität und Wunschdenken",
    titleEn: "Between Reality and Wishful Thinking",
    titleBn: "বাস্তবতা ও কল্পনার মাঝে",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Bei der Planung eines großen Projekts läuft nicht immer alles nach dem ursprünglichen Zeitplan.",
        en: "When planning a major project, not everything always goes according to the original schedule.",
        bn: "একটি বড় প্রকল্পের পরিকল্পনার সময় সবকিছু সবসময় মূল সময়সূচি অনুযায়ী চলে না।"
      },
      {
        de: "Gestern bemerkten wir, dass nicht der gesamte Bericht, sondern nur das erste Kapitel fertiggestellt worden war.",
        en: "Yesterday we noticed that not the entire report, but only the first chapter had been completed.",
        bn: "গতকাল আমরা লক্ষ্য করলাম যে পুরো প্রতিবেদনটি নয়, বরং কেবল প্রথম অধ্যায়টি সম্পন্ন হয়েছে।"
      },
      {
        de: "Sämtliche Mitarbeiter mussten daraufhin ihre Aufgaben noch einmal neu koordinieren, um die Frist einzuhalten.",
        en: "All employees subsequently had to coordinate their tasks anew in order to meet the deadline.",
        bn: "সময়সীমা বজায় রাখার জন্য সমস্ত কর্মচারীকে এরপর তাদের কাজগুলো নতুন করে সমন্বয় করতে হলো।"
      },
      {
        de: "Niemand hatte damit gerechnet, dass plötzlich noch zusätzliche Daten aus dem Ausland angefordert würden.",
        en: "Nobody had expected that additional data from abroad would suddenly be requested.",
        bn: "কেউই আশা করেনি যে হঠাৎ করে বিদেশ থেকে অতিরিক্ত তথ্যের প্রয়োজন হবে।"
      },
      {
        de: "Unser Teamleiter fragte in die Runde, ob irgendjemand Erfahrung mit dieser speziellen Software habe.",
        en: "Our team leader asked the group whether anyone had experience with this specific software.",
        bn: "আমাদের টিম লিডার সবার উদ্দেশ্যে জিজ্ঞাসা করলেন যে কারো এই বিশেষ সফটওয়্যারটির অভিজ্ঞতা আছে কিনা।"
      },
      {
        de: "Glücklicherweise meldete sich ein Kollege, der bereits irgendwann einmal an einem ähnlichen System gearbeitet hatte.",
        en: "Fortunately a colleague spoke up who had already worked on a similar system at some point.",
        bn: "সৌভাগ্যবশত একজন সহকর্মী এগিয়ে এলেন, যিনি ইতিপূর্বে কোনো এক সময় অনুরূপ একটি সিস্টেমে কাজ করেছিলেন।"
      },
      {
        de: "Wir beschlossen, nicht heute Abend unter Zeitdruck zu arbeiten, sondern morgen früh frisch zu beginnen.",
        en: "We decided not to work under time pressure tonight, rather to start fresh tomorrow morning.",
        bn: "আমরা সিদ্ধান্ত নিলাম যে আজ রাতে সময়ের চাপে কাজ না করে আগামীকাল সকালে সতেজ মনে শুরু করব।"
      },
      {
        de: "Sämtliche Unterlagen wurden noch am selben Nachmittag ordentlich in einem digitalen Ordner gesammelt.",
        en: "All documents were neatly collected in a digital folder that very same afternoon.",
        bn: "সমস্ত কাগজপত্র সেদিন বিকেলেই একটি ডিজিটাল ফোল্ডারে সুন্দরভাবে সংগ্রহ করা হলো।"
      },
      {
        de: "Es ist wichtig, in solchen Momenten nicht die Nerven zu verlieren, sondern konstruktiv nach Lösungen zu suchen.",
        en: "It is important in such moments not to lose one's nerve, rather to look constructively for solutions.",
        bn: "এই ধরনের মুহূর্তে ধৈর্য না হারিয়ে বরং গঠনমূলকভাবে সমাধান খোঁজা গুরুত্বপূর্ণ।"
      },
      {
        de: "Am Ende konnten wir den Kunden nicht nur zufriedenstellen, sondern sogar mit unserer Qualität begeistern.",
        en: "In the end we were able not only to satisfy the client, but even to thrill them with our quality.",
        bn: "শেষ পর্যন্ত আমরা ক্লায়েন্টকে কেবল সন্তুষ্টই করতে পারিনি, বরং আমাদের কাজের মান দিয়ে মুগ্ধও করেছি।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-18",
    level: "B2",
    category: "Modalpartikeln",
    titleDe: "Diskussion über Mobilität der Zukunft",
    titleEn: "Discussion About the Mobility of the Future",
    titleBn: "ভবিষ্যতের যাতায়াত ব্যবস্থা নিয়ে আলোচনা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "In unserer letzten Diskussionsrunde sprachen wir leidenschaftlich über die Zukunft des Verkehrs in deutschen Großstädten.",
        en: "In our last discussion round we spoke passionately about the future of traffic in major German cities.",
        bn: "আমাদের শেষ আলোচনা সভায় আমরা জার্মানির বড় শহরগুলোতে পরিবহনের ভবিষ্যৎ নিয়ে আবেগঘন আলোচনা করেছি।"
      },
      {
        de: "Ein Teilnehmer meinte skeptisch, das Auto lasse sich im ländlichen Raum halt nicht so einfach ersetzen.",
        en: "One participant said skeptically that the car simply cannot be replaced so easily in rural areas.",
        bn: "একজন অংশগ্রহণকারী সন্দেহের সুরে বললেন, গ্রামাঞ্চলে গাড়ির বিকল্প ব্যবস্থা করাটা সহজ কথা নয়।"
      },
      {
        de: "Ein anderer entgegnete daraufhin: „Das stimmt schon, aber in den Innenstädten brauchen wir dringend weniger Blechlawinen!“",
        en: "Another replied to this: \"That is certainly true, but in city centers we urgently need fewer avalanches of sheet metal!\"",
        bn: "অন্য একজন এর জবাবে বললেন: \"এটা ঠিকই বলেছেন, কিন্তু শহরের কেন্দ্রস্থলে আমাদের জরুরি ভিত্তিতে গাড়ির ভিড় কমানো প্রয়োজন!\""
      },
      {
        de: "Eine Studentin warnte eindringlich: „Wir dürfen bloß nicht den Fehler machen, den Ausbau der Bahn weiter zu vernachlässigen.“",
        en: "A female student warned urgently: \"We must just not make the mistake of continuing to neglect the expansion of the railway.\"",
        bn: "একজন ছাত্রী জোর দিয়ে সতর্ক করলেন: \"রেলপথের সম্প্রসারণকে অবহেলা করার ভুল আমাদের ভুলেও করা উচিত নয়।\""
      },
      {
        de: "Viele Pendler sind nämlich täglich auf zuverlässige Züge angewiesen, die leider wohl oft Verspätung haben.",
        en: "Many commuters depend daily on reliable trains, which unfortunately probably often have delays.",
        bn: "কারণ অনেক নিত্যযাত্রী প্রতিদিন নির্ভরযোগ্য ট্রেনের ওপর নির্ভর করেন, যেগুলো দুর্ভাগ্যবশত সম্ভবত প্রায়ই দেরি করে।"
      },
      {
        de: "Mein Nachbar sagte resigniert, die Ticketpreise seien eben jedes Jahr ein Stück teurer geworden.",
        en: "My neighbor said resignedly that ticket prices had simply become a bit more expensive every year.",
        bn: "আমার প্রতিবেশী হতাশ হয়ে বললেন, টিকিটের দাম তো প্রতি বছর একটু একটু করে বেড়েই চলেছে।"
      },
      {
        de: "Doch die Moderatorin machte Mut und meinte, das Deutschlandticket sei doch bereits ein großer Schritt in die richtige Richtung.",
        en: "Yet the moderator encouraged everyone and said that the Deutschlandticket was after all already a big step in the right direction.",
        bn: "তবে সঞ্চালক সাহস জুগিয়ে বললেন, ডয়চল্যান্ডটিকিট (Deutschlandticket) তো ইতিমধ্যেই সঠিক পথে একটি বড় পদক্ষেপ।"
      },
      {
        de: "Man müsse nur geduldig bleiben, dann werde sich die Infrastruktur schon schrittweise verbessern.",
        en: "One only had to remain patient, then the infrastructure would surely improve gradually.",
        bn: "কেবল ধৈর্য ধরতে হবে, তাহলেই অবকাঠামো ধীরে ধীরে উন্নত হয়ে যাবে।"
      },
      {
        de: "Am Ende waren sich alle einig, dass nachhaltige Mobilität eine der wichtigsten Aufgaben unserer Generation ist.",
        en: "In the end everyone agreed that sustainable mobility is one of the most important tasks of our generation.",
        bn: "শেষ পর্যন্ত সবাই একমত হলেন যে টেকসই যাতায়াত ব্যবস্থা আমাদের প্রজন্মের অন্যতম গুরুত্বপূর্ণ দায়িত্ব।"
      },
      {
        de: "Solche lebhaften Debatten zeigen, wie sehr das Thema den Menschen unter den Nägeln brennt.",
        en: "Such lively debates show how burning an issue this topic is for people.",
        bn: "এই ধরনের প্রাণবন্ত বিতর্ক দেখায় যে বিষয়টি মানুষের কাছে কতটা গুরুত্বপূর্ণ।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-19",
    level: "B2",
    category: "Wortbildung",
    titleDe: "Feine Unterschiede bei Verben",
    titleEn: "Subtle Differences in Verbs",
    titleBn: "ক্রিয়াপদের সূক্ষ্ম পার্থক্য",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "In der deutschen Sprache hängt die Bedeutung eines Verbs oft davon ab, ob die Vorsilbe betont wird oder nicht.",
        en: "In the German language, the meaning of a verb often depends on whether the prefix is stressed or not.",
        bn: "জার্মান ভাষায় একটি ক্রিয়ার অর্থ প্রায়ই নির্ভর করে এর উপসর্গের (Prefix) ওপর জোর দেওয়া হচ্ছে কি না তার ওপর।"
      },
      {
        de: "Wenn ein Fährmann Reisende über einen Fluss übersetzt, handelt es sich um eine konkrete Bewegung.",
        en: "When a ferryman takes travelers across a river (übersetzt - separable), it is a concrete physical movement.",
        bn: "যখন একজন মাঝি যাত্রীদের নদী পার করে দেন (übersetzt - বিচ্ছেদ্য), তখন এটি একটি বাস্তব শারীরিক গতি বোঝায়।"
      },
      {
        de: "Wenn ich hingegen einen Fachtext ins Deutsche übersetze, bleibt das Verb untrennbar und abstrakt.",
        en: "When, on the other hand, I translate a specialized text into German (übersetze - inseparable), the verb remains inseparable and abstract.",
        bn: "অন্যদিকে আমি যখন একটি বিষয়ভিত্তিক লেখা জার্মান ভাষায় অনুবাদ করি (übersetze - অবিচ্ছেদ্য), তখন ক্রিয়াটি অবিচ্ছেদ্য এবং বিমূর্ত থাকে।"
      },
      {
        de: "Ähnlich verhält es sich, wenn ein Fahrer ein Verkehrsschild umfährt oder ein Hindernis geschickt umfährt.",
        en: "It is similar when a driver knocks over a traffic sign (umfährt - separable) or skillfully drives around an obstacle (umfährt - inseparable).",
        bn: "একইভাবে, যখন একজন চালক ট্রাফিক সাইন ধাক্কা দিয়ে ফেলে দেন (umfährt - বিচ্ছেদ্য) অথবা দক্ষতার সাথে কোনো বাধা পাশ কাটিয়ে গাড়ি চালান (umfährt - অবিচ্ছেদ্য), তখন অর্থ বদলে যায়।"
      },
      {
        de: "Auch bei Adjektiven helfen bestimmte Endungen dabei, unbekannte Wörter beim Lesen sofort zu entschlüsseln.",
        en: "With adjectives too, certain endings help to immediately decode unknown words while reading.",
        bn: "বিশেষণের ক্ষেত্রেও নির্দিষ্ট প্রত্যয়গুলো পড়ার সময় অজানা শব্দের অর্থ সাথে সাথে বুঝতে সাহায্য করে।"
      },
      {
        de: "Ein fehlerfreier Text zeichnet sich dadurch aus, dass er keinerlei grammatikalische Mängel aufweist.",
        en: "An error-free (fehlerfrei) text is characterized by having no grammatical flaws whatsoever.",
        bn: "একটি নির্ভুল (fehlerfrei) লেখার বৈশিষ্ট্য হলো এতে কোনো ব্যাকরণগত ত্রুটি থাকে না।"
      },
      {
        de: "Eine verantwortungsvolle Führungskraft trifft Entscheidungen stets nach sorgfältiger Abwägung aller Risiken.",
        en: "A responsible (verantwortungsvoll) manager always makes decisions after careful consideration of all risks.",
        bn: "একজন দায়িত্বশীল (verantwortungsvoll) ব্যবস্থাপক সবসময় সব ঝুঁকি ভালোভাবে বিবেচনা করে সিদ্ধান্ত নেন।"
      },
      {
        de: "Wer eine fettarme Ernährung bevorzugt, achtet bewusst auf gesunde und naturbelassene Lebensmittel.",
        en: "Whoever prefers a low-fat (fettarm) diet consciously pays attention to healthy and natural foods.",
        bn: "যারা কম চর্বিযুক্ত (fettarm) খাবার পছন্দ করেন, তারা সচেতনভাবে স্বাস্থ্যকর এবং প্রাকৃতিক খাবারের দিকে নজর দেন।"
      },
      {
        de: "Preislich gesehen war unser letzter Urlaub zwar nicht billig, aber qualitativ absolut erstklassig.",
        en: "Price-wise (preismäßig), our last vacation was admittedly not cheap, but qualitatively absolutely first-class.",
        bn: "দামের দিক থেকে (preismäßig) আমাদের শেষ ছুটিটি সস্তা না হলেও মানের দিক থেকে ছিল একদম প্রথম শ্রেণীর।"
      },
      {
        de: "Mit einem guten Gespür für Wortbildung erweitert sich der eigene Wortschatz fast wie von selbst.",
        en: "With a good feel for word formation, one's own vocabulary expands almost all by itself.",
        bn: "শব্দ গঠনের ওপর ভালো ধারণা থাকলে নিজের শব্দভাণ্ডার প্রায় আপনা-আপনিই সমৃদ্ধ হতে থাকে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-20",
    level: "B2",
    category: "Arbeitswelt & Kultur",
    titleDe: "Kulturelle Vielfalt am Arbeitsplatz",
    titleEn: "Cultural Diversity in the Workplace",
    titleBn: "কর্মক্ষেত্রে সাংস্কৃতিক বৈচিত্র্য",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "In unserem Frankfurter Softwareunternehmen arbeiten Kolleginnen und Kollegen aus über zwanzig verschiedenen Nationen zusammen.",
        en: "In our Frankfurt software company, colleagues from over twenty different nations work together.",
        bn: "আমাদের ফ্রাঙ্কফুর্টের সফটওয়্যার কোম্পানিতে বিশটিরও বেশি দেশের সহকর্মীরা একসাথে কাজ করেন।"
      },
      {
        de: "Diese kulturelle Vielfalt bereichert unseren Arbeitsalltag enorm, erfordert jedoch manchmal auch gegenseitige Rücksichtnahme.",
        en: "This cultural diversity enriches our everyday work enormously, yet sometimes also requires mutual consideration.",
        bn: "এই সাংস্কৃতিক বৈচিত্র্য আমাদের দৈনন্দিন কর্মজীবনকে বিশালভাবে সমৃদ্ধ করে, তবে মাঝে মাঝে পারস্পরিক সহমর্মিতারও দাবি রাখে।"
      },
      {
        de: "Während in Deutschland Pünktlichkeit und direkte Kommunikation als Zeichen von Respekt gelten, bevorzugen andere Kulturen oft einen indirekteren Stil.",
        en: "While in Germany punctuality and direct communication are considered signs of respect, other cultures often prefer a more indirect style.",
        bn: "জার্মানিতে সময়ানুবর্তিতা এবং সরাসরি যোগাযোগকে যেখানে সম্মানের প্রতীক হিসেবে দেখা হয়, সেখানে অন্যান্য সংস্কৃতি প্রায়ই পরোক্ষ ভঙ্গি পছন্দ করে।"
      },
      {
        de: "Zu Beginn meiner Tätigkeit war ich manchmal überrascht, wie offen Kritik in Meetings geäußert wird.",
        en: "At the beginning of my employment I was sometimes surprised at how openly criticism is voiced in meetings.",
        bn: "আমার চাকরির শুরুতে আমি মাঝে মাঝে অবাক হতাম যে মিটিংগুলোতে কতটা খোলামেলাভাবে সমালোচনা করা হয়।"
      },
      {
        de: "Inzwischen habe ich gelernt, dass sachliche Kritik hier niemals persönlich gemeint ist, sondern der Verbesserung des Projekts dient.",
        en: "Meanwhile I have learned that objective criticism here is never meant personally, rather it serves to improve the project.",
        bn: "ইতিমধ্যে আমি শিখেছি যে এখানে বস্তুনিষ্ঠ সমালোচনা কখনোই ব্যক্তিগতভাবে নেওয়া হয় না, বরং এটি প্রকল্পের উন্নতির জন্য করা হয়।"
      },
      {
        de: "Um das gegenseitige Verständnis zu fördern, organisiert unsere Firma regelmäßig gemeinsame Mittagessen mit Speisen aus aller Welt.",
        en: "In order to promote mutual understanding, our company regularly organizes joint lunches with dishes from all over the world.",
        bn: "পারস্পরিক বোঝাপড়া বাড়ানোর জন্য আমাদের কোম্পানি নিয়মিত সারা বিশ্বের খাবারের আয়োজনে যৌথ মধ্যাহ্নভোজের ব্যবস্থা করে।"
      },
      {
        de: "Letzte Woche brachte ich traditionelle Gerichte aus Bangladesch mit, die bei allen großen Anklang fanden.",
        en: "Last week I brought along traditional dishes from Bangladesh, which met with great approval from everyone.",
        bn: "গত সপ্তাহে আমি বাংলাদেশের ঐতিহ্যবাহী খাবার নিয়ে গিয়েছিলাম, যা সবার কাছে দারুণ প্রশংসিত হয়েছিল।"
      },
      {
        de: "Durch solche informellen Begegnungen bauen wir Vorurteile ab und stärken das Vertrauen im gesamten Team.",
        en: "Through such informal encounters we break down prejudices and strengthen trust across the entire team.",
        bn: "এই ধরনের অনানুষ্ঠানিক মিলনের মাধ্যমে আমরা কুসংস্কার দূর করি এবং পুরো দলের মধ্যে আস্থা শক্তিশালী করি।"
      },
      {
        de: "Wenn unterschiedliche Perspektiven aufeinandertreffen, entstehen oft die kreativsten Lösungen für komplexe Probleme.",
        en: "When different perspectives meet, the most creative solutions for complex problems often emerge.",
        bn: "যখন ভিন্ন ভিন্ন দৃষ্টিভঙ্গি একত্রিত হয়, তখন প্রায়ই জটিল সমস্যার সবচেয়ে সৃজনশীল সমাধান বেরিয়ে আসে।"
      },
      {
        de: "Vielfalt ist somit nicht nur ein sozialer Wert, sondern ein echter Wettbewerbsvorteil für moderne Unternehmen.",
        en: "Diversity is thus not only a social value, but a true competitive advantage for modern companies.",
        bn: "বৈচিত্র্য তাই কেবল একটি সামাজিক মূল্যবোধ নয়, বরং আধুনিক কোম্পানিগুলোর জন্য একটি প্রকৃত প্রতিযোগিতামূলক সুবিধা।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-21",
    level: "B2",
    category: "Bildung & Beruf",
    titleDe: "Lebenslanges Lernen",
    titleEn: "Lifelong Learning",
    titleBn: "জীবনব্যাপী শিক্ষা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "In einer sich rasant wandelnden Wissensgesellschaft reicht eine einmalige Berufsausbildung heute längst nicht mehr aus.",
        en: "In a rapidly changing knowledge society, a one-time vocational training is today no longer sufficient by far.",
        bn: "দ্রুত পরিবর্তনশীল জ্ঞানভিত্তিক সমাজে আজ কেবল একবারের বৃত্তিমূলক প্রশিক্ষণ মোটেও যথেষ্ট নয়।"
      },
      {
        de: "Das Konzept des lebenslangen Lernens hat sich daher zu einer zentralen Voraussetzung für beruflichen Erfolg entwickelt.",
        en: "The concept of lifelong learning has therefore developed into a central prerequisite for professional success.",
        bn: "তাই জীবনব্যাপী শিক্ষার ধারণাটি পেশাগত সাফল্যের একটি প্রধান পূর্বশর্ত হিসেবে বিকশিত হয়েছে।"
      },
      {
        de: "Technologische Innovationen führen dazu, dass bestehendes Fachwissen immer schneller veraltet und regelmäßig aktualisiert werden muss.",
        en: "Technological innovations lead to existing specialist knowledge becoming outdated faster and faster and having to be updated regularly.",
        bn: "প্রযুক্তিগত উদ্ভাবনের ফলে বর্তমান বিশেষায়িত জ্ঞান ক্রমশ দ্রুত পুরনো হয়ে যাচ্ছে এবং নিয়মিত হালনাগাদ করতে হচ্ছে।"
      },
      {
        de: "Viele Arbeitgeber unterstützen ihre Belegschaft inzwischen aktiv durch finanzierte Weiterbildungen und interne Schulungen.",
        en: "Many employers meanwhile actively support their workforce through funded further training and internal courses.",
        bn: "অনেক নিয়োগকর্তা ইতিমধ্যে অর্থায়নকৃত উচ্চতর প্রশিক্ষণ এবং অভ্যন্তরীণ কোর্সের মাধ্যমে তাদের কর্মীদের সক্রিয়ভাবে সহায়তা করছেন।"
      },
      {
        de: "Darüber hinaus bieten digitale Lernplattformen die Möglichkeit, sich flexibel und ortsunabhängig neue Kompetenzen anzueignen.",
        en: "In addition, digital learning platforms offer the opportunity to acquire new skills flexibly and independently of location.",
        bn: "তাছাড়া ডিজিটাল লার্নিং প্ল্যাটফর্মগুলো নমনীয়ভাবে এবং যেকোনো স্থান থেকে নতুন দক্ষতা অর্জনের সুযোগ করে দিচ্ছে।"
      },
      {
        de: "Es geht beim Weiterlernen jedoch nicht allein um den Erwerb technischer Fähigkeiten, sondern auch um persönliche Entwicklung.",
        en: "However, continuing to learn is not only about acquiring technical skills, but also about personal development.",
        bn: "তবে শেখা চালিয়ে যাওয়া কেবল কারিগরি দক্ষতা অর্জনের বিষয় নয়, বরং এটি ব্যক্তিগত উন্নয়নেরও বিষয়।"
      },
      {
        de: "Wer neugierig bleibt und sich neuen Herausforderungen stellt, fördert nachweislich seine geistige Flexibilität.",
        en: "Whoever remains curious and faces new challenges demonstrably promotes their mental flexibility.",
        bn: "যারা কৌতূহলী থাকে এবং নতুন চ্যালেঞ্জের মুখোমুখি হয়, তারা প্রমাণিতভাবে নিজেদের মানসিক নমনীয়তা বৃদ্ধি করে।"
      },
      {
        de: "Auch der Austausch mit jüngeren oder älteren Generationen eröffnet wertvolle neue Blickwinkel auf vertraute Themen.",
        en: "Exchanging ideas with younger or older generations also opens up valuable new perspectives on familiar topics.",
        bn: "তরুণ বা প্রবীণ প্রজন্মের সাথে মতবিনিময়ও পরিচিত বিষয়গুলোর ওপর মূল্যবান নতুন দৃষ্টিভঙ্গি উন্মোচন করে।"
      },
      {
        de: "Bildung endet heute nicht mehr mit dem Verlassen der Universität oder Berufsschule.",
        en: "Education today no longer ends upon leaving university or vocational school.",
        bn: "আজকাল বিশ্ববিদ্যালয় বা ভোকেশনাল স্কুল ছাড়ার সাথে সাথেই শিক্ষা শেষ হয়ে যায় না।"
      },
      {
        de: "Vielmehr begleitet sie uns als kontinuierlicher Prozess durch alle Phasen unseres Lebens.",
        en: "Rather, it accompanies us as a continuous process through all phases of our lives.",
        bn: "বরং এটি আমাদের জীবনের সব পর্যায়ে একটি নিরবচ্ছিন্ন প্রক্রিয়া হিসেবে আমাদের সাথে থাকে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-22",
    level: "B2",
    category: "Verbraucherschutz",
    titleDe: "Verbraucherschutz und Reklamation",
    titleEn: "Consumer Protection and Complaints",
    titleBn: "ভোক্তা অধিকার সুরক্ষা এবং অভিযোগ",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Beim Kauf hochwertiger elektronischer Geräte erwartet man als Verbraucher selbstverständlich eine einwandfreie Qualität.",
        en: "When purchasing high-quality electronic devices, one naturally expects flawless quality as a consumer.",
        bn: "উচ্চমানের ইলেকট্রনিক ডিভাইস কেনার সময় একজন ভোক্তা হিসেবে মানুষ স্বাভাবিকভাবেই নিখুঁত মান আশা করে।"
      },
      {
        de: "Leider stellte ich kürzlich bei meinem neu erworbenen Notebook bereits nach einer Woche einen erheblichen Bildschirmfehler fest.",
        en: "Unfortunately, I recently noticed a significant screen defect on my newly acquired notebook after just one week.",
        bn: "দুর্ভাগ্যবশত সম্প্রতি আমার নতুন কেনা নোটবুকটিতে মাত্র এক সপ্তাহ পরেই একটি বড় ধরনের স্ক্রিন ত্রুটি লক্ষ্য করলাম।"
      },
      {
        de: "Da das Gerät unter die gesetzliche Gewährleistung fällt, verfasste ich umgehend ein formelles Reklamationsschreiben an den Händler.",
        en: "Since the device falls under the statutory warranty, I immediately drafted a formal complaint letter to the retailer.",
        bn: "যেহেতু ডিভাইসটি আইনি ওয়ারেন্টির আওতায় পড়ে, তাই আমি অবিলম্বে বিক্রেতার কাছে একটি আনুষ্ঠানিক অভিযোগপত্র লিখলাম।"
      },
      {
        de: "Darin schilderte ich den aufgetretenen Mangel detailliert und fügte eine Kopie des Kaufbelegs bei.",
        en: "In it I described the defect that occurred in detail and enclosed a copy of the purchase receipt.",
        bn: "এতে আমি ঘটে যাওয়া ত্রুটিটি বিস্তারিতভাবে বর্ণনা করলাম এবং ক্রয়ের রসিদের একটি কপি সংযুক্ত করলাম।"
      },
      {
        de: "Ich wies darauf hin, dass ich unter diesen Umständen auf eine kostenlose Reparatur oder einen sofortigen Umtausch bestehe.",
        en: "I pointed out that under these circumstances I insist on a free repair or an immediate exchange.",
        bn: "আমি উল্লেখ করলাম যে এই পরিস্থিতিতে আমি বিনামূল্যে মেরামত অথবা তাৎক্ষণিক পরিবর্তনের দাবি জানাচ্ছি।"
      },
      {
        de: "Sollte das Unternehmen nicht innerhalb von zwei Wochen reagieren, sähe ich mich gezwungen, vom Kaufvertrag zurückzutreten.",
        en: "Should the company not respond within two weeks, I would see myself forced to withdraw from the purchase contract.",
        bn: "কোম্পানি যদি দুই সপ্তাহের মধ্যে সাড়া না দেয়, তবে আমি ক্রয় চুক্তি বাতিল করতে বাধ্য হব।"
      },
      {
        de: "Glücklicherweise zeigte sich der Kundenservice äußerst kooperativ und entschuldigte sich schriftlich für den Produktionsfehler.",
        en: "Fortunately, customer service proved to be extremely cooperative and apologized in writing for the manufacturing defect.",
        bn: "সৌভাগ্যবশত কাস্টমার সার্ভিস অত্যন্ত সহযোগিতামূলক আচরণ দেখাল এবং উৎপাদন ত্রুটির জন্য লিখিতভাবে দুঃখ প্রকাশ করল।"
      },
      {
        de: "Bereits drei Tage später wurde das defekte Gerät von einem Paketdienst kostenlos bei mir abgeholt.",
        en: "Just three days later, the defective device was picked up from my home free of charge by a parcel service.",
        bn: "মাত্র তিন দিন পর একটি পার্সেল সার্ভিস বিনামূল্যে আমার বাসা থেকে ত্রুটিপূর্ণ ডিভাইসটি নিয়ে গেল।"
      },
      {
        de: "Eine Woche danach erhielt ich ein brandneues Ersatzgerät sowie einen kleinen Gutschein als Wiedergutmachung.",
        en: "One week later I received a brand-new replacement device as well as a small voucher as compensation.",
        bn: "এক সপ্তাহ পর আমি একটি একদম নতুন প্রতিস্থাপন ডিভাইস এবং ক্ষতিপূরণ হিসেবে একটি ছোট ভাউচার পেলাম।"
      },
      {
        de: "Es lohnt sich also immer, seine Rechte als Käufer zu kennen und sachlich einzufordern.",
        en: "It is therefore always worthwhile to know one's rights as a buyer and to assert them objectively.",
        bn: "তাই ক্রেতা হিসেবে নিজের অধিকার জানা এবং বস্তুনিষ্ঠভাবে তা দাবি করা সবসময়ই সার্থক।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-23",
    level: "B2",
    category: "Gesundheit & Arbeit",
    titleDe: "Gesundheit und Work-Life-Balance",
    titleEn: "Health and Work-Life Balance",
    titleBn: "স্বাস্থ্য এবং কর্মজীবন-ব্যক্তিগত জীবনের ভারসাম্য",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "In der heutigen Leistungsgesellschaft geraten viele Berufstätige durch ständige Erreichbarkeit unter erheblichen Zeitdruck.",
        en: "In today's achievement-oriented society, many working people come under considerable time pressure due to constant availability.",
        bn: "আজকের প্রতিযোগিতামূলক সমাজে সারাক্ষণ যোগাযোগের নাগালে থাকার কারণে অনেক কর্মজীবী মানুষ প্রচণ্ড সময়ের চাপে পড়েন।"
      },
      {
        de: "Wenn man dauerhaft über seine eigenen Belastungsgrenzen hinaus arbeitet, riskiert man ernsthafte gesundheitliche Folgen.",
        en: "If one permanently works beyond one's own stress limits, one risks serious health consequences.",
        bn: "কেউ যদি স্থায়ীভাবে নিজের সহ্যক্ষমতার সীমার বাইরে কাজ করেন, তবে তিনি মারাত্মক স্বাস্থ্যঝুঁকির সম্মুখীন হন।"
      },
      {
        de: "Ärzte warnen davor, dass chronischer Stress nicht nur zu Schlafstörungen, sondern auch zu Herz-Kreislauf-Erkrankungen führen kann.",
        en: "Doctors warn that chronic stress can lead not only to sleep disorders, but also to cardiovascular diseases.",
        bn: "ডাক্তাররা সতর্ক করেন যে দীর্ঘস্থায়ী মানসিক চাপ কেবল ঘুমের ব্যাঘাতই ঘটায় না, বরং হৃদরোগের কারণও হতে পারে।"
      },
      {
        de: "Deshalb gewinnt das Thema Work-Life-Balance sowohl für Arbeitnehmer als auch für Unternehmen zunehmend an Bedeutung.",
        en: "Therefore, the topic of work-life balance is increasingly gaining importance for both employees and companies.",
        bn: "তাই কর্মজীবন ও ব্যক্তিগত জীবনের ভারসাম্য (Work-Life-Balance) কর্মচারী এবং কোম্পানি উভয়ের কাছেই ক্রমশ গুরুত্ব পাচ্ছে।"
      },
      {
        de: "Eine gesunde Trennung zwischen Berufs- und Privatleben lässt sich erreichen, indem man klare zeitliche Grenzen zieht.",
        en: "A healthy separation between professional and private life can be achieved by drawing clear time boundaries.",
        bn: "সুস্পষ্ট সময়সীমা নির্ধারণ করার মাধ্যমে পেশাগত এবং ব্যক্তিগত জীবনের মধ্যে একটি সুস্থ ব্যবধান তৈরি করা সম্ভব।"
      },
      {
        de: "Nach Feierabend sollte man dienstliche E-Mails konsequent ignorieren und sich bewusst Zeit für Hobbys nehmen.",
        en: "After work one should consistently ignore business emails and consciously take time for hobbies.",
        bn: "অফিস ছুটির পর দাপ্তরিক ইমেইলগুলো কঠোরভাবে এড়িয়ে চলা উচিত এবং সচেতনভাবে শখের জন্য সময় বের করা উচিত।"
      },
      {
        de: "Auch regelmäßige Bewegung an der frischen Luft trägt entscheidend dazu bei, den Kopf freizubekommen.",
        en: "Regular exercise in the fresh air also contributes decisively to clearing one's head.",
        bn: "খোলা বাতাসে নিয়মিত শরীরচর্চাও মনকে সতেজ রাখতে গুরুত্বপূর্ণ ভূমিকা রাখে।"
      },
      {
        de: "Immer mehr Firmen erkennen mittlerweile, dass erholte und ausgeglichene Mitarbeiter deutlich kreativer und produktiver sind.",
        en: "More and more companies meanwhile recognize that rested and balanced employees are significantly more creative and productive.",
        bn: "আরও বেশি কোম্পানি ইতিমধ্যে বুঝতে পারছে যে বিশ্রামপ্রাপ্ত এবং ভারসাম্যপূর্ণ কর্মীরা উল্লেখযোগ্যভাবে বেশি সৃজনশীল এবং উৎপাদনশীল হন।"
      },
      {
        de: "Wer rechtzeitig auf die Warnsignale seines Körpers hört, beugt einem gefährlichen Burnout wirksam vor.",
        en: "Whoever listens in time to the warning signals of their body effectively prevents dangerous burnout.",
        bn: "যারা সময়মতো নিজের শরীরের সতর্কসংকেতগুলো শোনেন, তাঁরা বিপজ্জনক বার্নআউট (মানসিক অবসাদ) কার্যকরভাবে প্রতিরোধ করতে পারেন।"
      },
      {
        de: "Letztlich ist Gesundheit unser wertvollstes Gut, das durch kein Gehalt der Welt ersetzt werden kann.",
        en: "Ultimately, health is our most valuable asset, which cannot be replaced by any salary in the world.",
        bn: "পরিশেষে, সুস্বাস্থ্যই আমাদের সবচেয়ে মূল্যবান সম্পদ, যা পৃথিবীর কোনো বেতনের বিনিময়েই প্রতিস্থাপন করা সম্ভব নয়।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-24",
    level: "B2",
    category: "Gesellschaft",
    titleDe: "Ehrenamt und gesellschaftlicher Zusammenhalt",
    titleEn: "Volunteering and Social Cohesion",
    titleBn: "স্বেচ্ছাসেবী কাজ এবং সামাজিক সংহতি",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Das freiwillige Engagement von Millionen Menschen bildet das unsichtbare Rückgrat unserer demokratischen Gesellschaft.",
        en: "The voluntary commitment of millions of people forms the invisible backbone of our democratic society.",
        bn: "লক্ষ লক্ষ মানুষের স্বেচ্ছাসেবী অঙ্গীকার আমাদের গণতান্ত্রিক সমাজের অদৃশ্য মেরুদণ্ড গঠন করে।"
      },
      {
        de: "Ob bei der Freiwilligen Feuerwehr, in Sportvereinen oder bei der Betreuung älterer Nachbarn – überall wird Hilfe benötigt.",
        en: "Whether with the volunteer fire department, in sports clubs, or in caring for elderly neighbors – help is needed everywhere.",
        bn: "স্বেচ্ছাসেবী ফায়ার সার্ভিস হোক, স্পোর্টস ক্লাব হোক বা বয়স্ক প্রতিবেশীদের দেখাশোনা হোক—সর্বত্রই সাহায্যের প্রয়োজন রয়েছে।"
      },
      {
        de: "Menschen, die sich ehrenamtlich engagieren, leisten einen unverzichtbaren Beitrag für den sozialen Zusammenhalt vor Ort.",
        en: "People who engage in voluntary work make an indispensable contribution to social cohesion locally.",
        bn: "যারা স্বেচ্ছাসেবী কাজে যুক্ত হন, তাঁরা স্থানীয় পর্যায়ে সামাজিক সংহতির জন্য এক অপরিহার্য অবদান রাখেন।"
      },
      {
        de: "Gerade in Zeiten gesellschaftlicher Krisen zeigt sich, wie wichtig gegenseitige Unterstützung und Solidarität sind.",
        en: "Especially in times of social crises, it becomes apparent how important mutual support and solidarity are.",
        bn: "বিশেষ করে সামাজিক সংকটের সময়ে স্পষ্ট হয়ে ওঠে যে পারস্পরিক সহায়তা এবং সংহতি কতটা গুরুত্বপূর্ণ।"
      },
      {
        de: "Viele Freiwillige berichten, dass ihnen ihre Tätigkeit ein tiefes Gefühl von Sinn und Zufriedenheit vermittelt.",
        en: "Many volunteers report that their activity gives them a deep sense of purpose and satisfaction.",
        bn: "অনেক স্বেচ্ছাসেবক জানান যে তাঁদের এই কাজ তাঁদের মনে উদ্দেশ্য এবং সন্তুষ্টির এক গভীর অনুভূতি এনে দেয়।"
      },
      {
        de: "Dennoch stehen zahlreiche gemeinnützige Organisationen vor dem Problem, ausreichend Nachwuchs für langfristige Aufgaben zu gewinnen.",
        en: "Nevertheless, numerous non-profit organizations face the problem of attracting enough new talent for long-term tasks.",
        bn: "তবুও অসংখ্য অলাভজনক সংগঠন দীর্ঘমেয়াদী কাজের জন্য পর্যাপ্ত নতুন প্রজন্মকে আকৃষ্ট করার সমস্যার সম্মুখীন হচ্ছে।"
      },
      {
        de: "Aufgrund beruflicher Verpflichtungen fällt es vielen jungen Erwachsenen schwer, regelmäßige Termine einzuhalten.",
        en: "Due to professional commitments, many young adults find it difficult to keep regular appointments.",
        bn: "পেশাগত ব্যস্ততার কারণে অনেক তরুণ-তরুণীর পক্ষে নিয়মিত সময় বের করা কঠিন হয়ে পড়ে।"
      },
      {
        de: "Um das Ehrenamt attraktiver zu gestalten, sollten Arbeitgeber und Staat mehr Anerkennung und Flexibilität bieten.",
        en: "In order to make volunteering more attractive, employers and the state should offer more recognition and flexibility.",
        bn: "স্বেচ্ছাসেবী কাজকে আরও আকর্ষণীয় করে তুলতে নিয়োগকর্তা এবং রাষ্ট্রের আরও বেশি স্বীকৃতি ও নমনীয়তা প্রদান করা উচিত।"
      },
      {
        de: "Beispielsweise könnten ehrenamtliche Tätigkeiten stärker bei Bewerbungen oder im Studium berücksichtigt werden.",
        en: "For example, voluntary activities could be taken more strongly into account in job applications or university studies.",
        bn: "উদাহরণস্বরূপ, চাকরির আবেদনে বা বিশ্ববিদ্যালয়ের পড়াশোনায় স্বেচ্ছাসেবী কর্মকাণ্ডকে আরও বেশি গুরুত্ব দেওয়া যেতে পারে।"
      },
      {
        de: "Eine lebendige Gemeinschaft entsteht nur dort, wo Menschen bereit sind, füreinander Verantwortung zu übernehmen.",
        en: "A vibrant community arises only where people are willing to take responsibility for one another.",
        bn: "একটি প্রাণবন্ত সমাজ কেবল সেখানেই গড়ে ওঠে, যেখানে মানুষ একে অপরের জন্য দায়িত্ব নিতে প্রস্তুত থাকে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-25",
    level: "B2",
    category: "Erörterung (Pro & Contra)",
    titleDe: "Tourismus zwischen Wirtschaftsfaktor und Umweltbelastung",
    titleEn: "Tourism Between Economic Factor and Environmental Burden",
    titleBn: "অর্থনীতি ও পরিবেশগত চাপের মাঝে পর্যটন",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Der internationale Tourismus hat sich in den letzten Jahrzehnten zu einem der wichtigsten Wirtschaftszweige weltweit entwickelt.",
        en: "International tourism has developed into one of the most important economic sectors worldwide in recent decades.",
        bn: "আন্তর্জাতিক পর্যটন গত কয়েক দশকে বিশ্বজুড়ে অন্যতম গুরুত্বপূর্ণ অর্থনৈতিক খাতে পরিণত হয়েছে।"
      },
      {
        de: "Für viele Regionen stellt der Fremdenverkehr die zentrale Einnahmequelle dar und sichert unzählige Arbeitsplätze.",
        en: "For many regions, tourism represents the central source of income and secures countless jobs.",
        bn: "অনেক অঞ্চলের জন্য পর্যটন আয়ের প্রধান উৎস হিসেবে কাজ করে এবং অসংখ্য কর্মসংস্থান নিশ্চিত করে।"
      },
      {
        de: "Zudem fördert das Reisen den kulturellen Austausch und baut Vorurteile zwischen verschiedenen Völkern ab.",
        en: "Moreover, traveling promotes cultural exchange and breaks down prejudices between different peoples.",
        bn: "তদুপরি, ভ্রমণ সাংস্কৃতিক বিনিময়কে উৎসাহিত করে এবং বিভিন্ন জাতির মধ্যে কুসংস্কার দূর করে।"
      },
      {
        de: "Andererseits führt der sogenannte Massentourismus in beliebten Reisezielen zunehmend zu gravierenden ökologischen und sozialen Problemen.",
        en: "On the other hand, so-called mass tourism in popular travel destinations increasingly leads to serious ecological and social problems.",
        bn: "অন্যদিকে, জনপ্রিয় পর্যটন কেন্দ্রগুলোতে তথাকথিত গণ-পর্যটন (Massentourismus) ক্রমশ গুরুতর পরিবেশগত এবং সামাজিক সমস্যার সৃষ্টি করছে।"
      },
      {
        de: "Historische Innenstädte werden oft von Besuchermassen überrollt, sodass die Lebensqualität der Einheimischen erheblich leidet.",
        en: "Historic city centers are often overrun by crowds of visitors, so that the quality of life of locals suffers considerably.",
        bn: "ঐতিহাসিক শহরের কেন্দ্রগুলো প্রায়ই দর্শনার্থীদের ভিড়ে উপচে পড়ে, যার ফলে স্থানীয় বাসিন্দাদের জীবনযাত্রার মান উল্লেখযোগ্যভাবে ক্ষতিগ্রস্ত হয়।"
      },
      {
        de: "Darüber hinaus verursacht der weltweite Flug- und Kreuzfahrtverkehr enorme Mengen an klimaschädlichen Treibhausgasen.",
        en: "Furthermore, global air and cruise traffic causes enormous amounts of climate-damaging greenhouse gases.",
        bn: "এছাড়া বিশ্বব্যাপী বিমান এবং প্রমোদতরী চলাচল প্রচুর পরিমাণে জলবায়ু-ক্ষতিকর গ্রিনহাউস গ্যাস নির্গত করে।"
      },
      {
        de: "Um diesen negativen Entwicklungen entgegenzuwirken, gewinnen Konzepte des nachhaltigen Ökotourismus immer mehr an Bedeutung.",
        en: "In order to counteract these negative developments, concepts of sustainable ecotourism are gaining more and more importance.",
        bn: "এই নেতিবাচক প্রবণতাগুলো মোকাবিলা করার জন্য টেকসই ইকোট্যুরিজমের ধারণাগুলো ক্রমশ গুরুত্ব পাচ্ছে।"
      },
      {
        de: "Immer mehr Reisende achten inzwischen darauf, umweltfreundlich mit der Bahn anzureisen und regionale Anbieter zu unterstützen.",
        en: "More and more travelers meanwhile make sure to arrive in an environmentally friendly manner by train and support regional providers.",
        bn: "আরও বেশি পর্যটক ইতিমধ্যে পরিবেশবান্ধব উপায়ে ট্রেনে ভ্রমণ করার এবং স্থানীয় ব্যবসায়ীদের সহায়তা করার দিকে নজর দিচ্ছেন।"
      },
      {
        de: "Auch Städte führen vermehrt Besucherlimits oder spezielle Abgaben ein, um ihre Infrastruktur zu schützen.",
        en: "Cities are also increasingly introducing visitor limits or special levies to protect their infrastructure.",
        bn: "শহরগুলোও তাদের অবকাঠামো রক্ষার জন্য দর্শনার্থীর সংখ্যা সীমিত করা বা বিশেষ কর চালু করছে।"
      },
      {
        de: "Ein verantwortungsbewusster Tourismus erfordert letztlich ein Umdenken sowohl bei den Reiseveranstaltern als auch bei jedem einzelnen Urlauber.",
        en: "Responsible tourism ultimately requires a rethink on the part of both tour operators and every individual vacationer.",
        bn: "দায়িত্বশীল পর্যটনের জন্য পরিশেষে ট্যুর অপারেটর এবং প্রতিটি পর্যটক উভয়ের মানসিকতার পরিবর্তন প্রয়োজন।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-26",
    level: "B2",
    category: "Konsum & Lebensstil",
    titleDe: "Konsumverhalten und Minimalismus",
    titleEn: "Consumer Behavior and Minimalism",
    titleBn: "ভোগবাদী আচরণ এবং মিনিমালিজম",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "In unserer modernen Überflussgesellschaft sind wir täglich mit tausenden Werbebotschaften konfrontiert, die neue Bedürfnisse wecken sollen.",
        en: "In our modern affluent society, we are confronted daily with thousands of advertising messages intended to awaken new needs.",
        bn: "আমাদের আধুনিক ভোগবাদী সমাজে আমরা প্রতিদিন হাজার হাজার বিজ্ঞাপনের মুখোমুখি হই, যেগুলোর উদ্দেশ্য নতুন চাহিদা তৈরি করা।"
      },
      {
        de: "Viele Menschen kaufen regelmäßig Kleidung oder technische Geräte, obwohl ihre alten Sachen noch völlig intakt sind.",
        en: "Many people regularly buy clothes or technical devices even though their old things are still completely intact.",
        bn: "পুরনো জিনিসগুলো সম্পূর্ণ সচল থাকা সত্ত্বেও অনেক মানুষ নিয়মিত জামাকাপড় বা প্রযুক্তিগত যন্ত্রপাতি কেনেন।"
      },
      {
        de: "Als bewusste Gegenbewegung zu diesem ständigen Konsumzwang gewinnt der Lebensstil des Minimalismus immer mehr Anhänger.",
        en: "As a conscious counter-movement to this constant compulsion to consume, the lifestyle of minimalism is gaining more and more followers.",
        bn: "এই নিরন্তর ভোগের প্রবণতার বিরুদ্ধে একটি সচেতন প্রতিবাদ হিসেবে 'মিনিমালিজম' বা অল্পে তুষ্ট থাকার জীবনধারা ক্রমশ বেশি অনুসারী পাচ্ছে।"
      },
      {
        de: "Minimalisten beschränken ihren Besitz auf das Wesentliche, um mehr Freiheit, Zeit und finanzielle Unabhängigkeit zu gewinnen.",
        en: "Minimalists limit their possessions to the essentials in order to gain more freedom, time, and financial independence.",
        bn: "মিনিমালিস্টরা আরও বেশি স্বাধীনতা, সময় এবং আর্থিক স্বনির্ভরতা অর্জনের জন্য তাদের সম্পদকে কেবল প্রয়োজনীয় জিনিসের মধ্যেই সীমাবদ্ধ রাখেন।"
      },
      {
        de: "Wer weniger Dinge besitzt, muss weniger aufräumen, weniger reparieren und verliert weniger Zeit beim Einkaufen.",
        en: "Whoever owns fewer things has to tidy up less, repair less, and loses less time shopping.",
        bn: "যার জিনিসপত্র কম থাকে, তাকে কম গোছাতে হয়, কম মেরামত করতে হয় এবং কেনাকাটায় কম সময় নষ্ট করতে হয়।"
      },
      {
        de: "Zudem schont ein reduzierter Konsum wertvolle natürliche Ressourcen und verringert die weltweiten Müllberge erheblich.",
        en: "In addition, reduced consumption conserves valuable natural resources and significantly reduces global mountains of trash.",
        bn: "তাছাড়া পরিমিত ভোগ মূল্যবান প্রাকৃতিক সম্পদ রক্ষা করে এবং বিশ্বব্যাপী আবর্জনার স্তূপ উল্লেখযোগ্যভাবে কমায়।"
      },
      {
        de: "Viele Betroffene berichten, dass das Aussortieren überflüssiger Gegenstände auch geistig sehr befreiend wirkt.",
        en: "Many people affected report that sorting out superfluous items also has a very liberating effect mentally.",
        bn: "অনেকেই জানান যে অপ্রয়োজনীয় জিনিসপত্র সরিয়ে ফেলা মানসিকভাবেও খুব স্বস্তিদায়ক প্রভাব ফেলে।"
      },
      {
        de: "Statt Geld für materielle Statussymbole auszugeben, investieren sie lieber in gemeinsame Erlebnisse oder Weiterbildung.",
        en: "Instead of spending money on material status symbols, they prefer to invest in shared experiences or further education.",
        bn: "বস্তুগত আভিজাত্যের প্রতীকে অর্থ ব্যয় করার পরিবর্তে তাঁরা যৌথ অভিজ্ঞতা বা উচ্চশিক্ষায় বিনিয়োগ করতে বেশি পছন্দ করেন।"
      },
      {
        de: "Natürlich bedeutet Minimalismus nicht, auf jeglichen Komfort verzichten zu müssen, sondern bewusstere Kaufentscheidungen zu treffen.",
        en: "Of course, minimalism does not mean having to give up all comfort, rather making more conscious purchasing decisions.",
        bn: "অবশ্যই মিনিমালিজম মানে সব ধরনের আরাম ত্যাগ করা নয়, বরং আরও সচেতনভাবে কেনাকাটার সিদ্ধান্ত নেওয়া।"
      },
      {
        de: "Weniger ist eben oft tatsächlich mehr, wenn es um echte Lebenszufriedenheit geht.",
        en: "Less is indeed often more when it comes to true life satisfaction.",
        bn: "প্রকৃত জীবনসন্তুষ্টির ক্ষেত্রে কম হওয়াটাই আসলে প্রায়ই বেশি হয়ে ওঠে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-27",
    level: "B2",
    category: "Ernährung & Gesellschaft",
    titleDe: "Ernährung im Wandel",
    titleEn: "Changing Nutrition Habits",
    titleBn: "খাদ্যাভ্যাসের পরিবর্তন",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Die Essgewohnheiten der Menschen in Deutschland haben sich in den letzten Jahren spürbar gewandelt.",
        en: "The eating habits of people in Germany have changed noticeably in recent years.",
        bn: "সাম্প্রতিক বছরগুলোতে জার্মানির মানুষের খাদ্যাভ্যাসে উল্লেখযোগ্য পরিবর্তন এসেছে।"
      },
      {
        de: "Immer mehr Verbraucher achten beim Einkauf genau darauf, woher ihre Lebensmittel stammen und wie sie produziert wurden.",
        en: "More and more consumers pay close attention when shopping to where their food comes from and how it was produced.",
        bn: "কেনাকাটার সময় আরও বেশি ভোক্তা এখন গভীরভাবে লক্ষ্য রাখেন তাঁদের খাবার কোথা থেকে আসছে এবং কীভাবে উৎপাদিত হয়েছে।"
      },
      {
        de: "Der Anteil an vegetarisch oder vegan lebenden Menschen steigt besonders in den Großstädten kontinuierlich an.",
        en: "The proportion of people living vegetarian or vegan lives is rising continuously, especially in major cities.",
        bn: "বিশেষ করে বড় শহরগুলোতে নিরামিষাশী বা ভেগান জীবনযাপনকারী মানুষের সংখ্যা ক্রমাগত বাড়ছে।"
      },
      {
        de: "Diese Entwicklung lässt sich sowohl auf gesundheitliche Überlegungen als auch auf das wachsende Bewusstsein für Tier- und Klimaschutz zurückführen.",
        en: "This development can be traced back both to health considerations and to the growing awareness of animal and climate protection.",
        bn: "এই পরিবর্তনের পেছনে স্বাস্থ্যগত বিবেচনা এবং প্রাণী ও জলবায়ু সুরক্ষার ক্রমবর্ধমান সচেতনতা উভয়ই কাজ করছে।"
      },
      {
        de: "Supermärkte und Restaurants haben längst auf diesen Trend reagiert und bieten inzwischen eine riesige Auswahl an pflanzlichen Alternativen an.",
        en: "Supermarkets and restaurants have long since reacted to this trend and meanwhile offer a huge selection of plant-based alternatives.",
        bn: "সুপারমার্কেট এবং রেস্তোরাঁগুলো অনেক আগেই এই প্রবণতায় সাড়া দিয়েছে এবং ইতিমধ্যে উদ্ভিদ-ভিত্তিক বিকল্প খাবারের বিশাল সম্ভার উপস্থাপন করছে।"
      },
      {
        de: "Während früher oft täglich Fleisch auf dem Tisch stand, gilt heute eine abwechslungsreiche Kost mit viel Gemüse als Ideal.",
        en: "Whereas in the past meat was often on the table daily, today a varied diet with lots of vegetables is considered ideal.",
        bn: "আগে যেখানে প্রায় প্রতিদিন টেবিলে মাংস থাকত, সেখানে আজ প্রচুর শাকসবজিসহ বৈচিত্র্যময় খাবারকে আদর্শ হিসেবে ধরা হয়।"
      },
      {
        de: "Dennoch greifen viele Berufstätige aus Zeitmangel im Alltag immer noch häufig zu stark verarbeiteten Fertiggerichten.",
        en: "Nevertheless, many working people still frequently reach for heavily processed ready meals in everyday life due to a lack of time.",
        bn: "তবুও সময়ের অভাবে অনেক কর্মজীবী মানুষ দৈনন্দিন জীবনে এখনো প্রায়ই অতিরিক্ত প্রক্রিয়াজাত তৈরি খাবারের (Fertiggerichte) ওপর নির্ভর করেন।"
      },
      {
        de: "Ernährungsexperten betonen jedoch, dass frisch zubereitete Mahlzeiten deutlich gesünder und nährstoffreicher sind als industrielle Produkte.",
        en: "Nutrition experts emphasize, however, that freshly prepared meals are significantly healthier and richer in nutrients than industrial products.",
        bn: "তবে পুষ্টিবিদরা জোর দিয়ে বলেন যে শিল্পজাত পণ্যের চেয়ে টাটকা তৈরি খাবার উল্লেখযোগ্যভাবে বেশি স্বাস্থ্যকর এবং পুষ্টিগুণসমৃদ্ধ।"
      },
      {
        de: "Es muss dabei gar nicht kompliziert sein, sich im Alltag ausgewogen und vollwertig zu ernähren.",
        en: "In doing so, it does not have to be complicated at all to eat a balanced and wholesome diet in everyday life.",
        bn: "দৈনন্দিন জীবনে সুষম এবং পুষ্টিকর খাবার খাওয়া মোটেও জটিল কোনো বিষয় নয়।"
      },
      {
        de: "Schon kleine Veränderungen, wie der Verzicht auf zuckerhaltige Getränke, können langfristig große positive Effekte auf die Gesundheit haben.",
        en: "Even small changes, such as giving up sugary drinks, can have major positive effects on health in the long term.",
        bn: "চিনিযুক্ত পানীয় ত্যাগ করার মতো ছোট পরিবর্তনগুলোও দীর্ঘমেয়াদে স্বাস্থ্যের ওপর বড় ইতিবাচক প্রভাব ফেলতে পারে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-28",
    level: "B2",
    category: "Kultur & Literatur",
    titleDe: "Die Zukunft des Lesens",
    titleEn: "The Future of Reading",
    titleBn: "পড়ার ভবিষ্যৎ",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Auf der diesjährigen Frankfurter Buchmesse diskutierten Verleger und Autoren intensiv über die Zukunft des gedruckten Buches.",
        en: "At this year's Frankfurt Book Fair, publishers and authors discussed intensively the future of the printed book.",
        bn: "এ বছরের ফ্রাঙ্কফুর্ট বইমেলায় প্রকাশক এবং লেখকরা মুদ্রিত বইয়ের ভবিষ্যৎ নিয়ে নিবিড় আলোচনা করেছেন।"
      },
      {
        de: "Ein bekannter Verlagsleiter erklärte in seinem Vortrag, das klassische Buch aus Papier sei keineswegs vom Aussterben bedroht.",
        en: "A well-known publishing director stated in his lecture that the classic book made of paper was by no means threatened with extinction.",
        bn: "একজন পরিচিত প্রকাশনা পরিচালক তাঁর বক্তব্যে বলেন যে কাগজের তৈরি প্রথাগত বই মোটেও বিলুপ্তির হুমকিতে নেই।"
      },
      {
        de: "Zwar nutzten viele Leser auf Reisen gerne praktische E-Reader, doch bei anspruchsvoller Literatur bleibe das gedruckte Exemplar die erste Wahl.",
        en: "Although many readers liked using practical e-readers while traveling, for demanding literature the printed copy remained the first choice.",
        bn: "যদিও অনেক পাঠক ভ্রমণের সময় সুবিধাজনক ই-রিডার ব্যবহার করতে পছন্দ করেন, তবে গভীর সাহিত্যের ক্ষেত্রে ছাপানো বই-ই প্রথম পছন্দ হিসেবে রয়ে গেছে।"
      },
      {
        de: "Eine junge Schriftstellerin berichtete, ihre jüngeren Leser entdeckten viele Bücher mittlerweile über Empfehlungen auf sozialen Plattformen.",
        en: "A young female writer reported that her younger readers meanwhile discovered many books through recommendations on social platforms.",
        bn: "একজন তরুণ লেখিকা জানান যে তাঁর তরুণ পাঠকরা ইতিমধ্যে সামাজিক প্ল্যাটফর্মের সুপারিশের মাধ্যমে অনেক বই খুঁজে পাচ্ছেন।"
      },
      {
        de: "Durch diesen digitalen Trend hätten insbesondere Liebes- und Fantasyromane enorm an Popularität gewonnen.",
        en: "Through this digital trend, romance and fantasy novels in particular had gained enormous popularity.",
        bn: "এই ডিজিটাল প্রবণতার মাধ্যমে বিশেষ করে রোমান্টিক এবং ফ্যান্টাসি উপন্যাসগুলো ব্যাপক জনপ্রিয়তা অর্জন করেছে।"
      },
      {
        de: "Kritiker merkten jedoch an, die allgemeine Lesekompetenz bei Kindern und Jugendlichen habe leider spürbar abgenommen.",
        en: "Critics noted, however, that general reading literacy among children and adolescents had unfortunately decreased noticeably.",
        bn: "তবে সমালোচকরা উল্লেখ করেন যে শিশু ও কিশোর-কিশোরীদের মধ্যে সাধারণ পড়ার দক্ষতা দুর্ভাগ্যবশত উল্লেখযোগ্যভাবে হ্রাস পেয়েছে।"
      },
      {
        de: "Viele Schüler verbrächten ihre Freizeit lieber mit kurzen Videos, anstatt sich in längere Texte zu vertiefen.",
        en: "Many students preferred spending their free time with short videos instead of immersing themselves in longer texts.",
        bn: "অনেক শিক্ষার্থী দীর্ঘ লেখায় মনোনিবেশ করার পরিবর্তে ছোট ভিডিও দেখে তাদের অবসর সময় কাটাতে বেশি পছন্দ করে।"
      },
      {
        de: "Um diesem Trend entgegenzuwirken, müssten Schulen und Bibliotheken noch kreativere Leseförderungsprojekte anbieten.",
        en: "To counteract this trend, schools and libraries had to offer even more creative reading promotion projects.",
        bn: "এই প্রবণতা রোধ করতে স্কুল এবং লাইব্রেরিগুলোকে আরও সৃজনশীল পাঠ-উন্নয়ন প্রকল্প চালু করতে হবে।"
      },
      {
        de: "Der Kulturminister betonte zum Abschluss, das Lesen sei der wichtigste Schlüssel zur Bildung und demokratischen Teilhabe.",
        en: "The Minister of Culture emphasized in conclusion that reading was the most important key to education and democratic participation.",
        bn: "সংস্কৃতিমন্ত্রী পরিশেষে জোর দিয়ে বলেন যে পড়া হলো শিক্ষা এবং গণতান্ত্রিক অংশগ্রহণের সবচেয়ে গুরুত্বপূর্ণ চাবিকাঠি।"
      },
      {
        de: "Solange Menschen spannende Geschichten suchten, werde das Buch in welcher Form auch immer weiterleben.",
        en: "As long as people sought exciting stories, the book would live on in whatever form.",
        bn: "যতদিন মানুষ রোমাঞ্চকর গল্প খুঁজবে, ততদিন যেকোনো রূপেই হোক বই বেঁচে থাকবে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-29",
    level: "B2",
    category: "Beruf & Kommunikation",
    titleDe: "Konfliktlösung im Team",
    titleEn: "Conflict Resolution in a Team",
    titleBn: "দলে দ্বন্দ্ব নিরসন",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Wo Menschen eng zusammenarbeiten, lassen sich Meinungsverschiedenheiten auf Dauer kaum vermeiden.",
        en: "Where people work closely together, differences of opinion can hardly be avoided in the long run.",
        bn: "যেখানে মানুষ ঘনিষ্ঠভাবে একসাথে কাজ করে, সেখানে দীর্ঘমেয়াদে মতবিরোধ এড়ানো প্রায় অসম্ভব।"
      },
      {
        de: "Entscheidend für den Erfolg eines Teams ist jedoch, wie konstruktiv mit solchen Konflikten umgegangen wird.",
        en: "Crucial for the success of a team, however, is how constructively such conflicts are handled.",
        bn: "তবে একটি দলের সাফল্যের জন্য সবচেয়ে গুরুত্বপূর্ণ হলো এই ধরনের দ্বন্দ্বগুলো কতটা গঠনমূলকভাবে মোকাবিলা করা হয়।"
      },
      {
        de: "In unserem Projekt kam es kürzlich zu Spannungen, weil zwei Kollegen völlig unterschiedliche Vorstellungen vom Ablauf hatten.",
        en: "In our project, tensions recently arose because two colleagues had completely different ideas about the workflow.",
        bn: "আমাদের প্রকল্পে সম্প্রতি উত্তেজনা দেখা দিয়েছিল, কারণ কাজের প্রক্রিয়া নিয়ে দুজন সহকর্মীর সম্পূর্ণ ভিন্ন ধারণা ছিল।"
      },
      {
        de: "Anstatt das Problem unter den Teppich zu kehren, berief unsere Teamleiterin sofort ein klärendes Gespräch ein.",
        en: "Instead of sweeping the problem under the rug, our team leader immediately convened a clarifying meeting.",
        bn: "সমস্যাটি ধামাচাপা দেওয়ার পরিবর্তে আমাদের টিম লিডার সাথে সাথেই একটি সমাধানমূলক বৈঠক ডাকলেন।"
      },
      {
        de: "Sie bat beide Seiten, ihre Standpunkte sachlich darzulegen, ohne dabei persönlich zu werden.",
        en: "She asked both sides to present their points of view objectively without getting personal.",
        bn: "তিনি উভয় পক্ষকে ব্যক্তিগত আক্রমণ না করে বস্তুনিষ্ঠভাবে নিজেদের অবস্থান তুলে ধরতে অনুরোধ করলেন।"
      },
      {
        de: "Durch aktives Zuhören wurde schnell deutlich, dass das Problem eigentlich auf einer unklaren Aufgabenverteilung beruhte.",
        en: "Through active listening, it quickly became clear that the problem was actually based on an unclear distribution of tasks.",
        bn: "মনোযোগ দিয়ে শোনার মাধ্যমে দ্রুত স্পষ্ট হয়ে গেল যে সমস্যাটি আসলে অস্পষ্ট কাজ বণ্টনের কারণে তৈরি হয়েছিল।"
      },
      {
        de: "Gemeinsam erarbeiteten wir daraufhin einen neuen Zeitplan, der die Arbeitsbelastung gerechter auf alle Schultern verteilte.",
        en: "Together we subsequently worked out a new schedule that distributed the workload more fairly across all shoulders.",
        bn: "এরপর আমরা একসাথে একটি নতুন সময়সূচি তৈরি করলাম, যা কাজের চাপ সবার কাঁধে আরও ন্যায্যভাবে ভাগ করে দিল।"
      },
      {
        de: "Beide Kollegen zeigten sich kompromissbereit und reichten sich am Ende des Gesprächs versöhnlich die Hand.",
        en: "Both colleagues proved willing to compromise and shook hands conciliatorily at the end of the conversation.",
        bn: "উভয় সহকর্মী সমঝোতায় আসতে আগ্রহী হলেন এবং আলোচনার শেষে সৌহার্দ্যপূর্ণভাবে হাত মেলালেন।"
      },
      {
        de: "Eine offene Feedbackkultur trägt maßgeblich dazu bei, dass kleine Missverständnisse nicht zu großen Krisen anwachsen.",
        en: "An open feedback culture contributes significantly to ensuring that small misunderstandings do not grow into major crises.",
        bn: "একটি উন্মুক্ত মতামত প্রদানের সংস্কৃতি ছোটখাটো ভুল বোঝাবুঝিকে বড় সংকটে রূপ নেওয়া থেকে রক্ষা করতে গুরুত্বপূর্ণ ভূমিকা রাখে।"
      },
      {
        de: "Wenn sich jedes Teammitglied respektiert fühlt, steigt die Motivation für gemeinsame Ziele spürbar an.",
        en: "When every team member feels respected, motivation for shared goals rises noticeably.",
        bn: "দলের প্রতিটি সদস্য যখন সম্মানিত বোধ করেন, তখন যৌথ লক্ষ্যের প্রতি অনুপ্রেরণা উল্লেখযোগ্যভাবে বৃদ্ধি পায়।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-30",
    level: "B2",
    category: "Wohnen & Demografie",
    titleDe: "Wohnen im Alter – Neue Wohnkonzepte",
    titleEn: "Living in Old Age – New Housing Concepts",
    titleBn: "বার্ধক্যে বসবাস – নতুন আবাসন ধারণা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Angesichts der steigenden Lebenserwartung gewinnt die Frage nach geeigneten Wohnformen im Alter zunehmend an Bedeutung.",
        en: "In view of rising life expectancy, the question of suitable housing forms in old age is increasingly gaining importance.",
        bn: "ক্রমবর্ধমান গড় আয়ুর পরিপ্রেক্ষিতে বার্ধক্যে উপযুক্ত আবাসন ব্যবস্থার প্রশ্নটি ক্রমশ গুরুত্ব পাচ্ছে।"
      },
      {
        de: "Viele ältere Menschen wünschen sich, so lange wie möglich selbstbestimmt in ihrer vertrauten Umgebung leben zu können.",
        en: "Many older people wish to be able to live independently in their familiar surroundings for as long as possible.",
        bn: "অনেক বয়স্ক মানুষ চান যে তাঁরা যতদিন সম্ভব নিজেদের পরিচিত পরিবেশে স্বাধীনভাবে বসবাস করতে পারেন।"
      },
      {
        de: "Gleichzeitig leiden jedoch zahlreiche Senioren unter Einsamkeit, wenn ihre Kinder weit entfernt wohnen.",
        en: "At the same time, however, numerous seniors suffer from loneliness when their children live far away.",
        bn: "তবে একই সাথে অসংখ্য প্রবীণ নাগরিক একাকিত্বে ভোগেন, যখন তাঁদের সন্তানরা অনেক দূরে বসবাস করে।"
      },
      {
        de: "Als innovative Antwort auf diese Herausforderung entstehen in vielen deutschen Städten sogenannte Mehrgenerationenhäuser.",
        en: "As an innovative answer to this challenge, so-called multigenerational houses are emerging in many German cities.",
        bn: "এই চ্যালেঞ্জের একটি উদ্ভাবনী সমাধান হিসেবে জার্মানির অনেক শহরে তথাকথিত 'বহু-প্রজন্মের বাড়ি' (Mehrgenerationenhäuser) গড়ে উঠছে।"
      },
      {
        de: "In diesen Wohnprojekten leben junge Familien, Studierende und ältere Menschen unter einem gemeinsamen Dach zusammen.",
        en: "In these housing projects, young families, students, and older people live together under one shared roof.",
        bn: "এই আবাসন প্রকল্পগুলোতে তরুণ পরিবার, শিক্ষার্থী এবং বয়স্ক মানুষ একই ছাদের নিচে একসাথে বসবাস করেন।"
      },
      {
        de: "Das Prinzip beruht auf gegenseitiger Unterstützung im Alltag, wodurch alle Beteiligten gleichermaßen profitieren.",
        en: "The principle is based on mutual support in everyday life, from which all participants benefit equally.",
        bn: "এই নীতিটি দৈনন্দিন জীবনে পারস্পরিক সহযোগিতার ওপর ভিত্তি করে গড়ে উঠেছে, যার মাধ্যমে অংশগ্রহণকারী সবাই সমানভাবে উপকৃত হন।"
      },
      {
        de: "Während die Jüngeren beispielsweise beim Einkaufen helfen, übernehmen die Älteren oft die Kinderbetreuung am Nachmittag.",
        en: "While the younger ones help with shopping, for example, the older ones often take over childcare in the afternoon.",
        bn: "উদাহরণস্বরূপ, তরুণরা যেখানে কেনাকাটায় সাহায্য করে, সেখানে প্রবীণরা প্রায়ই বিকেলে শিশুদের দেখাশোনার দায়িত্ব নেন।"
      },
      {
        de: "Darüber hinaus entstehen auch spezielle Senioren-Wohngemeinschaften, in denen man Gemeinschaft genießt, aber dennoch seine Privatsphäre behält.",
        en: "In addition, special senior shared apartments are also emerging in which one enjoys community while still retaining one's privacy.",
        bn: "তাছাড়া বিশেষ প্রবীণ শেয়ারড অ্যাপার্টমেন্টও গড়ে উঠছে, যেখানে মানুষ দলবদ্ধতা উপভোগ করার পাশাপাশি নিজের ব্যক্তিগত গোপনীয়তাও বজায় রাখতে পারেন।"
      },
      {
        de: "Solche modernen Konzepte zeigen, dass das Älterwerden nicht zwangsläufig mit sozialer Isolation verbunden sein muss.",
        en: "Such modern concepts show that growing older does not necessarily have to be associated with social isolation.",
        bn: "এই ধরনের আধুনিক ধারণাগুলো দেখায় যে বয়স বেড়ে যাওয়া মানেই বাধ্যতামূলকভাবে সামাজিক বিচ্ছিন্নতা নয়।"
      },
      {
        de: "Ein solidarisches Miteinander der Generationen bereichert das gesamte städtische Zusammenleben nachhaltig.",
        en: "Supportive coexistence among generations sustainably enriches overall urban life together.",
        bn: "প্রজন্মের মধ্যে এই সহমর্মী সহাবস্থান সামগ্রিক নাগরিক জীবনকে টেকসইভাবে সমৃদ্ধ করে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-31",
    level: "B2",
    category: "Digitalisierung & Recht",
    titleDe: "Datenschutz im digitalen Zeitalter",
    titleEn: "Data Protection in the Digital Age",
    titleBn: "ডিজিটাল যুগে ডেটা সুরক্ষা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Mit jeder Suchanfrage im Internet und jedem Einkauf per App hinterlassen wir digitale Datenspuren.",
        en: "With every search query on the internet and every purchase via an app, we leave behind digital data trails.",
        bn: "ইন্টারনেটে প্রতিটি অনুসন্ধান এবং অ্যাপের মাধ্যমে প্রতিটি কেনাকাটার সাথে সাথে আমরা ডিজিটাল তথ্যের ছাপ রেখে যাই।"
      },
      {
        de: "Viele Nutzer klicken aus Bequemlichkeit auf „Alle akzeptieren“, ohne die Datenschutzbestimmungen überhaupt gelesen zu haben.",
        en: "Out of convenience, many users click on \"Accept all\" without having read the privacy policy at all.",
        bn: "অনেক ব্যবহারকারী সুবিধার জন্য গোপনীয়তা নীতিমালা না পড়েই \"সব গ্রহণ করুন\" (Alle akzeptieren) বাটনে ক্লিক করেন।"
      },
      {
        de: "Dabei werden persönliche Daten heute von großen Technologiekonzernen systematisch gesammelt und für personalisierte Werbung ausgewertet.",
        en: "In doing so, personal data is systematically collected today by major technology corporations and evaluated for personalized advertising.",
        bn: "এর ফলে বড় প্রযুক্তি প্রতিষ্ঠানগুলো আজ পদ্ধতিগতভাবে ব্যক্তিগত তথ্য সংগ্রহ করছে এবং ব্যক্তিগতকৃত বিজ্ঞাপনের জন্য তা বিশ্লেষণ করছে।"
      },
      {
        de: "Um die Privatsphäre der Bürger besser zu schützen, wurde in der Europäischen Union die strenge Datenschutz-Grundverordnung eingeführt.",
        en: "In order to better protect the privacy of citizens, the strict General Data Protection Regulation (GDPR) was introduced in the European Union.",
        bn: "নাগরিকদের গোপনীয়তা আরও ভালোভাবে রক্ষা করার জন্য ইউরোপীয় ইউনিয়নে কঠোর সাধারণ ডেটা সুরক্ষা বিধিমালা (DSGVO/GDPR) চালু করা হয়েছে।"
      },
      {
        de: "Dank dieser Regelung haben Verbraucher das Recht zu erfahren, welche Daten über sie gespeichert worden sind.",
        en: "Thanks to this regulation, consumers have the right to find out what data has been stored about them.",
        bn: "এই বিধিমালার কল্যাণে ভোক্তাদের জানার অধিকার রয়েছে যে তাঁদের সম্পর্কে কী কী তথ্য সংরক্ষণ করা হয়েছে।"
      },
      {
        de: "Zudem können Nutzer jederzeit die vollständige Löschung ihrer persönlichen Informationen verlangen.",
        en: "In addition, users can demand the complete deletion of their personal information at any time.",
        bn: "তদুপরি, ব্যবহারকারীরা যেকোনো সময় তাঁদের ব্যক্তিগত তথ্য সম্পূর্ণরূপে মুছে ফেলার দাবি জানাতে পারেন।"
      },
      {
        de: "Dennoch warnen Sicherheitsexperten davor, leichtsinnig mit Passwörtern und sensiblen Bankdaten umzugehen.",
        en: "Nevertheless, security experts warn against handling passwords and sensitive bank data carelessly.",
        bn: "তবুও নিরাপত্তা বিশেষজ্ঞরা পাসওয়ার্ড এবং সংবেদনশীল ব্যাংক তথ্যের ক্ষেত্রে অসতর্ক না হওয়ার বিষয়ে সতর্ক করেন।"
      },
      {
        de: "Durch die Verwendung sicherer Passwortmanager und der Zwei-Faktor-Authentifizierung lässt sich das Risiko eines Datenmissbrauchs erheblich minimieren.",
        en: "Through the use of secure password managers and two-factor authentication, the risk of data misuse can be minimized considerably.",
        bn: "নিরাপদ পাসওয়ার্ড ম্যানেজার এবং টু-ফ্যাক্টর অথেনটিকেশন ব্যবহারের মাধ্যমে তথ্য অপব্যবহারের ঝুঁকি উল্লেখযোগ্যভাবে কমানো সম্ভব।"
      },
      {
        de: "Datenschutz ist kein abstraktes bürokratisches Hindernis, sondern ein grundlegendes Freiheitsrecht in einer digitalen Welt.",
        en: "Data protection is not an abstract bureaucratic obstacle, rather a fundamental right to freedom in a digital world.",
        bn: "ডেটা সুরক্ষা কোনো বিমূর্ত আমলাতান্ত্রিক বাধা নয়, বরং ডিজিটাল বিশ্বে এটি একটি মৌলিক স্বাধীনতার অধিকার।"
      },
      {
        de: "Jeder Einzelne sollte daher sorgsam abwägen, welche privaten Informationen er im Netz preisgibt.",
        en: "Every individual should therefore carefully weigh what private information they disclose online.",
        bn: "তাই প্রতিটি ব্যক্তিরই সচেতনভাবে বিবেচনা করা উচিত যে তিনি অনলাইনে কোন ব্যক্তিগত তথ্য প্রকাশ করছেন।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-32",
    level: "B2",
    category: "Wissenschaft & Forschung",
    titleDe: "Wissenschaft und Forschung in Deutschland",
    titleEn: "Science and Research in Germany",
    titleBn: "জার্মানিতে বিজ্ঞান ও গবেষণা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Deutschland genießt weltweit einen hervorragenden Ruf als Standort für Spitzenforschung und technologische Innovation.",
        en: "Germany enjoys an outstanding reputation worldwide as a hub for cutting-edge research and technological innovation.",
        bn: "অত্যাধুনিক গবেষণা এবং প্রযুক্তিগত উদ্ভাবনের কেন্দ্র হিসেবে জার্মানি বিশ্বজুড়ে এক অসাধারণ সুনাম উপভোগ করে।"
      },
      {
        de: "Neben den traditionellen Universitäten spielen außeruniversitäre Forschungseinrichtungen wie die Max-Planck- oder Fraunhofer-Gesellschaft eine zentrale Rolle.",
        en: "Alongside traditional universities, non-university research institutions such as the Max Planck or Fraunhofer Society play a central role.",
        bn: "প্রথাগত বিশ্ববিদ্যালয়গুলোর পাশাপাশি ম্যাক্স প্ল্যাঙ্ক বা ফ্রাউনহোফার সোসাইটির মতো বিশ্ববিদ্যালয়-বহির্ভূত গবেষণা প্রতিষ্ঠানগুলো কেন্দ্রীয় ভূমিকা পালন করে।"
      },
      {
        de: "In diesen Instituten arbeiten internationale Wissenschaftlerteams an zukunftsweisenden Projekten in Bereichen wie Medizin, Klimaforschung und Quantentechnologie.",
        en: "In these institutes, international teams of scientists work on forward-looking projects in areas such as medicine, climate research, and quantum technology.",
        bn: "এই প্রতিষ্ঠানগুলোতে আন্তর্জাতিক বিজ্ঞানীদের দল চিকিৎসা, জলবায়ু গবেষণা এবং কোয়ান্টাম প্রযুক্তির মতো ক্ষেত্রগুলোতে ভবিষ্যৎমুখী প্রকল্প নিয়ে কাজ করে।"
      },
      {
        de: "Die enge Verzahnung von theoretischer Grundlagenforschung und industrieller Anwendung gilt als besonderes Erfolgsrezept der deutschen Wirtschaft.",
        en: "The close interlocking of theoretical basic research and industrial application is considered a special recipe for success of the German economy.",
        bn: "তাত্ত্বিক মৌলিক গবেষণা এবং শিল্পক্ষেত্রে এর প্রয়োগের নিবিড় মেলবন্ধন জার্মান অর্থনীতির সাফল্যের বিশেষ রহস্য হিসেবে বিবেচিত হয়।"
      },
      {
        de: "Viele junge Nachwuchswissenschaftler aus dem Ausland entscheiden sich bewusst für eine Promotion an einer deutschen Hochschule.",
        en: "Many young junior researchers from abroad consciously decide on a doctorate at a German university.",
        bn: "বিদেশের অনেক তরুণ গবেষক সচেতনভাবেই জার্মান বিশ্ববিদ্যালয়ে পিএইচডি করার সিদ্ধান্ত নেন।"
      },
      {
        de: "Gefördert werden diese internationalen Austauschprogramme oft durch renommierte Institutionen wie den Deutschen Akademischen Austauschdienst.",
        en: "These international exchange programs are often funded by renowned institutions such as the German Academic Exchange Service (DAAD).",
        bn: "এই আন্তর্জাতিক বিনিময় কর্মসূচিগুলো প্রায়ই জার্মান একাডেমিক এক্সচেঞ্জ সার্ভিসের (DAAD) মতো স্বনামধন্য প্রতিষ্ঠান দ্বারা অর্থায়ন করা হয়।"
      },
      {
        de: "Allerdings steht auch die Wissenschaft vor der Herausforderung, komplexe Forschungsergebnisse für die breite Öffentlichkeit verständlich zu kommunizieren.",
        en: "However, science also faces the challenge of communicating complex research results understandably to the general public.",
        bn: "তবে সাধারণ জনগণের কাছে জটিল গবেষণার ফলাফল সহজবোধ্যভাবে তুলে ধরার চ্যালেঞ্জের মুখোমুখিও বিজ্ঞানকে হতে হয়।"
      },
      {
        de: "Gerade in Zeiten globaler Krisen ist das Vertrauen der Bevölkerung in wissenschaftliche Fakten von unschätzbarem Wert.",
        en: "Especially in times of global crises, the population's trust in scientific facts is of inestimable value.",
        bn: "বিশেষ করে বৈশ্বিক সংকটের সময়ে বৈজ্ঞানিক তথ্যের প্রতি জনগণের আস্থা অমূল্য।"
      },
      {
        de: "Durch offene Hochschultage und populärwissenschaftliche Vorträge wird versucht, diese Brücke zwischen Labor und Gesellschaft zu schlagen.",
        en: "Through open university days and popular science lectures, attempts are made to build this bridge between laboratory and society.",
        bn: "উন্মুক্ত বিশ্ববিদ্যালয় দিবস এবং জনপ্রিয় বিজ্ঞান বক্তৃতার মাধ্যমে গবেষণাগার ও সমাজের মধ্যে এই সেতুবন্ধন তৈরির চেষ্টা করা হয়।"
      },
      {
        de: "Investitionen in Bildung und Forschung bleiben somit die wichtigste Grundlage für unseren zukünftigen Wohlstand.",
        en: "Investments in education and research thus remain the most important foundation for our future prosperity.",
        bn: "শিক্ষা ও গবেষণায় বিনিয়োগই তাই আমাদের ভবিষ্যৎ সমৃদ্ধির সবচেয়ে গুরুত্বপূর্ণ ভিত্তি হিসেবে রয়ে গেছে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-33",
    level: "B2",
    category: "Kunst & Kultur",
    titleDe: "Kunst und Kultur im öffentlichen Raum",
    titleEn: "Art and Culture in Public Spaces",
    titleBn: "জনসমক্ষে শিল্প ও সংস্কৃতি",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Wer aufmerksam durch deutsche Städte spaziert, entdeckt oft beeindruckende Kunstwerke direkt unter freiem Himmel.",
        en: "Whoever walks attentively through German cities often discovers impressive works of art right under the open sky.",
        bn: "কেউ যদি মনোযোগ দিয়ে জার্মানির শহরগুলোর মধ্য দিয়ে হাঁটেন, তবে প্রায়ই খোলা আকাশের নিচে চিত্তাকর্ষক শিল্পকর্ম দেখতে পাবেন।"
      },
      {
        de: "Von historischen Denkmälern bis hin zu modernen Graffiti-Wandbildern prägt Kunst im öffentlichen Raum das Gesicht unserer Viertel.",
        en: "From historical monuments to modern graffiti murals, art in public spaces shapes the face of our neighborhoods.",
        bn: "ঐতিহাসিক স্মৃতিস্তম্ভ থেকে শুরু করে আধুনিক গ্রাফিতি দেয়ালচিত্র পর্যন্ত জনসমক্ষে থাকা শিল্প আমাদের এলাকাগুলোর চেহারা গড়ে তোলে।"
      },
      {
        de: "Anders als in einem klassischen Museum ist diese Form der Kultur für jeden Passanten kostenlos und ohne Schwellenangst zugänglich.",
        en: "Unlike in a classic museum, this form of culture is accessible to every passerby free of charge and without any barrier to entry.",
        bn: "প্রথাগত জাদুঘরের চেয়ে ভিন্নভাবে, সংস্কৃতির এই রূপটি প্রতিটি পথচারীর জন্য বিনামূল্যে এবং কোনো সংকোচ ছাড়াই উন্মুক্ত।"
      },
      {
        de: "Manche Skulpturen regen zum Nachdenken über gesellschaftliche Themen an, während andere einfach durch ihre Farbenfreude begeistern.",
        en: "Some sculptures stimulate reflection on social issues, while others simply delight through their joy of color.",
        bn: "কিছু ভাস্কর্য সামাজিক বিষয়গুলো নিয়ে চিন্তা করতে উদ্বুদ্ধ করে, আবার অন্যগুলো কেবল তাদের রঙের উচ্ছ্বাসে মুগ্ধ করে।"
      },
      {
        de: "Oft entstehen jedoch auch hitzige Diskussionen darüber, ob bestimmte moderne Installationen wirklich als Kunst bezeichnet werden können.",
        en: "Often, however, heated discussions also arise over whether certain modern installations can truly be called art.",
        bn: "তবে প্রায়ই এই নিয়ে উত্তপ্ত আলোচনাও হয় যে নির্দিষ্ট কিছু আধুনিক স্থাপনাকে আসলেই শিল্প বলা যায় কিনা।"
      },
      {
        de: "Ein bekanntes Sprichwort besagt, dass über Geschmack bekanntlich nicht gestritten werden kann.",
        en: "A well-known proverb states that there is notoriously no accounting for taste.",
        bn: "একটি পরিচিত প্রবাদ আছে যে রুচি নিয়ে বিতর্ক করা চলে না।"
      },
      {
        de: "Dennoch erfüllen solche Projekte eine wichtige soziale Funktion, indem sie Menschen miteinander ins Gespräch bringen.",
        en: "Nevertheless, such projects fulfill an important social function by bringing people into conversation with one another.",
        bn: "তবুও এই ধরনের প্রকল্পগুলো মানুষকে একে অপরের সাথে কথা বলার সুযোগ করে দিয়ে একটি গুরুত্বপূর্ণ সামাজিক ভূমিকা পালন করে।"
      },
      {
        de: "Viele Kommunen fördern gezielt lokale Künstler, um unattraktive Betonflächen oder Unterführungen kreativ aufzuwerten.",
        en: "Many municipalities specifically support local artists in order to creatively enhance unattractive concrete surfaces or underpasses.",
        bn: "অনেক পৌরসভা আকর্ষণহীন কংক্রিটের দেয়াল বা আন্ডারপাসগুলোকে সৃজনশীলভাবে সুন্দর করে তুলতে স্থানীয় শিল্পীদের বিশেষভাবে সহায়তা করে।"
      },
      {
        de: "Kultur ist eben kein Luxusgut für wenige, sondern ein lebendiger Bestandteil des täglichen Miteinanders.",
        en: "Culture is simply not a luxury good for a few, rather a living component of daily life together.",
        bn: "সংস্কৃতি কেবল মুষ্টিমেয় মানুষের জন্য বিলাসদ্রব্য নয়, বরং দৈনন্দিন সহাবস্থানের একটি জীবন্ত অংশ।"
      },
      {
        de: "Sie verleiht einer Stadt ihre unverwechselbare Identität und macht den Alltag ein Stück inspirierender.",
        en: "It lends a city its unmistakable identity and makes everyday life a bit more inspiring.",
        bn: "এটি একটি শহরকে তার অনন্য পরিচয় দেয় এবং দৈনন্দিন জীবনকে আরও কিছুটা অনুপ্রেরণাদায়ক করে তোলে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-34",
    level: "B2",
    category: "Bewerbung & Karriere",
    titleDe: "Bewerbung und Selbstpräsentation",
    titleEn: "Job Application and Self-Presentation",
    titleBn: "চাকরির আবেদন এবং আত্ম-উপস্থাপনা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Der erste Eindruck entscheidet bei einer Bewerbung oft darüber, ob man zu einem persönlichen Gespräch eingeladen wird.",
        en: "In a job application, the first impression often decides whether one is invited to a personal interview.",
        bn: "চাকরির আবেদনের ক্ষেত্রে প্রথম ছাপই প্রায়ই নির্ধারণ করে দেয় যে আপনাকে সরাসরি ইন্টারভিউয়ের জন্য ডাকা হবে কিনা।"
      },
      {
        de: "Neben einem lückenlosen Lebenslauf spielt ein individuell formuliertes Anschreiben eine ganz wesentliche Rolle.",
        en: "Alongside a gap-free resume, an individually formulated cover letter plays a very essential role.",
        bn: "একটি নিখুঁত জীবনবৃত্তান্তের (Lebenslauf) পাশাপাশি ব্যক্তিগতভাবে সাজানো একটি কভার লেটার (Anschreiben) অত্যন্ত গুরুত্বপূর্ণ ভূমিকা পালন করে।"
      },
      {
        de: "Personalverantwortliche merken sofort, ob ein Text lediglich kopiert wurde oder speziell auf das Unternehmen zugeschnitten ist.",
        en: "HR managers notice immediately whether a text was merely copied or specifically tailored to the company.",
        bn: "মানবসম্পদ কর্মকর্তারা সাথে সাথেই বুঝতে পারেন যে লেখাটি কেবল কপি করা হয়েছে নাকি বিশেষভাবে কোম্পানিটির জন্য তৈরি করা হয়েছে।"
      },
      {
        de: "Im Anschreiben sollte man überzeugend darlegen, welche konkreten Kompetenzen und Erfahrungen man für die Stelle mitbringt.",
        en: "In the cover letter one should convincingly explain what specific skills and experiences one brings to the position.",
        bn: "কভার লেটারে বিশ্বাসযোগ্যভাবে তুলে ধরা উচিত যে পদটির জন্য আপনার কী কী সুনির্দিষ্ট দক্ষতা এবং অভিজ্ঞতা রয়েছে।"
      },
      {
        de: "Ebenso wichtig ist es, die eigene Motivation für genau dieses Unternehmen glaubwürdig zum Ausdruck zu bringen.",
        en: "Equally important is credibly expressing one's own motivation for this exact company.",
        bn: "ঠিক এই কোম্পানিটির প্রতি আপনার নিজের আগ্রহের কারণ বিশ্বাসযোগ্যভাবে প্রকাশ করাও সমান গুরুত্বপূর্ণ।"
      },
      {
        de: "Vor dem eigentlichen Vorstellungsgespräch empfiehlt es sich, gründlich über aktuelle Projekte der Firma zu recherchieren.",
        en: "Before the actual interview, it is advisable to research current projects of the company thoroughly.",
        bn: "মূল ইন্টারভিউয়ের আগে কোম্পানিটির বর্তমান প্রকল্পগুলো সম্পর্কে ভালোভাবে গবেষণা করে নেওয়া উচিত।"
      },
      {
        de: "Während des Gesprächs kommt es nicht nur auf fachliches Wissen, sondern auch auf Authentizität und Teamfähigkeit an.",
        en: "During the interview, what matters is not only specialist knowledge, but also authenticity and ability to work in a team.",
        bn: "ইন্টারভিউয়ের সময় কেবল বিষয়ভিত্তিক জ্ঞানই নয়, বরং সততা এবং দলগতভাবে কাজ করার ক্ষমতাও গুরুত্বপূর্ণ।"
      },
      {
        de: "Auch auf kritische Fragen nach eigenen Schwächen sollte man vorbereitet sein und diese konstruktiv beantworten können.",
        en: "One should also be prepared for critical questions about one's own weaknesses and be able to answer them constructively.",
        bn: "নিজের দুর্বলতা সম্পর্কে সমালোচনামূলক প্রশ্নের জন্যও প্রস্তুত থাকা উচিত এবং গঠনমূলকভাবে সেগুলোর উত্তর দিতে পারা উচিত।"
      },
      {
        de: "Wer am Ende selbst kluge Fragen zum Arbeitsumfeld stellt, signalisiert echtes Interesse und Engagement.",
        en: "Whoever asks smart questions about the working environment themselves at the end signals genuine interest and commitment.",
        bn: "সবশেষে যিনি নিজে কাজের পরিবেশ সম্পর্কে বুদ্ধিদীপ্ত প্রশ্ন করেন, তিনি প্রকৃত আগ্রহ এবং অঙ্গীকারের পরিচয় দেন।"
      },
      {
        de: "Mit einer sorgfältigen Vorbereitung verwandelt sich Nervosität schnell in souveränes Auftreten.",
        en: "With careful preparation, nervousness quickly transforms into a confident demeanor.",
        bn: "যত্নশীল প্রস্তুতির মাধ্যমে নার্ভাসনেস দ্রুতই আত্মবিশ্বাসী উপস্থাপনায় রূপান্তরিত হয়।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-35",
    level: "B2",
    category: "Wirtschaft & Finanzen",
    titleDe: "Finanzen und Altersvorsorge",
    titleEn: "Finances and Retirement Planning",
    titleBn: "অর্থব্যবস্থা এবং অবসরকালীন সঞ্চয়",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Sich schon in jungen Jahren mit den eigenen Finanzen auseinanderzusetzen, ist eine äußerst kluge Entscheidung.",
        en: "Dealing with one's own finances already at a young age is an extremely wise decision.",
        bn: "অল্প বয়স থেকেই নিজের আর্থিক বিষয়গুলো নিয়ে ভাবা একটি অত্যন্ত বুদ্ধিমানের সিদ্ধান্ত।"
      },
      {
        de: "Aufgrund des demografischen Wandels wird die gesetzliche Rente in Zukunft allein oft nicht mehr ausreichen, um den gewohnten Lebensstandard zu halten.",
        en: "Due to demographic change, the statutory pension alone will often no longer be sufficient in the future to maintain one's accustomed standard of living.",
        bn: "জনসংখ্যাগত পরিবর্তনের কারণে ভবিষ্যতে কেবল সরকারি পেনশন অভ্যস্ত জীবনযাত্রার মান বজায় রাখার জন্য যথেষ্ট হবে না।"
      },
      {
        de: "Deshalb raten Finanzexperten dazu, frühzeitig mit dem Aufbau einer privaten Altersvorsorge zu beginnen.",
        en: "Therefore financial experts advise starting early to build up private retirement provision.",
        bn: "তাই আর্থিক বিশেষজ্ঞরা আগেভাগেই ব্যক্তিগত অবসরকালীন সঞ্চয় গড়ে তোলার পরামর্শ দেন।"
      },
      {
        de: "Dank moderner digitaler Sparpläne ist es heute bereits mit kleinen monatlichen Beträgen möglich, langfristig Vermögen aufzubauen.",
        en: "Thanks to modern digital savings plans, it is possible today to build wealth in the long term even with small monthly amounts.",
        bn: "আধুনিক ডিজিটাল সঞ্চয় পরিকল্পনার কল্যাণে আজকাল এমনকি ছোট মাসিক কিস্তির মাধ্যমেও দীর্ঘমেয়াদে সম্পদ গড়ে তোলা সম্ভব।"
      },
      {
        de: "Bevor man jedoch Geld investiert, sollte man sich gründlich über verschiedene Anlageformen und deren Risiken informieren.",
        en: "However, before investing money, one should thoroughly inform oneself about different forms of investment and their risks.",
        bn: "তবে অর্থ বিনিয়োগ করার আগে বিভিন্ন বিনিয়োগের ধরন এবং সেগুলোর ঝুঁকি সম্পর্কে ভালোভাবে জেনে নেওয়া উচিত।"
      },
      {
        de: "Eine breite Streuung des Kapitals gilt dabei als wirksame Methode, um mögliche Kursschwankungen auszugleichen.",
        en: "A broad diversification of capital is considered an effective method to offset possible price fluctuations.",
        bn: "মূলধনের বিস্তৃত বৈচিত্র্যকরণ সম্ভাব্য বাজার ওঠানামা সামাল দেওয়ার একটি কার্যকর পদ্ধতি হিসেবে বিবেচিত হয়।"
      },
      {
        de: "Gleichzeitig ist es ratsam, stets eine finanzielle Reserve für unvorhergesehene Ausgaben auf einem Tagesgeldkonto bereitzuhalten.",
        en: "At the same time, it is advisable to always keep a financial reserve ready in an overnight money account for unforeseen expenses.",
        bn: "একই সাথে অপ্রত্যাশিত খরচের জন্য একটি সেভিংস অ্যাকাউন্টে সবসময় জরুরি তহবিল রাখা বুদ্ধিমানের কাজ।"
      },
      {
        de: "Wer einen klaren Überblick über seine monatlichen Einnahmen und Ausgaben behält, vermeidet unnötige Schulden.",
        en: "Whoever keeps a clear overview of their monthly income and expenses avoids unnecessary debts.",
        bn: "যিনি নিজের মাসিক আয় এবং ব্যয়ের ওপর স্পষ্ট হিসাব রাখেন, তিনি অপ্রয়োজনীয় ঋণ এড়িয়ে চলতে পারেন।"
      },
      {
        de: "Finanzielle Bildung wird in der Schule leider noch viel zu selten vermittelt, obwohl sie im Alltag unverzichtbar ist.",
        en: "Financial literacy is unfortunately still taught far too rarely in school, even though it is indispensable in everyday life.",
        bn: "দুর্ভাগ্যবশত স্কুলে আর্থিক শিক্ষা এখনো খুব কমই দেওয়া হয়, যদিও দৈনন্দিন জীবনে এটি অপরিহার্য।"
      },
      {
        de: "Mit etwas Disziplin und Weitsicht legt man heute den Grundstein für ein sorgenfreies Leben im Alter.",
        en: "With a little discipline and foresight, one lays the foundation today for a carefree life in old age.",
        bn: "সামান্য শৃঙ্খলা এবং দূরদর্শিতার মাধ্যমে আজই বার্ধক্যে একটি চিন্তামুক্ত জীবনের ভিত্তি স্থাপন করা সম্ভব।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-36",
    level: "B2",
    category: "Gesellschaft & Integration",
    titleDe: "Integration und Sprache",
    titleEn: "Integration and Language",
    titleBn: "একীভূতকরণ (ইন্টিগ্রেশন) এবং ভাষা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Das Erlernen der Landessprache gilt zu Recht als der wichtigste Schlüssel für eine gelungene Integration in einem neuen Land.",
        en: "Learning the local language is rightly considered the most important key to successful integration in a new country.",
        bn: "একটি নতুন দেশে সফলভাবে একীভূত হওয়ার (Integration) জন্য সেই দেশের ভাষা শেখাকে যথার্থই সবচেয়ে গুরুত্বপূর্ণ চাবিকাঠি হিসেবে ধরা হয়।"
      },
      {
        de: "Ohne ausreichende Sprachkenntnisse bleibt man im Alltag oft auf die Hilfe anderer angewiesen und fühlt sich schnell isoliert.",
        en: "Without sufficient language skills, one often remains dependent on the help of others in everyday life and quickly feels isolated.",
        bn: "পর্যাপ্ত ভাষার দক্ষতা ছাড়া দৈনন্দিন জীবনে মানুষকে প্রায়ই অন্যের সাহায্যের ওপর নির্ভরশীল থাকতে হয় এবং দ্রুত একাকী বোধ হয়।"
      },
      {
        de: "Erst wenn man sich selbstständig verständigen kann, öffnen sich die Türen zu qualifizierter Arbeit und gesellschaftlicher Teilhabe.",
        en: "Only when one can communicate independently do the doors to qualified work and social participation open.",
        bn: "কেবল যখন কেউ স্বাধীনভাবে ভাব বিনিময় করতে পারেন, তখনই যোগ্য কর্মসংস্থান এবং সামাজিক অংশগ্রহণের দরজা খুলে যায়।"
      },
      {
        de: "Integration ist jedoch keine Einbahnstraße, sondern ein gegenseitiger Prozess, der Offenheit von beiden Seiten erfordert.",
        en: "However, integration is not a one-way street, rather a mutual process that requires openness from both sides.",
        bn: "তবে ইন্টিগ্রেশন কোনো একমুখী পথ নয়, বরং এটি একটি পারস্পরিক প্রক্রিয়া যার জন্য উভয় পক্ষের উদারতা প্রয়োজন।"
      },
      {
        de: "Während Neuankömmlinge bereit sein müssen, die Sprache und Regeln des Gastlandes zu erlernen, braucht es auch eine einladende Aufnahmegesellschaft.",
        en: "While newcomers must be willing to learn the language and rules of the host country, a welcoming host society is also needed.",
        bn: "নবাগতদের যেমন আশ্রয়দাতা দেশের ভাষা ও নিয়মকানুন শেখার জন্য প্রস্তুত থাকতে হয়, তেমনি একটি আন্তরিক স্বাগতিক সমাজেরও প্রয়োজন রয়েছে।"
      },
      {
        de: "Begegnungen im Sportverein, am Arbeitsplatz oder in der Nachbarschaft tragen entscheidend dazu bei, gegenseitige Hemmungen abzubauen.",
        en: "Encounters in a sports club, at the workplace, or in the neighborhood contribute decisively to breaking down mutual inhibitions.",
        bn: "স্পোর্টস ক্লাব, কর্মক্ষেত্র বা প্রতিবেশীদের সাথে মেলামেশা পারস্পরিক সংকোচ দূর করতে গুরুত্বপূর্ণ ভূমিকা রাখে।"
      },
      {
        de: "Ich selbst habe erfahren, wie viel Freundlichkeit man erlebt, sobald man den Mut fasst, einfach auf Deutsch loszusprechen.",
        en: "I myself have experienced how much friendliness one encounters as soon as one plucks up the courage to simply start speaking in German.",
        bn: "আমি নিজে অভিজ্ঞতা থেকে দেখেছি যে জার্মান ভাষায় কথা বলার সাহস করলেই মানুষের কাছ থেকে কতটা আন্তরিকতা পাওয়া যায়।"
      },
      {
        de: "Niemand erwartet von einem Lernenden, dass er sofort fehlerfreie Sätze bildet.",
        en: "Nobody expects a learner to immediately form error-free sentences.",
        bn: "একজন শিক্ষার্থীর কাছ থেকে কেউই আশা করে না যে সে সাথে সাথেই নির্ভুল বাক্য তৈরি করবে।"
      },
      {
        de: "Viel wichtiger ist die Bereitschaft, aufeinander zuzugehen und voneinander zu lernen.",
        en: "Much more important is the willingness to approach one another and learn from each other.",
        bn: "এর চেয়ে অনেক বেশি গুরুত্বপূর্ণ হলো একে অপরের কাছে এগিয়ে আসার এবং একে অপরের কাছ থেকে শেখার মানসিকতা।"
      },
      {
        de: "Wenn Vielfalt als Bereicherung begriffen wird, entsteht ein starkes und friedliches Zusammenleben für alle.",
        en: "When diversity is understood as enrichment, a strong and peaceful coexistence emerges for everyone.",
        bn: "বৈচিত্র্যকে যখন সমৃদ্ধি হিসেবে দেখা হয়, তখন সবার জন্য একটি শক্তিশালী এবং শান্তিপূর্ণ সহাবস্থান গড়ে ওঠে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-37",
    level: "B2",
    category: "Architektur & Geschichte",
    titleDe: "Architektur zwischen Tradition und Moderne",
    titleEn: "Architecture Between Tradition and Modernity",
    titleBn: "ঐতিহ্য ও আধুনিকতার মাঝে স্থাপত্য",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Kaum eine deutsche Stadt vereint historische Architektur und futuristische Baukunst auf so eindrucksvolle Weise wie Frankfurt.",
        en: "Hardly any German city combines historical architecture and futuristic building art as impressively as Frankfurt.",
        bn: "ফ্রাঙ্কফুর্টের মতো এত চিত্তাকর্ষকভাবে ঐতিহাসিক স্থাপত্য এবং ভবিষ্যৎমুখী নির্মাণশিল্পের মেলবন্ধন জার্মানির খুব কম শহরেই দেখা যায়।"
      },
      {
        de: "Direkt neben dem liebevoll rekonstruierten Fachwerkhaus-Ensemble des Römerbergs ragen die gläsernen Wolkenkratzer des Bankenviertels in den Himmel.",
        en: "Right next to the lovingly reconstructed half-timbered house ensemble of the Römerberg, the glass skyscrapers of the banking district tower into the sky.",
        bn: "রোমারবার্গের (Römerberg) যত্নসহকারে পুনর্নির্মিত ঐতিহ্যবাহী কাঠের ফ্রেমের বাড়িগুলোর ঠিক পাশেই ব্যাংকিং এলাকার কাঁচের আকাশচুম্বী ভবনগুলো আকাশ ছুঁয়ে দাঁড়িয়ে আছে।"
      },
      {
        de: "Nach den schweren Zerstörungen des Zweiten Weltkriegs standen viele Städte vor der Frage, wie der Wiederaufbau gestaltet werden sollte.",
        en: "After the heavy destruction of World War II, many cities faced the question of how reconstruction should be shaped.",
        bn: "দ্বিতীয় বিশ্বযুদ্ধের ভয়াবহ ধ্বংসযজ্ঞের পর অনেক শহরই পুনর্নির্মাণ কীভাবে করা হবে সেই প্রশ্নের মুখোমুখি হয়েছিল।"
      },
      {
        de: "Während man sich vielerorts für moderne Zweckbauten entschied, wurden in den letzten Jahren auch zahlreiche historische Gebäude originalgetreu wiederaufgebaut.",
        en: "While in many places modern functional buildings were chosen, in recent years numerous historical buildings have also been rebuilt true to the original.",
        bn: "অনেক জায়গায় আধুনিক ব্যবহারিক ভবন নির্মাণের সিদ্ধান্ত নেওয়া হলেও সাম্প্রতিক বছরগুলোতে অসংখ্য ঐতিহাসিক ভবনও অবিকল আসল রূপে পুনর্নির্মাণ করা হয়েছে।"
      },
      {
        de: "Diese gelungene Verbindung aus Alt und Neu verleiht dem Stadtbild eine ganz besondere Spannung und Attraktivität.",
        en: "This successful combination of old and new lends the cityscape a very special tension and attractiveness.",
        bn: "পুরনো এবং নতুনের এই সফল সংমিশ্রণ শহরের দৃশ্যপটকে এক বিশেষ বৈচিত্র্য ও আকর্ষণ প্রদান করে।"
      },
      {
        de: "Moderne Architektur muss heute jedoch nicht nur ästhetisch überzeugen, sondern auch strengen ökologischen Kriterien genügen.",
        en: "Today, however, modern architecture must not only convince aesthetically, but also meet strict ecological criteria.",
        bn: "তবে আধুনিক স্থাপত্যকে আজ কেবল নান্দনিকভাবে আকর্ষণীয় হলেই চলবে না, বরং কঠোর পরিবেশগত মানদণ্ডও পূরণ করতে হবে।"
      },
      {
        de: "Begrünte Fassaden und energieeffiziente Glasfronten tragen dazu bei, das Stadtklima im Sommer spürbar zu verbessern.",
        en: "Green facades and energy-efficient glass fronts contribute to noticeably improving the urban climate in summer.",
        bn: "সবুজায়িত দেয়াল এবং জ্বালানি-সাশ্রয়ী কাঁচের সম্মুখভাগ গ্রীষ্মকালে শহরের আবহাওয়া উল্লেখযোগ্যভাবে উন্নত করতে সাহায্য করে।"
      },
      {
        de: "Architekten stehen vor der spannenden Aufgabe, bezahlbaren Wohnraum zu schaffen, ohne dabei die Lebensqualität zu vernachlässigen.",
        en: "Architects face the exciting task of creating affordable living space without neglecting quality of life.",
        bn: "স্থপতিরা জীবনযাত্রার মান অবহেলা না করে সাশ্রয়ী মূল্যের আবাসন তৈরির রোমাঞ্চকর চ্যালেঞ্জের মুখোমুখি হয়েছেন।"
      },
      {
        de: "Ein durchdachtes Stadtbild lädt die Menschen zum Verweilen ein und stärkt die Identifikation mit dem eigenen Wohnort.",
        en: "A well-thought-out cityscape invites people to linger and strengthens identification with their own place of residence.",
        bn: "একটি সুচিন্তিত নগর কাঠামো মানুষকে সেখানে সময় কাটাতে আমন্ত্রণ জানায় এবং নিজ শহরের প্রতি একাত্মতা বাড়ায়।"
      },
      {
        de: "So erzählt jedes Gebäude seine eigene Geschichte über Vergangenheit, Gegenwart und Zukunft der Stadt.",
        en: "Thus every building tells its own story about the past, present, and future of the city.",
        bn: "এভাবে প্রতিটি ভবন শহরের অতীত, বর্তমান এবং ভবিষ্যৎ সম্পর্কে নিজস্ব গল্প বলে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-38",
    level: "B2",
    category: "Veranstaltungen & Ehrenamt",
    titleDe: "Das Phänomen Ehrenamt bei Großveranstaltungen",
    titleEn: "Volunteering at Major Events",
    titleBn: "বড় আয়োজনে স্বেচ্ছাসেবী কর্মকাণ্ড",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Wenn in Deutschland internationale Sportturniere oder große Kulturfestivals stattfinden, sind tausende freiwillige Helfer im Einsatz.",
        en: "When international sports tournaments or major cultural festivals take place in Germany, thousands of voluntary helpers are in action.",
        bn: "জার্মানিতে যখন আন্তর্জাতিক ক্রীড়া টুর্নামেন্ট বা বড় সাংস্কৃতিক উৎসব অনুষ্ঠিত হয়, তখন হাজার হাজার স্বেচ্ছাসেবী কর্মী কাজ করেন।"
      },
      {
        de: "Ohne diese sogenannten Volunteers ließen sich Veranstaltungen dieser Größenordnung finanziell und organisatorisch kaum durchführen.",
        en: "Without these so-called volunteers, events of this magnitude could hardly be carried out financially and organizationally.",
        bn: "এই তথাকথিত ভলান্টিয়ারদের ছাড়া এত বড় মাপের আয়োজন আর্থিক এবং সাংগঠনিকভাবে পরিচালনা করা প্রায় অসম্ভব হতো।"
      },
      {
        de: "Ob am Flughafen, im Stadion oder im Pressezentrum – überall sorgen sie für einen reibungslosen Ablauf und herzliche Gastfreundschaft.",
        en: "Whether at the airport, in the stadium, or in the press center – everywhere they ensure a smooth process and warm hospitality.",
        bn: "বিমানবন্দরে হোক, স্টেডিয়ামে হোক বা প্রেস সেন্টারে—সর্বত্রই তাঁরা নির্বিঘ্ন কার্যক্রম এবং আন্তরিক আতিথেয়তা নিশ্চিত করেন।"
      },
      {
        de: "Eine Studentin, die kürzlich bei einer großen Sportveranstaltung mithalf, berichtete begeistert von ihren Erfahrungen.",
        en: "A female student who recently helped out at a major sporting event reported enthusiastically about her experiences.",
        bn: "সম্প্রতি একটি বড় ক্রীড়া অনুষ্ঠানে সাহায্য করা একজন ছাত্রী উৎসাহের সাথে তাঁর অভিজ্ঞতার কথা জানিয়েছেন।"
      },
      {
        de: "Sie sagte, sie habe dort nicht nur Menschen aus aller Welt kennengelernt, sondern auch viel über Teamarbeit gelernt.",
        en: "She said she had not only met people from all over the world there, but had also learned a lot about teamwork.",
        bn: "তিনি বলেন, সেখানে তিনি কেবল সারা বিশ্বের মানুষের সাথেই পরিচিত হননি, বরং দলগত কাজ সম্পর্কেও অনেক কিছু শিখেছেন।"
      },
      {
        de: "Besonders beeindruckt habe sie der enorme Zusammenhalt unter den Helfern, selbst wenn es einmal stressig geworden sei.",
        en: "She had been particularly impressed by the enormous solidarity among the helpers, even when things had occasionally gotten stressful.",
        bn: "কাজ কখনো চাপের হয়ে উঠলেও স্বেচ্ছাসেবীদের মধ্যকার বিশাল সংহতি তাঁকে বিশেষভাবে মুগ্ধ করেছে।"
      },
      {
        de: "Viele Teilnehmer nehmen extra Urlaub, um Teil eines solchen historischen Ereignisses zu sein.",
        en: "Many participants take extra vacation time in order to be part of such a historic event.",
        bn: "অনেক অংশগ্রহণকারী এমন একটি ঐতিহাসিক ঘটনার অংশ হওয়ার জন্য আলাদাভাবে ছুটি নেন।"
      },
      {
        de: "Als Dankeschön erhalten die Freiwilligen meist einheitliche Kleidung, Verpflegung und unvergessliche Einblicke hinter die Kulissen.",
        en: "As a thank-you, the volunteers usually receive uniform clothing, meals, and unforgettable glimpses behind the scenes.",
        bn: "কৃতজ্ঞতাস্বরূপ স্বেচ্ছাসেবীরা সাধারণত নির্দিষ্ট পোশাক, খাবার এবং পর্দার আড়ালের অবিস্মরণীয় অভিজ্ঞতা লাভ করেন।"
      },
      {
        de: "Kritiker merken zwar gelegentlich an, dass kommerzielle Veranstalter nicht allein auf kostenlose Arbeit setzen sollten.",
        en: "Critics occasionally note that commercial organizers should not rely solely on unpaid work.",
        bn: "সমালোচকরা অবশ্য মাঝে মাঝে উল্লেখ করেন যে বাণিজ্যিক আয়োজকদের কেবল বিনা পারিশ্রমিকের শ্রমের ওপর নির্ভর করা উচিত নয়।"
      },
      {
        de: "Dennoch überwiegt bei den meisten Helfern eindeutig die Freude daran, gemeinsam etwas Großes auf die Beine zu stellen.",
        en: "Nevertheless, among most helpers, the joy of pulling off something great together clearly outweighs everything else.",
        bn: "তবুও অধিকাংশ স্বেচ্ছাসেবীর কাছে একসাথে বড় কিছু গড়ে তোলার আনন্দই সবচেয়ে বড় হয়ে ওঠে।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-39",
    level: "B2",
    category: "Medien & Bildung",
    titleDe: "Medienkompetenz in der Schule",
    titleEn: "Media Literacy in School",
    titleBn: "বিদ্যালয়ে মিডিয়া সাক্ষরতা",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "In einer Welt, in der Kinder schon im Grundschulalter Zugang zu Smartphones haben, wird Medienkompetenz zu einer zentralen Bildungsaufgabe.",
        en: "In a world where children already have access to smartphones at elementary school age, media literacy becomes a central educational task.",
        bn: "এমন একটি বিশ্বে যেখানে শিশুরা প্রাথমিক বিদ্যালয়ের বয়সেই স্মার্টফোন ব্যবহারের সুযোগ পায়, সেখানে মিডিয়া সাক্ষরতা একটি প্রধান শিক্ষামূলক দায়িত্বে পরিণত হয়েছে।"
      },
      {
        de: "Es reicht heute nicht mehr aus, Schülern lediglich den technischen Umgang mit Computern und Tablets beizubringen.",
        en: "Today it is no longer enough to merely teach students the technical handling of computers and tablets.",
        bn: "আজকাল শিক্ষার্থীদের কেবল কম্পিউটার এবং ট্যাবলেটের কারিগরি ব্যবহার শেখানোই আর যথেষ্ট নয়।"
      },
      {
        de: "Vielmehr müssen junge Menschen lernen, Informationen im Internet kritisch zu hinterfragen und Fake News zuverlässig zu erkennen.",
        en: "Rather, young people must learn to critically question information on the internet and reliably recognize fake news.",
        bn: "বরং তরুণদের ইন্টারনেটের তথ্য সমালোচনামূলকভাবে যাচাই করতে এবং ভুয়া খবর (Fake News) নির্ভরযোগ্যভাবে চিনতে শিখতে হবে।"
      },
      {
        de: "Auch der Schutz der eigenen Privatsphäre sowie ein respektvoller Umgangston in sozialen Netzwerken gehören dringend auf den Lehrplan.",
        en: "Protecting one's own privacy as well as a respectful tone in social networks also urgently belong on the curriculum.",
        bn: "নিজের ব্যক্তিগত গোপনীয়তা রক্ষা এবং সামাজিক যোগাযোগ মাধ্যমে সম্মানজনক আচরণের বিষয়টিও জরুরি ভিত্তিতে পাঠ্যক্রমে অন্তর্ভুক্ত হওয়া উচিত।"
      },
      {
        de: "Leider fühlen sich viele Lehrkräfte auf diese Themen noch nicht ausreichend vorbereitet, da geeignete Fortbildungen oft fehlen.",
        en: "Unfortunately, many teachers do not yet feel sufficiently prepared for these topics, as suitable further training is often lacking.",
        bn: "দুর্ভাগ্যবশত অনেক শিক্ষক এখনো এই বিষয়গুলোর জন্য নিজেদের পর্যাপ্ত প্রস্তুত মনে করেন না, কারণ উপযুক্ত প্রশিক্ষণের প্রায়ই অভাব রয়েছে।"
      },
      {
        de: "Bildungsexperten fordern deshalb, dass digitale Medienbildung fest in der Lehrerausbildung verankert werden muss.",
        en: "Education experts therefore demand that digital media education must be firmly anchored in teacher training.",
        bn: "তাই শিক্ষা বিশেষজ্ঞরা দাবি করেন যে ডিজিটাল মিডিয়া শিক্ষাকে শিক্ষক প্রশিক্ষণের মধ্যে দৃঢ়ভাবে অন্তর্ভুক্ত করতে হবে।"
      },
      {
        de: "Gleichzeitig tragen auch die Eltern eine große Verantwortung, ihre Kinder bei den ersten Schritten im Netz aktiv zu begleiten.",
        en: "At the same time, parents also bear a great responsibility to actively accompany their children during their first steps online.",
        bn: "একই সাথে ইন্টারনেটে সন্তানদের প্রথম পদক্ষেপগুলোতে সক্রিয়ভাবে সঙ্গ দেওয়ার বড় দায়িত্ব অভিভাবকদেরও রয়েছে।"
      },
      {
        de: "Statt pauschaler Verbote helfen offene Gespräche im Familienkreis deutlich besser dabei, ein gesundes Nutzungsverhalten zu entwickeln.",
        en: "Instead of blanket bans, open conversations within the family circle help significantly better in developing healthy usage behavior.",
        bn: "ঢালাও নিষেধাজ্ঞার পরিবর্তে পারিবারিক পরিসরে খোলামেলা আলোচনা সুস্থ ব্যবহারের অভ্যাস গড়ে তুলতে উল্লেখযোগ্যভাবে বেশি সাহায্য করে।"
      },
      {
        de: "Wenn Schule und Elternhaus Hand in Hand arbeiten, können Jugendliche zu mündigen und verantwortungsbewussten Bürgern heranwachsen.",
        en: "When school and home work hand in hand, young people can grow into mature and responsible citizens.",
        bn: "স্কুল এবং পরিবার হাতে হাত রেখে কাজ করলে তরুণরা পরিপক্ক এবং দায়িত্বশীল নাগরিক হিসেবে বেড়ে উঠতে পারবে।"
      },
      {
        de: "Medienkompetenz ist heute schließlich genauso wichtig wie das klassische Lesen, Schreiben und Rechnen.",
        en: "After all, media literacy is today just as important as classic reading, writing, and arithmetic.",
        bn: "মিডিয়া সাক্ষরতা আজ প্রথাগত পড়া, লেখা এবং গণিতের মতোই সমান গুরুত্বপূর্ণ।"
      }
    ],
    dictionary: {}
  },
  {
    id: "passage-b2-40",
    level: "B2",
    category: "B2 Rückblick",
    titleDe: "Abschluss der B2-Stufe – Ein neuer Meilenstein",
    titleEn: "Completing Level B2 – A New Milestone",
    titleBn: "বি২ স্তর সমাপ্তি – একটি নতুন মাইলফলক",
    readingTimeMinutes: 5,
    sentences: [
      {
        de: "Mit dem heutigen Tag schließe ich meine intensive Vorbereitung auf die B2-Prüfung mit einem Gefühl großer Dankbarkeit ab.",
        en: "With today's day I conclude my intensive preparation for the B2 exam with a feeling of great gratitude.",
        bn: "আজকের দিনের মাধ্যমে আমি গভীর কৃতজ্ঞতার অনুভূতি নিয়ে বি২ পরীক্ষার নিবিড় প্রস্তুতি সম্পন্ন করছি।"
      },
      {
        de: "Rückblickend lässt sich sagen, dass der Weg von den ersten einfachen Sätzen bis zu komplexen Diskussionen äußerst bereichernd war.",
        en: "Looking back, it can be said that the path from the first simple sentences to complex discussions has been extremely enriching.",
        bn: "পেছনের দিকে তাকালে বলা যায় যে প্রথম দিকের সহজ বাক্য থেকে শুরু করে জটিল আলোচনা পর্যন্ত এই পথচলা ছিল অত্যন্ত সমৃদ্ধশালী।"
      },
      {
        de: "Während ich anfangs noch Mühe hatte, längeren Gesprächen zu folgen, kann ich mich heute differenziert zu aktuellen Themen äußern.",
        en: "While in the beginning I still had trouble following longer conversations, today I can express myself in a nuanced way on current topics.",
        bn: "শুরুতে যেখানে দীর্ঘ কথোপকথন অনুসরণ করতে আমার কষ্ট হতো, আজ সেখানে আমি সাম্প্রতিক বিষয়গুলোতে সূক্ষ্মভাবে নিজের মতামত প্রকাশ করতে পারি।"
      },
      {
        de: "Die Beherrschung anspruchsvoller Strukturen wie des Konjunktivs oder des Nominalstils hat mein Sprachverständnis auf ein völlig neues Niveau gehoben.",
        en: "Mastering demanding structures such as the subjunctive or nominal style has lifted my language comprehension to a completely new level.",
        bn: "কনজাঙ্কটিভ বা নামপদ-প্রধান শৈলীর (Nominalstil) মতো কঠিন কাঠামোগুলো আয়ত্ত করা আমার ভাষার বোধগম্যতাকে এক সম্পূর্ণ নতুন স্তরে উন্নীত করেছে।"
      },
      {
        de: "Besonders wertvoll waren die zahlreichen Texte, anhand derer ich nicht nur Grammatik, sondern auch viel über Kultur und Gesellschaft gelernt habe.",
        en: "Particularly valuable were the numerous texts, by means of which I learned not only grammar, but also a great deal about culture and society.",
        bn: "অসংখ্য পাঠ্যবই ও গল্পগুলো বিশেষভাবে মূল্যবান ছিল, যেগুলোর সাহায্যে আমি কেবল ব্যাকরণই নয়, বরং সংস্কৃতি এবং সমাজ সম্পর্কেও অনেক কিছু শিখেছি।"
      },
      {
        de: "Ohne die geduldige Unterstützung meiner Lehrkräfte und den regelmäßigen Austausch mit meinen Lernpartnern wäre dieser Fortschritt kaum möglich gewesen.",
        en: "Without the patient support of my teachers and regular exchange with my study partners, this progress would hardly have been possible.",
        bn: "আমার শিক্ষকদের ধৈর্যশীল সহায়তা এবং সহপাঠীদের সাথে নিয়মিত মতবিনিময় ছাড়া এই অগ্রগতি প্রায় অসম্ভব হতো।"
      },
      {
        de: "Morgen werde ich nun voller Zuversicht in die Prüfung gehen und mein Bestes geben.",
        en: "Tomorrow I will now go into the exam full of confidence and give my best.",
        bn: "আগামীকাল আমি পূর্ণ আত্মবিশ্বাসের সাথে পরীক্ষায় অংশ নেব এবং আমার সর্বোচ্চ চেষ্টা করব।"
      },
      {
        de: "Doch selbst nach dem Bestehen der B2-Prüfung wird meine Reise mit der deutschen Sprache keineswegs beendet sein.",
        en: "Yet even after passing the B2 exam, my journey with the German language will by no means be finished.",
        bn: "তবে বি২ পরীক্ষায় উত্তীর্ণ হওয়ার পরও জার্মান ভাষার সাথে আমার যাত্রা মোটেও শেষ হয়ে যাবে না।"
      },
      {
        de: "Jedes gelesene Buch und jedes geführte Gespräch eröffnet mir weiterhin neue Perspektiven in meinem beruflichen und privaten Leben.",
        en: "Every book read and every conversation held continues to open up new perspectives for me in my professional and private life.",
        bn: "পড়া প্রতিটি বই এবং করা প্রতিটি কথোপকথন আমার পেশাগত ও ব্যক্তিগত জীবনে নতুন নতুন দৃষ্টিভঙ্গি উন্মোচন করে চলবে।"
      },
      {
        de: "Sprache ist eben weit mehr als nur ein Kommunikationsmittel – sie ist das Tor zu einer neuen Welt!",
        en: "Language is simply far more than just a means of communication – it is the gateway to a new world!",
        bn: "ভাষা আসলে কেবল যোগাযোগের মাধ্যমের চেয়েও অনেক বড় কিছু—এটি একটি নতুন জগতের প্রবেশদ্বার!"
      }
    ],
    dictionary: {}
  }
];

/**
 * Resolves ANY clicked German token from a passage into a rich PassageWordEntry
 * with lemma, gender article (der/die/das), plural, English & Bangla meanings, and examples.
 */
export function lookupPassageWord(
  rawToken: string,
  passage: ReadingPassage,
  sentenceContext?: { de: string; en: string; bn: string }
): PassageWordEntry {
  const cleaned = rawToken.replace(/[.,!?;:"„“”()[\]—-]/g, "").trim();
  const key = cleaned.toLowerCase();

  // 1. Check passage-specific dictionary first
  if (passage.dictionary[key]) {
    return passage.dictionary[key];
  }
  if (passage.dictionary[cleaned]) {
    return passage.dictionary[cleaned];
  }

  // 2. Check global dictionary
  if (GLOBAL_GERMAN_DICTIONARY[key]) {
    return GLOBAL_GERMAN_DICTIONARY[key];
  }

  // 3. Check 1,000-word vocabulary.csv dictionary
  if (CSV_WORD_LOOKUP_MAP[key]) {
    return {
      ...CSV_WORD_LOOKUP_MAP[key],
      surface: cleaned
    };
  }

  // 3. Heuristic German morphological analysis for capitalized nouns vs verbs/particles
  const isCapitalized =
    cleaned.length > 0 &&
    cleaned[0] === cleaned[0].toUpperCase() &&
    cleaned[0] !== cleaned[0].toLowerCase();

  let inferredArticle: "der" | "die" | "das" | undefined;
  let inferredPlural: string | undefined;

  if (isCapitalized) {
    if (
      key.endsWith("ung") ||
      key.endsWith("heit") ||
      key.endsWith("keit") ||
      key.endsWith("schaft") ||
      key.endsWith("tion") ||
      key.endsWith("tät") ||
      key.endsWith("ik") ||
      key.endsWith("ie") ||
      key.endsWith("e")
    ) {
      inferredArticle = "die";
      inferredPlural = `die ${cleaned}${key.endsWith("e") ? "n" : "en"}`;
    } else if (
      key.endsWith("chen") ||
      key.endsWith("lein") ||
      key.endsWith("ment") ||
      key.endsWith("um") ||
      key.endsWith("nis")
    ) {
      inferredArticle = "das";
      inferredPlural = `die ${cleaned}e`;
    } else {
      inferredArticle = "der";
      inferredPlural = `die ${cleaned}e`;
    }
  }

  return {
    surface: cleaned,
    lemma: cleaned,
    article: inferredArticle,
    plural: inferredPlural,
    partOfSpeech: isCapitalized ? "Nomen / Wort im Satz" : "Wort / Verbform",
    english: sentenceContext
      ? `In context: "${sentenceContext.en}"`
      : `German term "${cleaned}" (${passage.level})`,
    bangla: sentenceContext
      ? `বাক্যের প্রেক্ষিতে অর্থ: "${sentenceContext.bn}"`
      : `জার্মান শব্দ "${cleaned}" (${passage.level} স্তর)`,
    exampleDe: sentenceContext?.de || `${cleaned} ist ein wichtiges Wort im Text.`,
    exampleEn:
      sentenceContext?.en || `"${cleaned}" is an important word in the text.`,
    exampleBn:
      sentenceContext?.bn || `"${cleaned}" পাঠ্যটির একটি গুরুত্বপূর্ণ শব্দ।`
  };
}
