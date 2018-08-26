// @flow
import * as React from "react"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"
import { Confirm, Dropdown } from "semantic-ui-react"
import { BoardOptions } from "../BoardOptions/BoardOptions"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { withBoards } from "../../hoc/withBoards"

const BOARD_CONTROLS_VIEWS = {
  DEFAULT: "default",
  BOARD_EDIT: "boardEdit",
  BOARD_REMOVE: "boardRemove",
}

type BoardControlsProps = {
  boardsStore: BoardsStoreType,
}

type BoardControlsState = {
  currentView: string,
}

class BoardControls extends React.PureComponent<
  BoardControlsProps,
  BoardControlsState
> {
  static defaultProps = {}

  state = {
    currentView: BOARD_CONTROLS_VIEWS.DEFAULT,
  }

  goToDefaultView = () =>
    this.setState({ currentView: BOARD_CONTROLS_VIEWS.DEFAULT })

  onDeleteBoard = () => {
    this.props.boardsStore.deleteActiveBoard()
    this.goToDefaultView()
  }

  render() {
    const board = this.props.boardsStore.currentBoard
    const { currentView } = this.state

    if (!board) {
      return null
    }

    const showEditView = () =>
      this.setState({ currentView: BOARD_CONTROLS_VIEWS.BOARD_EDIT })
    const showDeleteView = () =>
      this.setState({ currentView: BOARD_CONTROLS_VIEWS.BOARD_REMOVE })

    return (
      <div>
        <Dropdown
          icon={<Element icon={ELEMENTS.options} size={ELEMENTS_SIZE.small} />}
        >
          <Dropdown.Menu>
            <Dropdown.Item text="Board options" onClick={showEditView} />
            <Dropdown.Item text="Delete board" onClick={showDeleteView} />
          </Dropdown.Menu>
        </Dropdown>

        {currentView === BOARD_CONTROLS_VIEWS.BOARD_EDIT && (
          <BoardOptions
            board={board}
            onClose={this.goToDefaultView}
            onSave={this.goToDefaultView}
          />
        )}

        <Confirm
          open={currentView === BOARD_CONTROLS_VIEWS.BOARD_REMOVE}
          size="tiny"
          header={`Delete board ${board.name}?`}
          content="This operation is irreversible. All ideas from this board will be permanently deleted."
          confirmButton="Delete board"
          onCancel={this.goToDefaultView}
          onConfirm={this.onDeleteBoard}
        />
      </div>
    )
  }
}

BoardControls = withBoards(BoardControls)
export { BoardControls }
