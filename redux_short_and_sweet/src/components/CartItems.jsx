
import PropTypes from "prop-types"
import { ChevronDown, ChevronUp } from "../icons"
import { removeItem, increase, decrease } from "../features/cart/cartSlice"
import { useDispatch } from "react-redux"

const CartItem = ({id,  img, title, price, amount}) => {

    const dispatch = useDispatch()

    const removeItemFromCart = ()=>{
        dispatch(removeItem(id))
    }

    const increaseItemQuantityInCart = ()=>{
        dispatch(increase({id}))
    }

    const decreaseItemQuantityInCart = ()=>{
        if(amount === 1){
            dispatch(removeItem(id))
            return
        }
        dispatch(decrease({id}))
    }

  return (
    <article className="cart-item">
        <img src={img} alt={title}/>
        <div>
            <h4>{title}</h4>
            <h4 className="item-price">${price}</h4>
            <button className="remove-btn" onClick={removeItemFromCart}>remove</button>
        </div>
        <div>
            <button className="amount-btn"
                onClick={increaseItemQuantityInCart}
            >
                <ChevronUp />
            </button>
            <p className="amount">{amount}</p>
            <button className="amount-btn"
                onClick={decreaseItemQuantityInCart}
            >
                <ChevronDown />
            </button>
        </div>
    </article>
  )
}

export default CartItem

CartItem.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }