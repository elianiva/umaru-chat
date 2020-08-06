import { FunctionalComponent, h } from "preact"
import * as Style from "./style.css"

interface FormProps {
  type: string
  label: string
  placeholder: string
}

const Form: FunctionalComponent<FormProps> = ({ type, label, placeholder }) => {
  return (
    <div>
      <label class={Style.label}>{label}</label>
      {type === "password" ? (
        <input class={Style.input} type={type} placeholder={placeholder} />
      ) : (
        <input class={Style.input} type={type} placeholder={placeholder} />
      )}
    </div>
  )
}

export default Form
