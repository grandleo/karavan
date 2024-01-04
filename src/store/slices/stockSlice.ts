import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
    choseCategory: 0,
    choseWarehouseClient: 0,
}

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        chooseCategory: (state, action) => {
            state.choseCategory = action.payload;
        },
        chooseWarehouseClient: (state, action) => {
            state.choseWarehouseClient = action.payload
        },
    }
})

export const {actions, reducer} = stockSlice;
export const getStock = (state: RootState) => state.stock;