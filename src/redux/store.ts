import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import categoryReduser from './slices/category/categorySlice'
import userReduser from './slices/User/useerSlice'
import cartReduser from './slices/cart/cartSlice'
import orderReduser from './slices/orders/OrdersSlice'
export const store = configureStore({
  reducer: {
    productsR: productsReducer,
    categoriesR: categoryReduser,
      userR:userReduser,
      cartR: cartReduser,
      orderR:orderReduser
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
