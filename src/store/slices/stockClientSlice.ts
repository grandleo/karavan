import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";

const initialState = {
    activeCategory: 0,
    order: {
        order_number: '№ 21234',
        products: []
    }
}

export const stockClientSlice = createSlice({
    name: 'stockClient',
    initialState,
    reducers: {
        setActiveCategoryStock: (state, action) => {
            state.activeCategory = action.payload;
        },
        addProductToOrder: (state, action) => {
            const { id, name, price, qty } = action.payload;

            // Проверяем, есть ли уже товар с данным id в заказе
            const existingProduct = state.order.products.find(product => product.id === id);

            if (existingProduct) {
                // Если товар уже существует, обновляем qty
                existingProduct.qty += qty;
            } else {
                // Если товар не существует, добавляем новый объект продукта
                state.order.products.push({ id, name, price, qty });
            }
        },
    }
})

export const {actions, reducer} = stockClientSlice;
export const getStockClient = (state: RootState) => state.stockClient;