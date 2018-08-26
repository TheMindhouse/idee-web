// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import "./styles/IdeasListItem.css"
import { Score } from "../Score/Score"

type IdeasListItemProps = {
  idea: Idea,
  onClick: Function,
}

class IdeasListItem extends React.PureComponent<IdeasListItemProps> {
  static defaultProps = {}

  render() {
    const { idea, onClick } = this.props
    return (
      <div className="IdeasListItem" onClick={onClick}>
        <h3 className="IdeasListItem__Name">{idea.name}</h3>
        <div className="IdeasListItem__Scores">
          <Score value={idea.ease} className="IdeasListItem__Score" />
          <Score value={idea.confidence} className="IdeasListItem__Score" />
          <Score value={idea.impact} className="IdeasListItem__Score" />
        </div>
        <h3 className="IdeasListItem__Average">{idea.getAverage()}</h3>
      </div>
    )
  }
}

export { IdeasListItem }
