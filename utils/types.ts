export interface IBanks {
  id: number;
  name: string;
  code: string;
}

export interface IResponse<T> {
  status: string,
  message: string,
  data: T,
}