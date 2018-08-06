// @flow
import * as React from "react"
import { withRouter } from "react-router-dom"
import GoogleButton from "react-google-button"
import { AuthFacade } from "../facades/AuthFacade"
import { User } from "../models/User"
import { URLHelper } from "../helpers/URLHelper"

type SignInProps = {
  history: withRouter,
}

class SignIn extends React.PureComponent<SignInProps> {
  static defaultProps = {}

  componentDidMount() {
    AuthFacade.getCurrentUser()
  }

  signInWithGoogle = () => {
    AuthFacade.signInWithGoogle().then((authUser: User) => {
      console.log("Sign In successfull for ", authUser)
      this.props.history.push(URLHelper.homepage)
    })
  }

  render() {
    return (
      <div>
        <GoogleButton onClick={this.signInWithGoogle} />
      </div>
    )
  }
}

SignIn = withRouter(SignIn)
export { SignIn }
