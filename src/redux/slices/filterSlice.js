import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
    categoryId: 0,
    currentPage: 1,
    sort: { name: "популярности 🡓", code: 0, sortProp: "rating" },
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
});

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
