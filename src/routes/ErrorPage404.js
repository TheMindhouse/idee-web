// @flow
import * as React from "react"
import { URLHelper } from "../helpers/URLHelper"
import { Link } from "react-router-dom"

const ErrorPage404 = () => {
  return (
    <div className="FullColorPage">
      <h1>Page not found</h1>
      <Link to={URLHelper.homepage}>Go back to homepage</Link>
    </div>
  )
}

ErrorPage404.defaultProps = {}

export { ErrorPage404 }
