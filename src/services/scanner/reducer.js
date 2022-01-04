import { INSLAG_AANMELDEN, INSLAG_CHECK } from "./actionTypes";

const initialState = {
  item_info: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INSLAG_AANMELDEN:
      return {
        ...state,
        item_info: action.payload,
      };
    case INSLAG_CHECK:
      return {
        ...state,
        item_info: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
