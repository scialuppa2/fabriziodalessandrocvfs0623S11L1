import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../reducers/index';
import searchResultsReducer from '../reducers/searchResults';

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        searchResults: searchResultsReducer,
    },
});

export default store;
