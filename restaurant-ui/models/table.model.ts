export const TABLE_STATUS = ['available', 'occupied'] as const;

export type TableStatus = (typeof TABLE_STATUS)[number];

export interface ITable {
  value: string | number;
  label: string;
  status: TableStatus;
}

export type UpdateStatusParam = {
  value: string | number;
  status: TableStatus;
};
