// @flow
import { db } from "./FirebaseFacade"
import { User } from "../models/User"
import { COLLECTIONS } from "../constants/firebase"

export class UsersFacade {
  static upsertUser(user: User): Promise<User> {
    const docRef = db.collection(COLLECTIONS.USERS).doc(user.id)
    return docRef.set(user.toExport(), { merge: true }).then(() => user)
  }
}
