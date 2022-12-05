import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

import type { CustomAppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import { AuthWrapper } from '@/components/wrappers';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: CustomAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <SessionProvider session={pageProps.session}>
        {Component.protected ? (
          <AuthWrapper>{getLayout(<Component {...pageProps} />)}</AuthWrapper>
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default App;
