import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./styles/index.css"
import Notfound from "./pages/NotFound"

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="*">
          <Notfound />
        </Route>
      </Switch>
    </Router>
  )
}
