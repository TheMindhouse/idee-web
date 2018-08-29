// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { withBoards } from "../../hoc/withBoards"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { IdeaForm } from "../IdeaForm/IdeaForm"
import "./styles/IdeasList.css"
import { IdeaView } from "../IdeaView/IdeaView"
import { IdeasListDefaultView } from "./IdeasListDefaultView"

type IdeasListProps = {
  boardsStore: BoardsStoreType,
}

type IdeasListState = {
  currentView: string,
  currentIdea: ?Idea,
}

const VIEWS = {
  DEFAULT: "default",
  IDEA_VIEW: "ideaView",
  IDEA_ADD: "ideaAdd",
  IDEA_EDIT: "ideaEdit",
}

class IdeasList extends React.PureComponent<IdeasListProps, IdeasListState> {
  static defaultProps = {}

  state = {
    currentView: VIEWS.IDEA_ADD,
    currentIdea: null,
  }

  showDefaultView = () => this.setState({ currentView: VIEWS.DEFAULT })
  showIdeaView = (idea: Idea) =>
    this.setState({
      currentIdea: idea,
      currentView: VIEWS.IDEA_VIEW,
    })
  showAddView = () => this.setState({ currentView: VIEWS.IDEA_ADD })
  showEditView = () => this.setState({ currentView: VIEWS.IDEA_EDIT })

  render() {
    const board = this.props.boardsStore.currentBoard
    if (!board) {
      return null
    }
    const { currentView, currentIdea } = this.state
    return (
      <div className="IdeasList">
        <IdeasListDefaultView
          boardId={board.id}
          showAddView={this.showAddView}
          showIdeaView={this.showIdeaView}
        />

        {currentView === VIEWS.IDEA_ADD && (
          <IdeaForm boardId={board.id} onClose={this.showDefaultView} />
        )}

        {currentView === VIEWS.IDEA_VIEW &&
          currentIdea && (
            <IdeaView
              idea={currentIdea}
              onEdit={this.showEditView}
              onClose={this.showDefaultView}
            />
          )}

        {currentView === VIEWS.IDEA_EDIT &&
          currentIdea && (
            <IdeaForm
              boardId={board.id}
              idea={currentIdea}
              onUpdate={(idea: Idea) => this.showIdeaView(idea)}
              onClose={() => this.showIdeaView(currentIdea)}
            />
          )}
      </div>
    )
  }
}

IdeasList = withBoards(IdeasList)
export { IdeasList }
