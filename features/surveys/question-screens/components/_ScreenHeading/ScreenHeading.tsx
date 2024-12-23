import { FC } from "react";
import classNames from "classnames";

import classes from "./ScreenHeading.module.scss";
import { Paragraph, Title } from "@/components";

interface ScreenHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export const ScreenHeading: FC<ScreenHeadingProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={classNames(className, classes["screen-heading"])}>
      <Title level={1}>{title}</Title>
      {description && (
        <Paragraph>
          <strong>{description}</strong>
        </Paragraph>
      )}
    </div>
  );
};
