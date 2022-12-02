import { AnimalType, Animal } from '@fybf/shared.types';

import { apiClient } from '../../client';

// Create Animal Service
export interface CreateAnimalPayload {
  type: AnimalType;
  name?: string;
  breed?: string;
  images?: string[];
  typeNote?: string;
  creator: string;
}

export const createAnimalSevice = async (
  payload: CreateAnimalPayload,
  token: string,
) =>
  apiClient<CreateAnimalPayload, Animal>({
    url: '/animal',
    method: 'POST',
    data: payload,
    token,
  });

// Update Animal Service
export interface UpdateAnimalPayload {
  type: AnimalType;
  name?: string;
  breed?: string;
  images?: string[];
  typeNote?: string;
  creator: string;
}

export const updateAnimalService = async (
  payload: UpdateAnimalPayload,
  token: string,
) =>
  apiClient<UpdateAnimalPayload, void>({
    url: '/animal',
    method: 'PUT',
    data: payload,
    token,
  });

// Delete Animal Service
export const deleteAnimalService = async (token: string) =>
  apiClient<undefined, void>({
    url: '/animal',
    method: 'DELETE',
    token,
  });
