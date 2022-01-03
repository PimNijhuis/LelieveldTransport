import { UPDATE_CURRENT_TASK_TYPE } from "./actionTypes";


const initialState = {
    type: "inslagAanmelden",
    title: "Aanmelden pallet",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_TASK_TYPE:
      return {
        ...state,
        type: action.payload.type,
        title: action.payload.title,
      };
    default:
      return state;
  }
}