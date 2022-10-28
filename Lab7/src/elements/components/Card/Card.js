import './Card.css';

const Card = ({picture, model, text, price}) => {
    return(
        <div className='item'>
            <img src={picture} alt='Shoes'/>
            <h2 className='model'>{model}</h2>
            <p className='text'>{text}</p>
            <h3 className='price'>Price: {price}$</h3>
        </div>
    )
}
export default Card;