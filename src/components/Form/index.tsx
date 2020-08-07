import { FunctionalComponent, h } from "preact"
import { useState } from "preact/hooks"
import * as Style from "./style.css"
import EyeIcon from "../../assets/eye.svg"

interface FormProps {
  type: string
  label: string
  placeholder: string
  value: string
}

const Form: FunctionalComponent<FormProps> = ({
  type,
  label,
  placeholder,
  value
}: FormProps) => {
  const [isVisible, setVisible] = useState(false)

  return (
    <div>
      <label class={Style.label}>{label}</label>
      {type === "password" ? (
        <div class={Style.wrapper}>
          <input
            class={Style.input}
            type={isVisible ? "text" : "password"}
            placeholder={isVisible ? "password" : placeholder}
            value={value}
          />
          <div class={Style.toggler}>
            <input
              type="checkbox"
              class={Style.checkbox}
              onChange={() => void setVisible(!isVisible)}
            />
            <EyeIcon />
          </div>
        </div>
      ) : (
        <input
          class={Style.input}
          type={type}
          placeholder={placeholder}
          value={value}
        />
      )}
    </div>
  )
}

export default Form
