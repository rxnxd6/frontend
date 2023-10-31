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
  categories: Category[]
  error: null | string
  isLoading: boolean
  selectedCategory: number
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false,
  selectedCategory: 0
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    deleteCategory: (state, action) => {
      const filterCategory = state.categories.filter((category) => category.id !== action.payload)
      state.categories = filterCategory
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = Number(action.payload)
    },
    
    fiterCategory: (state, action) => {
      const filterCategory = state.categories.filter((category) => category.id === action.payload)
      state.categories = filterCategory
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action) => {
      const { id,name} = action.payload
      // // find user
      const foundcategory = state.categories.find((category) => category.id === id)
      // //  if found you have to update
      if (foundcategory) {
        foundcategory.name =  name
       
        
      }
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export const { deleteCategory, setSelectedCategory,fiterCategory,addCategory,updateCategory } = categorySlice.actions
export default categorySlice.reducer
