import cartReducer, { cartActions } from '../redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Product } from '../redux/slices/products/productSlice';
export default function Cart() {
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state);
    const cartDetails = state.cart.cartItems
    console.log(cartDetails,"--------------------------------------------------------");
    const handleAddToCart= (product:Product) => {
        dispatch(cartActions.addToCart(product));
      };
  return (
    <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-3/4">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left font-semibold">Product</th>
                                    <th className="text-left font-semibold">Price</th>
                                    <th className="text-left font-semibold">Quantity</th>
                                    <th className="text-left font-semibold">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartDetails.map((cartItems) =>(
                                    <tr key={cartItems.id}>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <img className="h-16 w-16 mr-4" src={cartItems.image} alt="Product image"/>
                                            <span className="font-semibold">{cartItems.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4     font-size: 0.75rem;">{cartItems.price} SAR</td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <button className="border rounded-md py-2 px-4 mr-2">-</button>
                                            <span className="text-center w-8">{cartItems}</span>
                                            <button className="border rounded-md py-2 px-4 ml-2">+</button>
                                        </div>
                                    </td>
                                    <td className="py-4">$19.99</td>
                                    </tr>
                                ))}
                                {/* <!-- More product rows --> */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="md:w-1/4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>$19.99</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Taxes</span>
                            <span>$1.99</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>$0.00</span>
                        </div>
                        <hr className="my-2"/>
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">$21.98</span>
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}