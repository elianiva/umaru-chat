import { FunctionalComponent, h } from "preact"
import * as Style from "./style.css"

interface ButtonProps {
  text: string
  onClick: () => void
  inactive?: boolean
}

const Button: FunctionalComponent<ButtonProps> = ({
  text,
  onClick,
  inactive
}: ButtonProps) => {
  return (
    <button class={!inactive ? Style.active : Style.inactive} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
