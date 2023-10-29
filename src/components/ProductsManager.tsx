import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  productsRequest,
  productsSuccess,
  removeProduct
} from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import api from '../api'
import NewProductWrapper from './NewProductWrapper'

export function ProductsManager() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.productsR

  useEffect(() => {
    handleGetProducts()
  }, [])

   /**
   * If you want to keep things simple you can follow this approach on updating
   * redux state when using async requests instead of using createAsyncThunk
   */
  const handleGetProducts = async () => {
    // let's first turn the loader to true so we can have a better UX
    dispatch(productsRequest())

    // Fetching from the local files
    const res = await api.get('/mock/e-commerce/products.json')
    // At this point we have the data so let's update the store
    dispatch(productsSuccess(res.data))
  }

  return (
    <div >
      <NewProductWrapper />
      {products.isLoading && <h3> Loading products...</h3>}
      <div className="product-list">
        <ul>
          {products.product.map((product) => (
            <li key={product.id} >
              <img src={product.image} alt={product.name} width="50" />
              <span>{product.name}</span>
              <button className='bt-remove'
               
                onClick={() => dispatch(removeProduct({ productId: product.id}))}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
