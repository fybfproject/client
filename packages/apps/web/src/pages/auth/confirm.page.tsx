import { useEffect } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Button } from '@fybf/shared.ui';
import { styled } from '@fybf/shared.theme';
import { confirmEmailService } from '@fybf/shared.services';

const StyledFlex = styled('div', {
  gap: '$sm',
  display: 'flex',
  flexDirection: 'column',
});

const StyledText = styled('p', {
  color: '$gray-900',
  fontSize: '$md',
});

const ConfirmPage: NextPage = () => {
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      const { token } = router.query;

      if (typeof token === 'string') {
        const response = await confirmEmailService({
          token,
        });

        if (!!response) router.replace('/auth/login');
      }
    } catch (error) {
      router.replace('/auth/login');
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (!router.query?.token) {
        router.replace('/');
      }
    }
  }, [router]);

  return (
    <StyledFlex
      css={{
        gap: '$lg',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StyledFlex>
        <StyledText
          css={{
            color: '$primary-500',
            fontSize: '$lg',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Confirmar Conta
        </StyledText>

        <StyledText css={{ color: '$gray-700', textAlign: 'center' }}>
          Clique no botão abaixo para confirmar e<br /> conseguir utilizar a sua
          conta devidamente.
        </StyledText>
      </StyledFlex>
      <Button onClick={() => handleConfirm()}>Confirmar</Button>
    </StyledFlex>
  );
};

export default ConfirmPage;
