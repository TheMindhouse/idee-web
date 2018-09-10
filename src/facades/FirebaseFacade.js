// @flow
import firebase from "firebase/app"
import "firebase/firestore"
import { CONFIG } from "../config"

const config = CONFIG.firebase

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true,
})

export { firebase, db }
