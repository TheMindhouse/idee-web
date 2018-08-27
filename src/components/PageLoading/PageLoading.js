// @flow
import * as React from "react"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"
import "./styles/PageLoading.css"

const PageLoading = () => {
  return (
    <div className="PageLoading">
      <Element
        icon={ELEMENTS.commaLoader}
        size={ELEMENTS_SIZE.huge}
        className="animation-loader"
      />
    </div>
  )
}

PageLoading.defaultProps = {}

export { PageLoading }
