import {Component} from "react";
// import {connect} from "react-redux";
import {connect} from "../react-redux-nut";
import {bindActionCreators} from "../redux-nut";
import {decrement, increment} from "../store/counterSlice";

export default connect(
  // mapStateToProps
  (state) => {
    return state;
  },
  // mapDispatchToProps  undefined object | function
  // {
  //   increment: () => increment(),
  //   decrement: () => decrement(),
  // }

  (dispatch, ownProps) => {
    let creators = {
      increment: () => increment(),
      decrement: () => decrement(),
    };
    creators = bindActionCreators(creators, dispatch);
    return {dispatch, ...creators};
  }
)(
  class ReactReduxPage extends Component {
    render() {
      const {counter, dispatch} = this.props;

      return (
        <div>
          <h1>ReactReduxPage</h1>
          <p>{counter.value}</p>
          <button onClick={() => dispatch(increment())}>
            dispatch increment
          </button>
          <button onClick={this.props.increment}>increment</button>
          <button onClick={this.props.decrement}>decrement</button>
        </div>
      );
    }
  }
);
