// @flow
import * as React from "react"

type DelayRenderProps = {
  time: number,
  children: ?React.Node,
}

type DelayRenderState = {
  waiting: boolean,
}

class DelayRender extends React.PureComponent<
  DelayRenderProps,
  DelayRenderState
> {
  static defaultProps = {
    time: 250,
  }

  timer: TimeoutID

  state = {
    waiting: true,
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        waiting: false,
      })
    }, this.props.time)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    return this.state.waiting ? null : this.props.children
  }
}

export { DelayRender }
