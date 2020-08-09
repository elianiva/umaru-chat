import { FunctionalComponent, h } from "preact"
import Umaru from "../../assets/umaru.png"
import * as Style from "./style.css"
import Form from "../../components/Form"
import Button from "../../components/Button"
import { Link } from "preact-router"
import { useForm } from "../../hooks/useForm"

const Login: FunctionalComponent = () => {
  const [formValue, setFormValue] = useForm()

  return (
    <div class={Style.container}>
      <div class={Style.wrapper}>
        <img src={Umaru} alt="Umaru" class={Style.avatar} />
        <Form
          name="email"
          type="email"
          label="Email"
          placeholder="Ex: im@elianiva.me"
          value={formValue.email}
          onChange={e => setFormValue(e)}
          autocomplete="email"
        />
        <Form
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••••"
          value={formValue.password}
          onChange={e => setFormValue(e)}
          autocomplete="off"
        />
        <Button text="Login" onClick={() => console.log(formValue)} />
        <span class={Style.message}>
          Don’t have any account yet? <Link href="/signup">Register here</Link>
        </span>
      </div>
    </div>
  )
}

export default Login
