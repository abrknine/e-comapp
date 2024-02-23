import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './reducers/UserReducers';
import { notesSlice } from './reducers/NotesReducer';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notes: notesSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export default store;
