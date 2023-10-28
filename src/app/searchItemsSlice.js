import { createSlice } from "@reduxjs/toolkit";

const searchItemsSlice = createSlice({
  name: "search",
  initialState: {
    searchElements: { name: "", page: "1", type: "movie" },
    seeAllPage: "1",
  },
  reducers: {
    addSearchElements(state, action) {
      state.searchElements.name =
        action.payload.name || state.searchElements.name;
      state.searchElements.page =
        action.payload.page || state.searchElements.page;
      state.searchElements.type =
        action.payload.type || state.searchElements.type;
    },
    addSeeAllPage(state, action) {
      state.seeAllPage = action.payload;
    },
  },
});

export const searchActions = searchItemsSlice.actions;

export default searchItemsSlice;
