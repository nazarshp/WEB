import './Card.css';
import Shoe1 from "../../resources/images/shoe1.png";
//<img src={`src/elements/resources/images/shoe${props.picture}.png`} alt='Shoes'/>


function Card(props) {
    return(
        <div className='item'>
            <img src={`/resources/images/${props.picture}.png`} alt='Shoes'/>
            <h2 className='model'>{props.model}</h2>
            <p className='text'>{props.text}</p>
            <h3 className='price'>Price: {props.price}$</h3>
        </div>
    )
}
export default Card;
