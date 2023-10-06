import {ICartDish, IDish} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

interface CartState {
    cartDishes: ICartDish[];
}

const initialState: CartState = {
    cartDishes: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addDish: (state, {payload: dish}: PayloadAction<IDish>) => {
            const existingIndex = state.cartDishes.findIndex(cartItem => cartItem.dish.id === dish.id);

            if (existingIndex !== -1) {
                state.cartDishes[existingIndex].amount++;
            } else {
                state.cartDishes.push({
                    amount: 1,
                    dish,
                });
            }
        },
        updateDishes: (state, {payload: dishes}: PayloadAction<IDish[]>) => {
            const newCartDishes: ICartDish[] = [];

            state.cartDishes.forEach((cartDish) => {
                const existingDish = dishes.find((dish) => cartDish.dish.id === dish.id);

                if (!existingDish) {
                    return;
                }

                newCartDishes.push({
                    ...cartDish,
                    dish: existingDish,
                });
                state.cartDishes = newCartDishes;
            });
        },
        resetCart: (state) => {
            state.cartDishes = [];
        },
    },
});

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;
export const cartReducer = cartSlice.reducer;
export const { addDish, resetCart, updateDishes } = cartSlice.actions;
