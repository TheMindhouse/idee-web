// @flow
import * as React from "react"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"
import { Confirm, Dropdown } from "semantic-ui-react"
import type { BoardsStoreType } from "../../stores/BoardsProvider"
import { withBoards } from "../../hoc/withBoards"
import { toast } from "react-toastify"
import { withAuth } from "../../hoc/withAuth"
import { User } from "../../models/User"

const VIEWS = {
  DEFAULT: "default",
  BOARD_LEAVE: "boardLeave",
}

type BoardControlsEditorProps = {
  boardsStore: BoardsStoreType,
  authUser: User,
}

type BoardControlsEditorState = {
  currentView: string,
}

class BoardControlsEditor extends React.PureComponent<
  BoardControlsEditorProps,
  BoardControlsEditorState
> {
  static defaultProps = {}

  state = {
    currentView: VIEWS.DEFAULT,
  }

  showDefaultView = () => this.setState({ currentView: VIEWS.DEFAULT })

  showLeaveView = () => this.setState({ currentView: VIEWS.BOARD_LEAVE })

  onLeaveBoard = () => {
    const { currentBoard } = this.props.boardsStore
    const { email } = this.props.authUser
    if (currentBoard && email) {
      this.props.boardsStore
        .leaveBoard(currentBoard, email)
        .then(() => {
          toast.success("Board removed from your list")
          return this.showDefaultView()
        })
        .catch(() => toast.error("Error when leaving the board"))
    }
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
            <Dropdown.Item text="Leave board" onClick={this.showLeaveView} />
          </Dropdown.Menu>
        </Dropdown>

        <Confirm
          open={currentView === VIEWS.BOARD_LEAVE}
          size="tiny"
          header={`Leave board "${board.name}"?`}
          content="The board will be removed from your list. To regain access ask the board's owner to invite you again."
          confirmButton="Leave board"
          onCancel={this.showDefaultView}
          onConfirm={this.onLeaveBoard}
        />
      </div>
    )
  }
}

BoardControlsEditor = withAuth(withBoards(BoardControlsEditor))
export { BoardControlsEditor }
