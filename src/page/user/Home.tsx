import React, { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Product, fetchProducts, searchProduct } from '../../redux/slices/products/productSlice'
import { Link } from 'react-router-dom'
import { SortProduct } from '../../components/SortProduct'
import { SearchInput } from '../../components/SearchInput'
import HeroSection from '../../components/HeroSection'
import {
  fetchCategory,
  fiterCategory,
  setSelectedCategory
} from '../../redux/slices/category/categorySlice'

export default function Home() {
  const { product, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsR
  )

  const { categories, selectedCategory } = useSelector((state: RootState) => state.categoriesR)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategory())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(event.target.value))
  }

  const handleSelectedCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCategory(event.target.value))
  }

  const searchProducts = (productsArray: Product[], searchString: string) => {
    return searchString
      ? productsArray.filter((product) =>
          product.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
        )
      : productsArray
  }

  const filterProductsByCategory = (productsArray: Product[], category: number) => {
    return category !== 0
      ? productsArray.filter((product) => product.categories.includes(category))
      : productsArray
  }

  const filteredProducts = filterProductsByCategory(product, selectedCategory)
  const filteredSearchedProducts = searchProducts(filteredProducts, searchTerm)

  if (isLoading) {
    return <p>loding ....</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <div className="container-home">
      <div className="main-content">
        <section className="products">
          <div className="proudect-content">
            <h2>Sort by name </h2>
            <SortProduct />
            <h2>Search by name </h2>
            <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
            <h2>Filter by category </h2>
            <select onChange={handleSelectedCategoryChange}>
              {categories.map((category) => {
                return <option value={category.id}>{category.name}</option>
              })}
            </select>
          </div>
          {filteredSearchedProducts.length > 0 &&
            filteredSearchedProducts.map((product) => {
              return (
                <article key={product.id} className="product ">
                  <img src={product.image} alt={product.name} />
                  <div className="proudect__body">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>{product.price} $</p>

                    <Link to={`/products/${product.id}`}>
                      <button className="btn-product">Show Details</button>
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
