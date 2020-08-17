import app from "firebase/app"
import "firebase/auth"

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

class Firebase {
  auth: any
  constructor() {
    app.initializeApp(config)

    this.auth = app.auth()
  }

  register(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
  }

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    this.auth.signOut()
  }

  resetPassword(email: string) {
    this.auth.sendPasswordResetEmail(email)
  }

  updatePassword(password: string) {
    this.auth.currentUser.updatePassword(password)
  }
}

export default Firebase
