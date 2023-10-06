import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import {useNavigate} from "react-router-dom";
import CartDishes from "./CartDishes";
import {useAppSelector} from "../../app/hook";
import {selectCartDishes} from "../../store/cartSlice";


const Cart: React.FC = () => {
    const cartDishes = useAppSelector(selectCartDishes);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    let cart = (
        <div className="alert alert-primary">
            Cart is empty! Add something!
        </div>
    );

    if (cartDishes.length > 0) {
        cart = (
            <>
                <CartDishes cartDishes={cartDishes}/>

                <button
                    className="w-100 btn btn-primary"
                    onClick={() => setShow(true)}
                >
                    Order
                </button>
            </>
        );
    }

    return (
        <>
            <h4>Cart</h4>
            {cart}
            <Modal show={show} title="Order" onClose={() => setShow(false)}>
                <div className="modal-body">
                    <p>Do you want to continue to checkout?</p>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-danger"
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </button>

                    <button className="btn btn-primary" onClick={() => navigate('/checkout')}>Continue</button>
                </div>
            </Modal>
        </>
    );
};

export default Cart;