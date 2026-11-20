import { LessonUnit } from "../types";

export const LESSON_UNITS: LessonUnit[] = [
  // ===================== A1 =====================
  {
    id: "a1-unit-1",
    level: "A1",
    unitNumber: 1,
    titleDe: "Begrüßung & Erste Kontakte in Frankfurt",
    titleEn: "Greetings & First Contacts in Frankfurt",
    titleBn: "ফ্রাঙ্কফুর্টে অভিবাদন ও প্রথম পরিচয়",
    descriptionEn:
      "Introduce yourself, greet people politely, and learn essential everyday nouns with gender articles.",
    descriptionBn:
      "নিজের পরিচয় দিন, ভদ্রভাবে অভিবাদন জানান এবং লিঙ্গভিত্তিক আর্টিকেলসহ প্রতিদিনের জরুরি বিশেষ্য শিখুন।",
    xpReward: 20,
    keyNouns: [
      {
        article: "der",
        noun: "Bahnhof",
        plural: "die Bahnhöfe",
        en: "train station",
        bn: "রেলস্টেশন"
      },
      {
        article: "die",
        noun: "Sprache",
        plural: "die Sprachen",
        en: "language",
        bn: "ভাষা"
      },
      {
        article: "das",
        noun: "Buch",
        plural: "die Bücher",
        en: "book",
        bn: "বই"
      }
    ],
    exercises: [
      {
        id: "a1-u1-ex1",
        type: "listening",
        promptDe: "Guten Morgen! Ich heiße Rayhan und komme aus Bangladesch.",
        promptEn: "Good morning! My name is Rayhan and I come from Bangladesh.",
        promptBn: "শুভ সকাল! আমার নাম রায়হান এবং আমি বাংলাদেশ থেকে এসেছি।",
        options: [
          "Good morning! My name is Rayhan and I come from Bangladesh.",
          "Good evening! I live at the train station in Berlin.",
          "Hello! Do you speak German and English?",
          "Good night! Where is the nearest airport?"
        ],
        correctAnswer:
          "Good morning! My name is Rayhan and I come from Bangladesh.",
        tipEn: "'Ich heiße...' means 'I am called / My name is...'.",
        tipBn: "'Ich heiße...' অর্থ 'আমার নাম...' এবং 'komme aus' অর্থ 'থেকে এসেছি'।"
      },
      {
        id: "a1-u1-ex2",
        type: "article_match",
        promptDe: "Bahnhof",
        promptEn: "Select the correct article for 'Bahnhof' (train station)",
        promptBn: "'Bahnhof' (রেলস্টেশন) শব্দের সঠিক আর্টিকেল নির্বাচন করুন",
        noun: "Bahnhof",
        plural: "die Bahnhöfe",
        article: "der",
        options: ["der", "die", "das"],
        correctAnswer: "der",
        tipEn: "der Bahnhof is masculine (Blue #2563EB).",
        tipBn: "der Bahnhof হলো পুংলিঙ্গ (Masculine - নীল রঙ #2563EB)।"
      },
      {
        id: "a1-u1-ex3",
        type: "sentence_builder",
        promptDe: "Ich lerne jeden Tag Deutsch.",
        promptEn: "I learn German every day.",
        promptBn: "আমি প্রতিদিন জার্মান শিখি।",
        wordBank: ["Tag", "lerne", "Ich", "Deutsch.", "jeden"],
        correctAnswer: "Ich lerne jeden Tag Deutsch.",
        tipEn: "Remember the V2 rule: the conjugated verb 'lerne' stays in position 2.",
        tipBn: "জার্মান V2 নিয়ম মনে রাখুন: ক্রিয়াপদ 'lerne' সবসময় বাক্যের দ্বিতীয় স্থানে থাকে।"
      },
      {
        id: "a1-u1-ex4",
        type: "speaking",
        promptDe: "Guten Tag, ich lerne Deutsch in Frankfurt.",
        promptEn: "Good day, I am learning German in Frankfurt.",
        promptBn: "শুভ দিন, আমি ফ্রাঙ্কফুর্টে জার্মান শিখছি।",
        correctAnswer: "Guten Tag, ich lerne Deutsch in Frankfurt.",
        tipEn: "Pronounce 'ch' in 'ich' softly from the front palate.",
        tipBn: "'ich' শব্দের 'ch' তালুর সামনের অংশ থেকে নরমভাবে উচ্চারণ করুন।"
      }
    ]
  },
  {
    id: "a1-unit-2",
    level: "A1",
    unitNumber: 2,
    titleDe: "Im Café & Beim Einkaufen",
    titleEn: "At the Café & Shopping",
    titleBn: "ক্যাফেতে এবং কেনাকাটায়",
    descriptionEn:
      "Order coffee and bread, ask for prices, and master accusative articles.",
    descriptionBn:
      "কফি ও রুটি অর্ডার করুন, দাম জিজ্ঞেস করুন এবং আকুসাটিভ আর্টিকেল আয়ত্ত করুন।",
    xpReward: 20,
    keyNouns: [
      {
        article: "der",
        noun: "Kaffee",
        plural: "die Kaffees",
        en: "coffee",
        bn: "কফি"
      },
      {
        article: "die",
        noun: "Rechnung",
        plural: "die Rechnungen",
        en: "bill / invoice",
        bn: "বিল / রশিদ"
      },
      {
        article: "das",
        noun: "Brot",
        plural: "die Brote",
        en: "bread",
        bn: "রুটি"
      }
    ],
    exercises: [
      {
        id: "a1-u2-ex1",
        type: "article_match",
        promptDe: "Brot",
        promptEn: "Choose the gender article for 'Brot' (bread)",
        promptBn: "'Brot' (রুটি) শব্দের সঠিক আর্টিকেল বেছে নিন",
        noun: "Brot",
        plural: "die Brote",
        article: "das",
        options: ["der", "die", "das"],
        correctAnswer: "das",
        tipEn: "das Brot is neuter (Green #16A34A).",
        tipBn: "das Brot হলো ক্লীবলিঙ্গ (Neuter - সবুজ রঙ #16A34A)।"
      },
      {
        id: "a1-u2-ex2",
        type: "sentence_builder",
        promptDe: "Ich möchte bitte einen Kaffee trinken.",
        promptEn: "I would like to drink a coffee, please.",
        promptBn: "আমি দয়া করে এক কাপ কফি পান করতে চাই।",
        wordBank: ["einen", "möchte", "Ich", "trinken.", "Kaffee", "bitte"],
        correctAnswer: "Ich möchte bitte einen Kaffee trinken.",
        tipEn: "With modal verb 'möchte', the infinitive 'trinken' goes to the very end!",
        tipBn: "মোডাল ভার্ব 'möchte' থাকলে মূল ক্রিয়া 'trinken' বাক্যের একদম শেষে বসে (বাংলা বাক্যের মতোই)!"
      },
      {
        id: "a1-u2-ex3",
        type: "speaking",
        promptDe: "Die Rechnung bitte, ich zahle mit Karte.",
        promptEn: "The bill please, I am paying by card.",
        promptBn: "বিলটা দিন দয়া করে, আমি কার্ডে পেমেন্ট করব।",
        correctAnswer: "Die Rechnung bitte, ich zahle mit Karte.",
        tipEn: "Stress the first syllable of 'Rechnung' and 'Karte'.",
        tipBn: "'Rechnung' এবং 'Karte' শব্দের প্রথম সিলেবলে জোর দিন।"
      }
    ]
  },

  // ===================== A2 =====================
  {
    id: "a2-unit-1",
    level: "A2",
    unitNumber: 1,
    titleDe: "Arztbesuch & Gesundheit",
    titleEn: "Doctor's Appointment & Health",
    titleBn: "ডাক্তারের অ্যাপয়েন্টমেন্ট ও স্বাস্থ্য",
    descriptionEn:
      "Make appointments, describe symptoms, and use modal verbs and Perfekt tense.",
    descriptionBn:
      "ডাক্তারের অ্যাপয়েন্টমেন্ট নিন, শারীরিক উপসর্গ বর্ণনা করুন এবং Perfekt কাল ব্যবহার করুন।",
    xpReward: 25,
    keyNouns: [
      {
        article: "der",
        noun: "Termin",
        plural: "die Termine",
        en: "appointment",
        bn: "অ্যাপয়েন্টমেন্ট / নির্ধারিত সময়"
      },
      {
        article: "die",
        noun: "Apotheke",
        plural: "die Apotheken",
        en: "pharmacy",
        bn: "ফার্মেসি / ওষুধের দোকান"
      },
      {
        article: "das",
        noun: "Rezept",
        plural: "die Rezepte",
        en: "prescription",
        bn: "প্রেসক্রিপশন / ব্যবস্থাপত্র"
      }
    ],
    exercises: [
      {
        id: "a2-u1-ex1",
        type: "listening",
        promptDe: "Ich brauche dringend einen Termin beim Arzt.",
        promptEn: "I urgently need an appointment with the doctor.",
        promptBn: "আমার জরুরিভাবে ডাক্তারের সাথে একটি অ্যাপয়েন্টমেন্ট প্রয়োজন।",
        options: [
          "I urgently need an appointment with the doctor.",
          "I bought medicine at the pharmacy yesterday.",
          "The doctor is on vacation next week.",
          "Please take this tablet after breakfast."
        ],
        correctAnswer: "I urgently need an appointment with the doctor.",
        tipEn: "'dringend' means urgently; 'beim' = bei + dem (Dative).",
        tipBn: "'dringend' অর্থ জরুরিভাবে; 'beim' = bei + dem (Dative)।"
      },
      {
        id: "a2-u1-ex2",
        type: "article_match",
        promptDe: "Apotheke",
        promptEn: "Choose the correct article for 'Apotheke' (pharmacy)",
        promptBn: "'Apotheke' (ফার্মেসি) শব্দের সঠিক আর্টিকেল নির্বাচন করুন",
        noun: "Apotheke",
        plural: "die Apotheken",
        article: "die",
        options: ["der", "die", "das"],
        correctAnswer: "die",
        tipEn: "Most nouns ending in -e like 'die Apotheke' are feminine (Red #DC2626).",
        tipBn: "'-e' দিয়ে শেষ হওয়া অধিকাংশ বিশেষ্য যেমন 'die Apotheke' স্ত্রীলিঙ্গ (Feminine - লাল #DC2626)।"
      },
      {
        id: "a2-u1-ex3",
        type: "sentence_builder",
        promptDe: "Gestern habe ich lange im Büro gearbeitet.",
        promptEn: "Yesterday I worked for a long time in the office.",
        promptBn: "গতকাল আমি অফিসে দীর্ঘ সময় কাজ করেছি।",
        wordBank: ["habe", "Gestern", "gearbeitet.", "ich", "im", "Büro", "lange"],
        correctAnswer: "Gestern habe ich lange im Büro gearbeitet.",
        tipEn: "In Perfekt tense, 'habe' stays at position 2 and 'gearbeitet' goes to the end.",
        tipBn: "Perfekt কালে সাহায্যকারী ক্রিয়া 'habe' ২য় স্থানে থাকে এবং 'gearbeitet' বাক্যের শেষে যায়।"
      },
      {
        id: "a2-u1-ex4",
        type: "speaking",
        promptDe: "Ich habe heute leider Kopfschmerzen und Fieber.",
        promptEn: "Unfortunately I have a headache and fever today.",
        promptBn: "দুর্ভাগ্যবশত আজ আমার মাথাব্যথা এবং জ্বর আছে।",
        correctAnswer: "Ich habe heute leider Kopfschmerzen und Fieber.",
        tipEn: "Articulate 'Kopfschmerzen' clearly as two parts: Kopf + schmerzen.",
        tipBn: "'Kopfschmerzen' শব্দটি দুটি অংশে স্পষ্টভাবে উচ্চারণ করুন: Kopf + schmerzen।"
      }
    ]
  },

  // ===================== B1 =====================
  {
    id: "b1-unit-1",
    level: "B1",
    unitNumber: 1,
    titleDe: "Wohnungssuche & Bürgeramt",
    titleEn: "Apartment Hunting & City Registration",
    titleBn: "বাসা খোঁজা ও সিটি রেজিস্ট্রেশন (Bürgeramt)",
    descriptionEn:
      "Navigate rental contracts, subordinate clauses with 'weil' and 'dass', and German bureaucracy.",
    descriptionBn:
      "বাসা ভাড়ার চুক্তি, 'weil' ও 'dass' যুক্ত অধীন বাক্য এবং জার্মান দাপ্তরিক কাজ পরিচালনা করুন।",
    xpReward: 30,
    keyNouns: [
      {
        article: "der",
        noun: "Mietvertrag",
        plural: "die Mietverträge",
        en: "rental contract",
        bn: "বাসা ভাড়ার চুক্তিপত্র"
      },
      {
        article: "die",
        noun: "Anmeldung",
        plural: "die Anmeldungen",
        en: "city registration",
        bn: "নিবন্ধন / আনমেলডুং"
      },
      {
        article: "das",
        noun: "Bürgeramt",
        plural: "die Bürgerämter",
        en: "citizens' registration office",
        bn: "নাগরিক নিবন্ধন অফিস"
      }
    ],
    exercises: [
      {
        id: "b1-u1-ex1",
        type: "article_match",
        promptDe: "Mietvertrag",
        promptEn: "Select the gender article for 'Mietvertrag' (rental contract)",
        promptBn: "'Mietvertrag' (ভাড়ার চুক্তিপত্র) শব্দের সঠিক আর্টিকেল নির্বাচন করুন",
        noun: "Mietvertrag",
        plural: "die Mietverträge",
        article: "der",
        options: ["der", "die", "das"],
        correctAnswer: "der",
        tipEn: "Compound nouns take the gender of their last word: der Vertrag -> der Mietvertrag.",
        tipBn: "যৌগিক বিশেষ্য শেষ শব্দের লিঙ্গ গ্রহণ করে: der Vertrag -> der Mietvertrag।"
      },
      {
        id: "b1-u1-ex2",
        type: "sentence_builder",
        promptDe: "Ich ziehe nach Frankfurt, weil ich dort studiere.",
        promptEn: "I am moving to Frankfurt because I study there.",
        promptBn: "আমি ফ্রাঙ্কফুর্টে যাচ্ছি, কারণ আমি সেখানে পড়াশোনা করি।",
        wordBank: [
          "weil",
          "Ich",
          "nach",
          "Frankfurt,",
          "ziehe",
          "studiere.",
          "ich",
          "dort"
        ],
        correctAnswer: "Ich ziehe nach Frankfurt, weil ich dort studiere.",
        tipEn: "'weil' sends the conjugated verb ('studiere') to the end of the clause.",
        tipBn: "'weil' যুক্ত অধীন বাক্যে সমাপিকা ক্রিয়া ('studiere') বাক্যের একদম শেষে চলে যায়।"
      },
      {
        id: "b1-u1-ex3",
        type: "speaking",
        promptDe: "Ich habe den Mietvertrag gestern unterschrieben.",
        promptEn: "I signed the rental contract yesterday.",
        promptBn: "আমি গতকাল বাসা ভাড়ার চুক্তিপত্রে স্বাক্ষর করেছি।",
        correctAnswer: "Ich habe den Mietvertrag gestern unterschrieben.",
        tipEn: "Inseparable prefix 'unter-' in 'unterschrieben' takes no 'ge-'.",
        tipBn: "'unterschrieben' শব্দে অবিচ্ছেদ্য উপসর্গ 'unter-' থাকায় কোনো 'ge-' যুক্ত হয় না।"
      }
    ]
  },

  // ===================== B2 =====================
  {
    id: "b2-unit-1",
    level: "B2",
    unitNumber: 1,
    titleDe: "IT-Bewerbung & Vorstellungsgespräch",
    titleEn: "IT Job Application & Interview",
    titleBn: "আইটি চাকরির আবেদন ও ইন্টারভিউ",
    descriptionEn:
      "Communicate professionally in German tech interviews using Konjunktiv II, passive voice, and two-part connectors.",
    descriptionBn:
      "জার্মান টেক ইন্টারভিউতে Konjunktiv II, বাচ্য (Passiv) এবং যৌগিক সংযোজক ব্যবহার করে পেশাদারভাবে কথা বলুন।",
    xpReward: 35,
    keyNouns: [
      {
        article: "der",
        noun: "Lebenslauf",
        plural: "die Lebensläufe",
        en: "CV / resume",
        bn: "জীবনবৃত্তান্ত / সিভি"
      },
      {
        article: "die",
        noun: "Erfahrung",
        plural: "die Erfahrungen",
        en: "experience",
        bn: "অভিজ্ঞতা"
      },
      {
        article: "das",
        noun: "Vorstellungsgespräch",
        plural: "die Vorstellungsgespräche",
        en: "job interview",
        bn: "চাকরির সাক্ষাৎকার"
      }
    ],
    exercises: [
      {
        id: "b2-u1-ex1",
        type: "listening",
        promptDe:
          "Obwohl die Aufgabe komplex war, konnten wir das Projekt rechtzeitig abschließen.",
        promptEn:
          "Although the task was complex, we were able to complete the project on time.",
        promptBn:
          "যদিও কাজটি জটিল ছিল, আমরা সময়মতো প্রজেক্টটি সম্পন্ন করতে পেরেছিলাম।",
        options: [
          "Although the task was complex, we were able to complete the project on time.",
          "Because the project was easy, we finished early.",
          "We need more developers to start the software project.",
          "The client postponed the meeting until Friday."
        ],
        correctAnswer:
          "Although the task was complex, we were able to complete the project on time.",
        tipEn: "After a subordinate clause starting with 'Obwohl...', the main clause starts immediately with the verb ('konnten').",
        tipBn: "'Obwohl...' দিয়ে শুরু হওয়া খণ্ডবাক্যের পর মূল বাক্যটি সরাসরি ক্রিয়া ('konnten') দিয়ে শুরু হয়।"
      },
      {
        id: "b2-u1-ex2",
        type: "sentence_builder",
        promptDe: "Die neue Software wird aktuell vom Team getestet.",
        promptEn: "The new software is currently being tested by the team.",
        promptBn: "নতুন সফটওয়্যারটি বর্তমানে টিম দ্বারা পরীক্ষিত হচ্ছে।",
        wordBank: [
          "wird",
          "Die",
          "neue",
          "Software",
          "vom",
          "getestet.",
          "aktuell",
          "Team"
        ],
        correctAnswer: "Die neue Software wird aktuell vom Team getestet.",
        tipEn: "Vorgangspassiv: werden (conjugated) + Partizip II at the end.",
        tipBn: "Vorgangspassiv গঠন: werden + বাক্যের শেষে Partizip II ('getestet')।"
      },
      {
        id: "b2-u1-ex3",
        type: "speaking",
        promptDe: "Ich verfüge über fundierte Kenntnisse in der Softwareentwicklung.",
        promptEn: "I possess sound knowledge in software development.",
        promptBn: "সফটওয়্যার ডেভেলপমেন্টে আমার গভীর জ্ঞান ও দক্ষতা রয়েছে।",
        correctAnswer:
          "Ich verfüge über fundierte Kenntnisse in der Softwareentwicklung.",
        tipEn: "'verfügen über + Akkusativ' is a high-value B2 verb-preposition collocation.",
        tipBn: "'verfügen über + Akkusativ' হলো ইন্টারভিউতে ব্যবহৃত অত্যন্ত মানসম্মত একটি B2 প্রকাশভঙ্গি।"
      }
    ]
  }
];
