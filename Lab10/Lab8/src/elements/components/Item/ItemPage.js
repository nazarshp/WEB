import "./ItemPage.css";
import "../Main/Main.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../../api/items_api.js";
import Loader from '../Loader/Loader';
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/CartSlice.js";

const ItemPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        getItemById(id).then((data) => {
            setItem(data);
            setLoading(false);
        });
    }, []);

    return (
        <section>
            {loading && <Loader />}
            <div className="item_info">
                <img className="item_img" src={item.picture} alt="Shoe"></img>
                <div className="item_description">
                    <h1 className="model_value">{item.model}</h1>
                    <p className="description_value">{item.text}</p>
                    <p className="stock_value">Is in stock: {String(item.instock)}</p>
                    <span>Warranty:</span>
                    <select className="warranty">
                        <option>No warranty</option>
                        <option>6 month</option>
                        <option>1 year</option>
                        <option>2 month</option>
                        <option>3 month</option>
                    </select>
                    <span>Color</span>
                    <select className="color">
                        <option>Black</option>
                        <option>Brown</option>
                        <option>White</option>
                    </select>
                </div>
            </div>
            <div className="operations">
                <p className="price_value">Price: ${item.price}</p>
                <Link to="/catalog" className="go_back">
                    <button className="button">Go back</button>
                </Link>
                <Link to="/cart" className="add_to_cart">
                    <button className="button" onClick={() => dispatch(addProduct(item))}>
                        Add to cart
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default ItemPage;
