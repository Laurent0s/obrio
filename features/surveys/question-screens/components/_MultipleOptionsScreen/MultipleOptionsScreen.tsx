"use client";

import { FC } from "react";
import { MultipleOptionsParams } from "@/types/questions";
import { ButtonGroup } from "@/components";
import { useDynamicTextTemplates } from "@/features/surveys/engine/hooks";

import { ScreenProps } from "../types";
import { ScreenLayout } from "../_ScreenLayout";
import { ScreenHeading } from "../_ScreenHeading";

export const MultipleOptionsScreen: FC<ScreenProps<MultipleOptionsParams>> = ({
  onSubmit,
  params,
}) => {
  const { hydrateText } = useDynamicTextTemplates();
  const [title, description, options] = hydrateText(
    params.title,
    params.description,
    params.options,
  );

  return (
    <ScreenLayout>
      <ScreenHeading title={title} description={description} />
      <ButtonGroup options={options} onElementClick={onSubmit} />
    </ScreenLayout>
  );
};
