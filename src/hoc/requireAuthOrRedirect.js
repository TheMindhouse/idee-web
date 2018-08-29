import React from "react"
import { getComponentDisplayName } from "../helpers/getComponentDisplayName"
import { AuthContext } from "../stores/AuthProvider"
import { User } from "../models/User"
import { URLHelper } from "../helpers/URLHelper"
import { Redirect } from "react-router-dom"
import { PageLoading } from "../components/PageLoading/PageLoading"

/**
 * Component wrapping top-level route components
 * Use only one per route to avoid multiple redirects when logged out.
 *
 * @param AuthenticatedRoute
 * @return {requireAuthOrRedirect}
 */
const requireAuthOrRedirect = (AuthenticatedRoute) => {
  class requireAuthOrRedirect extends React.Component {
    render() {
      return (
        <AuthContext.Consumer>
          {(authUser: ?User) => {
            if (authUser) {
              return <AuthenticatedRoute />
            }
            if (authUser === undefined) {
              // authUser undefined means that we are still waiting
              // for the information if user is logged in or not
              return <PageLoading />
            }
            return <Redirect to={URLHelper.login} />
          }}
        </AuthContext.Consumer>
      )
    }
  }

  requireAuthOrRedirect.displayName = `requireAuthOrRedirect(${getComponentDisplayName(
    AuthenticatedRoute
  )})`

  return requireAuthOrRedirect
}

export { requireAuthOrRedirect }
