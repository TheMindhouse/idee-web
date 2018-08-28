// @flow
import * as React from "react"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"
import { Confirm, Dropdown } from "semantic-ui-react"
import { BoardOptions } from "../BoardOptions/BoardOptions"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { withBoards } from "../../hoc/withBoards"
import { toast } from "react-toastify"

const VIEWS = {
  DEFAULT: "default",
  BOARD_EDIT: "boardEdit",
  BOARD_REMOVE: "boardRemove",
}

type BoardControlsOwnerProps = {
  boardsStore: BoardsStoreType,
}

type BoardControlsOwnerState = {
  currentView: string,
}

class BoardControlsOwner extends React.PureComponent<
  BoardControlsOwnerProps,
  BoardControlsOwnerState
> {
  static defaultProps = {}

  state = {
    currentView: VIEWS.DEFAULT,
  }

  showDefaultView = () => this.setState({ currentView: VIEWS.DEFAULT })

  showEditView = () => this.setState({ currentView: VIEWS.BOARD_EDIT })

  showDeleteView = () => this.setState({ currentView: VIEWS.BOARD_REMOVE })

  onDeleteBoard = () => {
    this.props.boardsStore
      .deleteActiveBoard()
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Error with deleting board"))
    this.showDefaultView()
  }

  render() {
    const board = this.props.boardsStore.currentBoard
    const { currentView } = this.state

    if (!board) {
      return null
    }

    return (
      <div>
        <Dropdown
          direction="left"
          icon={<Element icon={ELEMENTS.options} size={ELEMENTS_SIZE.small} />}
        >
          <Dropdown.Menu>
            <Dropdown.Item text="Board options" onClick={this.showEditView} />
            <Dropdown.Item text="Delete board" onClick={this.showDeleteView} />
          </Dropdown.Menu>
        </Dropdown>

        {currentView === VIEWS.BOARD_EDIT && (
          <BoardOptions
            board={board}
            onClose={this.showDefaultView}
            onSave={this.showDefaultView}
          />
        )}

        <Confirm
          open={currentView === VIEWS.BOARD_REMOVE}
          size="tiny"
          header={`Delete board ${board.name}?`}
          content="This operation is irreversible. All ideas from this board will be permanently deleted."
          confirmButton="Delete board"
          onCancel={this.showDefaultView}
          onConfirm={this.onDeleteBoard}
        />
      </div>
    )
  }
}

BoardControlsOwner = withBoards(BoardControlsOwner)
export { BoardControlsOwner }
