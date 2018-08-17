// @flow
import { Board } from "../models/Board"
import { db, firebase } from "./FirebaseFacade"
import { COLLECTIONS } from "../constants/firebase"

export class BoardsFacade {
  static createBoard(
    board: Board
  ): Promise<$npm$firebase$firestore$DocumentReference> {
    const boardToAdd = {
      ...board.toExport(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
    return (
      // $FlowFixMe
      db.collection(COLLECTIONS.BOARDS).add(boardToAdd)
    )
  }

  static updateBoard(board: Board): Promise<void> {
    const boardToUpdate = {
      ...board.toExport(),
      modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
    return db
      .collection(COLLECTIONS.BOARDS)
      .doc(board.id)
      .update(boardToUpdate)
  }

  static deleteBoard(boardId: string) {
    return db
      .collection(COLLECTIONS.BOARDS)
      .doc(boardId)
      .delete()
  }
}
