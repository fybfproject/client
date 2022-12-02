import { ReactNode } from 'react';

import ReactDOMServer from 'react-dom/server';

import { FaCat, FaDog, FaQuestion } from 'react-icons/fa';

import L from 'leaflet';

import { Flex } from '@fybf/shared.ui';
import { AnimalType } from '@fybf/shared.types';

export interface SpotsMapMarkerProps {
  type: AnimalType;
}

export const SpotsMapMarker = ({ type }: SpotsMapMarkerProps) => {
  const getMarkerIcon = () => {
    const icon: Record<AnimalType, ReactNode> = {
      [AnimalType.Cat]: <FaCat />,
      [AnimalType.Dog]: <FaDog />,
      [AnimalType.Other]: <FaQuestion />,
    };

    return icon[type];
  };

  return L.divIcon({
    className: 'test',
    html: ReactDOMServer.renderToString(
      <Flex
        justify="center"
        align="center"
        css={{
          color: 'white',
          width: '50px',
          height: '50px',
          border: '7px solid $primary-300',
          fontSize: '$md',
          boxShadow: '2px 8px 51px 11px rgba(196,184,245,90)',
          borderRadius: '$full',
          backgroundColor: '$primary-500',
        }}
      >
        {getMarkerIcon()}
      </Flex>,
    ),
  });
};
