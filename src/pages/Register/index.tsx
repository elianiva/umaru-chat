import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from "react"
import Umaru from "../../assets/umaru.png"
import Form from "../../components/Form"
import Button from "../../components/Button"
import { Link, useHistory } from "react-router-dom"
import { useForm } from "../../utils/useForm"
import "./style.css"
import { FirebaseContext, UserContext } from "../../components/Firebase"

const Register: FunctionComponent = () => {
  const [firstStep, setFirstStep] = useState(true)
  const [formValue, setFormValue] = useForm({
    username: "",
    email: "",
    password: "",
    password2: "",
  })
  const firebase: any = useContext(FirebaseContext)
  const user = useContext(UserContext)
  const history = useHistory()

  const isInvalid = formValue.username === "" || formValue.email === ""
  const isPasswordInvalid =
    formValue.password !== formValue.password2 || formValue.password === ""

  const register = () => {
    const { username, email, password } = formValue
    firebase.register(email, password, username).then(() => {
      history.push("/login")
    })
  }

  useEffect(() => {
    localStorage.getItem("user") && history.push("/rooms")
  }, [])

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
              onChange={(e) => setFormValue(e.target.name, e.target.value)}
              autocomplete="username"
            />
            <Form
              name="email"
              type="email"
              label="Email"
              placeholder="Ex: im@elianiva.me"
              value={formValue.email}
              onChange={(e) => setFormValue(e.target.name, e.target.value)}
              autocomplete="email"
            />
            <Button
              disabled={isInvalid}
              text={firstStep ? "Next" : "Register"}
              onClick={() => setFirstStep(false)}
              type="gap"
            />
          </>
        ) : (
          <>
            <Form
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••••"
              value={formValue.password}
              onChange={(e) => setFormValue(e.target.name, e.target.value)}
              autocomplete="off"
            />
            <Form
              name="password2"
              type="password"
              label="Reenter Password"
              placeholder="••••••••••"
              value={formValue.password2}
              onChange={(e) => setFormValue(e.target.name, e.target.value)}
              autocomplete="off"
            />
            <Button
              disabled={isPasswordInvalid}
              text={firstStep ? "Next" : "Register"}
              onClick={firstStep ? () => setFirstStep(false) : () => register()}
              type="gap"
            />
            <Button
              text="Back"
              onClick={() => setFirstStep(true)}
              inactive
              type="gap"
            />
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
