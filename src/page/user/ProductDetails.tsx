import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchProducts, findProductById } from '../../redux/slices/products/productSlice'

export default function ProductDetails() {
  const { id } = useParams()
  const { singleProduct, isLoading, error } = useSelector((state: RootState) => state.productsR)
  const { Category } = useSelector((state: RootState) => state.categoriesR)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    // dispatch(findProductById(Number(id)))
    dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(id))))
  }, [])

  if (isLoading) {
    return <p>loding ....</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  // find the category of the produc
  // I need to fix this
  const getCategoryNmaeById = (categoryId: number) => {
    const CategoryN = Category.find((category) => category.id === categoryId)
    return CategoryN ? CategoryN.name : 'not found'
  }
  return (
    <div className='product-details'>
      <h2>ProductDetails</h2>
      {singleProduct && (
        <>
          <img src={singleProduct.image} alt={singleProduct.name} />
          <p>Name: {singleProduct.name}</p>
          <p>Description:{singleProduct.description}</p>
          <p>price:{singleProduct.price} $</p>
          <p>
            Catergory:{''}
            {singleProduct.categories &&
              singleProduct.categories.map((categoryId) => getCategoryNmaeById(categoryId))}
          </p>
          <p>sizes:{singleProduct.sizes && singleProduct.sizes.join(',')}</p>

          <Link to="/">
            <button>Back to Shopping </button>
          </Link>
          <button>Add To Cart</button>
        </>
      )}
    </div>
  )
}
