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
import { IdeasListHeader } from "./IdeasListHeader"
import { IdeaCreateButton } from "../IdeaCreateButton/IdeaCreateButton"
import { IdeaView } from "../IdeaView/IdeaView"

type IdeasListProps = {
  boardsStore: BoardsStoreType,
}

type IdeasListState = {
  sortBy: string,
  sortDesc: boolean,
  currentView: string,
  currentIdea: ?Idea,
}

export const SORT_METHODS = {
  AVERAGE: "average",
  EASE: "ease",
  CONFIDENCE: "confidence",
  IMPACT: "impact",
}

const IDEAS_LIST_VIEWS = {
  DEFAULT: "default",
  IDEA_VIEW: "ideaView",
  IDEA_ADD: "ideaAdd",
  IDEA_EDIT: "ideaEdit",
}

class IdeasList extends React.PureComponent<IdeasListProps, IdeasListState> {
  static defaultProps = {}

  state = {
    sortBy: SORT_METHODS.AVERAGE,
    sortDesc: true,
    currentView: IDEAS_LIST_VIEWS.DEFAULT,
    currentIdea: null,
  }

  goToDefaultView = () =>
    this.setState({ currentView: IDEAS_LIST_VIEWS.DEFAULT })

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

  setCurrentIdea = (currentIdea: Idea) => this.setState({ currentIdea })

  showIdea = (idea: Idea) =>
    this.setState({
      currentIdea: idea,
      currentView: IDEAS_LIST_VIEWS.IDEA_VIEW,
    })

  render() {
    const board = this.props.boardsStore.currentBoard
    if (!board) {
      return null
    }
    const { sortDesc, sortBy, currentView, currentIdea } = this.state
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
                    <IdeasListItem
                      idea={idea}
                      key={idea.id}
                      onClick={() => this.showIdea(idea)}
                    />
                  ))
              ) : (
                <p>No ideas</p>
              )
            ) : (
              <p>Loading...</p>
            )
          }
        />

        <IdeaCreateButton
          onClick={() =>
            this.setState({ currentView: IDEAS_LIST_VIEWS.IDEA_ADD })
          }
        />

        {currentView === IDEAS_LIST_VIEWS.IDEA_ADD && (
          <IdeaCreate boardId={board.id} onClose={this.goToDefaultView} />
        )}

        {currentView === IDEAS_LIST_VIEWS.IDEA_VIEW &&
          currentIdea && (
            <IdeaView idea={currentIdea} onClose={this.goToDefaultView} />
          )}
      </div>
    )
  }
}

IdeasList = withBoards(IdeasList)
export { IdeasList }
