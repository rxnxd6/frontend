import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts } from '../redux/slices/products/productSlice'

export default function Home() {
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
      <h1>The All Product</h1>

      <div className="container">
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
                </article>
              )
            })}
        </section>
      </div>
    </div>
  )
}
