import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {IDish, IDishesList, IDishMutation, TApiDish} from "../types";
import {AppDispatch} from "../app/store";
import {updateDishes} from "./cartSlice";

export const fetchDishes = createAsyncThunk<IDish[], undefined, { dispatch: AppDispatch }>(
    'dishes/fetchAll',
    async (_, thunkAPI) => {
        const dishesResponse = await axiosApi.get<IDishesList | null>('/dishes.json');
        const dishes = dishesResponse.data;

        let newDishes: IDish[] = [];

        if (dishes) {
            newDishes = Object.keys(dishes).map((key) => {
                return {...dishes[key], id: key};
            });
        }
        thunkAPI.dispatch(updateDishes(newDishes));
        return newDishes;
    },
);

export const fetchDish = createAsyncThunk<IDishMutation, string>(
    'dishes/fetchOne',
    async (id) => {
        const response = await axiosApi<TApiDish | null>(`/dishes/${id}.json`);
        const dish = response.data;

        if (dish === null) {
            throw new Error ('Not Found!');
        }

        return {
            ...dish,
            price: String(dish.price),
        };
    },
);

export const createDish = createAsyncThunk<void, TApiDish>(
    'dishes/create',
    async (dish) => {
        await axiosApi.post('/dishes.json', dish);
    },
);

interface updateDishParams {
    id: string;
    dish: TApiDish;
}

export const updateDish = createAsyncThunk<void, updateDishParams>(
    'dishes/update',
    async (params) => {
        await axiosApi.put(`dishes/${params.id}.json`, params.dish);
    }
);

export const deleteDish = createAsyncThunk(
    'dishes/delete',
    async (id: string) => {
        await axiosApi.delete(`dishes/${id}.json`);
    },
);