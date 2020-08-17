import React, { FunctionComponent, ReactNode } from "react"
import { Route, Redirect } from "react-router-dom"

interface PrivateRouteProps {
  children: ReactNode
  [key: string]: any
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  children,
  ...rest
}: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("user") ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    ></Route>
  )
}

export default PrivateRoute
