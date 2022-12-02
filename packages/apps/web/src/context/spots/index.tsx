import React, { useContext, FC, useMemo, useState, ReactNode } from 'react';

import dayjs from 'dayjs';

import { SpotWithAddress } from '@fybf/shared.types';

import { getDistanceFromLatLonInKm } from '@/lib/utils';

import { SpotsContext } from './context';

export const useSpotsContext = () => {
  const context = useContext(SpotsContext);

  if (!context) {
    throw new Error('useSpotsContext must be used within an SpotsProvider');
  }

  return context;
};

export interface SpotsProviderProps {
  spots: SpotWithAddress[];
  children: ReactNode;
}

export const SpotsProvider: FC<SpotsProviderProps> = ({ children, spots }) => {
  const [userLatitude, setUserLatitude] = useState<number | null>(null);
  const [userLongitude, setUserLongitude] = useState<number | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<SpotWithAddress | null>(
    null,
  );

  const getFilteredSpotsByUserLocation = useMemo(() => {
    return spots?.filter((spot) => {
      const distance = getDistanceFromLatLonInKm(
        userLatitude || -26.3021155,
        userLongitude || -48.8287377,
        Number(spot?.latitude),
        Number(spot?.longitude),
      );

      return distance <= 5;
    });
  }, [spots, userLatitude, userLongitude]);

  const getLastHoursSpots = useMemo(() => {
    return getFilteredSpotsByUserLocation.filter((spot) => {
      const spotDate = dayjs(spot.createdAt);
      const currentDate = dayjs();

      return currentDate.diff(spotDate, 'hour') <= 24;
    });
  }, [getFilteredSpotsByUserLocation]);

  return (
    <SpotsContext.Provider
      value={{
        selectedSpot,
        userLatitude,
        userLongitude,
        setSelectedSpot,
        setUserLatitude,
        setUserLongitude,
        spotsByLastHours: getLastHoursSpots,
        spotsByUserLocation: getFilteredSpotsByUserLocation,
      }}
    >
      {children}
    </SpotsContext.Provider>
  );
};
