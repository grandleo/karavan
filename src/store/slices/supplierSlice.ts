import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
    supplier_id: 0,
    search: ''
}

export const supplierSlice = createSlice({
    name: 'suppliers',
    initialState,
    reducers: {
        setSupplierIdUpdate: (state, action) => {
            state.supplier_id = action.payload
        },
        supplierSetSearch: (state, action) => {
            state.search = action.payload
        },
        resetSupplierState: () => {
            return initialState
        }
    }
})

export const {actions, reducer} = supplierSlice;

export const getSuppliersState = (state: RootState) => state.suppliers;