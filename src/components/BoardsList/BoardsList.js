// @flow
import * as React from "react"
import { withAuth } from "../../hoc/withAuth"
import { db } from "../../facades/FirebaseFacade"
import { FirebaseUser } from "../../models/FirebaseUser"
import { Board } from "../../models/Board"
import { FieldPath } from "../../helpers/firebaseUtils"
import * as Rx from "rxjs/Rx"
import { BOARD_ROLES, COLLECTIONS } from "../../constants/firebase"

type BoardsListProps = {
  authUser: FirebaseUser,
}

type BoardsListState = {
  boards: ?Array<Board>,
}

class BoardsList extends React.PureComponent<BoardsListProps, BoardsListState> {
  static defaultProps = {}

  state = {
    boards: null,
  }

  componentDidMount() {
    const collection = db.collection(COLLECTIONS.BOARDS)
    const userId = this.props.authUser.uid
    const emailPath = new FieldPath("roles", this.props.authUser.email)
    const ownedRef = collection.where("ownerId", "==", userId)
    const adminRef = collection.where(emailPath, "==", BOARD_ROLES.ADMIN)
    const editorRef = collection.where(emailPath, "==", BOARD_ROLES.EDITOR)
    const readerRef = collection.where(emailPath, "==", BOARD_ROLES.READER)

    // Create Observables.
    const owned$ = new Rx.Subject()
    const editor$ = new Rx.Subject()

    // Hook values from callback to the observable
    ownedRef.onSnapshot((querySnapshot) => {
      const boards = querySnapshot.docs.map(
        (doc) =>
          new Board({
            id: doc.id,
            ...doc.data(),
          })
      )
      owned$.next(boards)
    })

    // Hook values from callback to the observable
    editorRef.onSnapshot((querySnapshot) => {
      const boards = querySnapshot.docs.map(
        (doc) =>
          new Board({
            id: doc.id,
            ...doc.data(),
          })
      )
      editor$.next(boards)
    })

    Rx.Observable.combineLatest(owned$, editor$).subscribe(
      (boardsContainers: Array<Array<Board>>) => {
        console.log("Boards updated")
        const boards: Array<Board> = [].concat.apply([], [...boardsContainers])
        this.setState({ boards })
      }
    )
  }

  render() {
    if (!this.state.boards) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <div>
        <ul>
          {this.state.boards.map((board) => (
            <li key={board.id}>{board.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

BoardsList = withAuth(BoardsList)
export { BoardsList }
