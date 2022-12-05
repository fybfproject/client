import { FC, useMemo } from 'react';

import dayjs from 'dayjs';

import { MdClose } from 'react-icons/md';

import { useSpotsContext } from '@/context/spots';

import { Flex, Image, Text } from '@fybf/shared.ui';
import { AnimalType } from '@fybf/shared.types';

export const SpotsDetails: FC = () => {
  const { selectedSpot, setSelectedSpot } = useSpotsContext();

  const getAnimalType = useMemo(() => {
    if (selectedSpot) {
      const type: Record<string, string> = {
        [AnimalType.Cat]: 'Gato',
        [AnimalType.Dog]: 'Cachorro',
        [AnimalType.Other]: 'Outro',
      };

      return type[selectedSpot.animal.type];
    }
  }, [selectedSpot]);

  return !!selectedSpot ? (
    <Flex
      direction="column"
      css={{
        width: '100%',
        height: 'fit-content',
        border: '1px solid $gray-300',
        overflow: 'auto',
        borderRadius: '$sm',
        pointerEvents: 'all',
        backgroundColor: 'white',
        flex: 2,
      }}
    >
      <Flex
        gap="sm"
        align="center"
        justify="between"
        css={{
          width: '100%',
          padding: '$md',
          borderBottom: '1px solid $gray-300',
        }}
      >
        <Flex gap="xs" justify="center" direction="column">
          <Text
            weight="bold"
            css={{ color: '$primary-500', whiteSpace: 'nowrap' }}
          >
            Detalhes
          </Text>

          <Text size="sm" css={{ color: '$gray-700', whiteSpace: 'nowrap' }}>
            Estes são os detalhes do avistamento
          </Text>
        </Flex>

        <Flex
          css={{
            color: '$gray-700',
            cursor: 'pointer',
            padding: '$sm',
            fontSize: '$lg',
            borderRadius: '$xs',

            '&:hover': {
              backgroundColor: '$gray-300',
            },
          }}
          onClick={() => setSelectedSpot(null)}
        >
          <MdClose />
        </Flex>
      </Flex>

      <Flex
        gap="md"
        direction="column"
        css={{ padding: '$md', overflow: 'auto' }}
      >
        <Image
          alt="spot-image"
          src={selectedSpot?.images[0]}
          css={{
            width: '100%',
            height: '280px',
            borderRadius: '$sm',
            border: '1px solid $gray-300',
          }}
        />

        <Flex direction="column" gap="md">
          <Flex align="center" gap="md">
            <Text weight="bold" css={{ color: '$primary-500' }}>
              Dados
            </Text>

            <Flex
              css={{
                width: '100%',
                height: '1px',
                backgroundColor: '$primary-500',
              }}
            />
          </Flex>

          <Flex>
            <Flex
              direction="column"
              gap="xs"
              css={{
                flex: 1,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              <Text weight="bold" size="sm" css={{ color: '$primary-500' }}>
                Nome do animal:
              </Text>
              <Text
                size="sm"
                css={{
                  color: '$gray-700',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {selectedSpot?.animal?.name || 'Não informado'}
              </Text>
            </Flex>

            <Flex
              direction="column"
              gap="xs"
              css={{
                flex: 1,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              <Text weight="bold" size="sm" css={{ color: '$primary-500' }}>
                Tipo do animal:
              </Text>
              <Text
                size="sm"
                css={{
                  color: '$gray-700',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {getAnimalType}
              </Text>
            </Flex>
          </Flex>

          <Flex>
            <Flex
              direction="column"
              gap="xs"
              css={{
                flex: 1,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              <Text weight="bold" size="sm" css={{ color: '$primary-500' }}>
                Raça do animal:
              </Text>
              <Text
                size="sm"
                css={{
                  color: '$gray-700',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {selectedSpot?.animal?.breed || 'Desconhecida'}
              </Text>
            </Flex>

            <Flex
              direction="column"
              gap="xs"
              css={{
                flex: 1,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              <Text weight="bold" size="sm" css={{ color: '$primary-500' }}>
                Visto em:
              </Text>
              <Text
                size="sm"
                css={{
                  color: '$gray-700',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {`${dayjs(selectedSpot?.createdAt).format(
                  'DD/MM/YYYY',
                )} às ${dayjs(selectedSpot?.createdAt).format('HH:mm')}hrs`}
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="xs" css={{ flex: 1 }}>
            <Text weight="bold" size="sm" css={{ color: '$primary-500' }}>
              Detalhes do animal:
            </Text>
            <Text size="sm" css={{ color: '$gray-700' }}>
              {selectedSpot?.animal?.typeNote || 'Não informado'}
            </Text>
          </Flex>

          <Flex direction="column" gap="xs" css={{ flex: 1 }}>
            <Text weight="bold" size="sm" css={{ color: '$primary-500' }}>
              Detalhes do local:
            </Text>
            <Text size="sm" css={{ color: '$gray-700' }}>
              {selectedSpot?.typeNote || 'Não informado'}
            </Text>
          </Flex>

          <Flex direction="column" gap="xs" css={{ flex: 1 }}>
            <Text weight="bold" size="sm" css={{ color: '$primary-500' }}>
              Endereço:
            </Text>
            <Text size="sm" css={{ color: '$gray-700' }}>
              {selectedSpot?.address}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  ) : null;
};
