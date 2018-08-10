// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { IdeasCore } from "../../hoc/renderProps/IdeasCore"
import { withBoards } from "../../hoc/withBoards"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { IdeaCreate } from "../IdeaCreate/IdeaCreate"
import { IdeasListItem } from "./IdeasListItem"

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
      <div style={{ padding: 30 }}>
        <h1>{board.name}</h1>
        <IdeasCore
          boardId={board.id}
          render={(ideas: ?Array<Idea>) =>
            ideas ? (
              ideas.length ? (
                ideas.map((idea: Idea) => (
                  <IdeasListItem idea={idea} key={idea.id} />
                ))
              ) : (
                <p>No ideas</p>
              )
            ) : (
              <p>Loading...</p>
            )
          }
        />
        <IdeaCreate boardId={board.id} />
      </div>
    )
  }
}

IdeasList = withBoards(IdeasList)
export { IdeasList }
