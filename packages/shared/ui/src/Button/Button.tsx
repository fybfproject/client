import { styled, ComponentProps } from '@fybf/shared.theme';

export const Button = styled('button', {
  width: 'fit-content',
  color: 'white',
  border: 'none',
  fontSize: '$sm',
  fontFamily: '$body',
  transition: 'background-color 0.2s ease-in-out',
  borderRadius: '$xs',
  paddingBlock: '$md',
  paddingInline: '$lg',
  pointerEvents: 'all',
  backgroundColor: '$primary-500',
  fontWeight: 500,

  '&:hover': {
    backgroundColor: '$primary-600',
  },

  variants: {
    secondary: {
      true: {
        color: '$primary-700',
        border: '1px solid $primary-500',
        backgroundColor: 'white',

        '&:hover': {
          backgroundColor: '$primary-200',
        },
      },
    },

    disabled: {
      true: {
        opacity: 0.5,
        userSelect: 'none',
        pointerEvents: 'none',
      },
    },
  },
});

export type ButtonProps = ComponentProps<typeof Button>;
