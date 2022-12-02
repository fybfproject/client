import { FC } from 'react';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { Flex } from '@fybf/shared.ui';
import { SpotWithAddress } from '@fybf/shared.types';

import { useSpotsContext } from '@/context/spots';

import { SpotsMapMarker } from './SpotsMapMarker';
import { SpotsMapEvents } from './SpotsMapEvents';

export const SpotsMap: FC = () => {
  const { spotsByUserLocation, selectedSpot, setSelectedSpot } =
    useSpotsContext();

  const handleSelectSpot = (spot: SpotWithAddress) => {
    if (selectedSpot?.id === spot.id) {
      setSelectedSpot(null);
    } else {
      setSelectedSpot(spot);
    }
  };

  return (
    <Flex
      css={{
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
    >
      <MapContainer
        zoom={14}
        minZoom={15}
        center={[-26.3021155, -48.8287377]}
        touchZoom={false}
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/gabsdotco/clb1g7bzs001815o7j1pej6ic/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_TOKEN}`}
        />

        {spotsByUserLocation?.map((spot, idx) => (
          <Marker
            key={idx}
            icon={SpotsMapMarker({ type: spot.animal.type })}
            position={[Number(spot.latitude), Number(spot.longitude)]}
            eventHandlers={{
              click: () => handleSelectSpot(spot),
            }}
          />
        ))}

        <SpotsMapEvents />
      </MapContainer>
    </Flex>
  );
};
