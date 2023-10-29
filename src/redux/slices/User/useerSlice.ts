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
  role: string
}
const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

export type UserState = {
  user: User[]
  error: null | string
  isLoading: boolean
  isLooggedIn: boolean
  userData: User | null
  searchTerm: string
}
localStorage.getItem

const initialState: UserState = {
  user: [],
  error: null,
  isLooggedIn: data.isLooggedIn,
  isLoading: false,
  userData: data.userData,
  searchTerm: ''
}

export const userSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLooggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLooggedIn: state.isLooggedIn,
          userData: state.userData
        })
      )
    },
    logout: (state) => {
      state.isLooggedIn = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLooggedIn: state.isLooggedIn,
          userData: state.userData
        })
      )
    },
    searchUsers: (state, action) => {
      state.searchTerm = action.payload
    },
    DeleteUser: (state, action) => {
      const filterUsers = state.user.filter((user) => user.id !== action.payload)
      state.user = filterUsers
    },
    addUser: (state, action) => {
      state.user.push(action.payload)
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName } = action.payload
      // // find user
      const foundUser = state.user.find((user) => user.id === id)
      // //  if found you have to update
      if (foundUser) {
        foundUser.firstName = firstName
        foundUser.lastName = lastName
        state.userData = foundUser
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLooggedIn: state.isLooggedIn,
            userData: state.userData
          })
        )
      }
    }
  },

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

export default userSlice.reducer
export const { login, logout, searchUsers, DeleteUser, addUser, updateUser } = userSlice.actions
