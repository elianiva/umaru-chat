import { FunctionalComponent, h } from "preact"
import * as Style from "./style.css"

const Button: FunctionalComponent<{
  text: string
  onClick?: () => void
  inactive?: boolean
}> = ({ text, onClick, inactive }) => {
  return (
    <button class={!inactive ? Style.active : Style.inactive} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
