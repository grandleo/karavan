import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
  active: 0,
}

export const specificationsSlice = createSlice({
    name: 'specifications',
    initialState,
    reducers: {
        setActiveSpecification: (state, action) => {
            state.active = action.payload;
        },
    }
})

export const {actions, reducer} = specificationsSlice;

export const getSpecificationsState = (state: RootState) => state.specifications;