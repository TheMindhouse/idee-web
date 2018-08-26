// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { Button, Dimmer, Divider } from "semantic-ui-react"
import "./styles/IdeaView.css"
import { SCORE_TEXTS } from "../../constants/scores"

type IdeaViewProps = {
  idea: Idea,
  onClose: Function,
}

class IdeaView extends React.PureComponent<IdeaViewProps> {
  static defaultProps = {}

  render() {
    const { idea, onClose } = this.props

    return (
      <Dimmer active={true} onClickOutside={onClose}>
        <div className="IdeaView">
          <div>
            <p className="IdeaView__Name">{idea.name}</p>
            <p className="IdeaView__Description">{idea.description}</p>
            <Divider />
            <div className="IdeaView__Scores">
              <p>
                <span className="IdeaViewScore__Type">ease</span>
                <span className="IdeaViewScore__Value">{idea.ease}</span>
                <span className="IdeaViewScore__Text">
                  {SCORE_TEXTS.EASE[idea.ease]}
                </span>
              </p>
              <p>
                <span className="IdeaViewScore__Type">confidence</span>
                <span className="IdeaViewScore__Value">{idea.confidence}</span>
                <span className="IdeaViewScore__Text">
                  {SCORE_TEXTS.CONFIDENCE[idea.confidence]}
                </span>
              </p>
              <p>
                <span className="IdeaViewScore__Type">impact</span>
                <span className="IdeaViewScore__Value">{idea.impact}</span>
                <span className="IdeaViewScore__Text">
                  {SCORE_TEXTS.IMPACT[idea.impact]}
                </span>
              </p>
            </div>
            <Divider />
            <span>
              <b>total score</b>
            </span>
            <p className="IdeaView__TotalScore">{idea.getAverage()}</p>
          </div>
          <div>
            <Button onClick={this.props.onClose}>Close</Button>
          </div>
        </div>
      </Dimmer>
    )
  }
}

export { IdeaView }
