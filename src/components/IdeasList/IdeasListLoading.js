// @flow
import * as React from "react"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"
import "./styles/IdeasListLoading.css"

const IdeasListLoading = () => {
  return (
    <div className="IdeasListLoading">
      <Element
        icon={ELEMENTS.commaLoader}
        size={ELEMENTS_SIZE.huge}
        className="animation-loader"
      />
    </div>
  )
}

export { IdeasListLoading }
