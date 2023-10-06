import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import DishForm from "../../components/DishForm/DishForm";
import Spinner from "../../components/Spinner/Spinner";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectDish, selectDishFetchLoading, selectDishUpdateLoading} from "../../store/dishesSlice";
import {fetchDish, updateDish} from "../../store/dishesThunk";
import {TApiDish} from "../../types";


const EditDish = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams() as {id: string};
    const navigate = useNavigate();
    const dish = useAppSelector(selectDish);
    const fetchDishLoading = useAppSelector(selectDishFetchLoading);
    const updateDishLoading = useAppSelector(selectDishUpdateLoading);


    useEffect(() => {
       dispatch(fetchDish(id))
    }, [dispatch, id]);

    const onSubmit = async (dish: TApiDish) => {
        await dispatch(updateDish({id, dish}));
        navigate('/');
    };


    return (
        <div>
            {fetchDishLoading && <Spinner />}
            {dish &&
                <DishForm onSubmit={onSubmit}
                          existingDish={dish}
                          isLoading={updateDishLoading}
                          isEdit
                />
            }
        </div>
    );
};

export default EditDish;