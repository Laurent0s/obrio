"use client";

import { useEffect } from "react";
import { Paragraph, Title } from "@/components";
import { NextQuestionButton } from "@/features/surveys/navigation";
import { useTheme } from "@/features/theming";

import classes from "./page.module.scss";

export default function AboutPage() {
  const { theme, setTheme } = useTheme();

  const isDarkTheme = theme === "dark";

  useEffect(() => {
    setTheme("dark");

    return () => {
      setTheme("light");
    };
  });

  if (!isDarkTheme) {
    return <div></div>;
  }

  return (
    <section className={classes["about-page"]}>
      <Title className={classes["about-page__title"]} level={1}>
        So how does it work?
      </Title>
      <Paragraph className={classes["about-page__description"]}>
        We analyze hundreds of data points to create your unique astrological
        blueprint. This is combined with AI to tailor-make your astrological
        insights, based on your answers. We’re going to change your relationship
        with astrology.
      </Paragraph>
      <NextQuestionButton
        className={classes["about-page__action-button"]}
        label="Next"
      />
    </section>
  );
}
