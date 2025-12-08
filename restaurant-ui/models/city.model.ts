export interface ICity {
  _id?: string;
  label: string;
  value: string;
}

export interface ICityResponse {
  status: number;
  data: ICity[];
}
