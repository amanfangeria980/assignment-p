// slices/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        page: 0,
    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setProducts(state, action) {
            state.products = action.payload;
        },
        addProducts(state, action) {
            state.products.push(...action.payload);
        },
        incrementPage(state) {
            state.page += 1;
        },
        resetProducts(state) {
            state.products = [];
            state.page = 0;
        },
    },
});

export const {
    setLoading,
    setProducts,
    addProducts,
    incrementPage,
    resetProducts,
} = productSlice.actions;

export const fetchProductsByCategory =
    (categoryUrl, page) => async (dispatch) => {
        dispatch(setLoading(true));
        const url = `${categoryUrl}?limit=10&skip=${page * 10}`;
        const response = await fetch(url);
        const data = await response.json();
        dispatch(addProducts(data.products));
        dispatch(setLoading(false));
    };

export default productSlice.reducer;
