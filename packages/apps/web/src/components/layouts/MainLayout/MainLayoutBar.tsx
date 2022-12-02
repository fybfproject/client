import { FC, useMemo } from 'react';

import NextLink from 'next/link';

import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import { FaMap, FaMapMarkerAlt } from 'react-icons/fa';
import {
  MdAdd,
  MdLogout,
  MdOutlineLogout,
  MdPerson,
  MdPets,
} from 'react-icons/md';

import { Flex } from '@fybf/shared.ui';

export const MainLayoutBar: FC = () => {
  const { data } = useSession();

  const router = useRouter();

  const getLeftIcons = useMemo(() => {
    return [
      {
        icon: <FaMap />,
        label: 'Map',
        href: '/app/spots',
      },
      {
        icon: <FaMapMarkerAlt />,
        label: 'Reports',
        href: '/app/reports',
      },
    ];
  }, []);

  const getRightIcons = useMemo(() => {
    return [
      {
        icon: <MdPets />,
        label: 'Animals',
        href: '/app/animals',
      },
      {
        icon: <MdOutlineLogout />,
        label: 'Logout',
        href: '/api/auth/signout',
        isLogout: true,
      },
    ];
  }, []);

  const isCurrentPath = (href: string) => {
    return router.pathname === href;
  };

  if (!data) return null;

  return (
    <Flex
      gap="sm"
      direction="column"
      css={{
        height: '100%',
        padding: '$sm',
        borderRight: '1px solid $gray-300',

        '@bp1': {
          zIndex: 10,
          height: 'fit-content',
          borderTop: '1px solid $gray-300',
          borderRight: 'none',
          alignItems: 'center',
          padding: '$md',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        },
      }}
    >
      {getLeftIcons.map(({ icon, href }, idx) => (
        <NextLink href={href} key={idx}>
          <Flex
            css={{
              color: isCurrentPath(href) ? 'white' : '$primary-500',
              cursor: 'pointer',
              padding: '$sm',
              fontSize: '$lg',
              borderRadius: '$xs',
              transitionDuration: '0.1s',
              backgroundColor: isCurrentPath(href)
                ? '$primary-500'
                : 'transparent',

              '&:hover': {
                color: 'white',
                backgroundColor: '$primary-500',
              },

              '@bp1': {
                fontSize: '$xl',
                paddingInline: '$md',
              },
            }}
          >
            {icon}
          </Flex>
        </NextLink>
      ))}

      <NextLink href="/app/new">
        <Flex
          css={{
            color: 'white',
            cursor: 'pointer',
            display: 'none',
            padding: '$sm',
            fontSize: '$2xl',
            borderRadius: '$full',
            transitionDuration: '0.1s',
            backgroundColor: '$primary-500',

            '&:hover': {
              color: 'white',
              backgroundColor: '$primary-500',
            },

            '@bp1': {
              display: 'flex',
            },
          }}
        >
          <MdAdd />
        </Flex>
      </NextLink>

      {getRightIcons.map(({ icon, href, isLogout }, idx) => (
        <NextLink href={!isLogout ? href : ''} key={idx}>
          <Flex
            css={{
              color: isCurrentPath(href) ? 'white' : '$primary-500',
              cursor: 'pointer',
              padding: '$sm',
              fontSize: '$lg',
              borderRadius: '$xs',
              transitionDuration: '0.1s',
              backgroundColor: isCurrentPath(href)
                ? '$primary-500'
                : 'transparent',

              '&:hover': {
                backgroundColor: '$primary-500',
                color: 'white',
              },

              '@bp1': {
                display: 'flex',
                fontSize: '$xl',
                paddingInline: '$md',
              },
            }}
            onClick={() =>
              isLogout &&
              signOut({
                callbackUrl: '/app/spots',
              })
            }
          >
            {icon}
          </Flex>
        </NextLink>
      ))}
    </Flex>
  );
};
