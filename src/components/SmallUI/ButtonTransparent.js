// @flow
import * as React from "react"
import { Element } from "../Element/Element"
import "./styles/ButtonTransparent.css"

type ButtonTransparentProps = {
  label: string,
  onClick: Function,
  icon?: string,
  iconSize?: string,
  className?: string,
}

const ButtonTransparent = (props: ButtonTransparentProps) => {
  return (
    <button
      className={`ButtonTransparent
        ${props.icon ? "ButtonTransparent--with-icon" : ""}
        ${props.className || ""}`}
      onClick={props.onClick}
    >
      {props.icon && <Element icon={props.icon} size={props.iconSize} />}
      <span>{props.label}</span>
    </button>
  )
}

ButtonTransparent.defaultProps = {
  label: "",
  onClick: () => null,
}

export { ButtonTransparent }
