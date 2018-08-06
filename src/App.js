// @flow
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ScrollToTop from "react-router-scroll-top"
import { AppHomepage } from "./routes/AppHomepage"
import { URLHelper } from "./helpers/URLHelper"
import { SignIn } from "./routes/SignIn"
import { firebase } from "./facades/FirebaseFacade"
import "@firebase/firestore"
import { FirestoreProvider } from "react-firestore"
import { AuthProvider } from "./stores/AuthProvider"
// import ReactGA from "react-ga"
// import { hotjar } from "react-hotjar"

// Initialize Google Analytics
// const hostname = window && window.location && window.location.hostname
// if (hostname === CONFIG.PAGE_URL) {
//   ReactGA.initialize(CONFIG.ANALYTICS_ID)
//   hotjar.initialize(CONFIG.HOTJAR_ID, CONFIG.HOTJAR_VERSION)
// }
//
const logPageView = () => {
  // ReactGA.set({ page: window.location.pathname })
  // ReactGA.pageview(window.location.pathname)
  return null
}

class App extends Component<{}> {
  render() {
    return (
      <FirestoreProvider firebase={firebase}>
        <AuthProvider>
          <Router>
            <ScrollToTop>
              <div className="AppContent">
                <Route path="/" component={logPageView} />
                <Switch>
                  <Route
                    exact
                    path={URLHelper.homepage}
                    component={AppHomepage}
                  />
                  <Route exact path={URLHelper.login} component={SignIn} />
                  {/*<Route path="/404" component={ErrorPage404} />*/}
                  {/*<Route component={ErrorPage404} />*/}
                </Switch>
              </div>
            </ScrollToTop>
          </Router>
        </AuthProvider>
      </FirestoreProvider>
    )
  }
}

export default App
