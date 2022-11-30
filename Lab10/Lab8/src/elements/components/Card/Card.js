import './Card.css';

function Card(props) {
    return(
        <div className='item'>
            <img src={props.picture} alt='Shoes'/>
            <h2 className='model'>{props.model}</h2>
            <p className='text'>{props.text}</p>
            <h3 className='price'>Price: {props.price}$</h3>
        </div>
    )
}
export default Card;
