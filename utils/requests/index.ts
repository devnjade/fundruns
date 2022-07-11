import axios, { AxiosResponse } from 'axios';
import { IBanks, IResponse, IVerifyAccount } from 'utils/types';
import { pskSecretKey } from 'utils/variables';

export const getBanks = async (): Promise<IBanks> => {
  const { data }: AxiosResponse<IResponse<IBanks>> = await axios.get('https://api.paystack.co/bank?currency=NGN', {
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