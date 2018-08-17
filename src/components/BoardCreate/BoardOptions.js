// @flow
import * as React from "react"
import { Board } from "../../models/Board"
import { withAuth } from "../../hoc/withAuth"
import { BoardsFacade } from "../../facades/BoardsFacade"
import { BOARD_ROLES } from "../../constants/firebase"
import { User } from "../../models/User"
import { Button, Modal } from "semantic-ui-react"
import { FormField } from "../Forms/FormField"
import { isValidEmail } from "../../helpers/strings"
import { SharedUser } from "../SharedUser/SharedUser"
import type { BoardsStoreType } from "../../stores/BoardsProvider"

type BoardOptionsProps = {
  board?: Board,
  onClose: () => void,
  onSave: (string) => void,
  authUser: User,
  boardsStore: BoardsStoreType,
}

type BoardOptionsState = {
  name: string,
  shareToEmails: Array<string>,
  emailInvalidError: boolean,
  isSaving: boolean,
}

class BoardOptions extends React.PureComponent<
  BoardOptionsProps,
  BoardOptionsState
> {
  static defaultProps = {}

  constructor(props: BoardOptionsProps) {
    super(props)
    this.state = {
      name: props.board ? props.board.name : "",
      shareToEmails: props.board ? Object.keys(props.board.roles) : [],
      emailInvalidError: false,
      isSaving: false,
    }
  }

  onChangeName = (event: SyntheticEvent<HTMLInputElement>) => {
    return this.setState({ name: event.currentTarget.value })
  }

  addShareToEmail = (email: string) => {
    return this.setState({
      shareToEmails: [email, ...this.state.shareToEmails],
    })
  }

  removeShareToEmail = (index: number) => {
    const currentShareTo = this.state.shareToEmails
    const shareToEmails: Array<string> = [
      ...currentShareTo.slice(0, index),
      ...currentShareTo.slice(index + 1, currentShareTo.length),
    ]
    this.setState({ shareToEmails })
  }

  handleKeyPress = (event: any) => {
    this.setState({ emailInvalidError: false })
    if (event.key === "Enter") {
      const email = event.currentTarget.value
      if (isValidEmail(email)) {
        this.addShareToEmail(email)
        event.currentTarget.value = ""
      } else {
        this.setState({ emailInvalidError: true })
      }
    }
  }

  onSave = () => {
    this.setState({ isSaving: true })
    const shareToEmails: Array<string> = [...this.state.shareToEmails]
    // Convert an array of e-mails to the "roles" object.
    // Currently we only support "idea_editor" role.
    const roles = shareToEmails.reduce(
      (acc: { [string]: string }, email: string) => {
        acc[email] = BOARD_ROLES.EDITOR
        return acc
      },
      {}
    )
    const board = new Board({
      ...this.props.board,
      name: this.state.name,
      ownerId: this.props.authUser.id,
      roles,
    })

    this.props.board ? this.onBoardUpdate(board) : this.onBoardCreate(board)
  }

  onBoardCreate = (board: Board) =>
    BoardsFacade.createBoard(board)
      .then((docRef: $npm$firebase$firestore$DocumentReference) => {
        console.log("Added new board")
        this.props.onSave(docRef.id)
      })
      .catch((error) => {
        console.error("Error adding board: ", error)
        this.setState({ isSaving: false })
      })

  onBoardUpdate = (board: Board): Promise<void> =>
    BoardsFacade.updateBoard(board)
      .then(() => {
        console.log(`Updated board ${board.name}`)
        this.props.onSave(board.id)
      })
      .catch((error) => {
        console.error("Error updating board: ", error)
        this.setState({ isSaving: false })
      })

  render() {
    const { board, onClose } = this.props
    const { name, shareToEmails, isSaving } = this.state
    return (
      <Modal centered={false} onClose={onClose} open={true} size="tiny">
        <Modal.Header>
          {board ? "Board options" : "Create new board"}
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <FormField label="Board name">
              <input
                type="text"
                onChange={this.onChangeName}
                autoFocus
                value={name}
              />
            </FormField>

            <FormField
              label="E-mail address to share"
              error={this.state.emailInvalidError}
            >
              <input type="text" onKeyPress={this.handleKeyPress} />
              <FormField.FormError message="Enter a valid e-mail address" />
            </FormField>
            {shareToEmails.map((email: string, index: number) => (
              <SharedUser
                email={email}
                key={email}
                onRemove={() => this.removeShareToEmail(index)}
              />
            ))}
            {!shareToEmails.length && (
              <p className="text-center" style={{ margin: "30px 20px 10px" }}>
                <b>This board is not shared.</b>
                <br />
                Add email addresses that you want to share with.
              </p>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose} secondary>
            Cancel
          </Button>
          <Button
            onClick={this.onSave}
            positive
            labelPosition="right"
            icon="checkmark"
            content="Save"
            loading={isSaving}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

BoardOptions = withAuth(BoardOptions)
export { BoardOptions }
