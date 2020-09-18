import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react"
import "./style.css"
import Button from "../../components/Button"
import { useHistory } from "react-router-dom"
import { FirebaseContext, UserContext } from "../../components/Firebase"
import { snapshotToArray } from "../../utils/snapshotToArray"
import { useForm } from "../../utils/useForm"
import Tempe from "tempe"

const ChatRoom: FunctionComponent = () => {
  const [roomName, setRoomName] = useState("")
  const [chats, setChats] = useState([])
  const [users, setUsers] = useState([])
  const [formValue, setFormValue] = useForm<{ message: string }>({
    message: "",
  })
  const chatRef = useRef(null)
  const firebase = useContext(FirebaseContext)
  const user = useContext(UserContext)
  const history = useHistory()

  const sendMessage = () => {
    const chat = {
      roomName,
      displayName: user.data.displayName,
      message: formValue.message,
      date: Tempe(new Date()).format("hh:mm:ss"),
      type: "message",
    }
    const newMessage = firebase.database.ref("chats/").push()
    newMessage.set(chat)
    setFormValue("message", "")
  }

  const leaveRoom = () => {
    const chat = {
      roomName,
      displayName: user.data.displayName,
      date: Tempe(new Date()).format("hh:mm:ss"),
      message: `${user.data.displayName} left`,
      type: "leave",
    }
    const newMessage = firebase.database.ref("chats/").push()
    newMessage.set(chat)

    // set user status to offline
    firebase.database
      .ref("roomUsers/")
      .orderByChild("displayName")
      .equalTo(user.data.displayName)
      .once("value", (resp) => {
        const roomUsers = snapshotToArray(resp)
        const currentUser = roomUsers.find(
          (x) => x.displayName === user.data.displayName
        )
        if (currentUser != undefined) {
          const userRef = firebase.database.ref(`roomUsers/${currentUser.key}`)
          userRef.update({ status: "offline" })
        }
      })

    // update active users
    firebase.database
      .ref("rooms/")
      .orderByChild("roomName")
      .equalTo(roomName)
      .once("value", (resp) => {
        const rooms = snapshotToArray(resp)
        const room = rooms.find((x) => x.roomName === roomName)
        if (room !== undefined) {
          const roomRef = firebase.database.ref(`rooms/${room.key}`)
          roomRef.update({ users: room.users - 1 })
        }
      })

    history.goBack()
  }

  // autoscroll to the last chat
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [chats])

  useEffect(() => {
    const fetchData = async () => {
      setRoomName(user.roomName)

      firebase.database
        .ref("chats/")
        .orderByChild("roomName")
        .equalTo(roomName)
        .on("value", (resp) => {
          setChats([])
          setChats(snapshotToArray(resp))
        })
    }
    fetchData()
  }, [roomName])

  return (
    <div className="chatroom">
      <aside className="chatroom__side">
        <div className="chatroom__title">
          <span>{user.roomName}</span>
        </div>
        <div className="chatroom__participants">
          <span className="chatroom__ptext">Participants (2/10)</span>
          <div className="chatroom__participant you">
            <img src={firebase.defaultProfile} alt="" />
            <span className="chatroom__username">You</span>
          </div>
          {/* <div className="chatroom__participant"> */}
          {/*   <img src={firebase.defaultProfile} alt="" /> */}
          {/*   <span className="chatroom__username"> */}
          {/*     {username.length > 16 */}
          {/*       ? `${username.substring(0, 16)}...` */}
          {/*       : username} */}
          {/*   </span> */}
          {/* </div> */}
        </div>
      </aside>
      <nav className="chatroom__navbar">
        <Button text="Leave Chat" onClick={leaveRoom} inactive />
      </nav>
      <main className="chatroom__main">
        <div ref={chatRef} className="chatroom__chats">
          {chats.map((chat: any, index: number) => {
            return (
              <div
                key={index}
                className={`chatroom__chat ${
                  chat.type === "join" || chat.type === "leave"
                    ? "mid"
                    : chat.displayName === user.data.displayName
                    ? "active"
                    : "inacive"
                }`}
              >
                {chat.displayName !== user.data.displayName &&
                chat.type === "message" ? (
                  <p className="chatroom__name">{chat.displayName}</p>
                ) : null}
                {chat.message}
              </div>
            )
          })}
        </div>
        <div className="chatroom__input">
          <input
            type="text"
            name="message"
            placeholder="Type your message..."
            onChange={(e) => setFormValue(e.target.name, e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            value={formValue.message}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </main>
    </div>
  )
}

export default ChatRoom
