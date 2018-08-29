// @flow
import * as React from "react"
import { Button } from "semantic-ui-react"
import "./styles/IdeasListEmpty.css"

type IdeasListEmptyProps = {
  onClickAdd: Function,
}

const IdeasListEmpty = (props: IdeasListEmptyProps) => {
  return (
    <div className="IdeasListEmpty">
      <p>
        <b>no ideas in this board yet</b>
      </p>
      <Button onClick={props.onClickAdd} positive>
        Add new idea
      </Button>
    </div>
  )
}

IdeasListEmpty.defaultProps = {}

export { IdeasListEmpty }
