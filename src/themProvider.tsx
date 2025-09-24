"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ThemeContextType {
  color: string;
  changeColor: (newColor: string) => void;
}
const Context = createContext<ThemeContextType | undefined>(undefined);

export function ThemProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<string>("blue");

  const changeColor = (newColor: string) => {
    setColor(newColor);
  };
  return (
    <>
      <Context.Provider value={{ color, changeColor }}>
        {children}
      </Context.Provider>
    </>
  );
}

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
