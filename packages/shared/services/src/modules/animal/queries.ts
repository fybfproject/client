import { Animal } from '@fybf/shared.types';

import { apiClient } from '../../client';

// Get Animal Service
export const getAnimalService = async (id: string, token: string) =>
  apiClient<undefined, Animal>({
    url: `/animal/${id}`,
    method: 'GET',
    token,
  });

// List Animals Service
export const listAnimalsService = async (token: string) =>
  apiClient<undefined, Animal[]>({
    url: '/animal',
    method: 'GET',
    token,
  });
