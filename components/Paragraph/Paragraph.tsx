import { FC, HTMLAttributes } from "react";

export const Paragraph: FC<HTMLAttributes<HTMLParagraphElement>> = ({ children, ...props }) => {
  return <p {...props}>{children}</p>;
};
