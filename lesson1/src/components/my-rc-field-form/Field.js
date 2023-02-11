import React, {Component} from "react";
import FieldContext from "./FieldContext";

// Context
// 1. createContext
// 2. Provider
// 3. 消费
export default class Field extends Component {
  static contextType = FieldContext;

  // 订阅组件实例，记录到formStore中
  componentDidMount() {
    this.unregisterFieldEntity = this.context.registerFieldEntity(this);
  }

  componentWillUnmount() {
    this.unregisterFieldEntity();
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const {name} = this.props;
    return {
      // get
      value: this.context.getFieldValue(name),

      // set
      onChange: (e) => {
        const newValue = e.target.value;
        this.context.setFieldsValue({[name]: newValue});
      },
    };
  };
  render() {
    const returnChildNode = React.cloneElement(
      this.props.children,
      this.getControlled()
    );
    return returnChildNode;
  }
}
