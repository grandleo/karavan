import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";


const initialState = {
    active: 0,
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setActiveOrder: (state, action) => {
            state.active = action.payload;
        },
    }
})

export const {actions, reducer} = ordersSlice;

export const getOrdersState = (state: RootState) => state.orders;