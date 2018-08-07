// @flow
import * as React from "react"
import { withAuth } from "../hoc/withAuth"
import { FirebaseUser } from "../models/FirebaseUser"
import { AuthFacade } from "../facades/AuthFacade"
import { BoardsList } from "../components/BoardsList/BoardsList"
import { BoardCreate } from "../components/BoardCreate/BoardCreate"

type AppHomepageProps = {
  authUser: FirebaseUser,
}

class AppHomepage extends React.PureComponent<AppHomepageProps> {
  static defaultProps = {}

  componentDidMount() {
    AuthFacade.getCurrentUser()
  }

  render() {
    return (
      <div>
        <h1>Welcome {this.props.authUser.displayName}!</h1>
        <button onClick={AuthFacade.signOut}>Sign out</button>
        <BoardsList />
        <BoardCreate />
      </div>
    )
  }
}

AppHomepage = withAuth(AppHomepage)
export { AppHomepage }
