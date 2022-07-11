export interface IBanks {
  id: number,
  name: string,
  code: string,
  slug: string,
  type: string,
  currency: string,
  country: string,
  map?: any,
}

export interface IVerifyAccount {
  account_number: string,
  account_name: string,
  bank_id: number
}

export interface IVAProps {
  account_number?: string | number | null,
  bank_code?: string | number | null,
}

export interface IResponse<T> {
  status: string,
  message: string,
  data: T,
}

export interface IMeta {
  total: number,
  skipped: number,
  perPage: number,
  page: number,
  pageCount: number
}