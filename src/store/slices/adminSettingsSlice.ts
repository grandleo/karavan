import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
    opened: false,
    activeMenuItem: 0,
}

export const adminSettingsSlice = createSlice({
    name: "adminSettings",
    initialState,
    reducers: {
        setOpened: (state, action) => {
            console.log(state)
            state.opened = !state.opened;
        },
        setActiveMenuItem: (state, action) => {
            state.activeMenuItem = action.payload;
        },
    }
})

export const {actions, reducer} = adminSettingsSlice;

export const getAdminSettings = (state: RootState) => state.adminSettings;