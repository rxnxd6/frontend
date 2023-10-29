import { ChangeEvent, FormEvent } from 'react'
import { Product } from '../redux/slices/products/productSlice'

type ProductFormProps = {
  product: Product
  handleSubmit: (e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export  function ProductForm({ product, handleSubmit, handleChange }: ProductFormProps) {
  const inputStyle =
    'w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:border-blue-400'
  const labelStyle = 'block text-sm font-medium text-gray-600'

  return (
    <form onSubmit={handleSubmit}  className='form-newProduct'>
      <div>
        <label htmlFor="name" >
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={product.name}
          onChange={handleChange}
          
        />
      </div>
      <div >
        <label htmlFor="image" >
          Image URL:
        </label>
        <input
          type="text"
          name="image"
          id="image"
          value={product.image}
          onChange={handleChange}
        
        />
      </div>
      <div >
        <label htmlFor="description" >
          Description:
        </label>
        <textarea
          name="description"
          id="description"
          value={product.description}
          onChange={handleChange}
          
        />
      </div>
      <div >
        <label htmlFor="categories" >
          Categories: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="categories"
          id="categories"
          value={product.categories.join(',')}
          onChange={handleChange}
          
        />
      </div>
      <div className="mb-4">
        <label htmlFor="variants" >
          Variants: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="variants"
          id="variants"
          value={product.variants.join(',')}
          onChange={handleChange}
         
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sizes" >
          Sizes: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="sizes"
          id="sizes"
          value={product.sizes.join(',')}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        >
        Add Product
      </button>
    </form>
  )
}
