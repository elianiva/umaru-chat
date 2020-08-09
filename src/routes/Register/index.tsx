import { FunctionalComponent, h, Fragment } from "preact"
import { useState } from "preact/hooks"
import Umaru from "../../assets/umaru.png"
import * as Style from "./style.css"
import Form from "../../components/Form"
import Button from "../../components/Button"
import { Link } from "preact-router"
import { useForm } from "../../hooks/useForm"

const Register: FunctionalComponent = () => {
  const [firstStep, setFirstStep] = useState(true)
  const [formValue, setFormValue] = useForm()

  return (
    <div class={Style.container}>
      <div class={Style.wrapper}>
        <img src={Umaru} alt="Umaru" class={Style.avatar} />
        {firstStep ? (
          <Fragment>
            <Form
              name="username"
              type="text"
              label="Username"
              placeholder="Ex: elianiva"
              value={formValue.username}
              onChange={e => setFormValue(e)}
              autocomplete
            />
            <Form
              name="email"
              type="email"
              label="Email"
              placeholder="Ex: im@elianiva.me"
              value={formValue.email}
              onChange={e => setFormValue(e)}
              autocomplete
            />
            <Button text="Next" onClick={() => setFirstStep(false)} />
          </Fragment>
        ) : (
          <Fragment>
            <Form
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••••"
              value={formValue.password}
              onChange={e => setFormValue(e)}
            />
            <Form
              name="password2"
              type="password"
              label="Reenter Password"
              placeholder="••••••••••"
              value={formValue.password2}
              onChange={e => setFormValue(e)}
            />
            <Button
              text={firstStep ? "Next" : "Register"}
              onClick={
                firstStep
                  ? () => setFirstStep(false)
                  : () => console.log(formValue)
              }
            />
            <Button text="Back" onClick={() => setFirstStep(true)} inactive />
          </Fragment>
        )}
        <span class={Style.message}>
          Already have an account? <Link href="/">Login here</Link>
        </span>
      </div>
    </div>
  )
}

export default Register
