// @flow
import * as React from "react"
import { withBoards } from "../../hoc/withBoards"
import type { WithBoards } from "../../stores/BoardsProvider"
import { Board } from "../../models/Board"
import { IdeasList } from "../IdeasList/IdeasList"

type BoardsListProps = {
  boardsStore: WithBoards,
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
    const { boards } = this.props.boardsStore
    if (!boards) {
      return <div>Loading...</div>
    }
    return (
      <div>
        {boards.map((board: Board) => (
          <li
            key={board.id}
            onClick={() => this.setState({ currentBoard: board })}
          >
            {board.name}
          </li>
        ))}

        {this.state.currentBoard && (
          <IdeasList board={this.state.currentBoard} />
        )}
      </div>
    )
  }
}

BoardsList = withBoards(BoardsList)
export { BoardsList }
