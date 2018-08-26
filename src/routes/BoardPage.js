// @flow
import * as React from "react"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { type Match, type RouterHistory, withRouter } from "react-router-dom"
import { IdeasList } from "../components/IdeasList/IdeasList"
import { BoardOptions } from "../components/BoardOptions/BoardOptions"
import { withBoards } from "../hoc/withBoards"
import type { BoardsStoreType } from "../stores/BoardsProvider"

type BoardPageProps = {
  match: Match,
  history: RouterHistory,
  boardsStore: BoardsStoreType,
}

type BoardPageState = {
  currentView: string,
}

const VIEWS = {
  DEFAULT: "default",
  BOARD_ADD: "boardAdd",
  BOARD_EDIT: "boardEdit",
}

class BoardPage extends React.PureComponent<BoardPageProps, BoardPageState> {
  static defaultProps = {}

  state = {
    currentView: VIEWS.DEFAULT,
  }

  showDefaultView = () => this.setState({ currentView: VIEWS.DEFAULT })

  render() {
    const { currentView } = this.state
    return (
      <div className="page-container">
        <Sidebar
          onCreateBoardClick={() =>
            this.setState({ currentView: VIEWS.BOARD_ADD })
          }
        />

        <IdeasList />

        {currentView === VIEWS.BOARD_ADD && (
          <BoardOptions
            onClose={this.showDefaultView}
            onSave={(boardId) => {
              this.props.boardsStore.setActiveBoard(boardId)
              this.showDefaultView()
            }}
          />
        )}
      </div>
    )
  }
}

BoardPage = withRouter(withBoards(BoardPage))
export { BoardPage }
