import { useState, useEffect, useMemo } from 'react';

import NextLink from 'next/link';

import { toast } from 'react-hot-toast';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { signUpSevice } from '@fybf/shared.services';
import { Button, Flex, Input, Text } from '@fybf/shared.ui';

const RegisterPage: NextPage = () => {
  const { data } = useSession();

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const handleRegister = async () => {
    setError(false);

    try {
      const response = await signUpSevice({
        name,
        email,
        password,
      });

      toast.success('Conta criada com sucesso!');

      if (!!response?.data?.user) router.push('/auth/login');
    } catch (error: any) {
      const { data } = error?.response as {
        data: {
          message: string;
        };
      };

      setError(true);
      setErrorMessage(data?.message);
    }
  };

  const hasMatchingPasswords = useMemo(
    () =>
      !!password && !!confirmPassword ? password === confirmPassword : true,
    [password, confirmPassword],
  );

  const canSubmit = useMemo(
    () => !!name && !!email && !!password && !!confirmPassword,
    [name, email, password, confirmPassword],
  );

  useEffect(() => {
    if (!!data?.user) {
      router.replace('/');
    }
  }, [data, router]);

  return (
    <Flex
      css={{
        width: '100%',
        height: '100%',
        padding: '$lg',
        overflow: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Flex
        gap="lg"
        direction="column"
        css={{ width: '100%', maxWidth: '400px' }}
      >
        <Flex gap="sm" direction="column">
          <Text size="xl" weight="bold" css={{ color: '$primary-500' }}>
            Registrar
          </Text>

          <Text size="md" css={{ color: '$gray-700' }}>
            Preencha os campos abaixo para se registrar na plataforma.
          </Text>
        </Flex>

        <Flex gap="md" direction="column">
          <Flex gap="sm" direction="column">
            <Text size="sm" css={{ color: '$gray-700' }}>
              Nome
            </Text>

            <Input
              value={name}
              placeholder="Digite seu nome"
              onChange={({ target }) => setName(target.value)}
            />
          </Flex>

          <Flex gap="sm" direction="column">
            <Text size="sm" css={{ color: '$gray-700' }}>
              E-mail
            </Text>

            <Input
              type="email"
              value={email}
              placeholder="Digite seu e-mail"
              onChange={({ target }) => setEmail(target.value)}
            />
          </Flex>

          <Flex gap="sm" direction="column">
            <Text size="sm" css={{ color: '$gray-700' }}>
              Senha
            </Text>

            <Input
              type="password"
              value={password}
              placeholder="Digite sua senha"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Flex>

          <Flex gap="sm" direction="column">
            <Text size="sm" css={{ color: '$gray-700' }}>
              Confirmar senha
            </Text>

            <Input
              type="password"
              value={confirmPassword}
              placeholder="Confirme sua senha"
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
          </Flex>

          {!!error && (
            <Flex
              css={{
                border: '1px solid $primary-300',
                padding: '$md',
                borderRadius: '$xs',
                backgroundColor: '$primary-200',
              }}
            >
              <Text
                css={{
                  fontSize: '$sm',
                  color: '$primary-500',
                }}
              >
                {errorMessage || 'Algo deu errado, tente novamente.'}
              </Text>
            </Flex>
          )}

          {!hasMatchingPasswords && (
            <Flex
              css={{
                border: '1px solid $primary-300',
                padding: '$md',
                borderRadius: '$xs',
                backgroundColor: '$primary-200',
              }}
            >
              <Text
                css={{
                  fontSize: '$sm',
                  color: '$primary-500',
                }}
              >
                As senhas não conferem.
              </Text>
            </Flex>
          )}
        </Flex>

        <Flex
          css={{ height: '1px', width: '100%', backgroundColor: '$gray-300' }}
        />

        <Button
          css={{ width: '100%' }}
          disabled={!canSubmit || !hasMatchingPasswords}
          onClick={() => handleRegister()}
        >
          Registrar
        </Button>

        <Text
          size="sm"
          css={{
            color: '$gray-700',

            '@bp1': {
              fontSize: '$md',
            },
          }}
        >
          Já possui uma conta?{' '}
          <NextLink href="/auth/login">
            <Text
              size="sm"
              css={{
                color: '$primary-500',
                cursor: 'pointer',

                '&:hover': {
                  textDecoration: 'underline',
                },

                '@bp1': {
                  fontSize: '$md',
                },
              }}
            >
              Entre
            </Text>
          </NextLink>
          .
        </Text>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
