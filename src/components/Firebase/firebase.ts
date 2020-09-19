import app from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/database"

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
}

class Firebase {
  auth: any
  storage: any
  database: any
  defaultProfile: string

  constructor() {
    app.initializeApp(config)

    this.auth = app.auth()
    this.storage = app.storage()
    this.database = app.database()
    this.defaultProfile =
      "https://firebasestorage.googleapis.com/v0/b/umaru-chat.appspot.com/o/user_profile%2Fdefault.svg?alt=media&token=28d6b78a-a42b-46f9-af4b-0fbb3dad8b4e"
  }

  register(email: string, password: string, username: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({
          displayName: username,
          photoURL: this.defaultProfile,
        })
      })
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email)
  }

  updatePassword(password: string) {
    return this.auth.currentUser.updatePassword(password)
  }
}

export default Firebase
