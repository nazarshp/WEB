import "./Preview.css";
import preview_img from "../../resources/images/preview.png";

const Preview = () => {
    return (
        <div className="preview">
            <img src={preview_img} alt="Shoe" className="preview_img" />
            <div className="preview_info">
                <h1> Mens Shoes </h1>
                <p>
                Stay at the top of your game in the footwear department with the latest men's shoes from our range. 
                        Filter by top sneaker brands to find trainers to suit a casual vibe, 
                        or add formal shoes or boots to your basket for a dapper look that won't be reckoned with.
                </p>
            </div>
        </div>
    );
};

export default Preview;