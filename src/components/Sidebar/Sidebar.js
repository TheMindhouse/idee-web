// @flow
import * as React from "react"
import { BoardsList } from "../BoardsList/BoardsList"
import { withAuth } from "../../hoc/withAuth"
import { User } from "../../models/User"
import "./styles/Sidebar.css"
import { SidebarUser } from "./SidebarUser"
import { Element, ELEMENTS } from "../Element/Element"

type SidebarProps = {
  authUser: User,
  onCreateBoardClick: Function,
}

class Sidebar extends React.PureComponent<SidebarProps> {
  static defaultProps = {}

  render() {
    const { authUser, onCreateBoardClick } = this.props
    return (
      <div className="Sidebar">
        <SidebarUser />
        <div className="SidebarContent">
          <div className="SidebarContent__BoardsList">
            <BoardsList userId={authUser.id} />
          </div>
          <button
            onClick={onCreateBoardClick}
            className="SidebarContent__CreateBoardButton"
          >
            <Element icon={ELEMENTS.plus} />
            <span>create new board</span>
          </button>
        </div>
      </div>
    )
  }
}

Sidebar = withAuth(Sidebar)
export { Sidebar }
