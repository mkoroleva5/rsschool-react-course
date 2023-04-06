import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsSlice';
import catsReducer from './catsSlice';
import { createApi } from 'unsplash-js';

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

export const createStore = (api: ReturnType<typeof createApi>) => {
  return configureStore({
    reducer: {
      cards: cardsReducer,
      cats: catsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { api },
        },
      }),
  });
};
