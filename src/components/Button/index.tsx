import React, { FunctionComponent } from "react"
import "./style.css"

interface ButtonProps {
  text: string
  onClick: () => void
  inactive?: boolean
  disabled?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({
  text,
  onClick,
  inactive,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={!inactive ? "button--active" : "button--inactive"}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
