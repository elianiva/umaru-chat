import { FunctionalComponent, h } from "preact"
import { useState } from "preact/hooks"
import Umaru from "../../assets/umaru.png"
import * as Style from "./style.css"
import Form from "../../components/Form"
import Button from "../../components/Button"
import { Link } from "preact-router"

const Login: FunctionalComponent = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  return (
    <div class={Style.container}>
      <div class={Style.wrapper}>
        <img src={Umaru} alt="Umaru" class={Style.avatar} />
        <Form type="email" label="Email" placeholder="Ex: im@elianiva.me" />
        <Form type="password" label="Password" placeholder="••••••••••" />
        <Button text="Login" />
        <span class={Style.message}>
          Don’t have any account yet? <Link href="/signup">Register here</Link>
        </span>
      </div>
    </div>
  )
}

export default Login
