import React, { FunctionComponent, useContext, useEffect } from "react"
import Umaru from "../../assets/umaru.png"
import Form from "../../components/Form"
import Button from "../../components/Button"
import { Link, useHistory } from "react-router-dom"
import { useForm } from "../../utils/useForm"
import "./style.css"
import { FirebaseContext, UserContext } from "../../components/Firebase"

const Login: FunctionComponent = () => {
  const [formValue, setFormValue] = useForm({
    email: "",
    password: "",
  })
  const firebase: any = useContext(FirebaseContext)
  const user = useContext(UserContext)
  const history = useHistory()

  const isInvalid = formValue.email === "" || formValue.password === ""

  const login = () => {
    const { email, password } = formValue
    firebase.login(email, password).then((data) => {
      const userData = {
        displayName: data.user.displayName,
        email: data.user.email,
        uid: data.user.uid,
        photoURL: data.user.photoURL,
      }
      user.setData(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      history.push("/rooms")
    })
  }

  useEffect(() => {
    localStorage.getItem("user") && history.push("/rooms")
  }, [])

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
          onChange={(e) => setFormValue(e.target.name, e.target.value)}
          autocomplete="email"
        />
        <Form
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••••"
          value={formValue.password}
          onChange={(e) => setFormValue(e.target.name, e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login()}
          autocomplete="off"
        />
        <Button
          disabled={isInvalid}
          text="Login"
          onClick={() => login()}
          type="gap"
        />
        <span className="login__message">
          Don’t have any account yet? <Link to="/register">Register here</Link>
        </span>
      </div>
    </div>
  )
}

export default Login
