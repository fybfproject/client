import { FC } from 'react';

import { Camera, Flex, Text } from '@fybf/shared.ui';

import { useNewSpotContext } from '@/context/new';

export const NewSpotCapture: FC = () => {
  const { section, setImage, setSection } = useNewSpotContext();

  const handleCapture = (image: string) => {
    setImage(image);
    setSection('animal');
  };

  return section === 'capture' ? (
    <Flex
      gap="lg"
      direction="column"
      css={{ height: '100%', overflow: 'auto' }}
    >
      <Flex gap="sm" direction="column">
        <Text size="lg" weight="bold" css={{ color: '$primary-500' }}>
          Foto do animal
        </Text>

        <Text css={{ color: '$gray-700' }}>
          Para cadastrar um novo avistamento, primeiro tire uma foto do animal
          para prosseguir
        </Text>
      </Flex>

      <Camera
        css={{ height: '100%' }}
        onSelect={(image) => handleCapture(image)}
      />
    </Flex>
  ) : null;
};
