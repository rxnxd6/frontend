import React, { ChangeEvent, FormEvent, useState } from 'react'
import UserSideBar from '../../components/UserSideBar'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/slices/User/useerSlice'

export default function UserProfile() {
  const dispatch: AppDispatch = useDispatch()
  const { userData, user } = useSelector((state: RootState) => state.userR)
  const [isFormOpen, setisFormOpen] = useState(false)
  // usestate for the current state 
  const [users, setuser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })
  // console.log(user)
  const handleFormOpen = () => {
    setisFormOpen(!isFormOpen)
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setuser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
  }
  const handleSumbit = (event: FormEvent) => {
    event.preventDefault()
    const updateUserData = { id: userData?.id, ...users }
    dispatch(updateUser(updateUserData))
    // console.log(updateUserData)
  }

  return (
    <div>
      <div className="container">
        <UserSideBar />
        <div className="main-content">
          {userData && (
            <div>
              <div>
                <p>Id:{userData.id}</p>
                <p>Name:{`${userData?.firstName}   ${userData?.lastName}`}</p>
                <p>Email:{userData?.email}</p>
                <p>Role:{userData.role}</p>
                <button className="btn" onClick={handleFormOpen}>
                  Edit
                </button>
              </div>
              {isFormOpen && (
                <form action="" onSubmit={handleSumbit}>
                  <input
                    type="text"
                    name="firstName"
                    value={users.firstName}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    type="text"
                    name="lastName"
                    value={users.lastName}
                    onChange={handleChange}
                  />
                  <button type="submit">Update</button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
