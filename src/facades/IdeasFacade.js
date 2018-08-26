// @flow
import { db, firebase } from "./FirebaseFacade"
import { COLLECTIONS } from "../constants/firebase"
import { Idea } from "../models/Idea"

export class IdeasFacade {
  static createIdea(idea: Idea): Promise<mixed> {
    const ideaToAdd = {
      ...idea.toExport(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
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
      modifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
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
}
