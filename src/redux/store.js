import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "./rootSaga";
import dataReducer  from "./data/dataSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['isLoggedIn','filteredItems','isLoaded',"transactionStatus","fileName","dataFile","user", "isFileLoaded" ]
  
};
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    data: persistReducer(persistConfig, dataReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,'READATA'],
      },
    }).concat(sagaMiddleware,)
});
sagaMiddleware.run(rootWatcher);
setupListeners(store.dispatch);
export const persistor = persistStore(store);
