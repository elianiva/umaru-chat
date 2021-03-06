import React, { FunctionComponent } from "react"
import "./style.css"
import Button from "../Button"

interface RoomCardProps {
  title: string
  url: string
  desc: string
  current: number
  max: number
  onClick: () => void
}

const RoomCard: FunctionComponent<RoomCardProps> = ({
  title,
  url,
  desc,
  current,
  max,
  onClick,
}: RoomCardProps) => (
  <div className="roomcard">
    <div className="roomcard__left">
      <h2>
        {current}/{max}
      </h2>
    </div>
    <div className="roomcard__middle">
      <span className="roomcard__title">{title}</span>
      <p className="roomcard__desc">{desc}</p>
    </div>
    <div className="roomcard__right">
      <Button text="Join" onClick={onClick} />
    </div>
  </div>
)

export default RoomCard
