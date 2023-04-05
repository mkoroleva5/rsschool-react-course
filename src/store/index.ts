import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsSlice';
import catsReducer from './catsSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    cats: catsReducer,
  },
});
