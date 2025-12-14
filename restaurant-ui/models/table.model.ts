export const TABLE_STATUS = ['available', 'occupied'] as const;

export type TableStatus = (typeof TABLE_STATUS)[number];

export interface ITable {
  _id: string;
  value: string | number;
  label: string;
  status: TableStatus;
}
