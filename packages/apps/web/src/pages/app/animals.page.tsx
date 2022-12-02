import { CustomNextPage, GetServerSideProps } from 'next';

import { unstable_getServerSession } from 'next-auth/next';

import { Animal } from '@fybf/shared.types';
import { Flex, Text } from '@fybf/shared.ui';
import { listAnimalsService } from '@fybf/shared.services';

import { MainLayout } from '@/components/layouts';
import { AnimalsCard } from '@/components/composition/Animals';

import { options } from '@/lib/auth/options';

interface NextPageProps {
  animals: Animal[];
}

const AnimalsPage: CustomNextPage<NextPageProps> = ({ animals }) => {
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
            Seus animais
          </Text>

          <Text size="sm" css={{ color: '$gray-700' }}>
            Estes são todos os animais que você cadastrou
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
          {!!animals.length ? (
            animals?.map((animal) => (
              <AnimalsCard animal={animal} key={animal.id} />
            ))
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
                Você ainda não cadastrou nenhum animal
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

AnimalsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;
AnimalsPage.protected = true;

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
    const { data } = await listAnimalsService(session.access_token);

    return {
      props: {
        animals: data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      },
    };
  } catch (error: any) {
    console.log(
      '[page/animals] Error responding: ',
      error?.response?.data || 'Failed to fetch user spots',
    );

    return {
      props: {
        animals: [],
      },
    };
  }
};

export default AnimalsPage;
