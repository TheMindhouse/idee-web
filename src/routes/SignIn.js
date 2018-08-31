// @flow
import * as React from "react"
import { type RouterHistory, withRouter } from "react-router-dom"
import { AuthFacade } from "../facades/AuthFacade"
import { User } from "../models/User"
import { URLHelper } from "../helpers/URLHelper"
import ideeLogo from "../assets/images/idee_logo.svg"
import { ELEMENTS, ELEMENTS_SIZE } from "../components/Element/Element"
import { ButtonTransparent } from "../components/SmallUI/ButtonTransparent"

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

  redirectToHomepage = (authUser: User) => {
    console.log("Sign In successful for ", authUser)
    this.props.history.push(URLHelper.homepage)
  }

  signInWithGoogle = () =>
    AuthFacade.signInWithGoogle().then(this.redirectToHomepage)

  signInWithFacebook = () =>
    AuthFacade.signInWithFacebook().then(this.redirectToHomepage)

  render() {
    return (
      <div className="FullColorPage">
        <img
          src={ideeLogo}
          alt="idée - write it down"
          className="FullColorPage__Logo"
        />
        <ButtonTransparent
          icon={ELEMENTS.facebook}
          iconSize={ELEMENTS_SIZE.large}
          label="sign in with Facebook"
          onClick={this.signInWithFacebook}
        />
        <ButtonTransparent
          icon={ELEMENTS.google}
          iconSize={ELEMENTS_SIZE.large}
          label="sign in with Google"
          onClick={this.signInWithGoogle}
        />
      </div>
    )
  }
}

SignIn = withRouter(SignIn)
export { SignIn }
