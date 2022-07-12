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

export interface ITransactionHistory {
  id?: number,
  name?: string,
  ref?: string,
  amount?: string,
  reason?: string
}

export interface ITransferRecpBody {
  type: string,
  bank_code: number | null,
  account_number: string,
  currency: string,
  name: string | null,
}

export interface ITransferRecpResponse {
  recipient_code: string,
  id: number,
}

export interface IInitTransferBody {
  source: string,
  amount: string,
  recipient: string,
  reason: string,
}

export interface IInitTransferResponse {
  reference: string,
  status: string,
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