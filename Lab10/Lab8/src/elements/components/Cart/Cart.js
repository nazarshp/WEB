import "./Cart.css";
import React, { useEffect, useState } from "react";
import { removeProduct, increment, decrement } from "../../store/CartSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const items = useSelector((state) => state.cart);

    useEffect(() => {
        setTotalPrice(
            items.reduce((counter, item) => counter + item.price * item.counter, 0)
        );
    }, [items]);

    if (!items.length) {
        return (
            <div className="empty_cart">
                <h1>Your cart is currently empty!</h1>
                <h3>Add some items on item page to see them here.</h3>
                <Link to="/catalog" className="back_catalog">
                    <button className="button">Back to catalog</button>
                </Link>
            </div>
        );
    }
    return (
        <div>
            {items.map((item) => (
                <div className="cart_item">
                    <img src={item.picture}></img>
                    <h1>{item.model}</h1>
                    <h2 className="cart_price">{item.price}$</h2>
                    <div className="cart_operations">
                        <button className="button_cart blue" onClick={() => dispatch(increment(item))}>+</button>
                        <h2>{item.counter}</h2>
                        <button className="button_cart blue" onClick={() => dispatch(decrement(item))}>-</button>
                    </div>
                    <button className="button_cart red" onClick={() => dispatch(removeProduct(item))}>X</button>
                </div>
            ))}
            <h2 className="total_price">Total price:{totalPrice}</h2>
            <nav className="bottom_nav">
                <Link to="/catalog" className="back_catalog">
                    <button className="button">Back to catalog</button>
                </Link>
                <button className="button continue">Continue</button>
            </nav>
        </div>
    );
};

export default Cart;