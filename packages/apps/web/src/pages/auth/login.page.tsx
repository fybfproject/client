import { useState, useEffect } from 'react';

import NextLink from 'next/link';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

import { Button, Flex, Input, Text } from '@fybf/shared.ui';

const LoginPage: NextPage = () => {
  const { data } = useSession();

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(false);

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.ok) {
      router.push('/app/spots');
    } else {
      setError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!!data?.user) {
      router.replace('/app/spots');
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
            Entrar
          </Text>

          <Text size="md" css={{ color: '$gray-700' }}>
            Preencha os campos abaixo para se autenticar na plataforma.
          </Text>
        </Flex>

        <Flex direction="column" gap="md">
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

          {!!error && (
            <Flex
              css={{
                border: '1px solid $primary-300',
                padding: '$md',
                borderRadius: '$xs',
                backgroundColor: '$primary-200',
              }}
            >
              <Text css={{ color: '$primary-500', fontSize: '$sm' }}>
                Email ou senha incorretos, tente novamente.
              </Text>
            </Flex>
          )}
        </Flex>

        <Flex
          css={{
            width: '100%',
            height: '1px',
            backgroundColor: '$gray-300',
          }}
        />

        <Button
          css={{ width: '100%' }}
          disabled={!email || !password || isLoading}
          onClick={() => handleLogin()}
        >
          Entrar
        </Button>

        <Text size="sm" css={{ color: '$gray-700' }}>
          Ainda não tem uma conta?{' '}
          <NextLink href="/auth/register">
            <Text
              size="sm"
              css={{
                color: '$primary-500',
                cursor: 'pointer',

                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Cadastre-se
            </Text>
          </NextLink>
          .
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
