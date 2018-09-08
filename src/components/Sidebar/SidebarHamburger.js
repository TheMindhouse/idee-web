// @flow
import * as React from "react"
import "./styles/SidebarHamburger.css"

type SidebarHamburgerProps = {
  isOpened: boolean,
}

const SidebarHamburger = ({ isOpened }: SidebarHamburgerProps) => {
  return (
    <button
      className={`hamburger hamburger--3dy ${isOpened ? "is-active" : ""}`}
      type="button"
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  )
}

SidebarHamburger.defaultProps = {
  isOpened: false,
}

export { SidebarHamburger }
