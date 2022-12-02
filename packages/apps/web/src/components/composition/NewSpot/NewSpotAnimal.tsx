import { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import { Button, Flex, Input, Select, Text, Textarea } from '@fybf/shared.ui';
import { AnimalType } from '@fybf/shared.types';

import { useNewSpotContext } from '@/context/new';

export const NewSpotAnimal: FC = () => {
  const { register } = useFormContext();
  const { section, setSection } = useNewSpotContext();

  const getAnimalTypeOptions = [
    { label: 'Cachorro', value: AnimalType.Dog },
    { label: 'Gato', value: AnimalType.Cat },
    { label: 'Outro', value: AnimalType.Other },
  ];

  return section === 'animal' ? (
    <Flex
      gap="lg"
      justify="between"
      direction="column"
      css={{ width: '100%', height: '100%', overflow: 'auto' }}
    >
      <Flex gap="md" direction="column" css={{ overflow: 'auto' }}>
        <Flex gap="sm" direction="column">
          <Text size="lg" weight="bold" css={{ color: '$primary-500' }}>
            Sobre o animal
          </Text>

          <Text css={{ color: '$gray-700' }}>
            Preencha os campos abaixo com as informações do animal
          </Text>
        </Flex>

        <Flex direction="column" gap="sm">
          <Text size="sm" css={{ color: '$gray-700' }}>
            Tipo do animal
          </Text>
          <Select
            options={getAnimalTypeOptions}
            {...register('animal.type', { required: true })}
          />
        </Flex>

        <Flex direction="column" gap="sm">
          <Text size="sm" css={{ color: '$gray-700' }}>
            Nome do animal
          </Text>

          <Input
            type="email"
            placeholder="Digite o nome do animal"
            {...register('animal.name')}
          />
        </Flex>

        <Flex direction="column" gap="sm">
          <Text size="sm" css={{ color: '$gray-700' }}>
            Raça do animal
          </Text>
          <Input
            placeholder="Digite a raça do animal"
            {...register('animal.breed')}
          />
        </Flex>

        <Flex direction="column" gap="sm">
          <Text size="sm" css={{ color: '$gray-700' }}>
            Detalhes do animal
          </Text>
          <Textarea
            placeholder="Informe detalhes sobre o animal"
            rows={7}
            {...register('animal.typeNote')}
          />
        </Flex>
      </Flex>

      <Flex gap="sm" css={{ width: '100%' }}>
        <Button
          secondary
          css={{ width: '100%' }}
          onClick={() => setSection('capture')}
        >
          Voltar
        </Button>
        <Button css={{ width: '100%' }} onClick={() => setSection('location')}>
          Prosseguir
        </Button>
      </Flex>
    </Flex>
  ) : null;
};
