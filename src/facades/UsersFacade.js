// @flow
import { db } from "./FirebaseFacade"
import { User } from "../models/User"

const COLLECTION_NAME = "users"
export class UsersFacade {
  static upsertUser(user: User): Promise<User> {
    const docRef = db.collection(COLLECTION_NAME).doc(user.id)
    return docRef.set(user.toExport(), { merge: true }).then(() => user)
  }
}
