import React, {useCallback, useEffect, useState} from 'react';
import {IApiOrdersList, IOrder} from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";

const Orders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const ordersResponse = await axiosApi.get<IApiOrdersList>('/orders.json');
            const orders = ordersResponse.data;

            if (!orders) {
                setOrders([]);
                return;
            }

            const newOrders: IOrder[] = Object.keys(orders).map((id:string) => {
               const order = orders[id];

               const totalPrice = order.dishes.reduce((sum, cartDish) => {
                   return sum + cartDish.dish.price * cartDish.amount;
                },0);

                return {
                    ...order,
                    id,
                    totalPrice,
                };
            });
            setOrders(newOrders);
        } finally {
            setLoading(false);
        }
    },  []);

    useEffect(() => {
        void fetchOrders();
    }, [fetchOrders]);

    return (

        <div className="row mt-2">
            <div className="col">
                <h4 className="mb-2">Orders</h4>
                {loading ? <Spinner/> : (
                    <>
                        {orders.map(order => (
                            <div key={order.id} className="card mb-2">
                                <div className="card-body">
                                    <strong>{order.customer.name}</strong>
                                    <span> ordered for a total price of </span>
                                    <strong>{order.totalPrice} KGS</strong>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Orders;