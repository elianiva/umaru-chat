import { FunctionalComponent, h } from "preact"
import { useState } from "preact/hooks"
import * as Style from "./style.css"
import EyeIcon from "../../assets/eye.svg"

interface FormProps {
  name: string
  type: string
  label: string
  placeholder: string
  value: string
  onChange: any
  autocomplete: string
}

const Form: FunctionalComponent<FormProps> = ({
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  autocomplete
}: FormProps) => {
  const [isVisible, setVisible] = useState(false)

  return (
    <div>
      <label class={Style.label}>{label}</label>
      {type === "password" ? (
        <div class={Style.wrapper}>
          <input
            name={name}
            class={Style.input}
            type={isVisible ? "text" : "password"}
            placeholder={isVisible ? "password" : placeholder}
            value={value}
            onInput={onChange}
            required
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
          name={name}
          class={Style.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onInput={onChange}
          autoComplete={autocomplete}
          required
        />
      )}
    </div>
  )
}

export default Form
