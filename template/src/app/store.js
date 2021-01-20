
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './globalSlice';
import aboutReducer from '../pages/about/aboutSlice';

// DavidASays: design your store before writing one single line of code!!

export default configureStore({
  reducer: {
    global: globalReducer,
    counter: aboutReducer,
  },
});

// read:  https://redux-toolkit.js.org/api/createslice/ 
