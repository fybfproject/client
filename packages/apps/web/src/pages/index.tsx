import { CustomNextPage } from 'next';
import { useSession } from 'next-auth/react';

import { styled } from '@fybf/shared.theme';
import { MainLayout } from '@/components/layouts';

const StyledFlex = styled('div', {
  gap: '$sm',
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
});

const StyledText = styled('p', {
  color: '$gray-900',
  fontSize: '$md',
});

const StyledPre = styled('pre', {
  color: '$gray-900',
  fontSize: '$md',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

const HomePage: CustomNextPage = () => {
  const { data } = useSession();

  return (
    <StyledFlex css={{ width: '100%', height: '100%', padding: '$lg' }}>
      {!!data?.user && <StyledPre>{JSON.stringify(data, null, 2)}</StyledPre>}
    </StyledFlex>
  );
};

HomePage.protected = true;
HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default HomePage;
