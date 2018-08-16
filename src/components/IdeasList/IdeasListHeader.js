// @flow
import * as React from "react"
import { Element, ELEMENTS, ELEMENTS_SIZE } from "../Element/Element"
import { Dropdown } from "semantic-ui-react"
import { SORT_METHODS } from "./IdeasList"
import "./styles/IdeasListHeader.css"
import { IdeasListHeaderShare } from "./IdeasListHeaderShare"

type IdeasListHeaderProps = {
  sortBy: string,
  sortDesc: boolean,
  changeSortMethod: Function,
  changeSortDirection: Function,
}

class IdeasListHeader extends React.PureComponent<IdeasListHeaderProps> {
  static defaultProps = {}

  render() {
    const {
      sortBy,
      sortDesc,
      changeSortMethod,
      changeSortDirection,
    } = this.props
    return (
      <div className="IdeasListHeader">
        <div className="IdeasListHeader__Share">
          <IdeasListHeaderShare />
        </div>
        <div className="IdeasListHeader__Sort">
          <Dropdown
            placeholder="Sort by"
            selection
            value={sortBy}
            onChange={changeSortMethod}
            options={Object.keys(SORT_METHODS).map((method) => ({
              text: SORT_METHODS[method],
              value: SORT_METHODS[method],
            }))}
          />
          <div
            onClick={changeSortDirection}
            className={`IdeasListHeader__SortDirection ${
              sortDesc
                ? "IdeasListHeader__SortDirection--desc"
                : "IdeasListHeader__SortDirection--asc"
            }`}
          >
            <Element icon={ELEMENTS.sort} size={ELEMENTS_SIZE.small} />
          </div>
        </div>
      </div>
    )
  }
}

export { IdeasListHeader }
