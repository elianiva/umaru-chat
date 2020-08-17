import React, { createContext, useState, FunctionComponent } from "react"

const UserContext = createContext<any | null>(null)

const UserProvider: FunctionComponent = ({ children }) => {
  const [userData, setUserData] = useState({ authUser: null })
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}

export default UserProvider

export { UserContext }
