import { styled } from '@fybf/shared.theme';

export const Text = styled('span', {
  color: '$gray-900',
  fontSize: '$md',

  variants: {
    size: {
      xs: {
        fontSize: '$xs',
      },
      sm: {
        fontSize: '$sm',
      },
      md: {
        fontSize: '$md',
      },
      lg: {
        fontSize: '$lg',
      },
      xl: {
        fontSize: '$xl',
      },
      '2xl': {
        fontSize: '$2xl',
      },
      '3xl': {
        fontSize: '$3xl',
      },
      '4xl': {
        fontSize: '$4xl',
      },
      '5xl': {
        fontSize: '$5xl',
      },
      '6xl': {
        fontSize: '$6xl',
      },
    },

    weight: {
      normal: {
        fontWeight: '$normal',
      },
      medium: {
        fontWeight: '$medium',
      },
      bold: {
        fontWeight: '$bold',
      },
    },
  },
});
