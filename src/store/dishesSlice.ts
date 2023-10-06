import {IDish, IDishMutation} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createDish, deleteDish, fetchDish, fetchDishes, updateDish} from "./dishesThunk";
import {RootState} from "../app/store";

interface DishState {
    items: IDish[];
    dish: IDishMutation | null;
    fetchLoading: boolean;
    deleteLoading: boolean | string;
    createLoading: boolean;
    fetchOneLoading: boolean;
    updateOneLoading: boolean;
}

const initialState: DishState = {
    items: [],
    dish: null,
    fetchLoading: false,
    deleteLoading: false,
    createLoading: false,
    fetchOneLoading: false,
    updateOneLoading: false,
};

const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDishes.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchDishes.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.items = action.payload;
        });

        builder.addCase(fetchDishes.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(fetchDish.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchDish.fulfilled, (state,{payload: dish}) => {
            state.fetchLoading = false;
            state.dish = dish;
        });

        builder.addCase(fetchDish.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(updateDish.pending, (state) => {
            state.updateOneLoading = true;
        });

        builder.addCase(updateDish.fulfilled, (state) => {
            state.updateOneLoading = false;
        });

        builder.addCase(updateDish.rejected, (state) => {
            state.updateOneLoading = false;
        });

        builder.addCase(createDish.pending,(state) =>  {
            state.createLoading = true;
        });
        builder.addCase(createDish.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createDish.rejected, (state) => {
            state.createLoading = false;
        });

        builder.addCase(deleteDish.pending,(state, action) =>  {
            state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deleteDish.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteDish.rejected, (state) => {
            state.deleteLoading = false;
        });
    },
});

export const selectDishes = (state: RootState) => state.dishes.items;
export const selectDish = (state: RootState) => state.dishes.dish;
export const selectFetchLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDeleteDishLoading = (state: RootState) => state.dishes.deleteLoading;
export const selectDishCreateLoading = (state: RootState) => state.dishes.createLoading;
export const selectDishUpdateLoading = (state: RootState) => state.dishes.updateOneLoading;
export const selectDishFetchLoading = (state: RootState) => state.dishes.fetchOneLoading;
export const dishesReducer = dishesSlice.reducer;

