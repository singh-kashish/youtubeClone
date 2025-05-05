import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react';
import suggestedVideoReducer from "./reduxReducers/suggestedVideoSlice";
import playlistReducer from "./reduxReducers/playlistSlice";
import { createTransform } from "redux-persist";
import { SuggestedVideoState } from "./src/types/VideoRedux";

// Create a custom transform to remove non-serializable data
const removeFunctionsTransform = createTransform<SuggestedVideoState, SuggestedVideoState>(
  // `in` transformation: Modifies the state before persisting
  (inboundState) => {
    // Remove non-serializable data like functions
    return {
      ...inboundState,
      register: undefined, // Remove any functions or non-serializable data
    };
  },
  
  // `out` transformation: Modifies the state after rehydration (optional)
  (outboundState) => outboundState,

  // Optionally, apply this transform to only a specific reducer
  { whitelist: ['suggestedVideo'] } // Apply only to the `suggestedVideo` reducer
);


// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,  // Using localStorage or sessionStorage
  whitelist: ["cache"], // Only persist the 'cache' part of the state
  transforms: [removeFunctionsTransform], // Apply custom transforms
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, suggestedVideoReducer);

const store = configureStore({
  reducer: {
    suggestedVideo: persistedReducer,
    playlist: playlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export type rootState = ReturnType<typeof store.getState>;
export {persistor, store}; 