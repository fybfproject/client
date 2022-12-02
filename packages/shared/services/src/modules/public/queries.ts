import { Animal, SpotWithAnimal } from '@fybf/shared.types';

import { apiClient } from '../../client';

// Get Animal Service
export const listPublicAnimalsService = async (id: string) =>
  apiClient<undefined, Animal[]>({
    url: '/public/animals',
    method: 'GET',
  });

// List Public Spots Service
export const listPublicSpotsService = async () =>
  apiClient<undefined, SpotWithAnimal[]>({
    url: '/public/locations',
    method: 'GET',
  });
