// @flow
import * as React from "react"
import "./styles/IdeaViewTotalScore.css"

type IdeaViewTotalScoreProps = {
  value: number,
}

const IdeaViewTotalScore = (props: IdeaViewTotalScoreProps) => {
  return (
    <div className="IdeaViewTotalScore">
      <span className="IdeaViewTotalScore__Caption">
        <b>total score</b>
      </span>
      <span className="IdeaViewTotalScore__Value">{props.value}</span>
    </div>
  )
}

IdeaViewTotalScore.defaultProps = {}

export { IdeaViewTotalScore }
