import { FunctionalComponent, h } from "preact"
import { Route, Router, RouterOnChangeArgs } from "preact-router"

import Login from "../routes/Login"
import NotFoundPage from "../routes/NotFound"
import Register from "../routes/Register"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/debug")
}

const App: FunctionalComponent = () => {
  let currentUrl: string
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url
  }

  return (
    <div id="app">
      <Router onChange={handleRoute}>
        <Route path="/" component={Login} />
        <Route path="/signup" component={Register} />
        <NotFoundPage default />
      </Router>
    </div>
  )
}

export default App
