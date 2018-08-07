// @flow
import * as React from "react"
import { withAuth } from "../hoc/withAuth"
import { db } from "../facades/FirebaseFacade"
import { FirebaseUser } from "../models/FirebaseUser"
import { Board } from "../models/Board"
import { FieldPath } from "../helpers/firebaseUtils"
import * as Rx from "rxjs/Rx"
import { BOARD_ROLES, COLLECTIONS } from "../constants/firebase"

const BoardsContext = React.createContext()

type BoardsProviderProps = {
  authUser: FirebaseUser,
  children: ?React.Node,
}

type BoardsProviderState = {
  boards: ?Array<Board>,
}

class BoardsProvider extends React.PureComponent<
  BoardsProviderProps,
  BoardsProviderState
> {
  static defaultProps = {}

  state = {
    boards: null,
  }

  unsubscribeFunctions: Array<Function> = []

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
    const admin$ = new Rx.Subject()
    const editor$ = new Rx.Subject()
    const reader$ = new Rx.Subject()

    this.unsubscribeFunctions.push(this.observeBoardQuery(ownedRef, owned$))
    this.unsubscribeFunctions.push(this.observeBoardQuery(adminRef, admin$))
    this.unsubscribeFunctions.push(this.observeBoardQuery(editorRef, editor$))
    this.unsubscribeFunctions.push(this.observeBoardQuery(readerRef, reader$))

    Rx.Observable.combineLatest(owned$, admin$, editor$, reader$).subscribe(
      (boardsContainers: Array<Array<Board>>) => {
        console.log("Boards updated")
        const boards: Array<Board> = [].concat.apply([], [...boardsContainers])
        this.setState({ boards })
      }
    )
  }

  componentWillUnmount() {
    this.unsubscribeFunctions.forEach((unsubscribe: Function) => {
      unsubscribe()
    })
  }

  observeBoardQuery = (
    queryRef: $npm$firebase$firestore$Query,
    rxSubject$: rxjs$Observer<Array<Board>>
  ): Function =>
    queryRef.onSnapshot((querySnapshot) => {
      const boards = querySnapshot.docs.map(
        (doc) =>
          new Board({
            id: doc.id,
            ...doc.data(),
          })
      )
      rxSubject$.next(boards)
    })

  render() {
    return (
      <BoardsContext.Provider value={this.state}>
        {this.props.children}
      </BoardsContext.Provider>
    )
  }
}

BoardsProvider = withAuth(BoardsProvider)
export type WithBoards = BoardsProviderState
export { BoardsProvider, BoardsContext }
