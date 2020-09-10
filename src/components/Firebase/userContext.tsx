import React, { createContext, useState, FunctionComponent } from "react"

const UserContext = createContext<any | null>(null)

const UserProvider: FunctionComponent = ({ children }) => {
  const [userData, setUserData] = useState({})
  const [roomName, setRoomName] = useState("")
  const [isVisible, setVisible] = useState(false)
  const [type, setType] = useState("")
  const value = {
    data: JSON.parse(localStorage.getItem("user") as string) || userData,
    setData: (value) => setUserData(value),
    popup: {
      isVisible,
      setVisible,
      type,
      setType,
    },
    roomName,
    setRoomName: (value) => setRoomName(value),
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider

export { UserContext }
