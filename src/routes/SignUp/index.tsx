import { FunctionalComponent, h, Fragment } from "preact"
import { useState } from "preact/hooks"
import Umaru from "../../assets/umaru.png"
import * as Style from "./style.css"
import Form from "../../components/Form"
import Button from "../../components/Button"
import { Link } from "preact-router"

const SignUp: FunctionalComponent = () => {
  const [current, setCurrent] = useState(true)

  return (
    <div class={Style.container}>
      <div class={Style.wrapper}>
        <img src={Umaru} alt="Umaru" class={Style.avatar} />
        {current ? (
          <Fragment>
            <Form type="text" label="Username" placeholder="Ex: elianiva" />
            <Form type="email" label="Email" placeholder="Ex: im@elianiva.me" />
            <Button text="Next" onClick={() => setCurrent(false)} />
          </Fragment>
        ) : (
          <Fragment>
            <Form type="password" label="Password" placeholder="••••••••••" />
            <Form
              type="password"
              label="Reenter Password"
              placeholder="••••••••••"
            />
            <Button text="Next" onClick={() => setCurrent(false)} />
            <Button text="Back" onClick={() => setCurrent(true)} inactive />
          </Fragment>
        )}
        <span class={Style.message}>
          Already have an account? <Link href="/">Sign in here</Link>
        </span>
      </div>
    </div>
  )
}

export default SignUp
