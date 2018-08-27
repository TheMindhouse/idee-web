// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { IdeasFacade } from "../../facades/IdeasFacade"
import { Button, Dimmer } from "semantic-ui-react"
import "./styles/IdeaForm.css"
import { FormField } from "../Forms/FormField"
import { SCORE_TEXTS } from "../../constants/scores"
import { toast } from "react-toastify"

type IdeaFormProps = {
  boardId: string,
  onClose: Function,
  idea?: Idea,
  onUpdate?: (Idea) => void,
}

type IdeaFormState = {
  idea: Idea,
  isSaving: boolean,
}

class IdeaForm extends React.PureComponent<IdeaFormProps, IdeaFormState> {
  static defaultProps = {}

  state = {
    idea: this.props.idea || new Idea({ boardId: this.props.boardId }),
    isSaving: false,
  }

  isEditMode = () => this.props.idea instanceof Idea

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
    const { idea } = this.state
    this.setState({ isSaving: true })
    this.isEditMode()
      ? IdeasFacade.updateIdea(idea).then(() => {
          toast.success("Idea successfully updated")
          if (typeof this.props.onUpdate === "function") {
            return this.props.onUpdate(idea)
          }
        })
      : IdeasFacade.createIdea(idea).then(() => {
          toast.success("Idea successfully added")
          return this.props.onClose()
        })
  }

  render() {
    const { name, description, ease, confidence, impact } = this.state.idea

    return (
      <Dimmer active={true} onClickOutside={this.props.onClose}>
        <div className="IdeaForm">
          <div>
            <h2 className="IdeaForm__Header">
              {this.isEditMode() ? "Edit idea" : "Add new idea"}
            </h2>
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
            <p className="IdeaForm__Score">{this.state.idea.getAverage()}</p>
          </div>
          <div>
            <Button onClick={this.props.onClose}>Cancel</Button>
            <Button
              onClick={this.onSave}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Save"
              loading={this.state.isSaving}
            />
          </div>
        </div>
      </Dimmer>
    )
  }
}

export { IdeaForm }
