import { configureStore, combineReducers } from '@reduxjs/toolkit';
import favoritesReducer from '../reducers/index';
import searchResultsReducer from '../reducers/searchResults';

const rootReducer = combineReducers({
    favorites: favoritesReducer,
    searchResults: searchResultsReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
