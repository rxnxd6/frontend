import React from 'react'
import { Product } from '../products/productSlice'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
type CartState = {
  cartProducts: Product[]
  totalQuantity: number
  totalAmount: number
  isLoading: boolean
  error: null | string
}
const initialState: CartState = {
  cartProducts: [],
  totalQuantity: 0,
  totalAmount: 0,
  isLoading: true,
  error: null
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Product>) => {
      const foundCart = state.cartProducts.findIndex((carts) => carts.id === action.payload.id)
      if (foundCart >= 0) {
        state.cartProducts[foundCart].cartQuantity++
      } else {
        const productCart = { ...action.payload, cartQuantity: 1 }
        state.cartProducts.push(productCart)
      }
    },
    removeCart: (state, action: PayloadAction<Product>) => {
      const removeProduct = state.cartProducts.findIndex((carts) => carts.id === action.payload.id)
      if (removeProduct !== -1) {
        if (state.cartProducts[removeProduct].cartQuantity === 1) {
          state.cartProducts.splice(removeProduct, 1)
        } else {
          state.cartProducts[removeProduct].cartQuantity--
        }
      }
    }
  }
})
export const cartActions = cartSlice.actions
export default cartSlice.reducer