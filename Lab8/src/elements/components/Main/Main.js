import "./Main.css";
import React, { useState, useEffect } from 'react';
import shoes from "../../resources/items/Shoes.js";
import Preview from "../Preview/Preview.js";
import Card from "../Card/Card.js"

const Main = () => {
    const [number, setNumber] = useState(3);
    const [items, setItems] = useState(shoes);

    useEffect(() => {
        setItems((items) => shoes.slice(0, number));
    }, [number]);

    const showMore = () => {
        if (number < 6) {
            setNumber(number + 3);
            setText("View less");
        } else {
            setNumber(number - 3);
            setText("View more");
        }
    };

    const [button_text, setText] = useState("View more");

    return (
        <main className="main">
            <Preview />
            <div className="items">
                {items.map(({ picture, model, text, price }, id) => (
                    <Card
                        picture={picture}
                        model={model}
                        text={text}
                        price={price}
                        key={id}
                    />
                ))}
            </div>
            <div className="items_container">
                <button className="view_more button" onClick={() => showMore()}>{button_text}</button>
            </div>
        </main>
    );
};

export default Main;