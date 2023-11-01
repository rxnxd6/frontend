import './App.css'
import { Routes, Route } from 'react-router-dom'
import react from 'react'

import Home from './page/user/Home'
import NavBar from './components/NavBar'

import Footer from './page/user/Footer'
import Products from './components/Products'
import Category from './components/Category'
import ProductDetails from './page/user/ProductDetails'
import Error from './page/Error'
import AdminDashboard from './page/admin/AdminDashboard'

import UserDashboard from './page/user/UserDashboard'
import UserProfile from './page/user/UserProfile'

import UserOrder from './components/UserOrder'
import UserList from './components/UserList'
import Login from './page/user/Login'
import ProtectRoute from './routes/ProtectRoute'
import AdminRoute from './routes/AdminRoute'
import Register from './page/user/Register'
import HeroSection from './components/HeroSection'
import { ProductsManager } from './components/ProductsManager'
import Cart from './components/Cart'
import { ProductEdit } from './page/ProductEdit'

// import Product  from './page/Product'

function App() {
  return (
    <div className="App">
      <NavBar />
      <HeroSection />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/dashboard" element={<ProtectRoute />}>
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/order" element={<UserOrder />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/catergory" element={<Category />} />
          <Route path="admin/products" element={<ProductsManager />} />
          <Route path="admin/products/edit/:productId" element={<ProductEdit />} />
          <Route path="admin/user" element={<UserList />} />
          <Route path="admin/orders" element={<UserOrder />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
