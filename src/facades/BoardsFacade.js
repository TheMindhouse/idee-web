// @flow
import { Board } from "../models/Board"
import { db } from "./FirebaseFacade"
import { COLLECTIONS } from "../constants/firebase"
import { FieldPath, FieldValue } from "../helpers/firebaseUtils"

export class BoardsFacade {
  static createBoard(
    board: Board
  ): Promise<$npm$firebase$firestore$DocumentReference> {
    const boardToAdd = {
      ...board.toExport(),
      createdAt: FieldValue.serverTimestamp(),
      modifiedAt: FieldValue.serverTimestamp(),
    }
    return (
      // $FlowFixMe
      db.collection(COLLECTIONS.BOARDS).add(boardToAdd)
    )
  }

  static updateBoard(board: Board): Promise<void> {
    const boardToUpdate = {
      ...board.toExport(),
      modifiedAt: FieldValue.serverTimestamp(),
    }
    return db
      .collection(COLLECTIONS.BOARDS)
      .doc(board.id)
      .update(boardToUpdate)
  }

  static removeRole(board: Board, email: string): Promise<void> {
    const emailPath = new FieldPath("roles", email)
    return db
      .collection(COLLECTIONS.BOARDS)
      .doc(board.id)
      .update(emailPath, FieldValue.delete())
  }

  static deleteBoard(board: Board): Promise<void> {
    return db
      .collection(COLLECTIONS.BOARDS)
      .doc(board.id)
      .delete()
  }
}
