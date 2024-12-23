import { Column } from "./types";

export const getTitleRowData = (columns: Column[]) => {
  const record: { [key: string]: string; key: string } = {
    key: "#title-row",
  };

  for (const { name, title } of columns) {
    record[name] = title ?? name;
  }

  return record;
};
