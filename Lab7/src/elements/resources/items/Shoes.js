import Shoe1 from "../../resources/images/shoe1.png";
import Shoe2 from "../../resources/images/shoe2.png";
import Shoe3 from "../../resources/images/shoe3.png";
import Card from "../../components/Card/Card.js";

function getShoes(item) {
    return (
        <div className="shoe_item">
            <Card
                picture={item.picture}
                model={item.model}
                text={item.text}
                price={item.price}
            ></Card>
            <button className="view_more button">View more</button>
        </div>
    );
}

const shoes = [
    {
        picture: Shoe1,
        model: "Tommy Hilfiger",
        text: "2020  Traditional lace-up closure offers a secure fit. Memory foam insole provides lasting comfort.",
        price: 95,
    },
    {
        picture: Shoe2,
        model: "Cole Haan",
        text: "2022  Product measurements were taken using size 9, width M - Medium. Please note that measurements may vary by size.",
        price: 140,
    },
    {
        picture: Shoe3,
        model: "Calvin Klein",
        text: "2021  Suede leather upper. Corded laces complement the blind-eyelet construction. Contrasting trim adds stylish appeal. Round toe. Synthetic lining and padded insole. Stacked heel. Rubber sole.",
        price: 85,
    },
    {
        picture: Shoe3,
        model: "Calvin Klein",
        text: "2021  Suede leather upper. Corded laces complement the blind-eyelet construction. Contrasting trim adds stylish appeal. Round toe. Synthetic lining and padded insole. Stacked heel. Rubber sole.",
        price: 85,
    },
];

export default shoes.map(getShoes);