import React, { FunctionComponent, useState } from "react"
import Umaru from "../../assets/umaru.png"
import Form from "../../components/Form"
import Button from "../../components/Button"
import { Link } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import "./style.css"

const Register: FunctionComponent = () => {
  const [firstStep, setFirstStep] = useState(true)
  const [formValue, setFormValue] = useForm()

  return (
    <div className="login">
      <div className="login__wrapper">
        <img src={Umaru} alt="Umaru" className="login__avatar" />
        {firstStep ? (
          <>
            <Form
              name="username"
              type="text"
              label="Username"
              placeholder="Ex: elianiva"
              value={formValue.username}
              onChange={(e: InputEvent) => setFormValue(e)}
              autocomplete="username"
            />
            <Form
              name="email"
              type="email"
              label="Email"
              placeholder="Ex: im@elianiva.me"
              value={formValue.email}
              onChange={(e: InputEvent) => setFormValue(e)}
              autocomplete="email"
            />
            <Button text="Next" onClick={() => setFirstStep(false)} />
          </>
        ) : (
          <>
            <Form
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••••"
              value={formValue.password}
              onChange={(e: InputEvent) => setFormValue(e)}
              autocomplete="off"
            />
            <Form
              name="password2"
              type="password"
              label="Reenter Password"
              placeholder="••••••••••"
              value={formValue.password2}
              onChange={(e: InputEvent) => setFormValue(e)}
              autocomplete="off"
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
          </>
        )}
        <span className="login__message">
          Already have an account? <Link to="/">Login here</Link>
        </span>
      </div>
    </div>
  )
}

export default Register
