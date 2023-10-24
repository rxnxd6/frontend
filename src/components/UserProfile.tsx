import React from 'react'
import UserSideBar from './UserSideBar'

export default function UserProfile() {
  return (
    <div>
      <div className="container">
        <UserSideBar />
        <div className="main-content">main Profile here</div>
      </div>
    </div>
  )
}
