// @flow
import { firebase } from "./FirebaseFacade"
import "firebase/auth"
import { FirebaseUser } from "../models/FirebaseUser"
import { UsersFacade } from "./UsersFacade"
import { User } from "../models/User"

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
const getCurrentUser = (): ?User => {
  const user = auth.currentUser
  return user ? new FirebaseUser(user).toUser() : null
}

export const AuthFacade = {
  signInWithGoogle,
  signInWithFacebook,
  signOut,
  onAuthStateChanged,
  getCurrentUser,
}
