// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { IdeasCore } from "../../hoc/renderProps/IdeasCore"
import { withBoards } from "../../hoc/withBoards"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { IdeaCreate } from "../IdeaCreate/IdeaCreate"
import { IdeasListItem } from "./IdeasListItem"
import { IdeasListControls } from "./IdeasListControls"
import "./styles/IdeasList.css"
import { BoardControls } from "../BoardControls/BoardControls"
import { IdeasListHeader } from "./IdeasListHeader"

type IdeasListProps = {
  boardsStore: BoardsStoreType,
}

type IdeasListState = {
  sortBy: string,
  sortDesc: boolean,
}

export const SORT_METHODS = {
  AVERAGE: "average",
  EASE: "ease",
  CONFIDENCE: "confidence",
  IMPACT: "impact",
}

class IdeasList extends React.PureComponent<IdeasListProps, IdeasListState> {
  static defaultProps = {}

  state = {
    sortBy: SORT_METHODS.AVERAGE,
    sortDesc: true,
  }

  getSortValue = (idea: Idea): number => {
    switch (this.state.sortBy) {
      case SORT_METHODS.EASE:
        return idea.ease
      case SORT_METHODS.IMPACT:
        return idea.impact
      case SORT_METHODS.CONFIDENCE:
        return idea.confidence
      case SORT_METHODS.AVERAGE:
      default:
        return idea.getAverage()
    }
  }

  getSortDirection = (val1: number, val2: number) => {
    if (this.state.sortDesc) {
      return val2 - val1
    }
    return val1 - val2
  }

  sortFunction = (a: Idea, b: Idea): number =>
    this.getSortDirection(this.getSortValue(a), this.getSortValue(b))

  changeSortDirection = () => this.setState({ sortDesc: !this.state.sortDesc })

  changeSortMethod = (event: SyntheticEvent<HTMLInputElement>, data) =>
    this.setState({ sortBy: data.value })

  render() {
    const board = this.props.boardsStore.currentBoard
    if (!board) {
      return null
    }
    const { sortDesc, sortBy } = this.state
    return (
      <div className="IdeasList">
        <IdeasListHeader />
        <IdeasListControls
          sortBy={sortBy}
          sortDesc={sortDesc}
          changeSortMethod={this.changeSortMethod}
          changeSortDirection={this.changeSortDirection}
        />
        <IdeasCore
          boardId={board.id}
          render={(ideas: ?Array<Idea>) =>
            ideas ? (
              ideas.length ? (
                ideas
                  .sort(this.sortFunction)
                  .map((idea: Idea) => (
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
