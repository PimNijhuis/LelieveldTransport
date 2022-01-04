import { LOGIN } from "./actionTypes";

const initialState = {
  login_data: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login_data: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
