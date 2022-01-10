import {
  INSLAG_AANMELDEN,
  INSLAG_CHECK,
  UITSLAG_AANMELDEN_INFO,
  UITSLAG_AANMELDEN_ROWS,
  UITSLAG_AFMELDEN,
  DEFECT_OPSLAAN,
} from "./actionTypes";

const initialState = {
  item_info: [],
  pakbon_info: [],
  pakbon_rijen: [],
  defect_qr: "",
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
    case UITSLAG_AANMELDEN_INFO:
      return {
        ...state,
        pakbon_info: action.payload,
      };
    case UITSLAG_AANMELDEN_ROWS:
      return {
        ...state,
        pakbon_rijen: action.payload,
      };
    case UITSLAG_AFMELDEN:
      return {
        ...state,
        pakbon_rijen: action.payload,
      };
<<<<<<< HEAD
    case DEFECT_OPSLAAN:
      return {
        ...state,
        defect_qr: action.payload,
      };
=======
>>>>>>> main
    default:
      return {
        ...state,
      };
  }
}
