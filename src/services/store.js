import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const store = (initialState) => {
  initialState =
    JSON.parse(window.localStorage.getItem("state")) || initialState;
  const middleware = [thunk];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware)
      /* window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__() */
    )
  );

  store.subscribe(() => {
    const state = store.getState();
    const persist = {
      login: state.login,
      general: state.general,
      hub: state.hub,
      suppliers: state.suppliers,
      order: state.order,
      currentTaskType: state.currentTaskType
    };
    // console.log(persist.orderHistory.order_id)
    // console.log(persist.assortiment);
    window.localStorage.setItem("state", JSON.stringify(persist));
  });

  return store;
};

export default store;
