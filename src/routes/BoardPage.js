// @flow
import * as React from "react"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { type Match, type RouterHistory, withRouter } from "react-router-dom"
import { IdeasList } from "../components/IdeasList/IdeasList"
import { BoardOptions } from "../components/BoardOptions/BoardOptions"
import { withBoards } from "../hoc/withBoards"
import type { BoardsStoreType } from "../stores/BoardsProvider"
import { Flip, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { PageLoading } from "../components/PageLoading/PageLoading"

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

class BoardPage extends React.Component<BoardPageProps, BoardPageState> {
  static defaultProps = {}

  state = {
    currentView: VIEWS.DEFAULT,
  }

  componentDidUpdate(prevProps: BoardPageProps) {
    const oldBoard = prevProps.boardsStore.boards
    const newBoards = this.props.boardsStore.boards
    const paramsBoardId = this.props.match.params.boardId
    if (
      oldBoard === null &&
      newBoards &&
      newBoards.length > 0 &&
      paramsBoardId
    ) {
      this.props.boardsStore.setActiveBoard(paramsBoardId)
    }
  }

  showDefaultView = () => this.setState({ currentView: VIEWS.DEFAULT })

  render() {
    const { currentView } = this.state
    return (
      <div className="page-container">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
          transition={Flip}
        />

        {!this.props.boardsStore.boards && <PageLoading />}

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
