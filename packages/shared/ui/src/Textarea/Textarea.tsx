/* eslint-disable react/display-name */
import { forwardRef } from 'react';

import { styled } from '@fybf/shared.theme';

const InputPrimitive = forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithRef<'textarea'>
>((props, ref) => <textarea {...props} ref={ref} />);

export const Textarea = styled(InputPrimitive, {
  color: '$gray-900',
  border: '1px solid $gray-300',
  padding: '$md',
  resize: 'none',
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
