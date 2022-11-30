import "./ItemPage.css";
import "../Main/Main.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from '../../../api/api';
import Loader from '../Loader/Loader';

const ItemPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);

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
                <button className="button">
                    <Link to="/catalog" className="go_back">
                        Go back
                    </Link>
                </button>
                <button className="button">
                    <Link to="/cart" className="add_to_cart">
                        Add to cart
                    </Link>
                </button>
            </div>
        </section>
    );
};

export default ItemPage;
