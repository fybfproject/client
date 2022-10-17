import { styled, ComponentProps } from '@fybf/shared.theme';

export const Button = styled('button', {
  width: 'fit-content',
  color: 'white',
  border: 'none',
  fontSize: '$md',
  fontFamily: '$body',
  borderRadius: '4px',
  paddingBlock: '$sm',
  paddingInline: '$md',
  backgroundColor: '$gray-900',
});

export type ButtonProps = ComponentProps<typeof Button>;
