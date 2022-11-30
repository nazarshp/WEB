import "./Catalog.css";
import Card from "../Card/Card.js";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getItems } from "../../api/items_api.js";
import Loader from '../Loader/Loader';

const Catalog = () => {
    let [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [fromPriceRange, setFromPriceRange] = useState("");
    const [toPriceRange, setToPriceRange] = useState("");
    //const [fromPowerRange, setFromPowerRange] = useState("");
    //const [toPowerRange, setToPowerRange] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getItems().then(data => {
            setLoading(false);
            setItems(data);
        });
    }, []);

    // const filteredItems = items.filter((item) => {
    //     return item.model.toLowerCase().includes(search.toLowerCase());
    // });

    const isValid = () => {
        const priceFrom = document.getElementById("price_from").value;
        const priceTo = document.getElementById("price_to").value;

        if (
            (priceFrom >= 0 || priceFrom === "") &&
            ((Number(priceFrom) <= Number(priceTo) && priceTo > 0) ||
                priceTo === "")
        ) {
            return true;
        } else {
            alert("Check your filter values!");
            return false;
        }
    };

    const applyFilters = () => {
        setLoading(true)
        let params = {};
        if (isValid()) {
            if (fromPriceRange !== "") {
                params.priceB = fromPriceRange;
            }
            if (toPriceRange !== "") {
                params.priceT = toPriceRange;
            }
            if (search !== "") {
                params.model = search;
            }
            if (document.getElementById("stock").checked) {
                params.instock = "true";
            }
            if (search !== "") {
                params.search = search;
            }
        }
        getItems(params).then(data => {
            setItems(data);
            setLoading(false);
        });
    };

    return (
        <main>
            <section className="sorting_options">
                <div className="number_sorting">
                    <p>Price, $</p>
                    <input
                        id="price_from"
                        placeholder="From"
                        className="price_from_input"
                        type="number"
                        onChange={(event) => setFromPriceRange(event.target.value)}
                    />
                    <input
                        id="price_to"
                        placeholder="To"
                        className="price_to_input"
                        type="number"
                        onChange={(event) => setToPriceRange(event.target.value)}
                    />
                </div>
                <div>
                    <input type="checkbox" id="stock" />
                    <label>In stock</label>
                </div>
                <button className="apply button" id="apply" onClick={applyFilters}>
                    Apply
                </button>
                <input
                    type="text"
                    onChange={(event) => setSearch(event.target.value)}
                    className="search_input"
                    placeholder="Input brand to search"
                />
            </section>
            <div className="line"></div>
            <section className="items_list">
                {loading && <Loader />}
                <div className="catalog_item">
                    {items.map(({ id, picture, model, text, price }) => (
                        <div className="shoe_item">
                            <Card
                                picture={picture}
                                model={model}
                                text={text}
                                price={price}
                            ></Card>
                            <Link to={`/catalog/${id}`}><button className="view_more button">View more</button></Link>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Catalog;
