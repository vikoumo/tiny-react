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
  }
  render() {
    return <div>classComponent{this.props.name}{this.props.age}</div>
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
  </div>
)
console.log('virtualDOM', virtualDOM);


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
  </div>
)
const root = document.getElementById('root');
TinyReact.render(virtualDOM, root);
setTimeout(() => {
  TinyReact.render(modifyDOM, root)
}, 2000)

