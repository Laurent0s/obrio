import { ReactElement, ReactNode } from "react";
import classNames from "classnames";

import { Column } from "./types";

import classes from "./Table.module.scss";

export interface TableRowProps<T extends { key: string }> {
  columns: Column[];
  rowData: T;
  titleRow?: boolean;
  className?: string;
}

export const TableRow = <T extends { key: string }>({
  columns,
  rowData,
  titleRow,
  className,
}: TableRowProps<T>): ReactElement => {
  const CellTag = titleRow ? "th" : "td";

  return (
    <tr className={classNames(className, classes["table-row"])}>
      {columns.map(({ name }) => {
        const cellData = rowData[name as keyof T];

        const renderCell = (cellData as ReactNode) ?? "";

        return <CellTag key={name}>{renderCell}</CellTag>;
      })}
    </tr>
  );
};
