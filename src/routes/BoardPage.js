// @flow
import * as React from "react"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { type Match, type RouterHistory, withRouter } from "react-router-dom"
import { IdeasList } from "../components/IdeasList/IdeasList"
import { BoardOptions } from "../components/BoardCreate/BoardOptions"
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

const BOARD_PAGE_VIEWS = {
  DEFAULT: "default",
  BOARD_ADD: "boardAdd",
  BOARD_EDIT: "boardEdit",
}

class BoardPage extends React.PureComponent<BoardPageProps, BoardPageState> {
  static defaultProps = {}

  state = {
    currentView: BOARD_PAGE_VIEWS.DEFAULT,
  }

  goToDefaultView = () =>
    this.setState({ currentView: BOARD_PAGE_VIEWS.DEFAULT })

  render() {
    const { currentView } = this.state
    return (
      <div className="page-container">
        <Sidebar
          onCreateBoardClick={() =>
            this.setState({ currentView: BOARD_PAGE_VIEWS.BOARD_ADD })
          }
        />

        <IdeasList />

        {currentView === BOARD_PAGE_VIEWS.BOARD_ADD && (
          <BoardOptions
            onClose={this.goToDefaultView}
            onSave={(boardId) => {
              this.props.boardsStore.setActiveBoard(boardId)
              this.goToDefaultView()
            }}
          />
        )}
      </div>
    )
  }
}

BoardPage = withRouter(withBoards(BoardPage))
export { BoardPage }
