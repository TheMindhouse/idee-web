// @flow
import * as React from "react"
import { withBoards } from "../../hoc/withBoards"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { Board } from "../../models/Board"
import { IdeasList } from "../IdeasList/IdeasList"

type BoardsListProps = {
  boardsStore: BoardsStoreType,
}

type BoardsListState = {
  currentBoard: ?Board,
}

class BoardsList extends React.PureComponent<BoardsListProps, BoardsListState> {
  static defaultProps = {}

  state = {
    currentBoard: null,
  }

  render() {
    const { boardsStore } = this.props
    const { boards } = boardsStore
    if (!boards) {
      return <div>Loading...</div>
    }
    return (
      <div>
        {boards.map((board: Board) => (
          <li
            key={board.id}
            onClick={() => boardsStore.setActiveBoard(board.id)}
          >
            {board.name}
            {boardsStore.currentBoard &&
              boardsStore.currentBoard.id === board.id &&
              "<active>"}
          </li>
        ))}
      </div>
    )
  }
}

BoardsList = withBoards(BoardsList)
export { BoardsList }
