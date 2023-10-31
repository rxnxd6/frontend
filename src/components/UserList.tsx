import React, { ChangeEvent, useEffect } from 'react'
import AdminsideBar from '../page/admin/AdminsideBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

import { DeleteUser, fetchUser, searchUsers } from '../redux/slices/User/useerSlice'
import { SearchInput } from './SearchInput'

export default function UserList() {
  const { user, isLoading, error, searchTerm } = useSelector((state: RootState) => state.userR)

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
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUsers(event.target.value))
  }
  const SearchUser = searchTerm
    ? user.filter((user) =>
        user.firstName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    : user
  const handleDelete = (id: number) => {
    dispatch(DeleteUser(id))
  }
  return (
    <div>
      <AdminsideBar />

      <div className="main-content">
        <h2>List of User</h2>
        <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
        <section>
          {SearchUser.length > 0 &&
            SearchUser.map((user) => {
              if (user.role !== 'admin')
                return (
                  <article key={user.id}>
                    <h3>{`${user.firstName} ${user.lastName}`}</h3>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                    <button
                      onClick={() => {
                        handleDelete(user.id)
                      }}>
                      Delete
                    </button>
                  </article>
                )
            })}
        </section>
      </div>
    </div>
  )
}
