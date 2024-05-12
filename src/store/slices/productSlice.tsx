import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
    product_id: 0
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductId: (state, action) => {
            state.product_id = action.payload;
        },
    }
})

export const {actions, reducer} = productSlice;

export const getProductsState = (state: RootState) => state.products;