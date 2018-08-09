// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { IdeasCore } from "../../hoc/renderProps/IdeasCore"
import { withBoards } from "../../hoc/withBoards"
import type { BoardsStoreType } from "../../stores/BoardsProvider"

type IdeasListProps = {
  boardsStore: BoardsStoreType,
}

class IdeasList extends React.PureComponent<IdeasListProps> {
  static defaultProps = {}

  render() {
    const board = this.props.boardsStore.currentBoard
    if (!board) {
      return null
    }
    return (
      <div>
        <h2>Ideas for {board.name}</h2>
        <IdeasCore
          boardId={board.id}
          render={(ideas: ?Array<Idea>) =>
            ideas ? (
              ideas.length ? (
                ideas.map((idea: Idea) => <li key={idea.id}>{idea.name}</li>)
              ) : (
                <p>No ideas</p>
              )
            ) : (
              <p>Loading...</p>
            )
          }
        />
      </div>
    )
  }
}

IdeasList = withBoards(IdeasList)
export { IdeasList }
