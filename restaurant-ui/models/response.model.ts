export interface IResponse<T = unknown> {
  status: number;
  message: string;
  success?: boolean;
  data: T;
}

export interface IResponseError {
  status: number; // 3000, 4000, v.v.
  success?: boolean;
  message: string;
  data?: unknown;
}
