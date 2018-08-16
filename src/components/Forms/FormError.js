// @flow
import * as React from "react"

type FormErrorProps = {
  message: string,
}

const FormError = (props: FormErrorProps) => {
  return <div className="FormField__Error">{props.message}</div>
}

FormError.defaultProps = {}

export { FormError }
