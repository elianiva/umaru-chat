import React, { Suspense } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./styles/index.css"

// lazy loaded components
const Login = React.lazy(() => import("./pages/Login"))
const Register = React.lazy(() => import("./pages/Register"))
const NotFound = React.lazy(() => import("./pages/NotFound"))
const RoomList = React.lazy(() => import("./pages/RoomList"))
const ChatRoom = React.lazy(() => import("./pages/ChatRoom"))
const PrivateRoute = React.lazy(() => import("./components/PrivateRoute"))

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>loading</div>}>
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
          <PrivateRoute path="/room/:id">
            <ChatRoom />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}
