import React, { Component } from 'react';

import HalfControl from './components/HalfControl';
import FullControl from './components/FullControl';
import Controllers from './components/Controllers';
import Footer from './components/Footer';

import bgImage from './assets/hero-bg.svg';

interface IState {
  width: number;
  height: number;
  left: number;
  leftOp: number;
  top: number;
  topOp: number;
  right: number;
  rightOp: number;
  bottom: number;
  bottomOp: number;
  isHalf: boolean;
}

export default class App extends Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      width: 300,
      height: 300,
      left: 71,
      leftOp: 29,
      top: 34,
      topOp: 66,
      right: 38,
      rightOp: 62,
      bottom: 66,
      bottomOp: 34,
      isHalf: true,
    };
  }

  onDimensionChange = (value: number, prop: string) => {
    this.setState((state) => ({ ...state, [prop]: value }));
  };

  onControlRangeChange = (isHalf: boolean) => {
    this.setState({ isHalf });
  };

  onHalfControlRangeChange = (
    border: 'left' | 'top' | 'right' | 'bottom',
    value: number,
  ) => {
    this.setState((state) => ({
      ...state,
      [border]: value,
      [`${border}Op`]: 100 - value,
    }));
  };

  onFullControlRangeChange = (
    border:
      | 'left'
      | 'top'
      | 'right'
      | 'bottom'
      | 'leftOp'
      | 'topOp'
      | 'rightOp'
      | 'bottomOp',
    value: number,
  ) => {
    this.setState((state) => ({ ...state, [border]: value }));
  };

  render() {
    const {
      width,
      height,
      left,
      leftOp,
      top,
      topOp,
      right,
      rightOp,
      bottom,
      bottomOp,
      isHalf,
    } = this.state;

    return (
      <>
        <div className="under-container">
          <div className="left">
            <img src={bgImage} alt="left background" />
          </div>
          <div className="right">
            <img src={bgImage} alt="right background" />
          </div>
        </div>
        <div className="container">
          <div className="header">
            <div className="desc">
              <h1>border radius generator</h1>
              <p>A visaul tool to generate a custom border radius</p>
            </div>
            <div className="control">
              {isHalf ? (
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
                  bottomOp={bottomOp}
                />
              ) : (
                <FullControl
                  onRangeChange={this.onFullControlRangeChange}
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
              )}
            </div>
          </div>
          <div className="main">
            <Controllers
              onDimensionChange={this.onDimensionChange}
              onControlRangeChange={this.onControlRangeChange}
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
          <Footer />
        </div>
      </>
    );
  }
}
