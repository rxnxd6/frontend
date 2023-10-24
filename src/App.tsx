import './App.css'
import { Routes, Route } from 'react-router-dom'
import react from 'react'

import Home from './page/Home'
import NavBar from './components/NavBar'
import { ProductsManager } from './components/ProductsManager'

import Footer from './page/Footer'
import Products from './components/Products'
import Category from './components/Category'
import ProductDetails from './page/ProductDetails'
import Error from './page/Error'
import AdminDashboard from './page/AdminDashboard'

import UserDashboard from './components/UserDashboard'
import UserProfile from './components/UserProfile'

import AdminOrder from './components/AdminOrder'
import UserOrder from './components/UserOrder'
import UserList from './components/UserList'

// import Product  from './page/Product'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/ProductsManager" element={<ProductsManager />} /> */}
        <Route path="/Product" element={<ProductDetails />} />
        {/* <Route path="/user-dashboard" element={<AdminDashboard />} /> */}

        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/catergory" element={<Category />} />
        <Route path="/dashboard/admin/products" element={<Products />} />
        <Route path="/dashboard/admin/user" element={<UserList/>} />

        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/user/profile" element={<UserProfile />} />
        <Route path="/dashboard/user/order" element={<UserOrder />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
