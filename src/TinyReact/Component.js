import diff from "./diff";
export default class Component {
  constructor(props) {
    this.props = props;
  }
  // setState 方法被子类调用 此处this指向子类实例对象
  // 所以改变的是子类的 state 对象
  setState(state) {
    this.state = Object.assign({}, this.state, state);
    // 获取最新的要渲染的 virtualDOM 对象
    let virtualDOM = this.render();
    // 获取旧的 virtualDOM 对象 进行比对
    let oldDOM = this.getDOM();
    // 获取容器
    let container = oldDOM.parentNode;
    // 实现对象
    diff(virtualDOM, container, oldDOM);
  }
  setDOM(dom) {
    this._dom = dom;
  }
  getDOM() {
    return this._dom;
  }
  updateProps(props) {
    this.props = props;
  }

  // 生命周期函数
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state;
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, preState) {}
  componentWillUnmount() {}
}