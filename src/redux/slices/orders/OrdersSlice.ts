import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchOrder = createAsyncThunk('users/fetchOrder', async () => {
  const response = await api.get('/mock/e-commerce/orders.json')
  return response.data
})

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
}

const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    deleteOrder: (state, action) => {
      const filterOrder = state.orders.filter((order) => order.id !== action.payload)
      state.orders = filterOrder
    }
    //   setSelectedCategory: (state, action) => {
    //     state.selectedCategory = Number(action.payload)
    //   },

    //   fiterCategory: (state, action) => {
    //     const fetchOrder = state.categories.filter((category) => category.id === action.payload)
    //     state.categories = filterCategory
    //   },
    //   addCategory: (state, action) => {
    //     state.categories.push(action.payload)
    //   },
    //   updateCategory: (state, action) => {
    //     const { id,name} = action.payload
    //     // // find user
    //     const foundcategory = state.categories.find((category) => category.id === id)
    //     // //  if found you have to update
    //     if (foundcategory) {
    //       foundcategory.name =  name

    //     }
    //   }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    })
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export const { deleteOrder } = ordersSlice.actions
export default ordersSlice.reducer
