// @flow
import * as React from "react"
import { BoardsList } from "../BoardsList/BoardsList"
import { withAuth } from "../../hoc/withAuth"
import { User } from "../../models/User"
import "./styles/Sidebar.css"
import { SidebarUser } from "./SidebarUser"

type SidebarProps = {
  authUser: User,
}

class Sidebar extends React.PureComponent<SidebarProps> {
  static defaultProps = {}

  render() {
    const { authUser } = this.props
    return (
      <div className="Sidebar">
        <SidebarUser />
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
