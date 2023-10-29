import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/store'

export default function UserSideBar() {
  const {userData}=useSelector((state:RootState) =>state.userR)
  return (
    <div>
      <aside className="sidebar">
        <div className="admin-prfile">
          <h2>user Profile goes here</h2>
          <p> {`${userData?.firstName}  ${userData?.lastName}`}</p>
          <p>{userData?.email}</p>
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
