import { FunctionalComponent, h } from "preact"
import Umaru from "../../assets/umaru.png"
import * as Style from "./style.css"
import Form from "../../components/Form"
import Button from "../../components/Button"
import { Link } from "preact-router"

const SignIn: FunctionalComponent = () => {
  return (
    <div class={Style.container}>
      <div class={Style.wrapper}>
        <img src={Umaru} alt="Umaru" class={Style.avatar} />
        <Form type="email" label="Email" placeholder="Ex: im@elianiva.me" />
        <Form type="password" label="Password" placeholder="••••••••••" />
        <Button text="Sign In" />
        <span class={Style.message}>
          Don’t have any account yet? <Link href="/signup">Sign up here</Link>
        </span>
      </div>
    </div>
  )
}

export default SignIn
