import React from 'react';
import {ICartDish} from "../../types";
import CartItem from "./CartItem";

interface  Props {
    cartDishes: ICartDish[];
}

const CartDishes: React.FC<Props> = ({cartDishes}) => {
    const sum = cartDishes.reduce((acc, value) => {
        return acc + value.dish.price * value.amount;
    }, 0);

    return (
        <div>
            {cartDishes.map(cartDish => (
                <CartItem key={cartDish.dish.id} cartDish={cartDish}/>
            ))}
            <div className="card border-0 p-2">
                <div className="row">
                    <div className="col text-right">
                        Total:
                    </div>
                    <div className="col-3 text-right">
                        <strong>{sum}</strong> KGS
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDishes;