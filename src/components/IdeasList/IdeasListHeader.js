// @flow
import * as React from "react"
import { withAuth } from "../../hoc/withAuth"
import { withBoards } from "../../hoc/withBoards"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { BoardControlsOwner } from "../BoardControls/BoardControlsOwner"
import "./styles/IdeasListHeader.css"
import { User } from "../../models/User"
import { BoardControlsEditor } from "../BoardControls/BoardControlsEditor"

type IdeasListHeaderProps = {
  boardsStore: BoardsStoreType,
  authUser: User,
}

class IdeasListHeader extends React.PureComponent<IdeasListHeaderProps> {
  static defaultProps = {}

  render() {
    const board = this.props.boardsStore.currentBoard

    if (!board) {
      return null
    }

    return (
      <div className="IdeasListHeader">
        <h1 className="IdeasListHeader__Name">{board.name}</h1>
        {board.isOwner(this.props.authUser.id) ? (
          <BoardControlsOwner />
        ) : (
          <BoardControlsEditor />
        )}
      </div>
    )
  }
}

IdeasListHeader = withAuth(withBoards(IdeasListHeader))
export { IdeasListHeader }
