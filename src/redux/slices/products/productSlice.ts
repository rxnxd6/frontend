import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchProducts= createAsyncThunk('users/fetchProducts',async()=>{
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
}

export type ProductState = {
  product: Product[]
  error: null | string
  isLoading: boolean
}

const initialState: ProductState = {
  product: [],
  error: null,
  isLoading: false
}

export const producstSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // productsRequest: (state) => {
    //   state.isLoading = true
    // },
    // productsSuccess: (state, action) => {
    //   state.isLoading = false
    //   state.items = action.payload
    // },
    // addProduct: (state, action: { payload: { product: Product } }) => {
    //   // let's append the new product to the beginning of the array
    //   state.items = [action.payload.product, ...state.items]
    // },
    // removeProduct: (state, action: { payload: { productId: number } }) => {
    //   const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
    //   state.items = filteredItems
    // }


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
