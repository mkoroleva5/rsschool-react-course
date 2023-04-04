import { SliceCaseReducers, createSlice } from '@reduxjs/toolkit';
import { CardProps } from 'components/Card/Card';

export interface CatsState {
  cats: CardProps[];
}

const getCatsList = () => {
  const cardsList = localStorage.getItem('cats-list');

  try {
    return cardsList ? (JSON.parse(cardsList) as CardProps[]) : [];
  } catch (err) {
    localStorage.removeItem('cats-list');
    return [];
  }
};

const catsSlice = createSlice<CatsState, SliceCaseReducers<CatsState>>({
  name: 'cats',
  initialState: {
    cats: getCatsList(),
  },
  reducers: {
    addCat(state, action) {
      state.cats.push({
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        breed: action.payload.breed,
        info: action.payload.info,
        gender: action.payload.gender,
        image: action.payload.image,
      });
    },

    removeCat(state, action) {
      state.cats = state.cats.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addCat, removeCat, clearCats } = catsSlice.actions;
export default catsSlice.reducer;
