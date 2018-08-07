// @flow
import * as React from "react"
import { withBoards } from "../../hoc/withBoards"
import type { WithBoards } from "../../stores/BoardsProvider"
import { Board } from "../../models/Board"
import { IdeasCore } from "../../hoc/renderProps/IdeasCore"
import { Idea } from "../../models/Idea"

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
          <div>
            <h2>Ideas for {this.state.currentBoard.name}</h2>
            <IdeasCore
              boardId={this.state.currentBoard.id}
              render={(ideas: ?Array<Idea>) =>
                ideas ? (
                  ideas.length ? (
                    ideas.map((idea: Idea) => (
                      <li key={idea.id}>{idea.name}</li>
                    ))
                  ) : (
                    <p>No ideas</p>
                  )
                ) : (
                  <p>Loading...</p>
                )
              }
            />
          </div>
        )}
      </div>
    )
  }
}

BoardsList = withBoards(BoardsList)
export { BoardsList }
