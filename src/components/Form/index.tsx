import React, { useState, useEffect, FunctionComponent } from "react"
import "./style.css"
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

const Form: FunctionComponent<FormProps> = ({
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  autocomplete,
}: FormProps) => {
  const [isVisible, setVisible] = useState(false)

  return (
    <div>
      <label className="form__label">{label}</label>
      {type === "password" ? (
        <div className="form__wrapper">
          <input
            name={name}
            className="form__input"
            type={isVisible ? "text" : "password"}
            placeholder={isVisible ? "password" : placeholder}
            value={value}
            onChange={onChange}
            required
          />
          <div className="form__toggler">
            <input
              type="checkbox"
              className="form__checkbox"
              onChange={() => void setVisible(!isVisible)}
            />
            {/* <EyeIcon /> */}
          </div>
        </div>
      ) : (
        <input
          name={name}
          className="form__input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autocomplete}
          required
        />
      )}
    </div>
  )
}

export default Form
