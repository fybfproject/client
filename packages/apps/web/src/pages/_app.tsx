import { SessionProvider, signOut, useSession } from 'next-auth/react';

import type { CustomAppProps } from 'next/app';

import { AuthWrapper } from '@/components/wrappers';

const App = ({ Component, pageProps }: CustomAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      {Component.protected ? (
        <AuthWrapper>{getLayout(<Component {...pageProps} />)}</AuthWrapper>
      ) : (
        getLayout(<Component {...pageProps} />)
      )}
    </SessionProvider>
  );
};

export default App;
