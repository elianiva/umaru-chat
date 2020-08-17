import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "./styles/index.css"
import Notfound from "./pages/NotFound"
import RoomList from "./pages/RoomList"
import PrivateRoute from "./components/PrivateRoute"

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
        <PrivateRoute path="/rooms">
          <RoomList />
        </PrivateRoute>
        <Route path="*">
          <Notfound />
        </Route>
      </Switch>
    </Router>
  )
}
