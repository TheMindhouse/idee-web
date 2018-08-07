// @flow
import { firebase } from "./FirebaseFacade"
import "firebase/auth"
import { FirebaseUser } from "../models/FirebaseUser"
import { UsersFacade } from "./UsersFacade"

console.log("Setting up Auth Facade")

const facebookProvider = new firebase.auth.FacebookAuthProvider()
const googleProvider = new firebase.auth.GoogleAuthProvider()

const auth = firebase.auth()

const signIn = (provider) => {
  return auth
    .signInWithPopup(provider)
    .then(
      (result: $npm$firebase$auth$UserCredential) =>
        new FirebaseUser(result.user)
    )
    .then((firebaseUser: FirebaseUser) =>
      UsersFacade.upsertUser(firebaseUser.toUser())
    )
    .catch(function(error) {
      console.error("Error with logging in! ", error.message)
      throw new Error(error.message)
    })
}

const signInWithGoogle = () => signIn(googleProvider)
const signInWithFacebook = () => signIn(facebookProvider)
const signOut = () => auth.signOut()
const onAuthStateChanged = (cb: Function) => auth.onAuthStateChanged(cb)
const getCurrentUser = () => {
  console.log(auth.currentUser)
}

export const AuthFacade = {
  signInWithGoogle,
  signInWithFacebook,
  signOut,
  onAuthStateChanged,
  getCurrentUser,
}
