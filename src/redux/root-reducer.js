import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import appReducer from "./reducers/app.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["app"],
};

const rootReducer = combineReducers({
  app: appReducer,
});

export default persistReducer(persistConfig, rootReducer);
