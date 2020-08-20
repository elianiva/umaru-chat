import app from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/database"

const config = {
  apiKey: "AIzaSyBY-TMRxlkaRXB9_HfcwAMvjk8-L-l4RJM",
  authDomain: "umaru-chat.firebaseapp.com",
  databaseURL: "https://umaru-chat.firebaseio.com",
  projectId: "umaru-chat",
  storageBucket: "umaru-chat.appspot.com",
  messagingSenderId: "90854893572",
  appId: "1:90854893572:web:6eec404000f43e5ec4ad51",
  measurementId: "G-Z03MRT5DFV",
}

class Firebase {
  auth: any
  storage: any
  database: any
  constructor() {
    app.initializeApp(config)

    this.auth = app.auth()
    this.storage = app.storage()
    this.database = app.database()
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
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
