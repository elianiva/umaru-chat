import { FunctionalComponent, h } from "preact"
import { Link } from "preact-router/match"
import * as Style from "./style.css"

const Notfound: FunctionalComponent = () => {
  return (
    <div class={Style.notfound}>
      <h1>Error 404</h1>
      <p>That page doesn&apos;t exist.</p>
      <Link href="/">
        <h4>Back to Home</h4>
      </Link>
    </div>
  )
}

export default Notfound
