// @flow
import * as React from "react"
import { type RouterHistory, withRouter } from "react-router-dom"
import { AuthFacade } from "../facades/AuthFacade"
import { URLHelper } from "../helpers/URLHelper"
import ideeLogo from "../assets/images/idee_logo.svg"
import { ELEMENTS, ELEMENTS_SIZE } from "../components/Element/Element"
import { ButtonTransparent } from "../components/SmallUI/ButtonTransparent"
import { Flip, toast, ToastContainer } from "react-toastify"

type SignInProps = {
  history: RouterHistory,
}

class SignIn extends React.PureComponent<SignInProps> {
  static defaultProps = {}

  componentDidMount() {
    AuthFacade.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.props.history.push(URLHelper.homepage)
      }
    })
  }

  redirectToHomepage = () => {
    this.props.history.push(URLHelper.homepage)
  }

  signInWithGoogle = () =>
    AuthFacade.signInWithGoogle()
      .then(this.redirectToHomepage)
      .catch((err: Error) => toast.error(err.message))

  signInWithFacebook = () =>
    AuthFacade.signInWithFacebook()
      .then(this.redirectToHomepage)
      .catch((err: Error) => toast.error(err.message))

  render() {
    return (
      <div className="FullColorPage">
        <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar={true}
          draggable
          transition={Flip}
        />

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
