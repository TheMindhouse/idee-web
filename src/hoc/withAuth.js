import React from "react"
import { getComponentDisplayName } from "../helpers/getComponentDisplayName"
import { AuthContext } from "../stores/AuthProvider"
import { User } from "../models/User"

const withAuth = (WrappedComponent) => {
  class withAuth extends React.Component {
    render() {
      return (
        <AuthContext.Consumer>
          {(authUser: ?User) =>
            authUser ? (
              <WrappedComponent {...this.props} authUser={authUser} />
            ) : null
          }
        </AuthContext.Consumer>
      )
    }
  }

  withAuth.displayName = `withAuth(${getComponentDisplayName(
    WrappedComponent
  )})`

  return withAuth
}

export { withAuth }
