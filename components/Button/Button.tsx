"use client";

import { FC, MouseEvent } from "react";
import classNames from "classnames";
import { ButtonType, HTMLButtonAttributes } from "./types";
import classes from "./Button.module.scss";

export type ButtonMouseEvent = MouseEvent<HTMLButtonElement>;

export interface ButtonProps extends Omit<HTMLButtonAttributes, "type"> {
  type?: ButtonType;
  htmlType?: HTMLButtonAttributes["type"];
  label?: string;
}

export const Button: FC<ButtonProps> = ({
  type = ButtonType.PRIMARY,
  htmlType,
  label,
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      type={htmlType}
      className={classNames(className, classes.button, {
        [classes["button--primary"]]: type === ButtonType.PRIMARY,
        [classes["button--transparent"]]: type === ButtonType.TRANSPARENT,
      })}
    >
      {label}
      {children}
    </button>
  );
};
