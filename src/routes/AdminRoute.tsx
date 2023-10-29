import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Login from '../page/user/Login'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function AdminRoute() {
  const location = useLocation()
  const { isLooggedIn, userData } = useSelector((state: RootState) => state.userR)
  return isLooggedIn && userData.role === 'admin' ? (
    <Outlet />
  ) : (
    <Login pathName={location.pathname} />
  )
}
