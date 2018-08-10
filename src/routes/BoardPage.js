// @flow
import * as React from "react"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { Board } from "../models/Board"
import { type Match, type RouterHistory, withRouter } from "react-router-dom"
import { IdeasList } from "../components/IdeasList/IdeasList"

type BoardPageProps = {
  match: Match,
  history: RouterHistory,
}

type BoardPageState = {
  activeBoard: Board,
}

class BoardPage extends React.PureComponent<BoardPageProps, BoardPageState> {
  static defaultProps = {}

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <IdeasList />
      </div>
    )
  }
}

BoardPage = withRouter(BoardPage)
export { BoardPage }
