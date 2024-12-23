import { ReactElement } from "react";
import classNames from "classnames";

import { Column } from "./types";
import { TableRow } from "./TableRow";
import { getTitleRowData } from "./helpers";

import classes from "./Table.module.scss";

export interface TableProps<T extends { key: string }> {
  columns: Column[];
  data: T[];
  className?: string;
}

export const Table = <T extends { key: string }>({
  columns,
  data,
  className,
}: TableProps<T>): ReactElement => {
  const titleRowData = getTitleRowData(columns);

  return (
    <table className={classNames(className, classes["table"])}>
      <thead>
        <TableRow columns={columns} rowData={titleRowData} />
      </thead>
      <tbody>
        {data.map((record) => (
          <TableRow key={record.key} columns={columns} rowData={record} />
        ))}
      </tbody>
    </table>
  );
};
