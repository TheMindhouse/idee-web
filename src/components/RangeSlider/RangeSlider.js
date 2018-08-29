// @flow
import * as React from "react"
import "./styles/RangeSlider.css"

type RangeSliderProps = {
  value: number,
  min: number,
  max: number,
  onChange: Function,
}

type RangeSliderState = {
  currentValue: number,
  isSliding: boolean,
}

// Multiplier is used to increase the number of steps to smoothen up the sliding effect
const MULTIPLIER = 10

class RangeSlider extends React.PureComponent<
  RangeSliderProps,
  RangeSliderState
> {
  static defaultProps = {
    value: 0,
    min: 0,
    max: 10,
  }

  state = {
    currentValue: this.props.value * MULTIPLIER,
    isSliding: false,
  }

  onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ currentValue: parseInt(event.currentTarget.value, 10) })
    const updatedEvent = { ...event }
    updatedEvent.currentTarget.value = String(
      parseInt(updatedEvent.currentTarget.value, 10) / MULTIPLIER
    )
    this.props.onChange(updatedEvent)
  }

  onMouseUp = () => {
    const currentValue = this.convertMultipliedValue(this.state.currentValue)
    this.setState({ isSliding: false, currentValue })
  }

  convertMultipliedValue = (value: number): number =>
    Math.round(value / MULTIPLIER) * MULTIPLIER

  render() {
    const { min } = this.props
    const { currentValue, isSliding } = this.state
    const max = this.props.max * MULTIPLIER
    return (
      <div className={`RangeSlider ${isSliding ? "RangeSlider--sliding" : ""}`}>
        <input
          type="range"
          min={min}
          max={max}
          value={currentValue}
          onChange={this.onChange}
          className="RangeSlider__Input"
          onMouseDown={() => this.setState({ isSliding: true })}
          onMouseUp={this.onMouseUp}
        />
        <div className="RangeSlider__ValueText">
          <span>{Math.round(currentValue / MULTIPLIER)}</span>
        </div>
        <div className="RangeSlider__Value RangeSlider__Value--Default" />
        <div className="RangeSlider__Value RangeSlider__Value--Sliding" />
        <div
          className="RangeSlider__Background"
          style={{
            width: 100 - ((currentValue - min) * 100) / (max - min) + "%",
          }}
        />
      </div>
    )
  }
}

export { RangeSlider }
