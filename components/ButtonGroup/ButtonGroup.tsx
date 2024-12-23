"use client";

import { FC } from "react";
import classNames from "classnames";

import { Button, ButtonMouseEvent, ButtonProps } from "../Button";

import classes from "./ButtonGroup.module.scss";

interface ButtonGroupOption extends ButtonProps {
  name: string;
}

export interface ButtonGroupEvent {
  originalEvent: ButtonMouseEvent;
  value: ButtonProps["name"];
  label: string;
}

interface ButtonGroupProps {
  options: ButtonGroupOption[];
  className?: string;
  onElementClick?: (e: ButtonGroupEvent) => void;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
  className,
  options,
  onElementClick,
}) => {
  const handleOnElementClick = (e: ButtonMouseEvent) => {
    onElementClick?.({
      value: e.currentTarget.name,
      label: options.find(({ name }) => name === e.currentTarget.name)
        ?.label as string,
      originalEvent: e,
    });
  };

  return (
    <div className={classNames(className, classes["button-group"])}>
      {options.map(({ children, name, ...rest }) => (
        <Button onClick={handleOnElementClick} name={name} {...rest} key={name}>
          {children}
        </Button>
      ))}
    </div>
  );
};
