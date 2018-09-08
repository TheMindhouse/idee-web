// @flow
import * as React from "react"
import { withBoards } from "../../hoc/withBoards"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { Board } from "../../models/Board"
import "./styles/BoardsList.css"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"

type BoardsListProps = {
  userId: string,
  onBoardClick?: Function,
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

  sortBoards = (a: Board, b: Board): number => a.name.localeCompare(b.name)

  onBoardClick = (boardId: string) => {
    const { boardsStore, onBoardClick } = this.props
    boardsStore.setActiveBoard(boardId)
    if (typeof onBoardClick === "function") {
      onBoardClick()
    }
  }

  render() {
    const { boardsStore, userId } = this.props
    const { boards } = boardsStore
    if (!boards) {
      return <div>Loading...</div>
    }
    return (
      <ul className="BoardsList">
        {boards.sort(this.sortBoards).map((board: Board) => (
          <li
            key={board.id}
            className={`BoardsList__Item ${
              boardsStore.currentBoard &&
              boardsStore.currentBoard.id === board.id
                ? "BoardsList__Item--active"
                : ""
            }`}
            onClick={() => this.onBoardClick(board.id)}
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
