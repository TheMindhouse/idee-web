// @flow
import * as React from "react"
import arrow from "../../assets/images/icons/arrow.svg"
import arrowSmall from "../../assets/images/icons/arrow_small.svg"
import back from "../../assets/images/icons/back.svg"
import deleteIcon from "../../assets/images/icons/delete.svg"
import facebook from "../../assets/images/icons/facebook.svg"
import google from "../../assets/images/icons/google.svg"
import menu from "../../assets/images/icons/menu.svg"
import options from "../../assets/images/icons/options.svg"
import plus from "../../assets/images/icons/plus.svg"
import share from "../../assets/images/icons/share.svg"
import sort from "../../assets/images/icons/sort.svg"
import userPlaceholder from "../../assets/images/icons/user_placeholder.svg"

type ElementProps = {
  icon: string,
  size?: string,
  width?: string,
  className?: string,
  style?: Object,
}

export const ELEMENTS = {
  arrow,
  arrowSmall,
  back,
  deleteIcon,
  facebook,
  google,
  menu,
  options,
  plus,
  share,
  sort,
  userPlaceholder,
}

export const ELEMENTS_SIZE = {
  tiny: "16px",
  small: "20px",
  medium: "24px",
  large: "30px",
  huge: "40px",
}

const Element = (props: ElementProps) => {
  const getWidth = () => (props.width ? props.width : props.size)

  return (
    <img
      src={props.icon}
      style={{ width: getWidth(), ...props.style }}
      alt="icon"
      className={props.className}
      aria-hidden="true"
      {...props}
    />
  )
}

Element.defaultProps = {
  size: ELEMENTS_SIZE.small,
}

export { Element }
