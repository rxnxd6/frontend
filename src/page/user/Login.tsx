import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchUser, login } from '../../redux/slices/User/useerSlice'

export default function Login({ pathName }: { pathName: string }) {
  const { user } = useSelector((state: RootState) => state.userR)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  const navigate = useNavigate()
  const [users, setUsers] = useState({
    email: '',
    password: ''
  })
  const handlInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsers((prevstate) => {
      return { ...prevstate, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    console.log(user)
    event.preventDefault()
    try {
      // get the user data  tp login and match the data with users state
      const foundUser = user.find((userData) => userData.email === users.email)
      // console.log(users)
      if (foundUser && foundUser.password === users.password) {
        dispatch(login(foundUser))
        navigate(pathName ? pathName : `/dashboard/${foundUser.role}`)
      } else {
        console.log('something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
    setUsers({
      email: '',
      password: ''
    })
  }
  return (
    <div className="container-login">
      <div className="card-login">
        <form className="registeration-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <h2> Login</h2>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email "
              value={users.email}
              onChange={handlInputChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              name="password"
              id="password "
              placeholder="password "
              value={users.password}
              onChange={handlInputChange}
            />
          </div>
          <div className="from-container">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
