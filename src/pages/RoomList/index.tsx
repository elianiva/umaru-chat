import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react"
import { useHistory } from "react-router-dom"
import { FirebaseContext, UserContext } from "../../components/Firebase"
import Navbar from "../../components/Navbar"
import ProfileCard from "../../components/ProfileCard"
import "./style.css"
import RoomCard from "../../components/RoomCard"
import PopUp from "../../components/PopUp"
import Tempe from "tempe"
import { snapshotToArray } from "../../utils/snapshotToArray"

const RoomList: FunctionComponent = () => {
  const firebase = useContext(FirebaseContext)
  const [rooms, setRooms] = useState([])
  const history = useHistory()
  const userContext = useContext(UserContext)

  const logout = () => {
    firebase.logout().then(() => {
      history.push("/login")
      localStorage.clear()
    })
  }

  // destructure values from context
  const {
    popup,
    data: { displayName, email, photoURL },
  } = userContext

  const enterChatRoom = (roomName: string, roomId: string) => {
    const chat = {
      roomName,
      displayName,
      date: Tempe(new Date()).format("hh:mm:ss"),
      message: `${displayName} joined`,
      type: "join",
    }
    const newMessage = firebase.database.ref("chats/").push()
    newMessage.set(chat)

    // create new roomUser or set it to online
    firebase.database
      .ref("roomUsers/")
      .orderByChild("roomName")
      .equalTo(roomName)
      .once("value", (resp) => {
        const roomuser = snapshotToArray(resp)
        const user = roomuser.find((x) => x.displayName === displayName)
        if (user !== undefined) {
          const userRef = firebase.database.ref(`roomUsers/${user.key}`)
          userRef.update({ status: "online" })
        } else {
          const newRoomUser = {
            roomName,
            displayName,
            status: "online",
          }
          const newRoomUserRef = firebase.database.ref("roomUsers/").push()
          newRoomUserRef.set(newRoomUser)
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
          roomRef.update({ users: room.users + 1 })
        }
      })

    history.push("/room/" + roomId.replace(/-/, ""))
    userContext.setRoomName(roomName)
  }

  const updateUsername = (newName: string) => {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        user.updateProfile({ displayName: newName }).then(() => {
          const userData = {
            displayName: newName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
          }
          userContext.setData(userData)
          localStorage.setItem("user", JSON.stringify(userData))
        })
      }
    })
  }

  const createRoom = (room: {
    roomName: string
    desc: string
    users: number
  }) => {
    firebase.database
      .ref("rooms/")
      .orderByChild("roomname")
      .equalTo(room.roomName)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          alert("Room exist")
        } else {
          const newRoom = firebase.database.ref("rooms/").push()
          newRoom.set(room)
          history.goBack()
        }
      })
  }

  useEffect(() => {
    let mounted = true // for cleanup function

    if (mounted) {
      firebase.database.ref("rooms/").on("value", (resp) => {
        setRooms(snapshotToArray(resp))
      })
    }

    return () => (mounted = false)
  }, [])

  return (
    <div>
      <Navbar onClick={logout} />
      {userContext.popup.isVisible && (
        <PopUp
          onClick={{
            updateUsername,
            createRoom,
          }}
        />
      )}
      <div className="room">
        <ProfileCard name={displayName} email={email} pict={photoURL} />
        <h1 className="room__title">Room List</h1>
        <hr />
        {rooms.length < 1 ? (
          <span className="room__notice">No rooms available</span>
        ) : (
          rooms.map((room: any) => (
            <RoomCard
              key={room.key}
              title={room.roomName}
              desc={room.desc}
              url={room.key}
              current={room.users}
              max={10}
              onClick={() => enterChatRoom(room.roomName, room.key)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default RoomList
