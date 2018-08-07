// @flow
import * as React from "react"
import { Board } from "../../models/Board"
import { withAuth } from "../../hoc/withAuth"
import { FirebaseUser } from "../../models/FirebaseUser"
import { BoardsFacade } from "../../facades/BoardsFacade"

type BoardCreateProps = {
  authUser: FirebaseUser,
}

type BoardCreateState = {
  name: string,
}

class BoardCreate extends React.PureComponent<
  BoardCreateProps,
  BoardCreateState
> {
  static defaultProps = {}

  state = {
    name: "",
  }

  onChangeName = (event: SyntheticEvent<HTMLInputElement>) => {
    return this.setState({ name: event.currentTarget.value })
  }

  onSave = () => {
    const board = new Board({
      name: this.state.name,
      ownerId: this.props.authUser.uid,
    })
    BoardsFacade.createBoard(board)
  }

  render() {
    return (
      <div>
        <h2>Add board</h2>
        <p>Name:</p>
        <input onChange={this.onChangeName} />
        <button onClick={this.onSave}>Save</button>
      </div>
    )
  }
}

BoardCreate = withAuth(BoardCreate)
export { BoardCreate }
