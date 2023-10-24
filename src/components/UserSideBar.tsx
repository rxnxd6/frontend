import React from 'react'
import { Link } from 'react-router-dom'

export default function UserSideBar() {
  return (
    <div>
      <aside className="sidebar">
        <div className="admin-prfile">
          <h2>user Profile goes here</h2>
          <p>name</p>
          <p>email</p>
        </div>
        <ul>
          <li>
            <Link to="/dashboard/user/profile">profile</Link>
          </li>
          <li>
            <Link to="/dashboard/user/order">Order</Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}
