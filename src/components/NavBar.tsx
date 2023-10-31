import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/User/useerSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import HeroSection from './HeroSection'

export default function NavBar() {
  const { isLooggedIn, userData } = useSelector((state: RootState) => state.userR)
  const dispatch: AppDispatch = useDispatch()
  const navegate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navegate('/logout')
  }
  return (
    // feach where somebody ->role:admin/user
    <nav className="nav-menu">
      <h2>Timeless Tea Treasures</h2>
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        {isLooggedIn && (
          <>
            {/* <li>
              <Link to={`/dashboard/${userData.role}`} className="nav-link">
                user
              </Link>
            </li> */}
            <li>
              <Link to="/logout" className="nav-link" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
