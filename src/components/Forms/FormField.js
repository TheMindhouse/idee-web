// @flow
import * as React from "react"
import "./styles/FormField.css"
import { FormError } from "./FormError"

type FormFieldProps = {
  label: string,
  error?: boolean,
  children: ?React.Node,
  style?: Object,
}

class FormField extends React.Component<FormFieldProps> {
  static FormError = FormError
  render() {
    const { error, style, label, children } = this.props
    return (
      <div
        className={`FormField ${error ? "FormField--error" : ""}`}
        style={style}
      >
        <span className="FormField__Label">{label}</span>
        {children}
      </div>
    )
  }
}

export { FormField }
