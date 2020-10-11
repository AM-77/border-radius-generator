import React, { Component } from 'react';

interface IProps {
  onRangeChange: (value: number) => void;
  value: number;
}
interface IState {
  value: number;
}

export default class InputRange extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { value } = this.props;
    this.state = { value };
  }

  onRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onRangeChange } = this.props;
    const {
      target: { value },
    } = e;
    const parsedValue = parseInt(value, 10);
    this.setState({ value: parsedValue }, () => {
      onRangeChange(parsedValue);
    });
  };

  render() {
    const { value } = this.state;
    return (
      <input
        className="range"
        onChange={this.onRangeChange}
        type="range"
        min="0"
        max="100"
        value={value}
      />
    );
  }
}
