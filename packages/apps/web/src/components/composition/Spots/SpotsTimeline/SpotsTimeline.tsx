import { FC } from 'react';

import { Flex, Text } from '@fybf/shared.ui';
import { SpotWithAddress } from '@fybf/shared.types';

import { useSpotsContext } from '@/context/spots';

import { SpotsTimelineCard } from './SpotsTimelineCard';

export const SpotsTimeline: FC = () => {
  const { spotsByLastHours, selectedSpot, setSelectedSpot } = useSpotsContext();

  const handleSelectSpot = (spot: SpotWithAddress) => {
    if (selectedSpot?.id === spot.id) {
      setSelectedSpot(null);
    } else {
      setSelectedSpot(spot);
    }
  };

  return (
    <Flex
      gap="md"
      direction="column"
      css={{
        width: '100%',
        border: '1px solid $gray-300',
        padding: '$md',
        overflow: 'auto',
        borderRadius: '$sm',
        pointerEvents: 'all',
        backgroundColor: 'white',

        '@bp1': {
          width: '100%',
          minWidth: 'unset',
        },
      }}
    >
      <Flex direction="column" gap="xs">
        <Text
          weight="bold"
          css={{ whiteSpace: 'nowrap', color: '$primary-500' }}
        >
          Últimos Avistamentos
        </Text>

        <Text size="sm" css={{ color: '$gray-700' }}>
          Estes foram os animais avistados nessa região nas últimas 24 horas
        </Text>
      </Flex>

      {!!spotsByLastHours?.length ? (
        <Flex
          direction="column"
          gap="sm"
          css={{
            '@bp1': {
              overflow: 'auto',
              flexDirection: 'row',
            },
          }}
        >
          {spotsByLastHours?.map((spot, idx) => (
            <SpotsTimelineCard
              key={idx}
              spot={spot}
              selected={spot.id === selectedSpot?.id}
              onClick={() => handleSelectSpot(spot)}
            />
          ))}
        </Flex>
      ) : (
        <Flex
          justify="center"
          css={{
            padding: '$md',
            border: '1px solid $gray-300',
            borderStyle: 'dashed',
            borderRadius: '$sm',
            backgroundColor: '$gray-200',
          }}
        >
          <Text size="sm" css={{ color: '$gray-700' }}>
            Nenhum animal avistado nas últimas 24 horas
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
