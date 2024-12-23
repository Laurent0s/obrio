import { FC, ReactNode } from "react";
import classes from "./ScreenLayout.module.scss";
import classNames from "classnames";

interface ScreenLayout {
  className?: string;
  children?: ReactNode;
}

export const ScreenLayout: FC<ScreenLayout> = ({ className, children }) => {
  return (
    <div className={classNames(className, classes["screen-layout"])}>
      {children}
    </div>
  );
};
