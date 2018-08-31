// @flow
import * as React from "react"
import { UsersFacade } from "../../facades/UsersFacade"
import { User } from "../../models/User"
import "./styles/SharedUser.css"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"

type SharedUserProps = {
  email: string,
  onRemove: Function,
}

type SharedUserState = {
  user: ?User,
}

class SharedUser extends React.PureComponent<SharedUserProps, SharedUserState> {
  static defaultProps = {}

  state = {
    user: null,
  }

  componentDidMount() {
    UsersFacade.findUserByEmail(this.props.email).then((user: ?User) => {
      if (user) {
        this.setState({ user })
      }
    })
  }

  render() {
    const { user } = this.state

    return (
      <div className="SharedUser">
        <div className="SharedUser__AvatarContainer">
          {user && user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="SharedUser__Avatar"
            />
          ) : (
            <Element icon={ELEMENTS.userPlaceholder} />
          )}
        </div>
        {user && (
          <div className="SharedUser__Details">
            <span className="SharedUser__Name">{user.name}</span>
            <span className="SharedUser__Email color-lgray">{user.email}</span>
          </div>
        )}
        {!user && (
          <div className="SharedUser__Details">
            <span className="SharedUser__Email color-lgray">
              {this.props.email}
            </span>
          </div>
        )}
        <div className="SharedUser__Role color-lgray">
          <span>editor</span>
        </div>
        <div className="SharedUser__Controls">
          <div onClick={this.props.onRemove}>
            <Element
              icon={ELEMENTS.deleteIcon}
              size={ELEMENTS_SIZE.tiny}
              className="SharedUser__Delete"
            />
          </div>
        </div>
      </div>
    )
  }
}

export { SharedUser }
