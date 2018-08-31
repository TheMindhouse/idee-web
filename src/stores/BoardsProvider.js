// @flow
import * as React from "react"
import { db } from "../facades/FirebaseFacade"
import { Board } from "../models/Board"
import { FieldPath } from "../helpers/firebaseUtils"
import * as Rx from "rxjs/Rx"
import { BOARD_ROLES, COLLECTIONS } from "../constants/firebase"
import { type RouterHistory, withRouter } from "react-router-dom"
import { AuthFacade } from "../facades/AuthFacade"
import { BoardsFacade } from "../facades/BoardsFacade"
import { URLHelper } from "../helpers/URLHelper"

const BoardsContext = React.createContext()

type BoardsProviderProps = {
  children: ?React.Node,
  history: RouterHistory,
}

type BoardsProviderState = {
  boards: ?Array<Board>,
  currentBoard: ?Board,
}

class BoardsProvider extends React.Component<
  BoardsProviderProps,
  BoardsProviderState
> {
  static defaultProps = {}

  defaultState: BoardsProviderState = {
    boards: null,
    currentBoard: null,
  }

  state = this.defaultState

  unsubscribeFunctions: Array<Function> = []

  componentDidMount() {
    this.subscribe()
    AuthFacade.onAuthStateChanged(this.subscribe)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  subscribe = () => {
    this.unsubscribe()
    const user = AuthFacade.getCurrentUser()
    if (!user) {
      // Remove any boards from the state after logout.
      this.setState(this.defaultState)
      return
    }
    const collection = db.collection(COLLECTIONS.BOARDS)
    const userId = user.id
    const email = user.email
    const emailPath = email ? new FieldPath("roles", email) : null

    const ownedRef = collection.where("ownerId", "==", userId)

    const adminRef = emailPath
      ? collection.where(emailPath, "==", BOARD_ROLES.ADMIN)
      : null
    const editorRef = emailPath
      ? collection.where(emailPath, "==", BOARD_ROLES.EDITOR)
      : null
    const readerRef = emailPath
      ? collection.where(emailPath, "==", BOARD_ROLES.READER)
      : null

    // Create Observables.
    const owned$ = new Rx.Subject()
    const admin$ = new Rx.Subject()
    const editor$ = new Rx.Subject()
    const reader$ = new Rx.Subject()

    Rx.Observable.combineLatest(owned$, admin$, editor$, reader$).subscribe(
      (boardsContainers: Array<Array<Board>>) => {
        const boards: Array<Board> = [].concat.apply([], [...boardsContainers])
        const currentBoard = this.state.currentBoard
          ? boards.find(
              (board: Board) =>
                this.state.currentBoard &&
                this.state.currentBoard.id === board.id
            )
          : boards[0]
        console.log("Boards updated", boards)
        if (!boards.length) {
          this.createDefaultBoard()
        } else {
          this.setState({ boards, currentBoard })
        }
      }
    )

    this.unsubscribeFunctions.push(this.observeBoardQuery(ownedRef, owned$))
    this.unsubscribeFunctions.push(this.observeBoardQuery(adminRef, admin$))
    this.unsubscribeFunctions.push(this.observeBoardQuery(editorRef, editor$))
    this.unsubscribeFunctions.push(this.observeBoardQuery(readerRef, reader$))
  }

  unsubscribe = () => {
    this.unsubscribeFunctions.forEach((unsubscribeFn: Function) => {
      unsubscribeFn()
    })
  }

  observeBoardQuery = (
    queryRef: ?$npm$firebase$firestore$Query,
    rxSubject$: rxjs$Observer<Array<Board>>
  ): Function => {
    if (!queryRef) {
      rxSubject$.next([])
      return () => null
    }
    return queryRef.onSnapshot((querySnapshot) => {
      const boards = querySnapshot.docs.map(
        (doc) =>
          new Board({
            id: doc.id,
            ...doc.data(),
          })
      )
      rxSubject$.next(boards)
    })
  }

  /**
   * Set first board as active
   */
  selectFirstBoard = () => {
    const { boards, currentBoard } = this.state
    if (boards && boards.length > 0) {
      const firstBoard = currentBoard
        ? boards.find((board: Board) => board.id !== currentBoard.id)
        : boards[0]
      if (firstBoard) {
        this.setActiveBoard(firstBoard.id)
      }
    } else {
      this.setActiveBoard(null)
    }
  }

  setActiveBoard = (boardId: ?string): void => {
    const boards = this.state.boards
    if (!boards || !boardId) {
      return this.setState({ currentBoard: null })
    }
    const foundBoards: Array<Board> = boards.filter(
      (board: Board) => board.id === boardId
    )
    if (!foundBoards.length) {
      return this.props.history.push(URLHelper.pageNotFound)
    }
    const currentBoard = foundBoards[0]
    this.setState({ currentBoard })
    this.props.history.push(URLHelper.board(boardId))
  }

  leaveBoard = (board: Board, email: string): Promise<void> => {
    return BoardsFacade.removeRole(board, email).then(this.selectFirstBoard)
  }

  deleteActiveBoard = (): Promise<void> => {
    const { currentBoard } = this.state
    if (!currentBoard) {
      throw new Error("No active board")
    }
    return BoardsFacade.deleteBoard(currentBoard).then(this.selectFirstBoard)
  }

  /**
   * If user doesn't have any boards, create a default one.
   */
  createDefaultBoard = (): Promise<mixed> => {
    const user = AuthFacade.getCurrentUser()
    if (user) {
      const board = new Board({
        name: "my ideas",
        ownerId: user.id,
      })
      return BoardsFacade.createBoard(board)
    }
    throw new Error("User not logged in")
  }

  render() {
    const boardStore: BoardsStoreType = {
      ...this.state,
      setActiveBoard: this.setActiveBoard,
      leaveBoard: this.leaveBoard,
      deleteActiveBoard: this.deleteActiveBoard,
      createDefaultBoard: this.createDefaultBoard,
    }
    return (
      <BoardsContext.Provider value={boardStore}>
        {this.props.children}
      </BoardsContext.Provider>
    )
  }
}

export type BoardsStoreType = {
  boards: ?Array<Board>,
  currentBoard: ?Board,
  setActiveBoard: (?string) => void,
  leaveBoard: (Board, string) => Promise<void>,
  deleteActiveBoard: () => Promise<void>,
  createDefaultBoard: () => Promise<mixed>,
}

BoardsProvider = withRouter(BoardsProvider)
export { BoardsProvider, BoardsContext }
