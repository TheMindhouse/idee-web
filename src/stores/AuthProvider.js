// @flow
import * as React from "react"
import { AuthFacade } from "../facades/AuthFacade"
import { FirebaseUser } from "../models/FirebaseUser"

const AuthContext = React.createContext()

type AuthProviderProps = {
  children: ?React.Node,
}

type AuthProviderState = {
  authUser: ?FirebaseUser,
}

class AuthProvider extends React.PureComponent<
  AuthProviderProps,
  AuthProviderState
> {
  static defaultProps = {}

  state = {
    authUser: null,
  }

  componentDidMount() {
    AuthFacade.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState({ authUser: new FirebaseUser(authUser) })
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
