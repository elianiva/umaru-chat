import React, { FunctionComponent } from "react"
import "./style.css"
import Button from "../Button"

interface NavbarProps {
  onClick: () => void
}

const Navbar: FunctionComponent<NavbarProps> = ({ onClick }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <h1 className="navbar__title">
          Umaru<span className="highlight">Chat</span>
        </h1>
        <Button onClick={onClick} text="Logout" inactive type="logout" />
      </div>
    </nav>
  )
}

export default Navbar
