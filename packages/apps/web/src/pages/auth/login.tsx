import { useState, useEffect } from 'react';
import { NextPage } from 'next';

import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

import { styled } from '@fybf/shared.theme';
import { Button } from '@fybf/shared.ui';

const StyledFlex = styled('div', {
  gap: '$sm',
  display: 'flex',
  flexDirection: 'column',
});

const StyledText = styled('p', {
  color: '$gray-900',
  fontSize: '$md',
});

const StyledInput = styled('input', {
  padding: '$sm',
  fontSize: '$md',
  borderRadius: '$sm',
  fontFamily: '$body',
  border: '1px solid $gray-300',
  color: '$gray-900',
  '&:focus': {
    outline: 'none',
    borderColor: '$gray-500',
  },
});

const LoginPage: NextPage = () => {
  const { data } = useSession();

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    setError(false);

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.ok) {
      router.push('/');
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (!!data?.user) {
      router.replace('/');
    }
  }, [data, router]);

  return (
    <StyledFlex
      css={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledFlex css={{ width: '100%', maxWidth: '400px', gap: '$lg' }}>
        <StyledText css={{ fontSize: '$xl', fontWeight: 'bold' }}>
          Login
        </StyledText>

        <StyledFlex css={{ gridGap: '$md' }}>
          <StyledFlex css={{ flexDirection: 'column' }}>
            <StyledText>E-mail</StyledText>
            <StyledInput
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </StyledFlex>

          <StyledFlex css={{ flexDirection: 'column' }}>
            <StyledText>Senha</StyledText>
            <StyledInput
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </StyledFlex>

          {!!error && (
            <StyledFlex
              css={{
                padding: '$md',
                border: '1px solid $primary-300',
                borderRadius: '$sm',
                backgroundColor: '$primary-200',
              }}
            >
              <StyledText
                css={{
                  fontSize: '$sm',
                  color: '$primary-500',
                }}
              >
                Email ou senha incorretos, tente novamente.
              </StyledText>
            </StyledFlex>
          )}
        </StyledFlex>

        <StyledFlex
          css={{ height: '1px', width: '100%', backgroundColor: '$gray-300' }}
        />

        <Button css={{ width: '100%' }} onClick={() => handleLogin()}>
          Login
        </Button>
      </StyledFlex>
    </StyledFlex>
  );
};

export default LoginPage;
