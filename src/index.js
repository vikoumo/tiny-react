import TinyReact from "./TinyReact";
// import React from "React"

const Heart = (props) => <div>{props.title}&hearts;<Demo /></div>
const Demo = () => <span>demo</span>
class Alert extends TinyReact.Component {
  constructor(props) {
    // 子类需要通过 super 方法将自身的 props 属性传递给 Component父类，
    // 父类会将 props 属性挂载为父类属性，子类继承了父类，自己本身也就自然拥有props属性
    // 这样做的好处是当 props 发生更新后，父类可以根据更新后的 props 帮助子类更新视图
    super(props);
    this.state = {
      title: "default title"
    }
    // 更改 handleChange 方法中的 this 指向 让 this 指向类实例对象
    this.hanleClick = this.hanleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate(prevProps, preState) {
    console.log('componentDidUpdate', prevProps, preState);
  }

  hanleClick () {
    this.setState({title: "change title"})
  }

  render() {
    return (<div>
      classComponent:
      {this.props.name}
      {this.props.age}
      <div>
        {this.state.title}
        <button onClick = {this.hanleClick}>改变title</button>
      </div>
    </div>)
  }
}

class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.hanleClick = this.hanleClick.bind(this);
  }
  hanleClick() {
    console.log(this.input.value);
    console.log(this.heart);
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  // ref的作用 -> 获取子组件的实例或者Dom对象
  // 传统的react中，只有类组件可以创建实例，函数组件不能创建实例
  // 所以只有类组件和原生组件可以用ref
  render() {
    return (<div>
      <input type="text" ref={input => this.input = input} />
      <Alert name="ref" age="ref" ref={heart => this.heart = heart} />
      <button onClick={this.hanleClick}>获取输入框值</button>
    </div>)
  }
}

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type="text" value="13" />
    {/* 函数组件 */}
    <Heart title="hello"/>
    {/* 类组件 */}
    <Alert name="cc" age="20" />
    <DemoRef />
  </div>
)
// console.log('virtualDOM', virtualDOM);


const modifyDOM = (
  <div className="container">
    <h1>你好 Tiny React1111</h1>
    <h2 data-test="test123">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <h5>这是一段修改后的内容</h5>
    <button onClick={() => alert("你好!!!!!")}>点击我</button>
    <input type="text" value="130" />
    <Alert name="jade" age="30" />
  </div>
)
const root = document.getElementById('root');
// TinyReact.render(virtualDOM, root);
// setTimeout(() => {
//   TinyReact.render(modifyDOM, root)//有问题
// }, 2000)

class KeyDemo extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          id: 1,
          name: "张三"
        },
        {
          id: 2,
          name: "李四"
        },
        {
          id: 3,
          name: "王五"
        },
        {
          id: 4,
          name: "赵六"
        }
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    const newState = JSON.parse(JSON.stringify(this.state))
    // newState.persons.push(newState.persons.shift())
    // newState.persons.splice(1, 0, { id: 100, name: "李逵" })
    newState.persons.pop()
    this.setState(newState)
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map(person => (
            <div key={person.id}>
              {person.name}
              <DemoRef />
            </div>
          ))}
        </ul>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    )
  }
}

TinyReact.render(<KeyDemo />, root)

