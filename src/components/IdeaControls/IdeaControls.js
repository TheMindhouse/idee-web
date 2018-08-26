// @flow
import * as React from "react"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"
import { Confirm, Dropdown } from "semantic-ui-react"

const VIEWS = {
  DEFAULT: "default",
  IDEA_REMOVE: "ideaRemove",
}

type IdeaControlsProps = {
  onEdit: Function,
  onDelete: Function,
}

type IdeaControlsState = {
  currentView: string,
}

class IdeaControls extends React.PureComponent<
  IdeaControlsProps,
  IdeaControlsState
> {
  static defaultProps = {}

  state = {
    currentView: VIEWS.DEFAULT,
  }

  showDefaultView = () => this.setState({ currentView: VIEWS.DEFAULT })

  showDeleteView = () => this.setState({ currentView: VIEWS.IDEA_REMOVE })

  render() {
    const { currentView } = this.state
    return (
      <div>
        <Dropdown
          direction="left"
          icon={<Element icon={ELEMENTS.options} size={ELEMENTS_SIZE.small} />}
        >
          <Dropdown.Menu>
            <Dropdown.Item text="Edit idea" onClick={this.props.onEdit} />
            <Dropdown.Item text="Delete idea" onClick={this.showDeleteView} />
          </Dropdown.Menu>
        </Dropdown>

        <Confirm
          open={currentView === VIEWS.IDEA_REMOVE}
          size="tiny"
          header={`Delete idea?`}
          content="This operation is irreversible. This idea will be permanently deleted."
          confirmButton="Delete idea"
          onCancel={this.showDefaultView}
          onConfirm={this.props.onDelete}
        />
      </div>
    )
  }
}

export { IdeaControls }
