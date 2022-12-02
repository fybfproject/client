import { FC, ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import { Flex, Image } from '@fybf/shared.ui';

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
      <Flex
        align="center"
        justify="center"
        css={{
          height: '100vh',
          fontSize: '$md',
          backgroundColor: '$primary-500',
        }}
      >
        <Flex css={{ width: '250px' }}>
          <Image
            alt="logo"
            src="/logo.png"
            css={{
              width: '100%',
              height: '100%',
            }}
          ></Image>
        </Flex>
      </Flex>
    );
  }

  return <>{children}</>;
};
