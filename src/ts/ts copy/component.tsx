import * as React from "react";

interface Props {}

interface State {
  count: number;
}

export default class Counter extends React.Component<Props, State> {
  state: State = {
    count: 0,
  };

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  render() {
    return (
      <div>
        <button className="nested-1" onClick={this.increment}>
          Increment
        </button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}
