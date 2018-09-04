// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { Button, Dimmer, Divider } from "semantic-ui-react"
import "./styles/IdeaView.css"
import { SCORE_TEXTS } from "../../constants/scores"
import { IdeaControls } from "../IdeaControls/IdeaControls"
import { IdeaViewTotalScore } from "./IdeaViewTotalScore"

type IdeaViewProps = {
  idea: Idea,
  onEdit: Function,
  onClose: Function,
}

class IdeaView extends React.PureComponent<IdeaViewProps> {
  static defaultProps = {}

  /**
   * Close the view only when the dimmer is clicked
   * Prevents an issue when an Idea View was closing after clicking
   * inside a Delete Idea popup.
   * @param event
   */
  onClickOutside = (event: SyntheticEvent<>) => {
    if (event.target === event.currentTarget) {
      this.props.onClose()
    }
  }

  render() {
    const { idea, onEdit, onClose } = this.props

    return (
      <Dimmer active={true} onClickOutside={this.onClickOutside}>
        <div className="IdeaView">
          <div>
            <div className="IdeaView__Header">
              <p className="IdeaView__Name text-color-gradient">{idea.name}</p>
              <IdeaControls idea={idea} onEdit={onEdit} onDelete={onClose} />
            </div>
            <p className="IdeaView__Description color-gray">
              {idea.description}
            </p>
            <Divider />
            <div className="IdeaView__Scores">
              <p>
                <span className="IdeaViewScore__Type">ease</span>
                <span className="IdeaViewScore__Value">{idea.ease}</span>
                <span className="IdeaViewScore__Text color-lgray">
                  {SCORE_TEXTS.EASE[idea.ease]}
                </span>
              </p>
              <p>
                <span className="IdeaViewScore__Type">confidence</span>
                <span className="IdeaViewScore__Value">{idea.confidence}</span>
                <span className="IdeaViewScore__Text color-lgray">
                  {SCORE_TEXTS.CONFIDENCE[idea.confidence]}
                </span>
              </p>
              <p>
                <span className="IdeaViewScore__Type">impact</span>
                <span className="IdeaViewScore__Value">{idea.impact}</span>
                <span className="IdeaViewScore__Text color-lgray">
                  {SCORE_TEXTS.IMPACT[idea.impact]}
                </span>
              </p>
            </div>

            <IdeaViewTotalScore value={idea.getAverage()} />
          </div>
          <div className="IdeaViewFooter">
            <Button onClick={this.props.onClose}>Close</Button>
            {idea.modifiedAt && (
              <small className="color-lgray">
                last edited {idea.modifiedAt.toDate().toLocaleDateString()}
              </small>
            )}
          </div>
        </div>
      </Dimmer>
    )
  }
}

export { IdeaView }
