"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CompareContextType {
  compareIds: string[];
  compareCount: number;
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Load initial compare state from localStorage client-side
  useEffect(() => {
    const stored = localStorage.getItem("compare_ids");
    if (stored) {
      try {
        setCompareIds(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse compare_ids", e);
      }
    }
  }, []);

  const addToCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 4) return prev; // limit to 4
      const next = [...prev, id];
      localStorage.setItem("compare_ids", JSON.stringify(next));
      return next;
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareIds((prev) => {
      const next = prev.filter((item) => item !== id);
      localStorage.setItem("compare_ids", JSON.stringify(next));
      return next;
    });
  };

  const clearCompare = () => {
    setCompareIds([]);
    localStorage.removeItem("compare_ids");
  };

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        compareCount: compareIds.length,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
