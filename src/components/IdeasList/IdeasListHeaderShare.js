// @flow
import * as React from "react"
import { withBoards } from "../../hoc/withBoards"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { withAuth } from "../../hoc/withAuth"
import { User } from "../../models/User"
import { Element, ELEMENTS } from "../Element/Element"
import "./styles/IdeasListHeaderShare.css"

type IdeasListHeaderShareProps = {
  boardsStore: BoardsStoreType,
  authUser: User,
}

const IdeasListHeaderShare = withAuth(
  withBoards((props: IdeasListHeaderShareProps) => {
    const board = props.boardsStore.currentBoard
    if (!board) {
      return null
    }
    const isShared = board.isShared()
    if (!isShared) {
      return (
        <div className="IdeasListHeaderShare">
          <span className="IdeasListHeaderShare__Text">not shared</span>
        </div>
      )
    }
    if (isShared && board.isOwner(props.authUser.id)) {
      return (
        <div className="IdeasListHeaderShare">
          <span className="IdeasListHeaderShare__Text">shared</span>
          <Element icon={ELEMENTS.share} />
        </div>
      )
    }
    if (isShared && !board.isOwner(props.authUser.id)) {
      return (
        <div className="IdeasListHeaderShare">
          <span className="IdeasListHeaderShare__Text">shared to you</span>
          <Element icon={ELEMENTS.share} />
        </div>
      )
    }
  })
)

export { IdeasListHeaderShare }
