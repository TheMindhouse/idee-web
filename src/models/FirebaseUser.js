// @flow

import { User } from "./User"

type FirebaseUserProps = {
  uid: string,
  displayName: ?string,
  email: ?string,
  emailVerified: boolean,
  photoURL: ?string,
  refreshToken: string,
}

export class FirebaseUser {
  uid: string
  displayName: string
  email: string
  emailVerified: boolean
  photoURL: string
  refreshToken: string

  constructor(props: FirebaseUserProps) {
    this.uid = props.uid
    this.displayName = props.displayName || ""
    this.email = props.email || ""
    this.emailVerified = props.emailVerified
    this.photoURL = props.photoURL || ""
    this.refreshToken = props.refreshToken
  }

  toUser(): User {
    return new User({
      id: this.uid,
      name: this.displayName,
      email: this.email,
      avatarUrl: this.photoURL,
    })
  }
}
