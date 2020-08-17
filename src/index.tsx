import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import Firebase, { FirebaseContext, UserProvider } from "./components/Firebase"

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <UserProvider>
      <App />
    </UserProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
)
