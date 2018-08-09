// @flow
import * as React from "react"
import { BoardsList } from "../BoardsList/BoardsList"
import { AuthFacade } from "../../facades/AuthFacade"
import { withAuth } from "../../hoc/withAuth"
import { User } from "../../models/User"

type SidebarProps = {
  authUser: User,
}

class Sidebar extends React.PureComponent<SidebarProps> {
  static defaultProps = {}

  render() {
    return (
      <div>
        <h1>Welcome {this.props.authUser.name}!</h1>
        <button onClick={AuthFacade.signOut}>Sign out</button>
        <BoardsList />
      </div>
    )
  }
}

Sidebar = withAuth(Sidebar)
export { Sidebar }
