import React, { FunctionComponent, useContext } from "react"
import "./style.css"
import Form from "../Form"
import { useForm } from "../../hooks/useForm"
import Button from "../Button"
import { UserContext } from "../Firebase"

interface PopUpInterface {
  onClick: {
    updateUsername: (string) => void
    createRoom: ({ roomName: string }) => void
  }
}

const PopUp: FunctionComponent<PopUpInterface> = ({
  onClick,
}: PopUpInterface) => {
  const [formValue, setFormValue] = useForm({
    popup: "",
  })
  const { popup } = useContext(UserContext)

  return (
    <div className="popup">
      <div className="popup__box">
        <h1 className="popup__title">
          {popup.type === "username" ? "Change Username" : "Create New Room"}
        </h1>
        <Form
          name="popup"
          type="text"
          label={popup.type === "username" ? "New Username" : "Room Name"}
          placeholder={
            popup.type === "username" ? "Ex: StupidPanner" : "Ex: Random chats"
          }
          value={formValue.popup}
          onChange={(e) => setFormValue(e.target.name, e.target.value)}
          autocomplete="username"
        />
        <div className="popup__buttons">
          <Button
            text="Cancel"
            onClick={() => popup.setVisible(false)}
            inactive
          />
          <Button
            text="Confirm"
            onClick={() => {
              popup.type === "username"
                ? onClick.updateUsername(formValue.popup)
                : onClick.createRoom({ roomName: formValue.popup })
              popup.setVisible(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PopUp
