import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
    client_id: 0,
    search: ''
}

export const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setClientIdUpdate: (state, action) => {
            state.client_id = action.payload
        },
        clientSetSearch: (state, action) => {
            state.search = action.payload
        },
        resetClientState: () => {
            return initialState
        }
    }
})

export const {actions, reducer} = clientSlice;

export const getClientsState = (state: RootState) => state.clients;