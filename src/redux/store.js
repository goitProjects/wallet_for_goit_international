import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
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
import storage from "redux-persist/lib/storage";
import { categoriesReducer } from "./categories";

import { sessionReducer } from "./session";
import { walletApi } from "./wallet";

const persistSession = {
  key: "wallet/session",
  storage,
  whitelist: ["token"],
};

const persistCategories = {
  key: "wallet/categories",
  storage,
  whitelist: ["data"],
};

const store = configureStore({
  reducer: {
    session: persistReducer(persistSession, sessionReducer),
    categories: persistReducer(persistCategories, categoriesReducer),
    [walletApi.reducerPath]: walletApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    walletApi.middleware,
  ],
  devTools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);

const persistor = persistStore(store);

export { store, persistor };
