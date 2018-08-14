// @flow
import * as React from "react"
import { withBoards } from "../../hoc/withBoards"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { Board } from "../../models/Board"
import "./styles/BoardsList.css"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"

type BoardsListProps = {
  userId: string,
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
    const { boardsStore, userId } = this.props
    const { boards } = boardsStore
    if (!boards) {
      return <div>Loading...</div>
    }
    return (
      <ul className="BoardsList">
        {boards.map((board: Board) => (
          <li
            key={board.id}
            className={`BoardsList__Item ${
              boardsStore.currentBoard &&
              boardsStore.currentBoard.id === board.id
                ? "BoardsList__Item--active"
                : ""
            }`}
            onClick={() => boardsStore.setActiveBoard(board.id)}
          >
            {board.name}
            {!board.isOwner(userId) && (
              <span className="BoardsList__ItemShared">
                <Element icon={ELEMENTS.share} size={ELEMENTS_SIZE.small} />
              </span>
            )}
          </li>
        ))}
      </ul>
    )
  }
}

BoardsList = withBoards(BoardsList)
export { BoardsList }
