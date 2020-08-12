import React, { FunctionComponent } from "react"
import "./style.css"

interface ButtonProps {
  text: string
  onClick: () => void
  inactive?: boolean
}

const Button: FunctionComponent<ButtonProps> = ({
  text,
  onClick,
  inactive,
}: ButtonProps) => {
  return (
    <button
      className={!inactive ? "button--active" : "button--inactive"}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
