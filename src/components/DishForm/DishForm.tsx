import React, {useEffect, useState} from 'react';
import {IDishMutation, TApiDish} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";


interface Props {
    onSubmit: (newDish: TApiDish) => void;
    existingDish?: IDishMutation;
    isEdit?: boolean;
    isLoading?: boolean;
}

const initialState = {
    name: '',
    description: '',
    image: '',
    price: ''
};

const DishForm: React.FC<Props> = ({
       onSubmit,
       existingDish = initialState,
       isEdit,
       isLoading = false}) => {

    const [newDish, setDish] = useState<IDishMutation>(existingDish);

    useEffect(() => {
        if (existingDish) {
            setDish(existingDish);
        }
    }, [existingDish]);

    const dishChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        setDish(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            ...newDish,
            price: parseFloat(newDish.price),
        });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <h4>{isEdit ? 'Edit dish' : 'Add new dish'}</h4>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={newDish.name}
                    onChange={dishChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    value={newDish.description}
                    onChange={dishChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                    type="url"
                    name="image"
                    id="image"
                    className="form-control"
                    value={newDish.image}
                    onChange={dishChange}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    value={newDish.price}
                    onChange={dishChange}
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary">
                {isLoading && <ButtonSpinner/>}
                {isEdit ? 'Save' : 'Create'}
            </button>
        </form>
    );
};

export default DishForm;