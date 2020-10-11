import React, { Component } from 'react';
import copy from 'copy-to-clipboard';

import copyIcon from '../assets/copy.svg';
import copiedIcon from '../assets/copied.svg';

interface IProps {
  onDimensionChange: (value: number, prop: string) => void;
  width: number;
  height: number;
  topOp: number;
  top: number;
  bottomOp: number;
  bottom: number;
  left: number;
  rightOp: number;
  right: number;
  leftOp: number;
  onControlRangeChange: (isHalf: boolean) => void;
}

interface IState {
  width: number;
  height: number;
  copied: boolean;
  maxWidth: number;
}

export default class Controllers extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { width, height } = this.props;
    this.state = {
      width,
      height,
      copied: false,
      maxWidth: window.innerWidth - 50,
    };
  }

  componentDidMount() {
    const { width } = this.state;
    const { onDimensionChange } = this.props;
    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth - 50;

      if (width > windowWidth) {
        this.setState(
          { maxWidth: windowWidth, width: windowWidth },
          () => onDimensionChange(windowWidth, 'width'),
        );
      } else {
        this.setState({ maxWidth: windowWidth });
      }
    });
  }

  onDimensionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    prop: string,
  ) => {
    const { onDimensionChange } = this.props;
    const { maxWidth } = this.state;
    let value: number = parseInt(e.target.value, 10);

    if (value) {
      if (prop === 'width' && value > maxWidth) {
        value = maxWidth;
      }
      this.setState(
        (state) => ({ ...state, [prop]: value }),
        () => onDimensionChange(value, prop),
      );
    }
  };

  onControlRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onControlRangeChange } = this.props;
    onControlRangeChange(!e.target.checked);
  };

  onCopy = () => {
    const {
      topOp,
      top,
      bottomOp,
      bottom,
      left,
      rightOp,
      right,
      leftOp,
    } = this.props;
    copy(
      `border-radius: ${topOp}% ${top}% ${bottomOp}% ${bottom}% / ${left}% ${rightOp}% ${right}% ${leftOp}%;`,
    );

    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1200);
    });
  };

  render() {
    const {
      width, height, copied, maxWidth,
    } = this.state;

    const {
      topOp,
      top,
      bottomOp,
      bottom,
      left,
      rightOp,
      right,
      leftOp,
    } = this.props;

    return (
      <div className="controllers-container">
        <div className="dimensions">
          <h2>Dimensions</h2>
          <div className="control">
            <span>Full Control</span>
            <input type="checkbox" onChange={this.onControlRangeChange} />
          </div>
          <div className="dims">
            <div className="dim">
              <p>width: </p>
              <input
                type="number"
                min="0"
                max={maxWidth}
                value={width}
                onChange={(e) => this.onDimensionChange(e, 'width')}
              />
            </div>
            <div className="dim">
              <p>height: </p>
              <input
                type="number"
                min="0"
                value={height}
                onChange={(e) => this.onDimensionChange(e, 'height')}
              />
            </div>
          </div>
        </div>
        <h2>Result</h2>
        <div className="border-radius">
          <p>
            <span className="prop">border-radius: </span>
            <span className="value">{`${topOp}% ${top}% ${bottomOp}% ${bottom}% / ${left}% ${rightOp}% ${right}% ${leftOp}%;`}</span>
          </p>
          <div className="copy">
            <button type="button" onClick={this.onCopy}>
              {copied ? (
                <img src={copiedIcon} alt="copied to clipboard" />
              ) : (
                <img src={copyIcon} alt="copy to clipboard" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
