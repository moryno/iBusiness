import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import userReducer from "./reducers/userSlice";
import bookingReducer from "./reducers/bookingSlice";
import purchaseOrderReducer from "./reducers/purchaseOrderSlice";
import securityGroupReducer from "./reducers/securityGroupSlice";
import userGroupReducer from "./reducers/userGroupSlice";
import moduleSlice from "./reducers/moduleSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  booking: bookingReducer,
  purchase: purchaseOrderReducer,
  securityGroups: securityGroupReducer,
  userGroups: userGroupReducer,
  moduleCategory: moduleSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
