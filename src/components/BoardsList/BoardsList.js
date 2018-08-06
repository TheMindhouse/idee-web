// @flow
import * as React from "react"
import { FirestoreCollection } from "react-firestore"
import { withAuth } from "../../hoc/withAuth"
import { FirebaseUser } from "../../models/FirebaseUser"

type BoardsListProps = {
  authUser: FirebaseUser,
}

class BoardsList extends React.PureComponent<BoardsListProps> {
  static defaultProps = {}

  render() {
    return (
      <FirestoreCollection
        path="boards"
        filter={[
          ["ownerId", "==", this.props.authUser.uid],
          ["roles k.gaszynski@gmail.com", "==", "idea_editor"],
        ]}
        render={({ isLoading, data }) => {
          return isLoading ? (
            <div>Loading</div>
          ) : (
            <div>
              <h1>Stories</h1>
              <ul>
                {data.map((board) => (
                  <li key={board.id}>{board.name}</li>
                ))}
              </ul>
            </div>
          )
        }}
      />
    )
  }
}

BoardsList = withAuth(BoardsList)
export { BoardsList }
