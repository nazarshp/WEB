import "./Main.css";
import Card from "../Card/Card.js";
import Preview from "../../resources/images/preview.png";
import Shoe1 from "../../resources/images/shoe1.png";
import Shoe2 from "../../resources/images/shoe2.png";
import Shoe3 from "../../resources/images/shoe3.png";

const Main = () => {
    return (
        <main className="main">
            <div className="preview">
                <img src={Preview} alt="Shoe" className="preview_img" />
                <div className="preview_info">
                    <h1> Mens Shoes</h1>
                    <p> Stay at the top of your game in the footwear department with the latest men’s shoes from our range. 
                        Filter by top sneaker brands to find trainers to suit a casual vibe, 
                        or add formal shoes or boots to your basket for a dapper look that won't be reckoned with.
                    </p>
                </div>
            </div>
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
                <button className="view_more">View More</button>
            </div>
        </main>
    );
};

export default Main;