// @flow
import * as React from "react"
import { BoardsList } from "../BoardsList/BoardsList"
import { AuthFacade } from "../../facades/AuthFacade"
import { withAuth } from "../../hoc/withAuth"
import { User } from "../../models/User"
import "./styles/Sidebar.css"

type SidebarProps = {
  authUser: User,
}

class Sidebar extends React.PureComponent<SidebarProps> {
  static defaultProps = {}

  render() {
    const { authUser } = this.props
    return (
      <div className="Sidebar">
        <img
          src={authUser.avatarUrl}
          style={{ maxWidth: 100, borderRadius: "100%" }}
        />
        <h1>Welcome {authUser.name}!</h1>
        <button onClick={AuthFacade.signOut}>Sign out</button>
        <div className="SidebarContent">
          <div className="SidebarContent__BoardsList">
            <BoardsList userId={authUser.id} />
          </div>
          <div className="SidebarContent__CreateBoard">
            <button>Create board</button>
          </div>
        </div>
      </div>
    )
  }
}

Sidebar = withAuth(Sidebar)
export { Sidebar }
