import "./Main.css";
import Card from "../Card/Card.js";
import Preview from "./Preview.js"
import Shoe1 from "../../resources/images/shoe1.png";
import Shoe2 from "../../resources/images/shoe2.png";
import Shoe3 from "../../resources/images/shoe3.png";


const Main = () => {
    return (
        <main className="main">
            <Preview />
            <div className="items">
                <Card
                    picture={Shoe1}
                    model={"Tommy Hilfiger"}
                    text={
                        "Traditional lace-up closure offers a secure fit. Memory foam insole provides lasting comfort."
                    }
                    price={95}
                ></Card>
                <Card
                    picture={Shoe2}
                    model={"Cole Haan"}
                    text={
                        "Product measurements were taken using size 9, width M - Medium. Please note that measurements may vary by size."
                    }
                    price={140}
                ></Card>
                <Card
                    picture={Shoe3}
                    model={"Calvin Klein"}
                    text={
                        "Suede leather upper. Corded laces complement the blind-eyelet construction. Contrasting trim adds stylish appeal. Round toe. Synthetic lining and padded insole. Stacked heel. Rubber sole."
                    }
                    price={85}
                ></Card>
            </div>
            <div className="items_container">
                <button className="view_more button">View More</button>
            </div>
        </main>
    );
};


export default Main;