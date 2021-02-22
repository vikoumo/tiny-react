import mountElement from "./mountElement"
import updateComponent from "./updateComponent"

export default function diffComponent(
  virtualDOM,
  oldComponent,
  oldDOM,
  container
) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    console.log('同一个组件');
    // 同一个组件 做组件更新操作
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  } else {
    // 不是同一个组件 直接将组件内容显示在页面中
    console.log('不是同一个组件');
    mountElement(virtualDOM, container, oldDOM);
  }
}
// 判断是否是同一个组件
function isSameComponent(virtualDOM, oldComponent) {
  // virtualDOM.type 更新后的组件构造函数
  // oldComponent.constructor 未更新前的组件构造函数
  return oldComponent && virtualDOM.type === oldComponent.constructor
}
