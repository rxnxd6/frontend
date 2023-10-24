import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminsideBar() {
  return (
    <div>
      <aside className="sidebar">
        <div className="admin-prfile">
          <h2>Admin Profile goes here</h2>
          <p>name</p>
          <p>email</p>
        </div>
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
        </ul>
      </aside>
    </div>
  )
}
