import "./Catalog.css";
import shoes from "../../resources/items/Shoes.js";
import Card from "../Card/Card.js";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Catalog = () => {
    let [items, setItems] = useState(shoes);
    const [search, setSearch] = useState("");
    const [fromPriceRange, setFromPriceRange] = useState("");
    const [toPriceRange, setToPriceRange] = useState("");
    /* const [fromPowerRange, setFromPowerRange] = useState("");
    const [toPowerRange, setToPowerRange] = useState("");*/

    const filteredItems = items.filter((item) => {
        return item.model.toLowerCase().includes(search.toLowerCase());
    });

    const filterInStock = (items) => {
        return items.filter((item) => item.inStock === true);
    };

    const isValid = () => {
        const priceFrom = document.getElementById("price_from").value;
        const priceTo = document.getElementById("price_to").value;
        /*const powerFrom = document.getElementById("power_from").value;
        const powerTo = document.getElementById("power_to").value;*/

        if (
            ((priceFrom >= 0) || (priceFrom === "")) &&
            (((Number(priceFrom) < Number(priceTo)) && (priceTo > 0)) || (priceTo === "")) //&&
            /*((powerFrom >= 0 || powerFrom === "")) &&
            (((Number(powerTo) > Number(powerFrom)) && (powerTo >= 0)) || (powerTo === ""))*/
        ) {
            return true;
        } else {
            alert("Check your filter values!");
            return false;
        }
    };

    const applyFilters = () => {
        items = shoes;
        if (isValid()) {
            if (fromPriceRange !== "") {
                items = items.filter((item) => item.price >= fromPriceRange);
            }
            if (toPriceRange !== "") {
                items = items.filter((item) => item.price <= toPriceRange);
                setItems(items);
            }
            /*if (fromPowerRange !== "") {
                items = items.filter((item) => item.power >= fromPowerRange);
            }
            if (toPowerRange !== "") {
                items = items.filter((item) => item.power <= toPowerRange);
            }*/
            if (document.getElementById("stock").checked) {
                items = filterInStock([...items]);
            }
        }
        setItems(items);
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
                <div className="catalog_item">
                    {filteredItems.map(({ id, picture, model, text, price }) => (
                        <div className="shoe_item">
                            <Card
                                picture={picture}
                                model={model}
                                text={text}
                                price={price}
                            ></Card>
                            <button className="view_more button">
                                <Link to={`/catalog/${id}`}>View more</Link>
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Catalog;