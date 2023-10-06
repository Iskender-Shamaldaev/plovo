import React from 'react';
import {IDish} from "../../types";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {addDish} from "../../store/cartSlice";
import {deleteDish, fetchDishes} from "../../store/dishesThunk";
import {selectDeleteDishLoading} from "../../store/dishesSlice";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";

interface Props {
    dish: IDish;
}

const DishItem: React.FC<Props> = ({dish}) => {
    const dispatch  = useAppDispatch();
    const deleteLoading = useAppSelector(selectDeleteDishLoading);
    const imageUrl = 'https://s1.eda.ru/StaticContent/Photos/120131082439/160124115932/p_O.jpg';
    const image = dish.image || imageUrl;

    const imageStyle: React.CSSProperties = {
        background: `url(${image}) center / cover no-repeat`,
    };

    const addDishToCart = () => {
        dispatch(addDish(dish));
    };

    const onDelete = async () => {
        if(window.confirm('Do you really want to delete this dish?')) {
           await dispatch(deleteDish(dish.id));
           await dispatch(fetchDishes());
        }
    };

    return (
        <div className="card mb-2">
            <div className="row no-gutters">
                <div className="col-sm-4 rounded-start" style={imageStyle}/>
                <div className="col-sm-8 ps-0">
                    <div className="card-body">
                        <h5 className="card-title">{dish.name}</h5>
                        <p className="card-text small">{dish.description}</p>
                        <p className="card-text">{dish.price} KGS</p>
                    </div>
                    <div className="card-footer">
                        <button
                            className="btn btn-success me-2"
                            onClick={addDishToCart}
                        >
                            Add
                        </button>
                        <Link
                            to={'/edit-dish/' + dish.id}
                            className="btn btn-primary me-2">
                            Edit
                        </Link>

                        <button
                            className="btn btn-danger"
                            onClick={onDelete}
                            disabled={ deleteLoading ? deleteLoading === dish.id : false }
                        >
                            {deleteLoading && deleteLoading === dish.id && <ButtonSpinner />}
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishItem;