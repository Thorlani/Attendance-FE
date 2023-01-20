import { combineReducers, legacy_createStore as createStore } from "redux";
import { Auth } from "./AuthReducer";

const rootReducer = combineReducers({
  auth: Auth,
});
const store = createStore(rootReducer);

export default store;
