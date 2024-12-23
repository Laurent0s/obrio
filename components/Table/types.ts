export interface Column {
  name: string;
  title?: string;
}

export type ColumnNames<T extends Column[]> = T[number]["name"];

interface BaseRecord {
  key: string;
}

export type TableRecord<T extends Column[]> = BaseRecord & {
  [key in ColumnNames<T>]: string;
};
