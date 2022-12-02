import { SpotWithAddress } from '@fybf/shared.types';

export interface SpotsContextState {
  selectedSpot: SpotWithAddress | null;
  userLatitude: number | null;
  userLongitude: number | null;
  setSelectedSpot: (spot: SpotWithAddress | null) => void;
  setUserLatitude: (latitude: number | null) => void;
  setUserLongitude: (longitude: number | null) => void;
  spotsByLastHours: SpotWithAddress[];
  spotsByUserLocation: SpotWithAddress[];
}
