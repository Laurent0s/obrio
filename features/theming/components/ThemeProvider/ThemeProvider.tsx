"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { Theme } from "../../types";
import { ThemeContext } from "./context";

export const ThemeProvider: FC<{ children: ReactNode; className?: string }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.setAttribute("id", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
