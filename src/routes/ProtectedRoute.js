// @flow
import * as React from "react"
import { AuthFacade } from "../facades/AuthFacade"
import { URLHelper } from "../helpers/URLHelper"
import { type RouterHistory, withRouter } from "react-router-dom"

type ProtectedRouteProps = {
  children: ?React.Node,
  history: RouterHistory,
}

class ProtectedRoute extends React.Component<ProtectedRouteProps> {
  componentDidMount() {
    AuthFacade.onAuthStateChanged((authUser) => {
      if (!authUser) {
        this.goToLogin()
      }
    })
  }

  goToLogin = () => {
    console.log("Please sign in")
    this.props.history.push(URLHelper.login)
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

ProtectedRoute = withRouter(ProtectedRoute)
export { ProtectedRoute }
