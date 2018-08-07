import React from "react"
import { getComponentDisplayName } from "../helpers/getComponentDisplayName"
import { AuthContext } from "../stores/AuthProvider"
import { FirebaseUser } from "../models/FirebaseUser"

const withAuth = (WrappedComponent) => {
  class withAuth extends React.Component {
    // componentDidMount() {
    //   AuthFacade.onAuthStateChanged((authUser) => {
    //     if (!authUser) {
    //       this.props.history.push(URLHelper.login)
    //     }
    //   })
    // }

    render() {
      return (
        <AuthContext.Consumer>
          {(authUser: ?FirebaseUser) =>
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
