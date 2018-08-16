// @flow
import { db } from "./FirebaseFacade"
import { User } from "../models/User"
import { COLLECTIONS } from "../constants/firebase"

export class UsersFacade {
  static upsertUser(user: User): Promise<User> {
    const docRef = db.collection(COLLECTIONS.USERS).doc(user.id)
    return docRef.set(user.toExport(), { merge: true }).then(() => user)
  }

  static findUserByEmail(email: string): Promise<?User> {
    const docRef = db
      .collection(COLLECTIONS.USERS)
      .where("email", "==", email)
      .limit(1)
    return docRef.get().then((data) => {
      if (data.docs.length) {
        return new User(data.docs[0].data())
      }
      return null
    })
  }
}
