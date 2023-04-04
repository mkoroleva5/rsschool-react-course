import { SliceCaseReducers, createSlice } from '@reduxjs/toolkit';
import { CardProps } from 'components/Card/Card';

export interface CardsState {
  cards: CardProps[];
  search: string;
}

const getCardsList = () => {
  const cardsList = localStorage.getItem('cards-list');

  try {
    return cardsList ? (JSON.parse(cardsList) as CardProps[]) : [];
  } catch (err) {
    localStorage.removeItem('cards-list');
    return [];
  }
};

const cardsSlice = createSlice<CardsState, SliceCaseReducers<CardsState>>({
  name: 'cards',
  initialState: {
    cards: getCardsList(),
    search: '',
  },
  reducers: {
    addSearchValue(state, action) {
      state.search = action.payload.value;
    },

    clearSearchValue(state) {
      state.search = '';
    },

    addCard(state, action) {
      state.cards.push({
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        breed: action.payload.breed,
        info: action.payload.info,
        gender: action.payload.gender,
        image: action.payload.image,
      });
    },

    removeCard(state, action) {
      state.cards = state.cards.filter((item) => item.id !== action.payload.id);
    },

    clearCards(state) {
      state.cards = [];
    },
  },
});

export const { addCard, removeCard, clearCards, addSearchValue, clearSearchValue } =
  cardsSlice.actions;
export default cardsSlice.reducer;
