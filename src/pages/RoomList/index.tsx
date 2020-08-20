import React, { FunctionComponent, useContext } from "react"
import { useHistory } from "react-router-dom"
import { FirebaseContext, UserContext } from "../../components/Firebase"
import Navbar from "../../components/Navbar"
import ProfileCard from "../../components/ProfileCard"
import "./style.css"

const RoomList: FunctionComponent = () => {
  const firebase = useContext(FirebaseContext)
  const history = useHistory()
  const user = useContext(UserContext)

  const logout = () => {
    firebase.logout().then(() => {
      history.push("/login")
      localStorage.clear()
    })
  }

  const { displayName, email } = user.data

  const defaultProfile =
    "https://firebasestorage.googleapis.com/v0/b/umaru-chat.appspot.com/o/user_profile%2Fdefault.svg?alt=media&token=28d6b78a-a42b-46f9-af4b-0fbb3dad8b4e"

  return (
    <div>
      <Navbar onClick={logout} />
      <div className="room">
        <ProfileCard name={displayName} email={email} pict={defaultProfile} />
      </div>
    </div>
  )
}

export default RoomList
