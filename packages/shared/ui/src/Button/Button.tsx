import { styled, ComponentProps } from '@fybf/shared.theme';

export const Button = styled('button', {
  width: 'fit-content',
  color: 'white',
  border: 'none',
  fontSize: '$md',
  fontFamily: '$body',
  borderRadius: '4px',
  paddingBlock: '$md',
  paddingInline: '$lg',
  backgroundColor: '$gray-900',
  transition: 'background-color 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: '$gray-800',
  },
});

export type ButtonProps = ComponentProps<typeof Button>;
