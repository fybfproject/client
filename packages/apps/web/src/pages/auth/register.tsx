import { useState, useEffect, useMemo } from 'react';
import { NextPage } from 'next';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { Button } from '@fybf/shared.ui';
import { styled } from '@fybf/shared.theme';
import { signUpSevice } from '@fybf/shared.services';

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

const RegisterPage: NextPage = () => {
  const { data } = useSession();

  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);

  const handleRegister = async () => {
    setError(false);

    try {
      const response = await signUpSevice({
        name,
        email,
        password,
      });

      if (!!response?.data?.user) router.push('/auth/login');
    } catch (error) {
      console.log(error);

      setError(true);
    }
  };

  const hasMatchingPasswords = useMemo(
    () =>
      !!password && !!confirmPassword ? password === confirmPassword : true,
    [password, confirmPassword],
  );

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
          Registrar
        </StyledText>

        <StyledFlex css={{ gridGap: '$md' }}>
          <StyledFlex css={{ flexDirection: 'column' }}>
            <StyledText>Nome</StyledText>
            <StyledInput
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </StyledFlex>

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

          <StyledFlex css={{ flexDirection: 'column' }}>
            <StyledText>Confirmar senha</StyledText>
            <StyledInput
              type="password"
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
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
                Algo deu errado, tente novamente.
              </StyledText>
            </StyledFlex>
          )}

          {!hasMatchingPasswords && (
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
                As senhas não conferem.
              </StyledText>
            </StyledFlex>
          )}
        </StyledFlex>

        <StyledFlex
          css={{ height: '1px', width: '100%', backgroundColor: '$gray-300' }}
        />

        <Button css={{ width: '100%' }} onClick={() => handleRegister()}>
          Registrar
        </Button>
      </StyledFlex>
    </StyledFlex>
  );
};

export default RegisterPage;
