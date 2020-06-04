import React, { Component, ChangeEvent } from 'react'

interface IProps { onRangeChange: (value: number) => void }
interface IState { value: number }

export default class InputRange extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = { value: 0 }
  }

  onRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e
    const { onRangeChange } = this.props
    this.setState({value: parseInt(value)}, () => onRangeChange(parseInt(value)))
  }

  render() {
    const { value } = this.state
    return (<input className="range" onChange={this.onRangeChange} type="range" min="0" max="100" value={value} />)
  }
}
