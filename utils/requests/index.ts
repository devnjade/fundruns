import axios, { AxiosResponse } from 'axios';
import { IBanks, IResponse } from 'utils/types';
import { apiUrl, flwSecretKey } from 'utils/variables';

export const getBanks = async (): Promise<IBanks> => {
  const { data }: AxiosResponse<IResponse<IBanks>> = await axios.get(`${apiUrl}/banks/NG`, {
    headers: {
      'Authorization': `Bearer ${flwSecretKey}`
    }
  });
  return data.data;
}