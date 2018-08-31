// @flow
import * as React from "react"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"
import "./styles/IdeaCreateButton.css"

type IdeaCreateButtonProps = {
  onClick: Function,
}

class IdeaCreateButton extends React.PureComponent<IdeaCreateButtonProps> {
  static defaultProps = {}

  render() {
    return (
      <div className="IdeaCreateButton" onClick={this.props.onClick}>
        <Element
          icon={ELEMENTS.plus}
          size={ELEMENTS_SIZE.medium}
          color="#fff"
        />
        <span>add new idea</span>
      </div>
    )
  }
}

export { IdeaCreateButton }
