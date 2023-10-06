import React from 'react';
import DishForm from "../../components/DishForm/DishForm";
import {TApiDish} from "../../types";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectDishCreateLoading} from "../../store/dishesSlice";
import {createDish} from "../../store/dishesThunk";

const NewDish = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectDishCreateLoading);

    const onSubmit = async (dish: TApiDish) => {
        await dispatch(createDish(dish));
        navigate('/');
    };

    return (
        <div className="">
                <DishForm onSubmit={onSubmit} isLoading={loading}/>
        </div>
    );
};

export default NewDish;