import axios, { AxiosResponse } from 'axios';
import { 
  IBanks, 
  IInitTransferBody, 
  IInitTransferResponse, 
  IResponse, 
  ITransferRecpBody, 
  ITransferRecpResponse, 
  IVerifyAccount 
} from 'utils/types';
import { pskSecretKey } from 'utils/variables';

export const getBanks = async (): Promise<IBanks> => {
  const { data }: AxiosResponse<IResponse<IBanks>> = await axios.get('https://api.paystack.co/bank?currency=NGN&country=nigeria', {
    headers: {
      Authorization: `Bearer ${pskSecretKey}`
    }
  });
  return data.data;
}

export const verifyAccount = async (
  account_number: string,
  bank_code: number | null,
): Promise<IVerifyAccount> => {
  const { data }: AxiosResponse<IResponse<IVerifyAccount>> = await axios.get(`https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`, {
    headers: {
      Authorization: `Bearer ${pskSecretKey}`
    }
  });
  return data.data;
}

export const transferRecp = async (req: ITransferRecpBody): Promise<ITransferRecpResponse> => {
  const { data }: AxiosResponse<IResponse<ITransferRecpResponse>> = await axios.post('https://api.paystack.co/transferrecipient', {
    ...req,
  },{
    headers: {
      Authorization: `Bearer ${pskSecretKey}`
    }
  });
  return data.data;
}

export const initTransfer = async (req: IInitTransferBody): Promise<IInitTransferResponse> => {
  const { data }: AxiosResponse<IResponse<IInitTransferResponse>> = await axios.post('https://api.paystack.co/transfer', {
    ...req,
  },{
    headers: {
      Authorization: `Bearer ${pskSecretKey}`
    }
  });
  return data.data;
}