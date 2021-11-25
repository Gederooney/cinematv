import { SET_MOVIES } from "../constants/types";

export const setMovies = (movies) => (dispatch) => {
  console.log("here");
  dispatch({ type: SET_MOVIES, payload: movies });
};
