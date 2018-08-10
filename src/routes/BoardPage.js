// @flow
import * as React from "react"
import { withAuth } from "../hoc/withAuth"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { User } from "../models/User"
import { Board } from "../models/Board"
import { type Match } from "react-router-dom"
import { IdeasList } from "../components/IdeasList/IdeasList"

type BoardPageProps = {
  authUser: User,
  match: Match,
}

type BoardPageState = {
  activeBoard: Board,
}

class BoardPage extends React.PureComponent<BoardPageProps, BoardPageState> {
  static defaultProps = {}

  componentDidMount() {}

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <IdeasList />
      </div>
    )
  }
}

BoardPage = withAuth(BoardPage)
export { BoardPage }
