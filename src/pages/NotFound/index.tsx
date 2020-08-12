import React, { FunctionComponent } from "react"
import "./style.css"

const Notfound: FunctionComponent = () => {
  return (
    <div className="notfound">
      <h1>Error 404</h1>
      <p>That page doesn&apos;t exist.</p>
    </div>
  )
}

export default Notfound
