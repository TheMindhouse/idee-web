// @flow
import * as React from "react"
import { Idea } from "../../models/Idea"
import { IdeasFacade } from "../../facades/IdeasFacade"

type IdeaCreateProps = {
  boardId: string,
}

type IdeaCreateState = {
  idea: Idea,
}

class IdeaCreate extends React.PureComponent<IdeaCreateProps, IdeaCreateState> {
  static defaultProps = {}

  state = {
    idea: new Idea({ boardId: this.props.boardId }),
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
    IdeasFacade.createIdea(this.state.idea).then(() =>
      this.setState({ idea: new Idea({ boardId: this.props.boardId }) })
    )
  }

  render() {
    const { name, description, ease, confidence, impact } = this.state.idea

    return (
      <div>
        <h2>Add new idea</h2>
        <p>Name:</p>
        <input
          value={name}
          onChange={this.onChangeField.bind(null, "name", false)}
        />{" "}
        {name}
        <p>Description:</p>
        <textarea
          value={description}
          onChange={this.onChangeField.bind(null, "description", false)}
        />{" "}
        {description}
        <p>Ease:</p>
        <input
          type="range"
          min={0}
          max={10}
          value={ease}
          onChange={this.onChangeField.bind(null, "ease", true)}
        />{" "}
        {ease}
        <p>Confidence:</p>
        <input
          type="range"
          min={0}
          max={10}
          value={confidence}
          onChange={this.onChangeField.bind(null, "confidence", true)}
        />{" "}
        {confidence}
        <p>Impact:</p>
        <input
          type="range"
          min={0}
          max={10}
          value={impact}
          onChange={this.onChangeField.bind(null, "impact", true)}
        />{" "}
        {impact}
        <h3>{this.state.idea.getAverage()}</h3>
        <button onClick={this.onSave}>Save</button>
      </div>
    )
  }
}

export { IdeaCreate }
