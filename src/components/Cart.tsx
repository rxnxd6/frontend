import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import cartSlice, { cartActions } from '../redux/slices/cart/cartSlice'
import { Product } from '../redux/slices/products/productSlice'
import { Link, useNavigate } from 'react-router-dom'
const Cart = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate=useNavigate()
  // const state = useSelector((state: RootState) => state);
  const state = useSelector((state: RootState) => state)
  const cartDetails = state.cartR.cartProducts
  console.log(cartDetails, '............................')
  const handleAddCart = (product: Product) => {
    dispatch(cartActions.addCart(product))
  }
  const handleRemoveFromCart = (product: Product) => {
    dispatch(cartActions.removeCart(product))
  }
  const handleDelete = (product: Product) => {
    dispatch(cartActions.deleteCart(product))
  }
  return (
    <div  className='cart-list'>
      <br></br>
      <h3>Shopping Cart</h3>
      <br></br>
      {cartDetails.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul >
          {cartDetails.map((product) => (
            <li key={product.id}  >
              <img  src={product.image} alt={product.name} /> <br></br>
              {product.name} - Quantity: {product.cartQuantity}
              <button onClick={() => handleAddCart(product)}> +</button>
              <button onClick={() => handleRemoveFromCart(product)}> -</button>
              <button
                onClick={() => { navigate('/')
                }}>
                Back To Shopping
              </button>
              <button
                      onClick={() => {
                        handleDelete(product)
                      }}>
                      Delete
                    </button>

              
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default Cart
