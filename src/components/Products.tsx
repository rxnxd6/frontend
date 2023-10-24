import React, { useEffect } from 'react'
import AdminsideBar from './AdminsideBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts } from '../redux/slices/products/productSlice'

export default function Product() {
  const { product, isLoading, error } = useSelector((state: RootState) => state.productsR)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if (isLoading) {
    return <p>loding ....</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <div className="container">
        <AdminsideBar />
        <div className="main-content"></div>
        <h2>List of Proudect</h2>
        <section className="products">
         
          {product.length > 0 &&
            product.map((product) => {
              return (
                <article key={product.id} className="product">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button>Edit</button>
                  <button>Delete</button>
                </article>
              )
            })}
        </section>
      </div>
    </div>
  )
}
