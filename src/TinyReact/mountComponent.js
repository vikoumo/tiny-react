import isFunctionComponent from "./isFunctionComponent"
import mountNativeElement from "./mountNativeElement"
import isNativeElement from "./isNativeElement"
import mountElement from "./mountElement"

export default function mountComponent(virtualDOM, container) {
  let nextVirtualDOM = null;
  // 判断组件是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    nextVirtualDOM = virtualDOM.type(virtualDOM.props || {});
    
  } else {
    // 类组件
    // 实例化类组件 得到类组件实例对象 并将 props 属性传递进类组件
    const instance = new virtualDOM.type(virtualDOM.props || {});
    nextVirtualDOM = instance.render();
  }
  mountElement(nextVirtualDOM, container);
}
