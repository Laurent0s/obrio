import { ButtonHTMLAttributes } from "react";

export enum ButtonType {
  PRIMARY = "PRIMARY",
  TRANSPARENT = "TRANSPARENT",
}

export type HTMLButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
