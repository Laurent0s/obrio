"use client";

import { Navigation } from "@/features/navigation";
import classes from "@/styles/rootLayout.module.scss";

export default function ResultsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showBtn = true;
  return (
    <>
      <header>
        <Navigation
          className={classes["root-layout__navigation"]}
          showBtn={showBtn}
        />
      </header>
      <main className={classes["root-layout__main"]}>{children}</main>
    </>
  );
}
