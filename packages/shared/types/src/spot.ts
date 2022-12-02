import { Animal } from './animal';

export enum LocationType {
  Spot = 'spot',
}

export interface Spot {
  id: string;
  type: LocationType;
  images: string[];
  latitude: string;
  longitude: string;
  typeNote?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface SpotWithAnimal extends Spot {
  animal: Animal;
}

export interface SpotWithAddress extends SpotWithAnimal {
  address: string;
}
