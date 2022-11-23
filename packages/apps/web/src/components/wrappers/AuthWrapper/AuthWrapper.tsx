import { FC, ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import { styled } from '@fybf/shared.theme';

const StyledFlex = styled('div', {
  gap: '$sm',
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
});

export const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => router.push('/auth/login'),
  });

  useEffect(() => {
    if (!!data?.refresh_token_expired) signOut({ callbackUrl: '/' });
  }, [data]);

  if (status === 'loading' || !!data.refresh_token_expired) {
    return (
      <StyledFlex
        css={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '$md',
        }}
      >
        Loading...
      </StyledFlex>
    );
  }

  return <>{children}</>;
};
