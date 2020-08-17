import React, { createContext, useState, FunctionComponent } from "react"

const UserContext = createContext<any | null>(null)

const UserProvider: FunctionComponent = ({ children }) => {
  const [userData, setUserData] = useState()
  const value = {
    data: JSON.parse(localStorage.getItem("user") as string) || userData,
    setData: (value: any) => setUserData(value),
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider

export { UserContext }
