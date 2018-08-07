import React from "react"
import { getComponentDisplayName } from "../helpers/getComponentDisplayName"
import { BoardsContext, type WithBoards } from "../stores/BoardsProvider"

const withBoards = (WrappedComponent) => {
  class withBoards extends React.Component {
    render() {
      return (
        <BoardsContext.Consumer>
          {(boardsStore: WithBoards) => (
            <WrappedComponent {...this.props} boardsStore={boardsStore} />
          )}
        </BoardsContext.Consumer>
      )
    }
  }

  withBoards.displayName = `withBoards(${getComponentDisplayName(
    WrappedComponent
  )})`

  return withBoards
}

export { withBoards }
