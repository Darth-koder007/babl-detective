import * as React from "./node_modules/react";

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
        <button className="vijay" onClick={this.increment}>
          Increment
        </button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}
