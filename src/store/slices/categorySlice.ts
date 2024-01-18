import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";


const initialState = {
    activeCategory: 0,
    selectedCategory: 0,
    categoryIdForProduct: 0,
    editCategory: {
        id: 0,
        name: '',
        parent_id: 0,
        category_specifications: [],
        required_period_validity: 0,
    },
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setEditCategory: (state, action) => {
            state.editCategory = action.payload;
        },
        setCategoryIdForProduct: (state, action) => {
            state.categoryIdForProduct = action.payload;
        },
    }
})

export const {actions, reducer} = categorySlice;

export const getCategoriesState = (state: RootState) => state.categories;