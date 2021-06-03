import { configureStore } from "@reduxjs/toolkit";
import { propertiesSlice } from "./slices/propertiesSlice";

// ReduxKit setup - from original docs
export const store = configureStore({
  reducer: { propertiesREDUCER: propertiesSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
