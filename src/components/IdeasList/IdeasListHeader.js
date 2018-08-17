// @flow
import * as React from "react"
import { withAuth } from "../../hoc/withAuth"
import { withBoards } from "../../hoc/withBoards"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { BoardControls } from "../BoardControls/BoardControls"
import "./styles/IdeasListHeader.css"

type IdeasListHeaderProps = {
  boardsStore: BoardsStoreType,
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
        <BoardControls />
      </div>
    )
  }
}

IdeasListHeader = withAuth(withBoards(IdeasListHeader))
export { IdeasListHeader }
