// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { IdeasFacade } from "../../facades/IdeasFacade"
import { Button, Dimmer } from "semantic-ui-react"
import "./styles/IdeaCreate.css"
import { FormField } from "../Forms/FormField"
import { SCORE_TEXTS } from "../../constants/scores"

type IdeaCreateProps = {
  boardId: string,
  onClose: Function,
}

type IdeaCreateState = {
  idea: Idea,
  isSaving: boolean,
}

class IdeaCreate extends React.PureComponent<IdeaCreateProps, IdeaCreateState> {
  static defaultProps = {}

  state = {
    idea: new Idea({ boardId: this.props.boardId }),
    isSaving: false,
  }

  onChangeField = (
    fieldName: string,
    isNumeric: boolean,
    event: SyntheticEvent<HTMLInputElement>
  ) => {
    const value = isNumeric
      ? parseInt(event.currentTarget.value, 10)
      : event.currentTarget.value
    const idea = new Idea({
      ...this.state.idea,
      [fieldName]: value,
    })
    this.setState({ idea })
  }

  onSave = () => {
    this.setState({ isSaving: true })
    IdeasFacade.createIdea(this.state.idea).then(this.props.onClose)
  }

  render() {
    const { name, description, ease, confidence, impact } = this.state.idea

    return (
      <Dimmer active={true} onClickOutside={this.props.onClose}>
        <div className="IdeaCreate">
          <h2>Add new idea</h2>
          <FormField label="Name of the idea">
            <input
              type="text"
              onChange={this.onChangeField.bind(null, "name", false)}
              autoFocus
              value={name}
            />
          </FormField>
          <FormField label="Description">
            <textarea
              value={description}
              onChange={this.onChangeField.bind(null, "description", false)}
            />
          </FormField>
          <p>Ease:</p>
          <input
            type="range"
            min={0}
            max={10}
            value={ease}
            onChange={this.onChangeField.bind(null, "ease", true)}
          />{" "}
          {ease}
          {SCORE_TEXTS.EASE[ease]}
          <p>Confidence:</p>
          <input
            type="range"
            min={0}
            max={10}
            value={confidence}
            onChange={this.onChangeField.bind(null, "confidence", true)}
          />{" "}
          {confidence}
          {SCORE_TEXTS.CONFIDENCE[confidence]}
          <p>Impact:</p>
          <input
            type="range"
            min={0}
            max={10}
            value={impact}
            onChange={this.onChangeField.bind(null, "impact", true)}
          />{" "}
          {impact}
          {SCORE_TEXTS.IMPACT[impact]}
          <p className="IdeaCreate__Score">{this.state.idea.getAverage()}</p>
          <Button onClick={this.props.onClose} secondary>
            Cancel
          </Button>
          <Button
            onClick={this.onSave}
            positive
            labelPosition="right"
            icon="checkmark"
            content="Save"
            loading={this.state.isSaving}
          />
        </div>
      </Dimmer>
    )
  }
}

export { IdeaCreate }
