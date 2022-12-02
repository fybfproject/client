import { CustomNextPage, GetServerSideProps } from 'next';

import { useSession } from 'next-auth/react';

import dynamic from 'next/dynamic';
import NextLink from 'next/link';

import axios from 'axios';

import { Button, Flex } from '@fybf/shared.ui';
import { SpotWithAddress } from '@fybf/shared.types';
import { listPublicSpotsService } from '@fybf/shared.services';

import { MainLayout } from '@/components/layouts';
import { SpotsTimeline, SpotsDetails } from '@/components/composition/Spots';

import { SpotsProvider } from '@/context/spots';

const SpotsMapWithoutSSR = dynamic(
  () =>
    import('../../components/composition/Spots/SpotsMap').then(
      (mod) => mod.SpotsMap,
    ),
  { ssr: false },
);

interface NextPageProps {
  spots: SpotWithAddress[];
}

const SpotsPage: CustomNextPage<NextPageProps> = ({ spots = [] }) => {
  const { data } = useSession();

  return (
    <SpotsProvider spots={spots}>
      <Flex
        css={{
          width: '100%',
          height: '100%',
          padding: '$md',
          overflow: 'auto',
          position: 'relative',
          backgroundColor: '$gray-200',
        }}
      >
        <Flex
          gap="md"
          direction="column"
          css={{
            width: '380px',
            height: '100%',
            zIndex: 10,
            minWidth: '380px',
            position: 'relative',
            pointerEvents: 'none',

            '@bp1': {
              width: '100%',
              minWidth: 'unset',
              flexDirection: 'column-reverse',
            },
          }}
        >
          {!data && (
            <Flex gap="sm" css={{ width: '100%' }}>
              <NextLink href="/auth/register">
                <Button secondary css={{ width: '100%' }}>
                  Cadastrar
                </Button>
              </NextLink>
              <NextLink href="/auth/login">
                <Button css={{ width: '100%' }}>Entrar</Button>
              </NextLink>
            </Flex>
          )}

          <SpotsTimeline />
          <SpotsDetails />
        </Flex>

        <SpotsMapWithoutSSR />
      </Flex>
    </SpotsProvider>
  );
};

export const getServerSideProps: GetServerSideProps<
  NextPageProps
> = async () => {
  try {
    const { data } = await listPublicSpotsService();

    for (const spot of data as SpotWithAddress[]) {
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${spot.latitude}&lon=${spot.longitude}&zoom=18&addressdetails=1`,
      );

      spot.address = `${data.address.road} ${
        data.address.suburb ? `- ${data.address.suburb}` : ''
      }`;
    }

    return {
      props: {
        spots: data as SpotWithAddress[],
      },
    };
  } catch (error: any) {
    console.log(
      '[page/spots] Error responding: ',
      error?.response?.data || 'Failed to fetch spots',
    );

    return {
      props: {
        spots: [],
      },
    };
  }
};

SpotsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default SpotsPage;
