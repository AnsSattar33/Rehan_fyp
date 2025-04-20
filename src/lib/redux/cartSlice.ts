import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem } from '../types/TypeCart.ts';
import { totalmem } from 'os';

interface cartState {
    items: CartItem[];
    totalPrice?: number;
}


const initialState: cartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },


        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        // clearCart: (state) => {
        //     state.items = [];
        // },
        // updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
        //     const item = state.items.find(item => item.id === action.payload.id);
        //     if (item) {
        //         item.quantity = action.payload.quantity;
        //     }
        // },
        incrementItemQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementItemQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item) {
                state.items = state.items.filter(i => i.id !== action.payload);
            }
        },
        // setCartItems: (state, action: PayloadAction<CartItem[]>) => {
        //     state.items = action.payload;
        // },
    },
});

export const { addItem, incrementItemQuantity, decrementItemQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;