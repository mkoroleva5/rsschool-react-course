import { SliceCaseReducers, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CardProps } from '../components/Card/Card';
import { createApi } from 'unsplash-js';

export interface CardsState {
  cards: CardProps[];
  search: string;
  status: string | null;
  error: unknown;
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

const unsplashApi = createApi({
  accessKey: 'E5bvAoy3CzFiyPKWtrefHM0hluG_543-BOZxiJ0XNfY',
});

export const fetchPhotos = createAsyncThunk(
  'cards/fetchPhotos',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await unsplashApi.search.getPhotos({
        query: query,
        orientation: 'landscape',
      });

      if (!response.originalResponse.ok) {
        throw new Error('Server Error');
      }

      return response?.response?.results;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue(error);
    }
  }
);

const cardsSlice = createSlice<CardsState, SliceCaseReducers<CardsState>>({
  name: 'cards',
  initialState: {
    cards: getCardsList(),
    search: '',
    status: null,
    error: null,
  },
  reducers: {
    addSearchValue(state, action) {
      state.search = action.payload.value;
    },

    clearSearchValue(state) {
      state.search = '';
    },

    removeCard(state, action) {
      state.cards = state.cards.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.cards = [];
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'resolved';
        if (action.payload?.length === 0) {
          state.status = 'no results';
        } else if (action.payload!.length > 0) {
          const cardsArray = action.payload?.map((item, index) => {
            return {
              id: index + 1,
              name: action.meta.arg,
              description: item.user.instagram_username
                ? `Instagram: @${item.user.instagram_username}`
                : '',
              breed: `Author: ${item.user.name} ${
                item.user.location ? 'from ' + item.user.location : ''
              }`,
              info: `Published at ${item.created_at.slice(0, 10).split('-').reverse().join('.')}`,
              gender: `♥ ${item.likes}`,
              image: item.urls.regular,
            };
          });

          if (cardsArray) {
            state.cards = cardsArray;
          }
        }
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = 'rejected';
        state.cards = [];
        state.error = action.payload;
      });
  },
  /*{
    [`${fetchPhotos.pending.type}`]: (state) => {
      state.cards = [];
      state.status = 'pending';
      state.error = null;
    },
    [`${fetchPhotos.fulfilled.type}`]: (state, action: PayloadAction<Photos['results']>) => {
      state.status = 'resolved';
      if (action.payload.length === 0) {
        state.status = 'no results';
      } else if (action.payload.length > 0) {
        const cardsArray = action.payload.map((item, index) => {
          return {
            id: index + 1,
            name: '',
            description: item.user.instagram_username
              ? `Instagram: @${item.user.instagram_username}`
              : '',
            breed: `Author: ${item.user.name} ${
              item.user.location ? 'from ' + item.user.location : ''
            }`,
            info: `Published at ${item.created_at.slice(0, 10).split('-').reverse().join('.')}`,
            gender: `♥ ${item.likes}`,
            image: item.urls.regular,
          };
        });
        state.cards = cardsArray;
        console.log(action.payload);
      }
    },
    [`${fetchPhotos.rejected.type}`]: (state, action) => {
      state.status = 'rejected';
      state.cards = [];
      state.error = action.payload;
    },
  },*/
});

export const { removeCard, addSearchValue, clearSearchValue } = cardsSlice.actions;
export default cardsSlice.reducer;
