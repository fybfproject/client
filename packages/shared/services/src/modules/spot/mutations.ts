import { Animal, AnimalType, LocationType } from '@fybf/shared.types';

import { apiClient } from '../../client';

// Create Spot Service
export interface CreateSpotPayload {
  type: LocationType;
  typeNote?: string;
  images?: string[];
  animal: string;
  creator: string;
  latitude: string;
  longitude: string;
}

export const createSpotSevice = async (
  payload: CreateSpotPayload,
  token: string,
) =>
  apiClient<CreateSpotPayload, Animal>({
    url: '/location',
    method: 'POST',
    data: payload,
    token,
  });

// Update Spot Service
export interface UpdateSpotPayload {
  type: LocationType;
  typeNote?: string;
  images?: string[];
  animal: string;
  creator: string;
  latitude: string;
  longitude: string;
}

export const updateSpotService = async (
  id: string,
  payload: UpdateSpotPayload,
  token: string,
) =>
  apiClient<UpdateSpotPayload, AnimalType>({
    url: `/location/${id}`,
    method: 'PUT',
    data: payload,
    token,
  });

// Delete Spot Service
export const deleteSpotService = async (id: string, token: string) =>
  apiClient<undefined, void>({
    url: `/location/${id}`,
    method: 'DELETE',
    token,
  });
