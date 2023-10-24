import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  const response = await api.get('/mock/e-commerce/users.json')
  return response.data
})
export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  rol: string
}

export type UserState = {
  user: User[]
  error: null | string
  isLoading: boolean
}

const initialState: UserState = {
  user: [],
  error: null,
  isLoading: false
}

export const userSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

// export const { removeProduct, addProduct, productsRequest, productsSuccess } = productSlice.actions

export default userSlice.reducer
