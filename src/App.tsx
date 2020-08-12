import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./styles/index.css"

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  )
}
