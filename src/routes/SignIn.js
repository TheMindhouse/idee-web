// @flow
import * as React from "react"
import { type RouterHistory, withRouter } from "react-router-dom"
import GoogleButton from "react-google-button"
import { AuthFacade } from "../facades/AuthFacade"
import { User } from "../models/User"
import { URLHelper } from "../helpers/URLHelper"
import ideeLogo from "../assets/images/idee_logo.svg"

type SignInProps = {
  history: RouterHistory,
}

class SignIn extends React.PureComponent<SignInProps> {
  static defaultProps = {}

  componentDidMount() {
    const user = AuthFacade.getCurrentUser()
    if (user) {
      this.props.history.push(URLHelper.homepage)
    }
  }

  signInWithGoogle = () => {
    AuthFacade.signInWithGoogle().then((authUser: User) => {
      console.log("Sign In successful for ", authUser)
      this.props.history.push(URLHelper.homepage)
    })
  }

  render() {
    return (
      <div className="FullColorPage">
        <img
          src={ideeLogo}
          alt="idée - write it down"
          className="FullColorPage__Logo"
        />
        <GoogleButton onClick={this.signInWithGoogle} />
      </div>
    )
  }
}

SignIn = withRouter(SignIn)
export { SignIn }
