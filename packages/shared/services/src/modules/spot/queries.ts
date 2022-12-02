import { SpotWithAnimal } from '@fybf/shared.types';

import { apiClient } from '../../client';

// Get Spot Service
export const getSpotService = async (id: string, token: string) =>
  apiClient<undefined, SpotWithAnimal>({
    url: `/location/${id}`,
    method: 'GET',
    token,
  });

// List Spots Service
export const listSpotsService = async (token: string) =>
  apiClient<undefined, SpotWithAnimal[]>({
    url: '/location',
    method: 'GET',
    token,
  });
