// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { db } from "../../facades/FirebaseFacade"
import { COLLECTIONS } from "../../constants/firebase"

type IdeasCoreProps = {
  boardId: string,
  render: (?Array<Idea>) => ?React.Node,
}

type IdeasCoreState = {
  ideas: ?Array<Idea>,
}

class IdeasCore extends React.PureComponent<IdeasCoreProps, IdeasCoreState> {
  static defaultProps = {}

  state = {
    ideas: null,
  }

  unsubscribeFn: ?Function = null

  componentDidMount() {
    this.subscribe()
  }

  componentDidUpdate(prevProps: IdeasCoreProps) {
    if (prevProps.boardId !== this.props.boardId) {
      this.unsubscribe()
      this.setState({ ideas: null }, this.subscribe)
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  subscribe = () => {
    const boardId = this.props.boardId
    const ideasRef = db
      .collection(COLLECTIONS.BOARDS)
      .doc(boardId)
      .collection(COLLECTIONS.IDEAS)

    // $FlowFixMe
    this.unsubscribeFn = ideasRef.onSnapshot((querySnapshot) => {
      const ideas = querySnapshot.docs.map(
        (doc) =>
          new Idea({
            id: doc.id,
            boardId,
            ...doc.data(),
          })
      )
      this.setState({ ideas })
    })
  }

  unsubscribe = () => {
    if (typeof this.unsubscribeFn === "function") {
      this.unsubscribeFn()
    }
  }

  render() {
    return <div>{this.props.render(this.state.ideas)}</div>
  }
}

export { IdeasCore }
