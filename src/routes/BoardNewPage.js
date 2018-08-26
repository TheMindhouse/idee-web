// @flow
import * as React from "react"
import { BoardOptions } from "../components/BoardOptions/BoardOptions"

type BoardNewPageProps = {}

class BoardNewPage extends React.PureComponent<BoardNewPageProps> {
  static defaultProps = {}

  render() {
    return (
      <div>
        <BoardOptions />
      </div>
    )
  }
}

export { BoardNewPage }
