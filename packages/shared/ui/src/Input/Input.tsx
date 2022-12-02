/* eslint-disable react/display-name */
import { styled } from '@fybf/shared.theme';
import { forwardRef } from 'react';

const InputPrimitive = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<'input'>
>((props, ref) => <input {...props} ref={ref} />);

export const Input = styled(InputPrimitive, {
  color: '$gray-900',
  border: '1px solid $gray-300',
  padding: '$md',
  fontSize: '$sm',
  fontFamily: '$body',
  borderRadius: '$xs',
  transition: 'border-color 0.2s ease-in-out',

  '&:focus': {
    outline: 'none',
    borderColor: '$gray-500',
  },

  '&::placeholder': {
    color: '$gray-500',
  },
});
