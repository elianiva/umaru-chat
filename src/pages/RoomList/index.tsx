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
    let chat = {
      roomName: "",
      displayName: "",
      message: "",
      date: "",
      type: "",
    }
    chat = {
      roomName,
      displayName,
      date: Tempe(new Date()).format("hh:mm:ss"),
      message: `${displayName} enter the room`,
      type: "join",
    }
    const newMessage = firebase.database.ref("chats/").push()
    newMessage.set(chat)

    firebase.database
      .ref("roomUsers/")
      .orderByChild("roomname")
      .equalTo(roomName)
      .on("value", (resp) => {
        let roomuser = []
        roomuser = snapshotToArray(resp)
        const user: any = roomuser.find(
          (x: any) => x.displayName === displayName
        )
        if (user !== undefined) {
          const userRef = firebase.database.ref("roomUsers/" + user.key)
          userRef.update({ status: "online" })
        } else {
          const newRoomUser = {
            roomName,
            displayName,
            status: "online",
          }
          const newroomuser = firebase.database.ref("roomUsers/").push()
          newroomuser.set(newRoomUser)
        }
      })

    history.push("/room/" + roomId.replace(/-/, ""))
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
    const fetchData = async () => {
      firebase.database.ref("rooms/").on("value", (resp) => {
        setRooms(snapshotToArray(resp))
      })
    }
    fetchData()
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
