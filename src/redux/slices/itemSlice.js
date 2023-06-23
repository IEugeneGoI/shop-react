import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isEqualCreator } from "../../utils/isEqualCreator";

const determineEquals = isEqualCreator();

export const getItemsForSlider = createAsyncThunk(
    "item/getItemsForSlider",
    async () => {
        const { data } = await axios.get(
            `https://6492e040428c3d2035d0d69d.mockapi.io/products`
        );
        return data;
    },
    {
        condition: (_, { getState }) => {
            const { item } = getState();
            return item.items.length === 0;
        },
    }
);

export const fetchItems = createAsyncThunk(
    "item/fetchItemsStatus",
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get(
            `https://6492e040428c3d2035d0d69d.mockapi.io/products?page=${currentPage}&${
                category && `limit=8&`
            }${category}&sortBy=${sortBy}&order=${order}${search}`
        );

        return data;
    },
    {
        condition: (parameters) => determineEquals(parameters),
    }
);

const initialState = {
    items: [],
    status: "loading",
};

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.status = "loading";
            state.items = [];
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchItems.rejected, (state) => {
            state.status = "error";
            state.items = [];
        });
        builder.addCase(getItemsForSlider.pending, (state) => {
            state.status = "loading";
            state.items = [];
        });
        builder.addCase(getItemsForSlider.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
        });
        builder.addCase(getItemsForSlider.rejected, (state) => {
            state.status = "error";
            state.items = [];
        });
    },
});

export const selectItemData = (state) => state.item;

export const { setItems } = itemSlice.actions;

export default itemSlice.reducer;
