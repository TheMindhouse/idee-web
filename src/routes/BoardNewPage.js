// @flow
import * as React from "react"
import { BoardCreate } from "../components/BoardCreate/BoardCreate"

type BoardNewPageProps = {}

class BoardNewPage extends React.PureComponent<BoardNewPageProps> {
  static defaultProps = {}

  render() {
    return (
      <div>
        <BoardCreate />
      </div>
    )
  }
}

export { BoardNewPage }
