import React, { FunctionComponent } from "react"
import Umaru from "../../assets/umaru.png"
import Form from "../../components/Form"
import Button from "../../components/Button"
import { Link } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import "./style.css"

const Login: FunctionComponent = () => {
  const [formValue, setFormValue] = useForm()

  return (
    <div className="login">
      <div className="login__wrapper">
        <img src={Umaru} alt="Umaru" className="login__avatar" />
        <Form
          name="email"
          type="email"
          label="Email"
          placeholder="Ex: im@elianiva.me"
          value={formValue.email}
          onChange={(e: InputEvent) => setFormValue(e)}
          autocomplete="email"
        />
        <Form
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••••"
          value={formValue.password}
          onChange={(e: InputEvent) => setFormValue(e)}
          autocomplete="off"
        />
        <Button text="Login" onClick={() => console.log(formValue)} />
        <span className="login__message">
          Don’t have any account yet? <Link to="/register">Register here</Link>
        </span>
      </div>
    </div>
  )
}

export default Login
