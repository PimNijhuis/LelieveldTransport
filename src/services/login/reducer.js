import { LOGIN } from "./actionTypes";

const initialState = {
  login_data: [], // Jeroen had dit veranderd naar {}. Dit kan denk ik ook maar wilde uitgebreid testen of dit wel werkt.
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login_data: action.payload,
      };
    default:
      // console.log("default reducer");
      return {
        ...state,
      };
  }
}
