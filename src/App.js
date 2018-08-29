// @flow
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ScrollToTop from "react-router-scroll-top"
import { BoardPage } from "./routes/BoardPage"
import { URLHelper } from "./helpers/URLHelper"
import { SignIn } from "./routes/SignIn"
import { AuthProvider } from "./stores/AuthProvider"
import { BoardsProvider } from "./stores/BoardsProvider"
import { ErrorPage404 } from "./routes/ErrorPage404"
import { requireAuthOrRedirect } from "./hoc/requireAuthOrRedirect"
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
      <Router>
        <AuthProvider>
          <BoardsProvider>
            <ScrollToTop>
              <div className="AppContent">
                <Route path="/" component={logPageView} />
                <Switch>
                  <Route exact path={URLHelper.login} component={SignIn} />
                  <Route
                    exact
                    path={URLHelper.homepage}
                    component={requireAuthOrRedirect(BoardPage)}
                  />
                  <Route
                    exact
                    path={URLHelper.board(":boardId")}
                    component={requireAuthOrRedirect(BoardPage)}
                  />
                  <Route
                    path={URLHelper.pageNotFound}
                    component={ErrorPage404}
                  />
                  <Route component={ErrorPage404} />
                </Switch>
              </div>
            </ScrollToTop>
          </BoardsProvider>
        </AuthProvider>
      </Router>
    )
  }
}

export default App
