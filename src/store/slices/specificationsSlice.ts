import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

interface SpecificationsState {
    value: number
}

const initialState: SpecificationsState = {
  value: 0
}

export const specificationsSlice = createSlice({
    name: 'specifications',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
    }
})

export const {increment, decrement} = specificationsSlice.actions

export const selectSpecifications = (state: RootState) => state.specifications.value

export default specificationsSlice.reducer