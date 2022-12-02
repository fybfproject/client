/* eslint-disable react/display-name */
import { FC, ForwardedRef, forwardRef } from 'react';

import { ComponentProps, styled } from '@fybf/shared.theme';

import { Flex } from '../Flex';

const StyledSelect = styled('select', {
  width: '100%',
  color: '$gray-700',
  border: 'none',
  paddingBlock: '$md',
  backgroundColor: 'white',
  fontFamily: '$body',
});

export type StyledSelectProps = ComponentProps<typeof StyledSelect>;

export interface SelectProps extends StyledSelectProps {
  options: {
    label: string;
    value: string;
  }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, ...props }, ref) => {
    return (
      <Flex
        css={{
          width: '100%',
          color: '$gray-900',
          border: '1px solid $gray-300',
          paddingInline: '$md',
          fontSize: '$sm',
          fontFamily: '$body',
          borderRadius: '$xs',
          transition: 'border-color 0.2s ease-in-out',
          backgroundColor: 'white',
        }}
      >
        <StyledSelect ref={ref} {...props}>
          {options.map(({ label, value }, key) => (
            <option key={key} value={value}>
              {label}
            </option>
          ))}
        </StyledSelect>
      </Flex>
    );
  },
);
