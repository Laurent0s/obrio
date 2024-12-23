"use client";

import { MouseEvent } from "react";
import { Button, ButtonProps } from "@/components";
import { SurveyRouterParams, useSurveyRouter } from "../../hooks";

export const NextQuestionButton = ({
  onClick,
  children,
  routerProps = { isOuterPage: true },
  ...props
}: ButtonProps & { routerProps?: SurveyRouterParams }) => {
  const router = useSurveyRouter({
    ...routerProps,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    router.next(null);
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
};
