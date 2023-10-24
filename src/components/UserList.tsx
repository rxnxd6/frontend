import React, { useEffect } from 'react'
import AdminsideBar from './AdminsideBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

import { fetchUser } from '../redux/slices/User/UseerSlice'

export default function UserList() {
  const { user, isLoading, error } = useSelector((state: RootState) => state.userR)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  if (isLoading) {
    return <p>loding ....</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <div>
      <div className="container">
        <AdminsideBar />
        <div className="main-content">
          <h2>List of User</h2>
          <section>
            {user.length > 0 &&
              user.map((user) => {
                return (
                  <article key={user.id} className="product">
                        <h3>{`${user.firstName} ${user.lastName}`}</h3>
                    <p>{user.email}</p>
                    <p>{user.rol}</p>
                  </article>
                )
              })}
          </section>
        </div>
      </div>
    </div>
  )
}
