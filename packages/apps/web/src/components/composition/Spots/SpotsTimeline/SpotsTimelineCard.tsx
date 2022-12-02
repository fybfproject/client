import { FC, ReactNode, useMemo } from 'react';

import { FaCat, FaDog, FaQuestion } from 'react-icons/fa';

import dayjs from 'dayjs';

import { Flex, Text } from '@fybf/shared.ui';
import { AnimalType, SpotWithAddress } from '@fybf/shared.types';

interface SpotsTimelineCardProps {
  spot: SpotWithAddress;
  selected: boolean;
  onClick: () => void;
}

export const SpotsTimelineCard: FC<SpotsTimelineCardProps> = ({
  spot,
  selected,
  onClick,
}) => {
  const getCardIcon = useMemo(() => {
    const icon: Record<AnimalType, ReactNode> = {
      [AnimalType.Cat]: <FaCat />,
      [AnimalType.Dog]: <FaDog />,
      [AnimalType.Other]: <FaQuestion />,
    };

    return icon[spot.animal.type];
  }, [spot]);

  return (
    <Flex
      css={{
        height: '60px',
        cursor: 'pointer',
        border: selected ? '1px solid $primary-400' : '1px solid $primary-300',
        overflow: 'hidden',
        borderRadius: '$xs',

        '@bp1': {
          minWidth: '300px',
          width: '100%',
        },
      }}
      onClick={() => onClick()}
    >
      <Flex
        align="center"
        css={{
          height: '100%',
          padding: '$md',
          fontSize: '$lg',
          color: 'white',
          backgroundColor: '$primary-500',
        }}
      >
        {getCardIcon}
      </Flex>

      <Flex
        gap="xs"
        direction="column"
        justify="center"
        css={{
          padding: '$sm',
          paddingInline: '$md',
          width: '100%',
          height: '100%',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',

          backgroundColor: selected ? '$primary-300' : 'white',

          '&:hover': {
            backgroundColor: selected ? '$primary-300' : '$primary-200',
          },
        }}
      >
        <Text
          size="sm"
          weight="bold"
          title={spot.address}
          css={{
            color: '$primary-500',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {spot.address}
        </Text>

        <Flex gap="sm">
          <Text
            size="sm"
            weight="bold"
            title={spot.animal?.breed || 'Não informado'}
            css={{
              color: '$gray-700',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {spot.animal.type === AnimalType.Other ? 'Tipo' : 'Raça'}:{' '}
            <Text
              size="sm"
              weight="normal"
              css={{
                color: '$gray-700',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {(spot.animal.type === AnimalType.Other
                ? spot.animal?.name
                : spot.animal?.breed) || 'Não informado'}
            </Text>
          </Text>

          <Text
            size="sm"
            weight="bold"
            title={dayjs(spot?.createdAt).format('HH:mm')}
            css={{
              color: '$gray-700',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            Visto:{' '}
            <Text
              size="sm"
              weight="normal"
              css={{
                color: '$gray-700',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {dayjs(spot?.createdAt).format('HH:mm')}hrs
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
