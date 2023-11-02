import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { RootState } from '../redux/store'
import { ProductForm } from '../components/ProductForm'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Product, updateProduct } from '../redux/slices/products/productSlice'
import { Link } from 'react-router-dom'

export default function EditProduct() {
  const dispatch = useDispatch()
  const params = useParams()
  const products = useSelector((state: RootState) => state.productsR)
  console.log('products:', products)
  const product = products.product.find((product) => product.id === Number(params.productId))

  const [updatedProduct, setUpdatedProduct] = useState(product)

  if (!updatedProduct) {
    return <h1>No product found</h1>
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      // @ts-ignore
      setUpdatedProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }

    // @ts-ignore
    setUpdatedProduct({
      ...product,
      [name]: value
    })
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    dispatch(updateProduct(updatedProduct))
    return
  }
  return (
    <div>
      <h1>Edit Product</h1>
      <Link to="/dashboard/admin/products">Go back to Dashboard</Link>
      <ProductForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        product={updatedProduct}
      />
    </div>
  )
}
