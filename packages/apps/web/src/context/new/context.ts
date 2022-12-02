import { createContext } from 'react';

import { NewSpotContextState } from './types';

export const NewSpotContext = createContext<NewSpotContextState>(
  {} as NewSpotContextState,
);
