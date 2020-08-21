import React, { FunctionComponent } from "react"
import "./style.css"

interface ButtonProps {
  text: string
  onClick: () => void
  inactive?: boolean
  disabled?: boolean
  type?: string
}

const Button: FunctionComponent<ButtonProps> = ({
  text,
  onClick,
  inactive,
  disabled,
  type,
}: ButtonProps) => {
  return (
    <button
      className={
        !inactive ? `button--active ${type}` : `button--inactive ${type}`
      }
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
