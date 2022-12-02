import { FC, ReactNode, useMemo } from 'react';

import { FaCat, FaDog, FaQuestion } from 'react-icons/fa';

import dayjs from 'dayjs';

import { Flex, Image, Text } from '@fybf/shared.ui';
import { AnimalType, SpotWithAddress } from '@fybf/shared.types';

interface ReportsCardProps {
  spot: SpotWithAddress;
}

export const ReportsCard: FC<ReportsCardProps> = ({ spot }) => {
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
      gap="sm"
      direction="column"
      css={{
        width: '300px',
        border: '1px solid $gray-300',
        padding: '$md',
        borderRadius: '$sm',
        backgroundColor: 'white',

        '@bp1': {
          width: '100%',
        },
      }}
    >
      <Flex css={{ height: '180px', position: 'relative' }}>
        <Image
          alt="user-spot"
          src={spot.images[0]}
          css={{
            borderRadius: '$xs',
          }}
        />

        <Flex
          css={{
            top: '$md',
            left: '$md',
            color: '$primary-500',
            padding: '$sm',
            fontSize: '$lg',
            position: 'absolute',
            borderRadius: '$xs',
            backgroundColor: 'white',
          }}
        >
          {getCardIcon}
        </Flex>
      </Flex>

      <Flex
        gap="xs"
        direction="column"
        css={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        <Text
          size="sm"
          weight="bold"
          css={{
            color: '$primary-500',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {spot.address}
        </Text>

        <Text
          size="xs"
          css={{
            color: '$gray-700',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',

            '@bp1': {
              fontSize: '$sm',
            },
          }}
        >
          <Text
            size="xs"
            css={{
              color: '$gray-700',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',

              '@bp1': {
                fontSize: '$sm',
              },
            }}
          >
            Visto em
          </Text>{' '}
          {dayjs(spot.createdAt).format('DD/MM/YYYY')} às{' '}
          {dayjs(spot.createdAt).format('HH:mm')}hrs
        </Text>
      </Flex>
    </Flex>
  );
};
