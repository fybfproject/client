import { apiClient } from "../../client";

export interface CreateAccountPayload {}
export interface CreateAccountResponse {}

export const createAccountService = async (
  payload: CreateAccountPayload,
  token: string
) =>
  apiClient<CreateAccountPayload, CreateAccountResponse>({
    url: "/account",
    method: "POST",
    data: payload,
    token
  });