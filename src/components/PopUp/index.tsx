import React, { FunctionComponent, useContext } from "react"
import "./style.css"
import Form from "../Form"
import { useForm } from "../../utils/useForm"
import Button from "../Button"
import { UserContext } from "../Firebase"

interface PopUp {
  popup: string
  desc: string
}

interface PopUpInterface {
  onClick: {
    updateUsername: (string) => void
    createRoom: (room: {
      roomName: string
      desc: string
      users: number
    }) => void
  }
}

const PopUp: FunctionComponent<PopUpInterface> = ({
  onClick,
}: PopUpInterface) => {
  const [formValue, setFormValue] = useForm<PopUp>({
    popup: "",
    desc: "",
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
          autocomplete="none"
        />
        {popup.type !== "username" && (
          <Form
            name="desc"
            type="text"
            label="Short Description"
            placeholder={"Room for casual chat"}
            value={formValue.desc}
            onChange={(e) => setFormValue(e.target.name, e.target.value)}
            autocomplete="none"
          />
        )}
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
                : onClick.createRoom({
                    roomName: formValue.popup,
                    desc: formValue.desc,
                    users: 0,
                  })
              popup.setVisible(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PopUp
