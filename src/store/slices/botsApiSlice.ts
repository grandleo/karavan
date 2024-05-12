import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

interface BotApiState {
    editValues: IBotType | null;
}

const initialState: BotApiState = {
    editValues: null,
}

export const botApiSlice = createSlice({
    name: "botApi",
    initialState,
    reducers: {
        setBotApiFormValues: (state, action) => {
            state.editValues = action.payload;
        },
        resetBotApiFormValues: (state, action) => {
            return initialState
        }
    }
});

export const {actions, reducer} = botApiSlice;
export const getBotApiSliceState = (state: RootState) => state.botApi