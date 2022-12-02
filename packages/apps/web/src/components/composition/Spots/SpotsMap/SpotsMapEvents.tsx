import { FC, useEffect } from 'react';

import { useMapEvents } from 'react-leaflet';

import { useSpotsContext } from '@/context/spots';

export const SpotsMapEvents: FC = () => {
  const { selectedSpot, setUserLatitude, setUserLongitude } = useSpotsContext();

  const map = useMapEvents({
    dragend: (event) => {
      const center = event.target.getCenter();

      setUserLatitude(center.lat);
      setUserLongitude(center.lng);
    },
  });

  useEffect(() => {
    if (selectedSpot) {
      map?.flyTo(
        [Number(selectedSpot.latitude), Number(selectedSpot.longitude)],
        18,
      );
    } else {
      map?.zoomOut(2);
    }
  }, [selectedSpot, map]);

  useEffect(() => {
    map?.locate({ enableHighAccuracy: true }).on('locationfound', (event) => {
      map?.flyTo(event.latlng, 18);

      setUserLatitude(event.latlng.lat);
      setUserLongitude(event.latlng.lng);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
};
