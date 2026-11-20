import React, { createContext, useCallback, useContext, useState } from "react";
import { PassageWordEntry, VocabularyItem } from "../types";
import {
  resolveWordDetails,
  WordDetailData
} from "../utils/wordTranslator";
import { WordDetailModal } from "../components/common/WordDetailModal";
import { playClickSound } from "../utils/soundEffects";

interface InspectContextOptions {
  level?: string;
  sentenceDe?: string;
  sentenceEn?: string;
  sentenceBn?: string;
}

interface WordInspectorContextValue {
  inspectWord: (
    input: string | VocabularyItem | PassageWordEntry,
    context?: InspectContextOptions
  ) => void;
  closeInspector: () => void;
}

const WordInspectorContext = createContext<
  WordInspectorContextValue | undefined
>(undefined);

export const WordInspectorProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [activeWordData, setActiveWordData] = useState<WordDetailData | null>(
    null
  );

  const inspectWord = useCallback(
    (
      input: string | VocabularyItem | PassageWordEntry,
      context?: InspectContextOptions
    ) => {
      playClickSound();
      const resolved = resolveWordDetails(input, context);
      if (!resolved.lemma) return;
      setActiveWordData(resolved);
    },
    []
  );

  const closeInspector = useCallback(() => {
    setActiveWordData(null);
  }, []);

  return (
    <WordInspectorContext.Provider value={{ inspectWord, closeInspector }}>
      {children}
      <WordDetailModal
        wordData={activeWordData}
        visible={!!activeWordData}
        onClose={closeInspector}
      />
    </WordInspectorContext.Provider>
  );
};

export const useWordInspector = (): WordInspectorContextValue => {
  const ctx = useContext(WordInspectorContext);
  if (!ctx) {
    throw new Error(
      "useWordInspector must be used within a WordInspectorProvider"
    );
  }
  return ctx;
};
