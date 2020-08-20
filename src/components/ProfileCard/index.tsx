import React, { FunctionComponent } from "react"
import "./style.css"

interface ProfileCardProps {
  name: string
  email: string
  pict: string
}

const ProfileCard: FunctionComponent<ProfileCardProps> = ({
  name,
  email,
  pict,
}: ProfileCardProps) => {
  return (
    <div className="profile">
      <div className="profile__left">
        <img src={pict} alt="Profile Picture" />
      </div>
      <div className="profile__right">
        <span>
          You're logged in as <span className="highlight">{name}</span>
        </span>
        <div className="profile__buttons">
          <button className="profile__button">Create Room</button>
          <button className="profile__button inactive">Change Username</button>
          <button className="profile__button inactive">Change Password</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
