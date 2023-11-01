import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchProducts = createAsyncThunk('users/fetchProducts', async () => {
  const response = await api.get('/mock/e-commerce/products.json')
  return response.data
})
export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
  cartQuantity: number
}

export type ProductState = {
  product: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  singleProduct: Product
}

const initialState: ProductState = {
  product: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  singleProduct: {} as Product
}

export const producstSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },

    findProductById: (state, action) => {
      const id = action.payload
      const FoundPro = state.product.find((product) => product.id === id)
      if (FoundPro) {
        state.singleProduct = FoundPro
      }
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      if (sortingCriteria === 'name') {
        state.product.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortingCriteria === 'price') {
        state.product.sort((a, b) => a.price - b.price)
      }
    },

    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.product = action.payload
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.product = [action.payload.product, ...state.product]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.product.filter(
        (product) => product.id !== action.payload.productId
      )
      state.product = filteredItems
    },

    updateProduct: (state, action) => {
      const updatedProduct = action.payload

      const products = state.product.map((product) => {
        if (product.id === updatedProduct.id) {
          return updatedProduct
        }
        return product
      })
      state.product = products
      console.log('products:', products)
      return state
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.product = action.payload
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

// export const { removeProduct, addProduct, productsRequest, productsSuccess } = productSlice.actions

export default producstSlice.reducer
export const {
  findProductById,
  searchProduct,
  sortProducts,
  productsRequest,
  productsSuccess,
  removeProduct,
  addProduct,
  updateProduct
} = producstSlice.actions
