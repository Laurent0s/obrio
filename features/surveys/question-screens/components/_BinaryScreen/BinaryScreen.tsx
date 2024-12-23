"use client";

import { FC } from "react";
import { BinaryParams } from "@/types/question";
import { ButtonGroup, ButtonGroupEvent } from "@/components";
import { useDynamicTextTemplates } from "@/features/surveys/engine/hooks";

import { ScreenProps } from "../types";
import { ScreenLayout } from "../_ScreenLayout";
import { ScreenHeading } from "../_ScreenHeading";
import { binaryOptions } from "./config";

export const BinaryScreen: FC<ScreenProps<BinaryParams>> = ({
  onSubmit,
  params,
}) => {
  const { hydrateText } = useDynamicTextTemplates();
  const [title, description] = hydrateText(params.title, params.description);

  const handleElementClick = (e: ButtonGroupEvent) => {
    onSubmit({ value: e.value === "true", label: e.label });
  };

  return (
    <ScreenLayout>
      <ScreenHeading title={title} description={description} />
      <ButtonGroup
        options={binaryOptions}
        onElementClick={handleElementClick}
      />
    </ScreenLayout>
  );
};
