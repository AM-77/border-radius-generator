import React, { Component } from 'react'
import HalfControl from './components/HalfControl'
import Controllers from './components/Controllers'

interface IState {
  width: number
  height: number
  left: number
  leftOp: number
  top: number
  topOp: number
  right: number
  rightOp: number
  bottom: number
  bottomOp: number
}

export default class App extends Component <unknown, IState> {

  constructor (props: unknown) {
    super(props)
    this.state = { 
      width: 200,
      height: 200,
      left: 0,
      leftOp: 100,
      top: 0,
      topOp: 100,
      right: 0,
      rightOp: 100,
      bottom: 0,
      bottomOp: 100
    }
  }

  onDimensionChange = (value: number , prop: string) => {
    this.setState((state) => ({...state, [prop]: value}))
  }

  onHalfControlRangeChange = (border: 'left' | 'top' | 'right' | 'bottom' , value: number) => {
    this.setState((state) => ({ ...state, [border]: value, [border + "Op"] : 100 - value  }))
  }

  onFullControlRangeChange = (border: 'left' | 'top' | 'right' | 'bottom' | 'leftOp' | 'topOp' | 'rightOp' | 'bottomOp' , value: number) => {
    this.setState((state) => ({ ...state, [border]: value }))
  }

  render() {
    const { width, height, left, leftOp, top, topOp, right, rightOp, bottom, bottomOp } = this.state

    return ( 
      <div className="container">
        <HalfControl 
          onRangeChange={this.onHalfControlRangeChange}
          width={width} 
          height={height}
          left={left}
          leftOp={leftOp}
          top={top}
          topOp={topOp}
          right={right}
          rightOp={rightOp}
          bottom={bottom}
          bottomOp={bottomOp} />

        <Controllers 
          onDimensionChange={this.onDimensionChange} 
          width={width} 
          height={height}
          left={left}
          leftOp={leftOp}
          top={top}
          topOp={topOp}
          right={right}
          rightOp={rightOp}
          bottom={bottom}
          bottomOp={bottomOp}
          /> 
      </div>
    )
  }
}
