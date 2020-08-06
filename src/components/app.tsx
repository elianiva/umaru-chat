import { FunctionalComponent, h } from "preact"
import { Route, Router, RouterOnChangeArgs } from "preact-router"

import SignIn from "../routes/SignIn"
import NotFoundPage from "../routes/NotFound"
import SignUp from "../routes/SignUp"

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
        <Route path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <NotFoundPage default />
      </Router>
    </div>
  )
}

export default App
