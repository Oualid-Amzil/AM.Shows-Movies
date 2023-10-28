import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./uiSlice";
import authSlice from "./auth/authSlice";
import searchItemsSlice from "./searchItemsSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    search: searchItemsSlice.reducer,
  },
});
