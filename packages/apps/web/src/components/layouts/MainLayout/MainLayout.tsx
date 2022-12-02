import { FC, ReactNode } from 'react';

import { Flex } from '@fybf/shared.ui';

import { MainLayoutBar } from './MainLayoutBar';

export interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Flex
      css={{
        width: '100%',
        height: '100%',

        '@bp1': {
          flexDirection: 'column-reverse',
        },
      }}
    >
      <MainLayoutBar />
      {children}
    </Flex>
  );
};
