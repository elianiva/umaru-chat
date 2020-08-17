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
    console.log(user)
  }, [user])

  return (
    <div>
      <Navbar onClick={logout} />
      <div className="room">
        <h1>Name:</h1>
      </div>
    </div>
  )
}

export default RoomList
