import mountElement from "./mountElement"
import updateElementAttribute from "./updateElementAttribute"

export default function createDOMElement(virtualDOM) {
  let newElement = null;
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type);
    // 给元素添加属性
    updateElementAttribute(newElement, virtualDOM);
  }
  // 在真实的dom上添加_virtualDOM属性存储对应的virtualDOM
  newElement._virtualDOM = virtualDOM;
  // 递归创建子节点
  virtualDOM.children.forEach(child => {
    mountElement(child, newElement);
  });

  return newElement
}
