// @flow

import { AuthFacade } from "./AuthFacade"
import { db } from "./FirebaseFacade"
import { COLLECTIONS } from "../constants/firebase"
import { Idea } from "../models/Idea"

export class IdeasFacade {
  static createIdea(idea: Idea): Promise<mixed> {
    console.log(AuthFacade.getCurrentUser())

    return (
      db
        .collection(COLLECTIONS.BOARDS)
        .doc(idea.boardId)
        .collection(COLLECTIONS.IDEAS)
        // $FlowFixMe
        .add(idea.toExport())
    )
  }
}
