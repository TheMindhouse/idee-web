// @flow
import * as React from "react"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"
import { Dropdown } from "semantic-ui-react"
import { IdeasListControlsShare } from "./IdeasListControlsShare"
import "./styles/IdeasListControls.css"
import { SORT_METHODS } from "./IdeasListDefaultView"

type IdeasListControlsProps = {
  sortBy: string,
  sortDesc: boolean,
  changeSortMethod: Function,
  changeSortDirection: Function,
}

class IdeasListControls extends React.PureComponent<IdeasListControlsProps> {
  static defaultProps = {}

  render() {
    const {
      sortBy,
      sortDesc,
      changeSortMethod,
      changeSortDirection,
    } = this.props
    return (
      <div className="IdeasListControls">
        <div className="IdeasListControls__Share">
          <IdeasListControlsShare />
        </div>
        <div className="IdeasListControls__Sort">
          <Dropdown
            placeholder="Sort by"
            selection
            className="IdeasListControls__SortDropdown"
            icon={<Element icon={ELEMENTS.arrow} size={ELEMENTS_SIZE.tiny} />}
            value={sortBy}
            onChange={changeSortMethod}
            options={Object.keys(SORT_METHODS).map((method) => ({
              text: SORT_METHODS[method],
              value: SORT_METHODS[method],
            }))}
          />
          <div
            onClick={changeSortDirection}
            className={`IdeasListControls__SortDirection ${
              sortDesc
                ? "IdeasListControls__SortDirection--desc"
                : "IdeasListControls__SortDirection--asc"
            }`}
          >
            <Element icon={ELEMENTS.sort} size={ELEMENTS_SIZE.small} />
          </div>
        </div>
      </div>
    )
  }
}

export { IdeasListControls }
