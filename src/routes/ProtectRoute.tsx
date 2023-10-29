import React from 'react'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import Login from '../page/user/Login'

export default function ProtectRoute() {
  const location = useLocation()
  const { isLooggedIn } = useSelector((state: RootState) => state.userR)

  return isLooggedIn ? <Outlet /> : <Login pathName={location.pathname} />
}
