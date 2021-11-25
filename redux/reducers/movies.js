import { SET_MOVIES } from "../constants/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_MOVIES":
      return { ...state, payload };
    default:
      return state;
  }
}
