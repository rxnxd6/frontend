import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchCategory = createAsyncThunk('users/fetchCategory', async () => {
  const response = await api.get('/mock/e-commerce/categories.json')
  return response.data
})
export type Category = {
  id: number
  name: string
}

export type CategoryState = {
  Category: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  Category: [],
  error: null,
  isLoading: false
}

export const categorySlice = createSlice({
  name: 'categories',
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
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.Category = action.payload
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

// export const { removeProduct, addProduct, productsRequest, productsSuccess } = productSlice.actions

export default categorySlice.reducer
