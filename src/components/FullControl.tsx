import React, { PureComponent } from 'react';
import InputRange from './InputRange';

interface IProps {
  onRangeChange: (
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
  ) => void;
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
}

export default class FullControl extends PureComponent<IProps> {
  render() {
    const {
      width,
      height,
      onRangeChange,
      left,
      leftOp,
      top,
      topOp,
      right,
      rightOp,
      bottom,
      bottomOp,
    } = this.props;
    return (
      <div className="box-container">
        <div style={{ width, height }} className="box">
          <div className="left" style={{ width: height }}>
            <InputRange
              value={left}
              onRangeChange={(value) => onRangeChange('left', value)}
            />
          </div>
          <div className="left op" style={{ width: height }}>
            <InputRange
              value={leftOp}
              onRangeChange={(value) => onRangeChange('leftOp', value)}
            />
          </div>
          <div className="top" style={{ width }}>
            <InputRange
              value={top}
              onRangeChange={(value) => onRangeChange('top', value)}
            />
          </div>
          <div className="top op" style={{ width }}>
            <InputRange
              value={topOp}
              onRangeChange={(value) => onRangeChange('topOp', value)}
            />
          </div>
          <div className="right" style={{ width: height }}>
            <InputRange
              value={right}
              onRangeChange={(value) => onRangeChange('right', value)}
            />
          </div>
          <div className="right op" style={{ width: height }}>
            <InputRange
              value={rightOp}
              onRangeChange={(value) => onRangeChange('rightOp', value)}
            />
          </div>
          <div className="bottom" style={{ width }}>
            <InputRange
              value={bottom}
              onRangeChange={(value) => onRangeChange('bottom', value)}
            />
          </div>
          <div className="bottom op" style={{ width }}>
            <InputRange
              value={bottomOp}
              onRangeChange={(value) => onRangeChange('bottomOp', value)}
            />
          </div>
          <div
            className="inner-box"
            style={{
              borderRadius: `${topOp}% ${top}% ${bottomOp}% ${bottom}% / ${left}% ${rightOp}% ${right}% ${leftOp}%`,
            }}
          />
        </div>
      </div>
    );
  }
}
