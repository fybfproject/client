import { CustomNextPage, GetServerSideProps } from 'next';

import { unstable_getServerSession } from 'next-auth/next';

import { Flex, Text } from '@fybf/shared.ui';
import { SpotWithAddress } from '@fybf/shared.types';
import { listSpotsService } from '@fybf/shared.services';

import { MainLayout } from '@/components/layouts';
import { ReportsCard } from '@/components/composition/Reports';

import { options } from '@/lib/auth/options';

interface NextPageProps {
  spots: SpotWithAddress[];
}

const ReportsPage: CustomNextPage<NextPageProps> = ({ spots }) => {
  return (
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
      <Flex gap="md" direction="column" css={{ width: '100%' }}>
        <Flex gap="sm" direction="column">
          <Text size="lg" weight="bold" css={{ color: '$primary-500' }}>
            Seus avistamentos
          </Text>

          <Text size="sm" css={{ color: '$gray-700' }}>
            Estes são todos os avistamentos que você realizou
          </Text>
        </Flex>

        <Flex
          gap="md"
          css={{
            width: '100%',
            flexWrap: 'wrap',

            '@bp1': {
              flexDirection: 'column',
            },
          }}
        >
          {!!spots.length ? (
            spots?.map((spot) => <ReportsCard spot={spot} key={spot.id} />)
          ) : (
            <Flex
              css={{
                width: '100%',
                border: '1px solid $primary-300',
                padding: '$md',
                borderRadius: '$xs',
                backgroundColor: '$primary-200',
              }}
            >
              <Text css={{ color: '$primary-500', fontSize: '$sm' }}>
                Você ainda não realizou nenhum avistamento
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

ReportsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;
ReportsPage.protected = true;

export const getServerSideProps: GetServerSideProps<NextPageProps> = async (
  context,
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    options,
  );

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    const { data } = await listSpotsService(session.access_token);

    for (const spot of data as SpotWithAddress[]) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${spot.latitude}&lon=${spot.longitude}&zoom=18&addressdetails=1`,
      );

      const data = await response.json();

      spot.address = `${data.address.road} ${
        data.address.suburb ? `- ${data.address.suburb}` : ''
      }`;
    }

    return {
      props: {
        spots: data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ) as SpotWithAddress[],
      },
    };
  } catch (error: any) {
    console.log(
      '[page/reports] Error responding: ',
      error?.response?.data || 'Failed to fetch user spots',
    );

    return {
      props: {
        spots: [],
      },
    };
  }
};

export default ReportsPage;
