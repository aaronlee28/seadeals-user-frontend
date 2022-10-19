import { createSlice } from '@reduxjs/toolkit';

interface NavbarProfileInitialState {
  avatarURL: string,
  favoriteCount: number,
}

const initialState:NavbarProfileInitialState = {
  avatarURL: '',
  favoriteCount: 0,
};

const navbarProfileSlice = createSlice({
  name: 'navbarProfile',
  initialState,
  reducers: {
    setAvatarURL: (state, { payload }) => ({ ...state, avatarURL: payload }),
    setFavoriteCount: (state, { payload }) => {
      let count = 0;
      if (!Number.isNaN(Number(payload))) {
        count = Number(payload);
      }
      return { ...state, favoriteCount: count };
    },

    resetAvatarURL: (state) => ({ ...state, avatarURL: '' }),
    resetFavoriteCount: (state) => ({ ...state, favoriteCount: 0 }),
  },
  extraReducers: {

  },
});

export const {
  setAvatarURL, setFavoriteCount,
  resetFavoriteCount, resetAvatarURL,
} = navbarProfileSlice.actions;

export default navbarProfileSlice.reducer;
