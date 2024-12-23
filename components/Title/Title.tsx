import { FC, HTMLAttributes } from "react";
import classNames from "classnames";

import classes from "./Title.module.scss";

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  tip?: string;
}

export const Title: FC<TitleProps> = ({
  className,
  level,
  children,
  ...props
}) => {
  const Tag = `h${level}`;

  const attributes = {
    ...props,
    className: classNames(
      className,
      classes["title"],
      classes[`title--${level}`],
    ),
  };

  return (
    <>
      <Tag {...attributes}>{children}</Tag>
    </>
  );
};
