// @flow
import * as React from "react"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { type Match, type RouterHistory, withRouter } from "react-router-dom"
import { IdeasList } from "../components/IdeasList/IdeasList"
import { BoardCreate } from "../components/BoardCreate/BoardCreate"

type BoardPageProps = {
  match: Match,
  history: RouterHistory,
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

  render() {
    const { currentView } = this.state
    return (
      <div style={{ display: "flex" }}>
        <Sidebar
          onCreateBoardClick={() =>
            this.setState({ currentView: BOARD_PAGE_VIEWS.BOARD_ADD })
          }
        />
        <IdeasList />
        {currentView === BOARD_PAGE_VIEWS.BOARD_ADD && (
          <BoardCreate
            onClose={() =>
              this.setState({ currentView: BOARD_PAGE_VIEWS.DEFAULT })
            }
          />
        )}
      </div>
    )
  }
}

BoardPage = withRouter(BoardPage)
export { BoardPage }
