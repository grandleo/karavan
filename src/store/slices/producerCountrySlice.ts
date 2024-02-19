import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
    producer_country_id: 0
}

export const producerCountrySlice = createSlice({
    name: 'producerCountries',
    initialState,
    reducers: {
        setProducerCountryId: (state, action) => {
            state.producer_country_id = action.payload
        },
        resetProducerCountryState: () => {
            return initialState
        }
    }
});

export const {actions, reducer} = producerCountrySlice;

export const getProducerCountriesState = (state: RootState) => state.producerCountries;