// @flow
import * as React from "react"
import { Dimmer } from "semantic-ui-react"
import { Element, ELEMENTS } from "../Element/Element"
import "./styles/SidePopup.css"

type SidePopupProps = {
  onClose: Function,
  children: ?React.Node,
}

const SidePopup = (props: SidePopupProps) => {
  return (
    <Dimmer active onClickOutside={props.onClose}>
      <div className="SidePopup">
        <div>
          <div className="SidePopup__Back" onClick={props.onClose}>
            <Element icon={ELEMENTS.back} />
          </div>
        </div>
        <div className="SidePopup__Content">{props.children}</div>
      </div>
    </Dimmer>
  )
}

SidePopup.defaultProps = {}

export { SidePopup }
