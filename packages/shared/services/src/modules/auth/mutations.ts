import { apiClient } from '../../client';

export type UserStatus = 'created' | 'invited' | 'confirmed' | 'blocked';

// Sign Up Service
export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  user: {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  };
}

export const signUpSevice = async (payload: SignUpPayload) =>
  apiClient<SignUpPayload, SignUpResponse>({
    url: '/auth/signup',
    method: 'POST',
    data: payload,
  });

// Login Service
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  refresh_token: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const loginService = async (payload: LoginPayload) =>
  apiClient<LoginPayload, LoginResponse>({
    url: '/auth/login',
    method: 'POST',
    data: payload,
  });

// Refresh Token Service
export interface RefreshTokenResponse {
  token: string;
}

export const refreshTokenService = async (token: string) =>
  apiClient<undefined, RefreshTokenResponse>({
    url: '/auth/refresh-token',
    method: 'GET',
    token,
  });

// Confirm Email Service
export interface ConfirmEmailPayload {
  token: string;
}

export interface ConfirmEmailResponse {
  id: string;
  name: string;
  email: string;
  password: undefined;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export const confirmEmailService = async (payload: ConfirmEmailPayload) =>
  apiClient<ConfirmEmailPayload, ConfirmEmailResponse>({
    url: '/auth/confirm-email',
    method: 'POST',
    data: payload,
  });
