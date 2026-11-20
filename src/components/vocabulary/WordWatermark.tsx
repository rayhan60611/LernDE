import React, { useMemo } from "react";
import { View } from "react-native";
import {
  Apple,
  Award,
  Baby,
  Banknote,
  Bath,
  Bed,
  Bike,
  BookOpen,
  Briefcase,
  Building2,
  Bus,
  Cake,
  Calendar,
  Camera,
  Car,
  Clock,
  CloudRain,
  Coffee,
  Compass,
  CreditCard,
  Dog,
  Dumbbell,
  Eye,
  FileText,
  Film,
  Flame,
  Flower2,
  Gift,
  Globe,
  GraduationCap,
  Heart,
  Home,
  Key,
  Laptop,
  Leaf,
  LucideIcon,
  Mail,
  MapPin,
  MessageCircle,
  Mic,
  Moon,
  Music,
  Palette,
  PenTool,
  Phone,
  Plane,
  Scale,
  Shield,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Smile,
  Snowflake,
  Sparkles,
  Stethoscope,
  Sun,
  Ticket,
  Train,
  TreePine,
  Tv,
  Umbrella,
  Users,
  Utensils,
  Wallet,
  Watch,
  Wine,
  Wrench
} from "lucide-react-native";
import { VocabularyItem } from "../../types";

interface WatermarkRule {
  keywords: string[];
  Icon: LucideIcon;
}

const WATERMARK_RULES: WatermarkRule[] = [
  { keywords: ["coffee", "kaffee", "tea", "tee", "drink", "trinken", "cup", "tasse", "cafe", "café"], Icon: Coffee },
  { keywords: ["wine", "wein", "beer", "bier", "bar", "juice", "saft", "water", "wasser", "milk", "milch"], Icon: Wine },
  { keywords: ["food", "eat", "essen", "meal", "dinner", "lunch", "breakfast", "frühstück", "restaurant", "kitchen", "küche", "cook", "kochen", "bread", "brot", "cheese", "käse", "meat", "fleisch", "soup", "suppe"], Icon: Utensils },
  { keywords: ["fruit", "obst", "apple", "apfel", "banana", "banane", "vegetable", "gemüse", "salad", "salat"], Icon: Apple },
  { keywords: ["cake", "kuchen", "sweet", "süß", "sugar", "zucker", "chocolate", "schokolade", "dessert"], Icon: Cake },
  { keywords: ["train", "zug", "bahn", "station", "bahnhof", "railway", "u-bahn", "s-bahn"], Icon: Train },
  { keywords: ["bus", "tram", "straßenbahn", "transport", "verkehr"], Icon: Bus },
  { keywords: ["car", "auto", "drive", "fahren", "street", "straße", "road", "weg", "taxi", "park"], Icon: Car },
  { keywords: ["bike", "bicycle", "fahrrad", "rad"], Icon: Bike },
  { keywords: ["plane", "flight", "flug", "flugzeug", "airport", "flughafen", "fly", "fliegen", "reise", "travel"], Icon: Plane },
  { keywords: ["ticket", "fahrkarte", "pass", "passport", "ausweis"], Icon: Ticket },
  { keywords: ["map", "city", "stadt", "place", "ort", "address", "adresse", "location", "here", "hier", "there", "dort", "direction"], Icon: MapPin },
  { keywords: ["world", "welt", "country", "land", "earth", "erde", "language", "sprache", "deutschland", "germany", "international"], Icon: Globe },
  { keywords: ["compass", "north", "south", "east", "west", "norden", "süden", "osten", "westen", "orient"], Icon: Compass },
  { keywords: ["house", "haus", "home", "wohnung", "apartment", "zimmer", "room", "door", "tür", "window", "fenster", "wall", "wand", "roof"], Icon: Home },
  { keywords: ["bed", "bett", "sleep", "schlafen", "dream", "traum", "hotel", "night", "nacht", "tired", "müde"], Icon: Bed },
  { keywords: ["bath", "bad", "shower", "dusche", "wash", "waschen", "clean", "sauber"], Icon: Bath },
  { keywords: ["key", "schlüssel", "lock", "schloss", "open", "öffnen"], Icon: Key },
  { keywords: ["building", "gebäude", "office", "büro", "bank", "company", "firma", "hospital", "krankenhaus", "hotel"], Icon: Building2 },
  { keywords: ["work", "arbeit", "job", "beruf", "career", "karriere", "meeting", "termin", "chef", "boss", "colleague"], Icon: Briefcase },
  { keywords: ["school", "schule", "university", "universität", "studium", "study", "lernen", "learn", "exam", "prüfung", "teacher", "lehrer", "student"], Icon: GraduationCap },
  { keywords: ["book", "buch", "read", "lesen", "story", "geschichte", "library", "bibliothek", "page", "seite", "word", "wort"], Icon: BookOpen },
  { keywords: ["write", "schreiben", "pen", "stift", "note", "notiz", "draw", "zeichnen", "sign", "unterschreiben"], Icon: PenTool },
  { keywords: ["document", "dokument", "paper", "papier", "letter", "brief", "form", "formular", "contract", "vertrag", "text"], Icon: FileText },
  { keywords: ["computer", "laptop", "pc", "internet", "online", "digital", "software", "screen", "bildschirm", "keyboard"], Icon: Laptop },
  { keywords: ["phone", "telefon", "handy", "call", "anrufen", "nummer", "number", "mobile"], Icon: Phone },
  { keywords: ["mail", "email", "e-mail", "message", "nachricht", "post"], Icon: Mail },
  { keywords: ["talk", "speak", "sprechen", "say", "sagen", "ask", "fragen", "answer", "antwort", "conversation", "gespräch", "dialog"], Icon: MessageCircle },
  { keywords: ["voice", "stimme", "pronounce", "aussprache", "mic", "podcast"], Icon: Mic },
  { keywords: ["music", "musik", "song", "lied", "sing", "singen", "concert", "konzert", "guitar", "piano"], Icon: Music },
  { keywords: ["film", "movie", "kino", "cinema", "theater"], Icon: Film },
  { keywords: ["tv", "fernsehen", "television", "show", "video"], Icon: Tv },
  { keywords: ["photo", "foto", "camera", "kamera", "picture", "bild"], Icon: Camera },
  { keywords: ["art", "kunst", "color", "farbe", "paint", "malen", "design"], Icon: Palette },
  { keywords: ["heart", "herz", "love", "liebe", "feel", "gefühl", "emotion", "like", "mögen"], Icon: Heart },
  { keywords: ["happy", "glücklich", "smile", "lächeln", "laugh", "lachen", "friend", "freund", "joy", "freude"], Icon: Smile },
  { keywords: ["family", "familie", "people", "leute", "menschen", "person", "group", "gruppe", "team", "eltern", "parents"], Icon: Users },
  { keywords: ["baby", "child", "kind", "kinder", "kid", "boy", "girl"], Icon: Baby },
  { keywords: ["health", "gesundheit", "doctor", "arzt", "ärztin", "medicine", "medizin", "sick", "krank", "pain", "schmerz", "body", "körper"], Icon: Stethoscope },
  { keywords: ["sport", "fitness", "gym", "training", "exercise", "übung", "run", "laufen", "strong", "stark"], Icon: Dumbbell },
  { keywords: ["money", "geld", "euro", "pay", "bezahlen", "price", "preis", "cost", "kosten", "bill", "rechnung", "salary", "gehalt"], Icon: Banknote },
  { keywords: ["card", "karte", "credit", "kredit", "konto", "account"], Icon: CreditCard },
  { keywords: ["wallet", "geldbörse", "portemonnaie", "cash", "bargeld"], Icon: Wallet },
  { keywords: ["shop", "einkaufen", "buy", "kaufen", "store", "laden", "geschäft", "market", "markt", "supermarkt"], Icon: ShoppingCart },
  { keywords: ["bag", "tasche", "gift", "present", "package", "paket"], Icon: ShoppingBag },
  { keywords: ["clothes", "kleidung", "shirt", "hemd", "kleid", "dress", "jacket", "jacke", "wear", "tragen", "fashion", "mode"], Icon: Shirt },
  { keywords: ["gift", "geschenk", "birthday", "geburtstag", "party", "feiern", "celebrate"], Icon: Gift },
  { keywords: ["time", "zeit", "hour", "stunde", "minute", "clock", "uhr", "late", "spät", "early", "früh", "now", "jetzt", "wait", "warten"], Icon: Clock },
  { keywords: ["watch", "armbanduhr", "alarm", "wecker"], Icon: Watch },
  { keywords: ["day", "tag", "week", "woche", "month", "monat", "year", "jahr", "today", "heute", "tomorrow", "morgen", "yesterday", "gestern", "date", "datum"], Icon: Calendar },
  { keywords: ["sun", "sonne", "summer", "sommer", "warm", "hot", "heiß", "light", "licht", "morning", "bright", "hell"], Icon: Sun },
  { keywords: ["moon", "mond", "evening", "abend", "dark", "dunkel", "star", "stern"], Icon: Moon },
  { keywords: ["rain", "regen", "weather", "wetter", "cloud", "wolke", "storm", "sturm"], Icon: CloudRain },
  { keywords: ["umbrella", "regenschirm", "protect", "schutz"], Icon: Umbrella },
  { keywords: ["snow", "schnee", "winter", "cold", "kalt", "ice", "eis", "freeze"], Icon: Snowflake },
  { keywords: ["fire", "feuer", "burn", "brennen", "energy", "energie", "fast", "schnell"], Icon: Flame },
  { keywords: ["tree", "baum", "forest", "wald", "nature", "natur", "park", "wood", "holz"], Icon: TreePine },
  { keywords: ["flower", "blume", "garden", "garten", "plant", "pflanze"], Icon: Flower2 },
  { keywords: ["leaf", "blatt", "green", "grün", "environment", "umwelt", "bio"], Icon: Leaf },
  { keywords: ["dog", "hund", "cat", "katze", "animal", "tier", "pet"], Icon: Dog },
  { keywords: ["eye", "auge", "see", "sehen", "look", "schauen", "view", "blick"], Icon: Eye },
  { keywords: ["law", "gesetz", "recht", "right", "rule", "regel", "judge", "justice", "police", "polizei"], Icon: Scale },
  { keywords: ["safe", "sicher", "security", "sicherheit", "shield", "police"], Icon: Shield },
  { keywords: ["tool", "werkzeug", "repair", "reparieren", "fix", "build", "bauen", "machine", "maschine"], Icon: Wrench },
  { keywords: ["win", "gewinnen", "prize", "preis", "success", "erfolg", "best", "beste", "goal", "ziel"], Icon: Award }
];

function resolveWatermarkIcon(source: VocabularyItem | string): LucideIcon {
  const haystack = (
    typeof source === "string"
      ? source
      : `${source.german} ${source.english} ${source.topic} ${source.chapter ?? ""}`
  ).toLowerCase();
  for (const rule of WATERMARK_RULES) {
    if (rule.keywords.some((kw) => haystack.includes(kw))) {
      return rule.Icon;
    }
  }
  return Sparkles;
}

interface WordWatermarkProps {
  word?: VocabularyItem;
  text?: string;
  accentColor: string;
  isDark: boolean;
}

/**
 * Renders a subtle, tilted 3D-glass watermark illustration matched to the word's or card's meaning/topic.
 */
export const WordWatermark: React.FC<WordWatermarkProps> = ({
  word,
  text,
  accentColor,
  isDark
}) => {
  const WatermarkIcon = useMemo(
    () => resolveWatermarkIcon(word ?? text ?? ""),
    [word, text]
  );

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        right: -12,
        bottom: 42,
        width: 170,
        height: 170,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ rotateZ: "-12deg" }],
        opacity: isDark ? 0.11 : 0.085
      }}
    >
      {/* Subtle circular seal behind the watermark icon */}
      <View
        style={{
          position: "absolute",
          width: 146,
          height: 146,
          borderRadius: 73,
          borderWidth: 2,
          borderColor: accentColor,
          backgroundColor: accentColor,
          opacity: 0.16
        }}
      />
      <WatermarkIcon size={108} color={accentColor} strokeWidth={1.6} />
    </View>
  );
};
