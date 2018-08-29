// @flow
import * as React from "react"

type FormRightLabelProps = {
  text: string,
}

const FormRightLabel = (props: FormRightLabelProps) => {
  return <div className="FormField__FormRightLabel">{props.text}</div>
}

FormRightLabel.defaultProps = {}

export { FormRightLabel }
