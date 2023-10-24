import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    // feach where somebody ->role:admin/user
    <nav className="menu-container">
      <input type="checkbox" aria-label="Toggle menu" />
      <span></span>
      <span></span>
      <span></span>

      {/* <a href="#" className="menu-logo">
    <img src="https://wweb.dev/resources/navigation-generator/logo-placeholder.png" alt="My Awesome Website"/>
  </a> */}

      <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Product">Product</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/dashboard/user">User</Link>
          </li>
          <li>
            <Link to="dashboard/admin">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
