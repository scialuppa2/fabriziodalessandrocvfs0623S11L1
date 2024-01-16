const initialState = {
  favorites: [],
  searchResults: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter((job) => job._id !== action.payload._id),
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: [...state.searchResults, ...action.payload],
      };
    default:
      return state;
  }
};

export default favoritesReducer;
