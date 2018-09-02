// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { IdeasFacade } from "../../facades/IdeasFacade"
import { Button, Dimmer } from "semantic-ui-react"
import "./styles/IdeaForm.css"
import { FormField } from "../Forms/FormField"
import { SCORE_TEXTS } from "../../constants/scores"
import { toast } from "react-toastify"
import { RangeSlider } from "../RangeSlider/RangeSlider"
import { IdeaViewTotalScore } from "../IdeaView/IdeaViewTotalScore"

type IdeaFormProps = {
  boardId: string,
  onClose: Function,
  idea?: Idea,
  onUpdate?: (Idea) => void,
}

type IdeaFormState = {
  idea: Idea,
  isSaving: boolean,
  errors: {
    name?: boolean,
  },
}

class IdeaForm extends React.PureComponent<IdeaFormProps, IdeaFormState> {
  static defaultProps = {}

  state = {
    idea: this.props.idea || new Idea({ boardId: this.props.boardId }),
    isSaving: false,
    errors: {},
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

  validate = (): boolean => {
    const { idea } = this.state
    let isValid = true
    const errors = {}
    if (idea.name === "") {
      errors.name = true
      isValid = false
    }
    this.setState({ errors })
    return isValid
  }

  onSave = () => {
    const { idea, isSaving } = this.state
    if (isSaving || !this.validate()) {
      return
    }
    this.setState({ isSaving: true })
    this.isEditMode()
      ? IdeasFacade.updateIdea(idea).then(() => {
          toast.success("Idea successfully updated")
          if (typeof this.props.onUpdate === "function") {
            return this.props.onUpdate(idea)
          }
        })
      : IdeasFacade.createIdea(idea)
          .then(() => {
            toast.success("Idea successfully added")
            return this.props.onClose()
          })
          .catch((error) => toast.error(error.message))
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
            <FormField label="Name of the idea" error={this.state.errors.name}>
              <input
                type="text"
                onChange={this.onChangeField.bind(null, "name", false)}
                autoFocus
                value={name}
              />
              <FormField.FormError message="Enter a name" />
            </FormField>
            <FormField label="Description">
              <textarea
                value={description}
                onChange={this.onChangeField.bind(null, "description", false)}
              />
            </FormField>

            <div className="IdeaFormSlider">
              <div className="IdeaFormSlider__Header">
                <span>
                  <b>ease</b>
                </span>
                <small>{SCORE_TEXTS.EASE[ease]}</small>
              </div>
              <RangeSlider
                value={ease}
                min={0}
                max={10}
                onChange={this.onChangeField.bind(null, "ease", true)}
              />
            </div>

            <div className="IdeaFormSlider">
              <div className="IdeaFormSlider__Header">
                <span>
                  <b>confidence</b>
                </span>
                <small>{SCORE_TEXTS.CONFIDENCE[confidence]}</small>
              </div>
              <RangeSlider
                value={confidence}
                min={0}
                max={10}
                onChange={this.onChangeField.bind(null, "confidence", true)}
              />
            </div>

            <div className="IdeaFormSlider">
              <div className="IdeaFormSlider__Header">
                <span>
                  <b>impact</b>
                </span>
                <small>{SCORE_TEXTS.IMPACT[impact]}</small>
              </div>
              <RangeSlider
                value={impact}
                min={0}
                max={10}
                onChange={this.onChangeField.bind(null, "impact", true)}
              />
            </div>

            <IdeaViewTotalScore value={this.state.idea.getAverage()} />
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
