import { FC, useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { Button, Flex, Input, Select, Text, Textarea } from '@fybf/shared.ui';

import { useNewSpotContext } from '@/context/new';

export const NewSpotLocation: FC = () => {
  const { register, setValue } = useFormContext();
  const { section, setSection, handleSubmit, isSubmitting } =
    useNewSpotContext();

  const [allowGeolocation, setAllowGeolocation] = useState(false);

  const handleAllowGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setAllowGeolocation(true);

        setValue('location.latitude', position.coords.latitude);
        setValue('location.longitude', position.coords.longitude);
      },
      () => {
        setAllowGeolocation(false);
      },
    );
  };

  useEffect(() => {
    handleAllowGeolocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return section === 'location' ? (
    <Flex
      gap="lg"
      justify="between"
      direction="column"
      css={{ width: '100%', height: '100%', overflow: 'auto' }}
    >
      <Flex gap="md" direction="column" css={{ overflow: 'auto' }}>
        <Flex gap="sm" direction="column">
          <Text size="lg" weight="bold" css={{ color: '$primary-500' }}>
            Sobre o local
          </Text>

          <Text css={{ color: '$gray-700' }}>
            Preencha os campos abaixo com as informações do local
          </Text>
        </Flex>

        <Flex direction="column" gap="sm">
          <Text size="sm" css={{ color: '$gray-700' }}>
            Detalhes do local
          </Text>
          <Textarea
            placeholder="Informe detalhes sobre o local"
            rows={7}
            {...register('location.typeNote')}
          />
        </Flex>

        {!allowGeolocation && (
          <Flex
            css={{
              border: '1px solid $primary-300',
              padding: '$md',
              borderRadius: '$xs',
              backgroundColor: '$primary-200',
            }}
          >
            <Text css={{ color: '$primary-500', fontSize: '$sm' }}>
              Necessitamos da sua localização para continuar com o registro.{' '}
              <Text
                css={{
                  textDecoration: 'underline',
                  fontSize: '$sm',
                  color: '$primary-500',
                }}
                onClick={() => handleAllowGeolocation()}
              >
                Clique aqui para permitir.
              </Text>{' '}
            </Text>
          </Flex>
        )}
      </Flex>

      <Flex gap="sm" css={{ width: '100%' }}>
        <Button
          secondary
          css={{ width: '100%' }}
          onClick={() => setSection('animal')}
        >
          Voltar
        </Button>

        <Button
          css={{ width: '100%' }}
          disabled={!allowGeolocation || !!isSubmitting}
          onClick={() => handleSubmit()}
        >
          Criar
        </Button>
      </Flex>
    </Flex>
  ) : null;
};
