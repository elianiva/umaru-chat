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

  const snapshotToArray = (snapshot): any => {
    let result: any[] = []
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val()
      item.key = childSnapshot.key
      result.push(item)
    })
    return result
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

  const createRoom = (room: { roomName: string }) => {
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
          rooms.map((room, index) => (
            <RoomCard
              key={index}
              title="anjay mabar"
              desc="room ga jelas buat bacot njir oakwoakw "
              url="#"
              current={0}
              max={10}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default RoomList
