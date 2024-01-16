export const addToFavorites = (job) => ({
    type: "ADD_TO_FAVORITES",
    payload: job,
});

export const removeFromFavorites = (job) => ({
    type: "REMOVE_FROM_FAVORITES",
    payload: job,
});

export const setSearchResults = (results) => ({
    type: "SET_SEARCH_RESULTS",
    payload: results,
});

export const favoriteOperation = (job, operation) => ({
    type: "FAVORITE_OPERATION",
    payload: { job, operation },
});


export const fetchSearchResults = (query) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`https://strive-benchmark.herokuapp.com/api/jobs?search=${query}&limit=20`);
            if (response.ok) {
                const { data } = await response.json();
                dispatch(setSearchResults(data));
            } else {
                alert("Error fetching results");
            }
        } catch (error) {
            console.log(error);
        }
    };
};
