import React, { FunctionComponent, useContext } from "react"
import "./style.css"
import Button from "../../components/Button"
import { useHistory } from "react-router-dom"
import { FirebaseContext } from "../../components/Firebase"

const ChatRoom: FunctionComponent = () => {
  const firebase = useContext(FirebaseContext)
  const history = useHistory()
  const username = "random dude on the internet"
  return (
    <div className="chatroom">
      <aside className="chatroom__side">
        <div className="chatroom__title">
          <span>room of something</span>
        </div>
        <div className="chatroom__participants">
          <span className="chatroom__ptext">Participants (2/10)</span>
          <div className="chatroom__participant you">
            <img src={firebase.defaultProfile} alt="" />
            <span className="chatroom__username">You</span>
          </div>
          <div className="chatroom__participant">
            <img src={firebase.defaultProfile} alt="" />
            <span className="chatroom__username">
              {username.length > 16
                ? `${username.substring(0, 16)}...`
                : username}
            </span>
          </div>
        </div>
      </aside>
      <nav className="chatroom__navbar">
        <Button
          text="Leave Chat"
          onClick={() => history.push("/rooms")}
          inactive
        />
      </nav>
      <main className="chatroom__main">
        <div className="chatroom__chats">
          <div className="chatroom__chat inactive">Hello there!</div>
          <div className="chatroom__chat active">Hey!</div>
          <div className="chatroom__chat inactive">日本語が話せますか</div>
          <div className="chatroom__chat active">
            はい、でも日本語はまだまだです
          </div>
          <div className="chatroom__chat inactive">ok cool</div>
          <div className="chatroom__chat active">so, how's life?</div>
          <div className="chatroom__chat inactive">
            idk it's been the same shit everyday
          </div>
          <div className="chatroom__chat active">そうか</div>
          <div className="chatroom__chat inactive">うん。。</div>
          <div className="chatroom__chat active">じゃ、またね</div>
        </div>
        <div className="chatroom__input">
          <input type="text" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </main>
    </div>
  )
}

export default ChatRoom
