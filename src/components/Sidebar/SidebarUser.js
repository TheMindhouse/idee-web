// @flow
import * as React from "react"
import { AuthFacade } from "../../facades/AuthFacade"
import { User } from "../../models/User"
import { withAuth } from "../../hoc/withAuth"
import "./styles/SidebarUser.css"
import { Dropdown } from "semantic-ui-react"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"

type SidebarUserProps = {
  authUser: User,
}

const SidebarUser = withAuth((props: SidebarUserProps) => {
  const { authUser } = props
  return (
    <div className="SidebarUser">
      <img src={authUser.avatarUrl} className="SidebarUser__Avatar" />
      <div className="SidebarUser__Content">
        <div>
          <p className="SidebarUser__Name">{authUser.name}</p>
          <p className="SidebarUser__Email">{authUser.email}</p>
        </div>
        <div className="SidebarUser__Menu">
          <Dropdown
            icon={<Element icon={ELEMENTS.arrow} size={ELEMENTS_SIZE.tiny} />}
          >
            <Dropdown.Menu>
              <Dropdown.Item text="Sign out" onClick={AuthFacade.signOut} />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
})

SidebarUser.defaultProps = {}

export { SidebarUser }
