// @flow
import * as React from "react"
import { Board } from "../../models/Board"
import { withAuth } from "../../hoc/withAuth"
import { BoardsFacade } from "../../facades/BoardsFacade"
import { BOARD_ROLES } from "../../constants/firebase"
import { User } from "../../models/User"

type BoardCreateProps = {
  authUser: User,
}

type BoardCreateState = {
  name: string,
  shareToEmails: Array<string>,
}

class BoardCreate extends React.PureComponent<
  BoardCreateProps,
  BoardCreateState
> {
  static defaultProps = {}

  state = {
    name: "",
    shareToEmails: [],
  }

  onChangeName = (event: SyntheticEvent<HTMLInputElement>) => {
    return this.setState({ name: event.currentTarget.value })
  }

  addShareToEmail = (email: string) => {
    //todo - verify if email has a correct format
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
    if (event.key === "Enter") {
      console.log("enter key pressed")
      const email = event.currentTarget.value
      this.addShareToEmail(email)
      event.currentTarget.value = ""
    }
  }

  onSave = () => {
    const shareToEmails: Array<string> = [...this.state.shareToEmails]
    // Convert list of e-mails to "role" object.
    // Currently we only support "idea_editor" role.
    const roles = shareToEmails.reduce(
      (acc: { [string]: string }, email: string) => {
        acc[email] = BOARD_ROLES.EDITOR
        return acc
      },
      {}
    )
    const board = new Board({
      name: this.state.name,
      ownerId: this.props.authUser.id,
      roles,
    })
    BoardsFacade.createBoard(board)
      .then(() => {
        console.log("Added new board")
      })
      .catch((error) => console.error("Error adding board: ", error))
  }

  render() {
    return (
      <div>
        <h2>Add board</h2>
        <p>Name:</p>
        <input onChange={this.onChangeName} />
        <p>Share To:</p>
        <input onKeyPress={this.handleKeyPress} />
        <ul>
          {this.state.shareToEmails.map((email: string, index: number) => (
            <li key={email} onClick={() => this.removeShareToEmail(index)}>
              {email}
            </li>
          ))}
        </ul>
        <button onClick={this.onSave}>Save</button>
      </div>
    )
  }
}

BoardCreate = withAuth(BoardCreate)
export { BoardCreate }
