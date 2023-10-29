import React from 'react'
import { Link } from 'react-router-dom'
import AdminsideBar from './AdminsideBar'

export default function AdminDashboard() {
  return (
    <div className="container">
      <AdminsideBar />
      <div className="main-content">main content here</div>
    </div>
  )
}
