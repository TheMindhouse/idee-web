// @flow
import * as React from "react"
import { BoardsList } from "../BoardsList/BoardsList"
import { withAuth } from "../../hoc/withAuth"
import { User } from "../../models/User"
import "./styles/Sidebar.css"
import { SidebarUser } from "./SidebarUser"
import { ELEMENTS } from "../Element/Element"
import { ButtonTransparent } from "../SmallUI/ButtonTransparent"
import { SidebarHamburger } from "./SidebarHamburger"

type SidebarProps = {
  authUser: User,
  onCreateBoardClick: Function,
}

type SidebarState = {
  isOpened: boolean,
}

class Sidebar extends React.PureComponent<SidebarProps, SidebarState> {
  static defaultProps = {}

  state = {
    isOpened: false,
  }

  toggleSidebar = () => this.setState({ isOpened: !this.state.isOpened })

  onCreateBoardClick = () => {
    this.props.onCreateBoardClick()
    this.toggleSidebar()
  }

  render() {
    const { authUser } = this.props
    const { isOpened } = this.state
    return (
      <div className={`Sidebar ${isOpened ? "Sidebar--opened" : ""}`}>
        <div className="Sidebar__Hamburger" onClick={this.toggleSidebar}>
          <SidebarHamburger isOpened={isOpened} />
        </div>
        <SidebarUser />
        <div className="SidebarContent">
          <div className="SidebarContent__BoardsList">
            <BoardsList
              userId={authUser.id}
              onBoardClick={this.toggleSidebar}
            />
          </div>
          <ButtonTransparent
            icon={ELEMENTS.plus}
            label="create new board"
            className="SidebarContent__CreateBoardButton"
            onClick={this.onCreateBoardClick}
          />
        </div>
      </div>
    )
  }
}

Sidebar = withAuth(Sidebar)
export { Sidebar }
