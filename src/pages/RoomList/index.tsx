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

  const { displayName, email } = user.data

  const defaultProfile =
    "https://firebasestorage.googleapis.com/v0/b/umaru-chat.appspot.com/o/user_profile%2Fdefault.svg?alt=media&token=28d6b78a-a42b-46f9-af4b-0fbb3dad8b4e"

  const snapshotToArray = (snapshot): any => {
    let result: any[] = []
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val()
      item.key = childSnapshot.key
      result.push(item)
    })
    return result
  }

  useEffect(() => {
    const fetchData = async () => {
      firebase.database.ref("rooms/").on("value", (resp) => {
        setRooms(snapshotToArray(resp))
        console.log(snapshotToArray(resp))
      })
    }
    fetchData()
  }, [])

  return (
    <div>
      <Navbar onClick={logout} />
      {user.popup.isVisible && <PopUp />}
      <div className="room">
        <ProfileCard name={displayName} email={email} pict={defaultProfile} />
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
