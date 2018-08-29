// @flow
import * as React from "react"
import { AuthFacade } from "../facades/AuthFacade"
import { FirebaseUser } from "../models/FirebaseUser"
import { User } from "../models/User"

const AuthContext = React.createContext()

type AuthProviderProps = {
  children: ?React.Node,
}

type AuthProviderState = {
  authUser: ?User,
}

class AuthProvider extends React.Component<
  AuthProviderProps,
  AuthProviderState
> {
  static defaultProps = {}

  state = {
    authUser: undefined,
  }

  componentDidMount() {
    AuthFacade.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState({ authUser: new FirebaseUser(authUser).toUser() })
        : this.setState({ authUser: null })
    })
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.authUser}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export { AuthProvider, AuthContext }
