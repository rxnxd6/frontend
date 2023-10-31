import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { sortProducts } from '../redux/slices/products/productSlice'

export function SortProduct() {
  const dispatch: AppDispatch = useDispatch()
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProducts(event.target.value))
  }
  return (
    <div className='sort'>
      <select onChange={handleSortChange}>
        <option value="price" defaultValue="price">
          price
        </option>
        <option value="name">name</option>
      </select>
    </div>
  )
}
