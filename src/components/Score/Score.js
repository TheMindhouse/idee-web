// @flow
import * as React from "react"
import "./styles/Score.css"

type ScoreProps = {
  value: number,
  className?: string,
}

const MAX_VALUE = 10

const Score = (props: ScoreProps) => {
  return (
    <div className={`Score ${props.className ? props.className : ""}`}>
      <div
        className="Score__Value"
        style={{ width: `${(props.value / MAX_VALUE) * 100}%` }}
      />
    </div>
  )
}

export { Score }
