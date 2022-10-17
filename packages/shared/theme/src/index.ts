import { createStitches } from '@stitches/react';
export type { ComponentProps } from '@stitches/react';

import { colors, space, fonts, fontSizes } from './foundations';
export { colors, space, fonts, fontSizes } from './foundations';

export const { styled, css, globalCss, getCssText } = createStitches({
  theme: {
    colors,
    space,
    fonts,
    fontSizes,
  },
});

export const resetStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    outline: 0,
  },
  body: {
    fontFamily: '$body',
    fontSize: '$md',
    width: '100vw',
    height: '100vh',
  },
  button: {
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  },
});
