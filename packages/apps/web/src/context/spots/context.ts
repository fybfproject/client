import { createContext } from 'react';

import { SpotsContextState } from './types';

export const SpotsContext = createContext<SpotsContextState>(
  {} as SpotsContextState,
);
