// @flow
import firebase from "firebase/app"
import "firebase/firestore"
import { CONFIG } from "../config"

const config = CONFIG.firebase

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

console.log("Setting up Firebase", firebase)

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore()

export { firebase, db }
