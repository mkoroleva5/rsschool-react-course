import React from 'react';
import { createApi } from 'unsplash-js';

export const ApiContext = React.createContext<ReturnType<typeof createApi>>(null!);
