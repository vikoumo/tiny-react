import isFunctionComponent from "./isFunctionComponent"
import mountNativeElement from "./mountNativeElement"
import isNativeElement from "./isNativeElement"
import mountElement from "./mountElement"

export default function mountComponent(virtualDOM, container) {
  let nextVirtualDOM = null;
  // 判断组件是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    // 通过 Virtual DOM 中的 type 属性获取到组件函数并调用
    // 调用组件函数时将 Virtual DOM 对象中的 props属性传递给组件函数 这样在组件中就可以通过props属性获取数据
    nextVirtualDOM = virtualDOM.type(virtualDOM.props || {});
    
  } else {
    // 类组件
    // 实例化类组件 得到类组件实例对象 并将 props 属性传递进类组件
    const instance = new virtualDOM.type(virtualDOM.props || {});
    // 调用类组件中的render方法得到要渲染的 Virtual DOM
    nextVirtualDOM = instance.render();
  }
  mountElement(nextVirtualDOM, container);
}
