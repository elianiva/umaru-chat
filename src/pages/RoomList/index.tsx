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
  const user = useContext(UserContext)

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
  } = user

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
    firebase.auth.onAuthStateChanged((userData) => {
      if (userData) {
        userData.updateProfile({ displayName: newName }).then(() => {
          localStorage.setItem("user", JSON.stringify(userData))
          user.setData(userData)
        })
      }
    })
  }

  const createRoom = () => {}

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
      {user.popup.isVisible && (
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
          rooms.map((room) => (
            <RoomCard
              title="anjay mabar"
              desc="room ga jelas buat bacot njir oakwoakw "
              url="#"
              current={4}
              max={10}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default RoomList
