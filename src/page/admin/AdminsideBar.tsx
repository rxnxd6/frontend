import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminsideBar() {
  return (
    <div className='container' >
    <div className="sidebar">
        <h2>Admin Profile goes here</h2>
      <ul>
        <li>
          <Link to="/dashboard/admin/catergory">Category</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products">Prouduct</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/user">User</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders">orders</Link>
        </li>
      </ul>
    </div>
    </div>
  )
}
