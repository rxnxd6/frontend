import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { addUser, fetchUser } from '../../redux/slices/User/useerSlice'

export default function Register() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [user, setuser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user'
  })
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setuser((pervUser) => {
      return { ...pervUser, [event?.target.name]: event?.target.value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const newuser = { id: new Date().getTime, ...user }

    // dispatch action to adding user
    dispatch(fetchUser()).then(() => dispatch(addUser(newuser)))
    navigate('/')
  }

  return (
    <div className="container">
      <h2>User Registeration</h2>
      <form  className =" registeration-form"onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
        </div>

        <div className="form-field">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="password">password:</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
