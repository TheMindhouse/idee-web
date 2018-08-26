// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { IdeasListHeader } from "./IdeasListHeader"
import { IdeasListControls } from "./IdeasListControls"
import { IdeasCore } from "../../hoc/renderProps/IdeasCore"
import { IdeaCreateButton } from "../IdeaCreateButton/IdeaCreateButton"
import { IdeasListItem } from "./IdeasListItem"

type IdeasListDefaultViewProps = {
  boardId: string,
  showAddView: () => void,
  showIdeaView: (Idea) => void,
}

type IdeasListDefaultViewState = {
  sortBy: string,
  sortDesc: boolean,
}

export const SORT_METHODS = {
  AVERAGE: "average",
  EASE: "ease",
  CONFIDENCE: "confidence",
  IMPACT: "impact",
}

class IdeasListDefaultView extends React.PureComponent<
  IdeasListDefaultViewProps,
  IdeasListDefaultViewState
> {
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

  changeSortMethod = (
    event: SyntheticEvent<HTMLInputElement>,
    data: { value: string }
  ) => this.setState({ sortBy: data.value })

  render() {
    const { boardId, showAddView, showIdeaView } = this.props
    const { sortDesc, sortBy } = this.state
    return (
      <div>
        <IdeasListHeader />
        <IdeasListControls
          sortBy={sortBy}
          sortDesc={sortDesc}
          changeSortMethod={this.changeSortMethod}
          changeSortDirection={this.changeSortDirection}
        />
        <IdeasCore
          boardId={boardId}
          render={(ideas: ?Array<Idea>) =>
            ideas ? (
              ideas.length ? (
                ideas
                  .sort(this.sortFunction)
                  .map((idea: Idea) => (
                    <IdeasListItem
                      idea={idea}
                      key={idea.id}
                      onClick={() => showIdeaView(idea)}
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

        <IdeaCreateButton onClick={showAddView} />
      </div>
    )
  }
}

export { IdeasListDefaultView }
