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

class BoardsList extends React.PureComponent<BoardsListProps> {
  static defaultProps = {}

  render() {
    const { boards } = this.props.boardsStore
    if (!boards) {
      return <div>Loading...</div>
    }
    return (
      <div>
        {boards.map((board: Board) => (
          <li key={board.id}>{board.name}</li>
        ))}

        <h2>Ideas for {boards[0].name}</h2>
        <IdeasCore
          boardId={boards[0].id}
          render={(ideas: ?Array<Idea>) =>
            ideas ? (
              ideas.map((idea: Idea) => <li>{idea.name}</li>)
            ) : (
              <p>No ideas</p>
            )
          }
        />
      </div>
    )
  }
}

BoardsList = withBoards(BoardsList)
export { BoardsList }
