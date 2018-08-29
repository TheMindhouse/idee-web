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
import { toast } from "react-toastify"

type BoardOptionsProps = {
  board?: Board,
  onClose: () => void,
  onSave: (string) => void,
  authUser: User,
  boardsStore: BoardsStoreType,
}

type BoardOptionsState = {
  name: string,
  email: string,
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
      email: "",
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

  onChangeEmail = (event: SyntheticEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value
    this.setState({ email, emailInvalidError: false })
  }

  onKeyPressed = (event: any) => {
    if (event.key === "Enter") {
      if (isValidEmail(this.state.email)) {
        this.addShareToEmail(this.state.email)
        this.setState({ email: "" })
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
        toast.success("New board created")
        this.props.onSave(docRef.id)
      })
      .catch((error) => {
        toast.error("Error adding board")
        console.error("Error adding board: ", error)
        this.setState({ isSaving: false })
      })

  onBoardUpdate = (board: Board): Promise<void> =>
    BoardsFacade.updateBoard(board)
      .then(() => {
        toast.success("Board updated")
        console.log(`Updated board ${board.name}`)
        this.props.onSave(board.id)
      })
      .catch((error) => {
        toast.error("Error updating board")
        console.error("Error updating board: ", error)
        this.setState({ isSaving: false })
      })

  render() {
    const { board, onClose } = this.props
    const { name, email, shareToEmails, isSaving } = this.state
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
              <input
                type="text"
                value={email}
                onChange={this.onChangeEmail}
                onKeyPress={this.onKeyPressed}
              />
              <FormField.FormError message="Enter a valid e-mail address" />
              {isValidEmail(email) && (
                <FormField.FormRightLabel text="press enter to add" />
              )}
              <span />
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
          <Button onClick={onClose}>Cancel</Button>
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
