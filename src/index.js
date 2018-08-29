import React from "react"
import ReactDOM from "react-dom"
import "semantic-ui-css/semantic.min.css"
import "./assets/css/semantic-ui-overrides.css"
import "./assets/css/animations.css"
import "./assets/css/index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
