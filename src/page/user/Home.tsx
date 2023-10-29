import React, { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchProducts, searchProduct } from '../../redux/slices/products/productSlice'
import { Link } from 'react-router-dom'
import SortProduct from '../../components/SortProduct'
import SearchInput from '../../components/SearchInput'
import HeroSection from '../../components/HeroSection'

export default function Home() {
  const { product, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsR
  )

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(event.target.value))
  }
  const filterProduct = searchTerm
    ? product.filter((product) =>
        product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    : product

  if (isLoading) {
    return <p>loding ....</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="container-home">
        <div className='main-content'>
        <section className='products'>
        <div className="proudect-content">
          <h2>Filter by price </h2>
          <SortProduct />
          <h2>Search by category </h2>
          <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
        </div>
          {filterProduct.length > 0 &&
            filterProduct.map((product) => {
              return (
                <article key={product.id}  className='product '>
                  <img src={product.image} alt={product.name} />
                  <div className='proudect__body'>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>{product.price} $</p>
                  <button className='btn-product'>Add To Cart</button>
                  <Link to={`/products/${product.id}`}>
                    <button className='btn-product'>Show Details</button>
                  </Link>
                  </div>
                </article>
              )
            })}
        </section>
        </div>
    
    </div>
  )
}
