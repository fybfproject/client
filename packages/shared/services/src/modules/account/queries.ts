import useSWR from 'swr';

import { apiClient } from "../../client";

export interface GetAccountResponse {}

export const getAccountService = async (
  token: string
) =>
  apiClient<unknown, GetAccountResponse>({
    url: "/account",
    method: "GET",
    token
  });

export const useAccountQuery = (token: string) => useSWR('api:account', () => getAccountService(token))