import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

interface WarehouseState {
    editValues: IWarehouse | null;
}

const initialState: WarehouseState = {
    editValues: null,
}

export const warehouseSlice = createSlice({
    name: "warehouse",
    initialState,
    reducers: {
        setWarehouseFormValues: (state, action) => {
            state.editValues = action.payload;
        },
        resetWarehouseFormValues: (state, action) => {
            return initialState
        }
    }
});

export const {actions, reducer} = warehouseSlice;
export const getWarehouseState = (state: RootState) => state.warehouse