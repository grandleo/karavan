import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
    admin_id: 0
}

export const adminsSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
        setAdminIdUpdate: (state, action) => {
            state.admin_id = action.payload
        },
        resetAdminState: () => {
            return initialState
        }
    }
});

export const {actions, reducer} = adminsSlice;

export const getAdminsState = (state: RootState) => state.admins;