// @flow
import { db } from "./FirebaseFacade"
import { COLLECTIONS } from "../constants/firebase"
import { Idea } from "../models/Idea"
import { FieldValue } from "../helpers/firebaseUtils"

export class IdeasFacade {
  static createIdea(idea: Idea): Promise<mixed> {
    const ideaToAdd = {
      ...idea.toExport(),
      createdAt: FieldValue.serverTimestamp(),
      modifiedAt: FieldValue.serverTimestamp(),
    }
    return (
      db
        .collection(COLLECTIONS.BOARDS)
        .doc(idea.boardId)
        .collection(COLLECTIONS.IDEAS)
        // $FlowFixMe
        .add(ideaToAdd)
    )
  }

  static updateIdea(idea: Idea): Promise<mixed> {
    const ideaToUpdate = {
      ...idea.toExport(),
      modifiedAt: FieldValue.serverTimestamp(),
    }
    // CreatedAt field was introduced later, so it may not be present in
    // ideas added earlier.
    if (!idea.createdAt) {
      ideaToUpdate.createdAt = FieldValue.serverTimestamp()
    }
    return (
      db
        .collection(COLLECTIONS.BOARDS)
        .doc(idea.boardId)
        .collection(COLLECTIONS.IDEAS)
        // $FlowFixMe
        .doc(idea.id)
        .update(ideaToUpdate)
    )
  }

  static deleteIdea(idea: Idea) {
    return (
      db
        .collection(COLLECTIONS.BOARDS)
        .doc(idea.boardId)
        .collection(COLLECTIONS.IDEAS)
        // $FlowFixMe
        .doc(idea.id)
        .delete()
    )
  }
}
