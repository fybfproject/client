import { NextPage } from 'next';

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

const MainPage: NextPage = () => {
  return (
    <StyledFlex>
      <StyledText>Hello World</StyledText>
      <Button>Foo Bar</Button>
    </StyledFlex>
  );
};

export default MainPage;
