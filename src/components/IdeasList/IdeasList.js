// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { Board } from "../../models/Board"
import { IdeasCore } from "../../hoc/renderProps/IdeasCore"

type IdeasListProps = {
  board: Board,
}

class IdeasList extends React.PureComponent<IdeasListProps> {
  static defaultProps = {}

  render() {
    const { board } = this.props
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

export { IdeasList }
