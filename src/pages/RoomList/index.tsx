import React, { FunctionComponent, useContext, useEffect } from "react"
import { FirebaseContext, UserContext } from "../../components/Firebase"
import { useHistory } from "react-router-dom"
import Navbar from "../../components/Navbar"
import "./style.css"

const RoomList: FunctionComponent = () => {
  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  const logout = () => {
    firebase.logout().then(() => {
      history.push("/login")
    })
  }

  const user = useContext(UserContext)

  useEffect(() => {
    console.log(user.data)
  }, [user])

  return (
    <div>
      <Navbar onClick={logout} />
      <div className="room">
        <h1>Email: {user.data.email}</h1>
      </div>
    </div>
  )
}

export default RoomList
