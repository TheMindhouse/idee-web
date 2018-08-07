// @flow

import { AuthFacade } from "./AuthFacade"
import { Board } from "../models/Board"
import { db } from "./FirebaseFacade"
import { COLLECTIONS } from "../constants/firebase"

export class BoardsFacade {
  static createBoard(board: Board): Promise<mixed> {
    console.log(AuthFacade.getCurrentUser())
    return db.collection(COLLECTIONS.BOARDS).add(board.toExport())
  }
}
