"use client";

import { FC } from "react";
import classNames from "classnames";
import Image from "next/image";

import { useTheme } from "@/features/theming";
import { Button, ButtonType } from "../Button";
import { assetsPath } from "./config";

import classes from "./NavigationBar.module.scss";

export interface NavigationBarProps {
  className?: string;
  onPrevious?: () => void;
  showBtn: boolean;
}

export const NavigationBar: FC<NavigationBarProps> = ({
  className,
  onPrevious,
  showBtn,
}) => {
  const { theme } = useTheme();

  const assets = assetsPath[theme];

  return (
    <div className={classNames(className, classes["navigation-bar"])}>
      {showBtn && (
        <Button
          type={ButtonType.TRANSPARENT}
          onClick={onPrevious}
          className={classes["navigation-bar__go-back-button"]}
        >
          <Image alt="go-back" width={9} height={15} src={assets.arrowLeft} />
        </Button>
      )}
      <Image
        className={classes["navigation-bar__logo"]}
        alt="logo"
        width={15}
        height={16}
        src={assets.logo}
      />
    </div>
  );
};
