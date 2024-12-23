"use client";

import { FC } from "react";
import { Result } from "@/types/answers";
import { Table } from "@/components";
import { useDynamicTextTemplates } from "@/features/surveys/engine/hooks";

import { columns } from "./config";

interface ResultRecord {
  key: string;
  questionText: string;
  answerText: string;
}

interface ResultsTableProps {
  data: Result[];
}

export const ResultsTable: FC<ResultsTableProps> = (props) => {
  const { hydrateText } = useDynamicTextTemplates();
  const [data] = hydrateText(props.data);

  const tableData = data.map(({ questionId, ...rest }) => ({
    key: questionId,
    ...rest,
  }));

  return <Table<ResultRecord> data={tableData} columns={columns} />;
};
