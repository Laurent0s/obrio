"use client";

import { useRouter } from "next/navigation";
import { NavigationBar } from "@/components/NavigationBar";
import { FC } from "react";

interface NavigationProps {
  className?: string;
  showBtn: boolean;
}

export const Navigation: FC<NavigationProps> = ({ className, showBtn }) => {
  const router = useRouter();

  const handlePrevious = () => {
    router.back();
  };

  return (
    <nav>
      <NavigationBar
        onPrevious={handlePrevious}
        className={className}
        showBtn={showBtn}
      />
    </nav>
  );
};
