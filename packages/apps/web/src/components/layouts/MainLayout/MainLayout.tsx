import { FC, ReactNode } from 'react';

import NextLink from 'next/link';

import { styled } from '@fybf/shared.theme';
import { signOut, useSession } from 'next-auth/react';

const StyledFlex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const StyledText = styled('p', {
  color: '$gray-900',
  fontSize: '$md',
});

export interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data } = useSession();

  return (
    <StyledFlex
      css={{
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <StyledFlex
        css={{
          gap: '$md',
          padding: '$md',
          flexDirection: 'row',
          backgroundColor: '$gray-200',
          borderBottom: '1px solid $gray-300',
        }}
      >
        <NextLink href="/">
          <StyledText
            css={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Home
          </StyledText>
        </NextLink>

        {!data?.user ? (
          <>
            <NextLink href="/auth/login">
              <StyledText
                css={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Login
              </StyledText>
            </NextLink>

            <NextLink href="/auth/register">
              <StyledText
                css={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Register
              </StyledText>
            </NextLink>
          </>
        ) : (
          <StyledText
            css={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => signOut()}
          >
            Logout
          </StyledText>
        )}
      </StyledFlex>

      <StyledFlex css={{ width: '100%', height: '100%', overflow: 'auto' }}>
        {children}
      </StyledFlex>
    </StyledFlex>
  );
};
