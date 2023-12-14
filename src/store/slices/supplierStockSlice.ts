import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
    selectedCategory: 0,
    selectedWarehouse: 0,
}

export const supplierStockSlice = createSlice({
    name: 'supplierStock',
    initialState,
    reducers: {
        setSelectedCategorySupplierStock: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSelectedWarehouseSupplierStock: (state, action) => {
            state.selectedWarehouse = action.payload;
        }
    }
})
export const {actions, reducer} = supplierStockSlice;
export const getSupplierStock = (state: RootState) => state.supplierStock;