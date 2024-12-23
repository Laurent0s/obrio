"use client";

import { createContext } from "react";
import { ThemeContextType } from "@/features/theming/types";

export const ThemeContext = createContext<ThemeContextType | null>(null);
