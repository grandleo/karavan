import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
    logistic_id: 0,
    search: ''
}

export const logisticSlice = createSlice({
    name: 'logistics',
    initialState,
    reducers: {
        setLogisticIdUpdate: (state, action) => {
            state.logistic_id = action.payload
        },
        logisticSetSearch: (state, action) => {
            state.search = action.payload
        },
        resetLogisticState: () => {
            return initialState
        }
    }
})

export const {actions, reducer} = logisticSlice;

export const getLogisticsState = (state: RootState) => state.logistics;