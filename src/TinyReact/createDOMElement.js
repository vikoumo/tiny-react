import mountElement from "./mountElement";
import updateElementAttribute from "./updateElementAttribute";

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
  // 将 Virtual DOM 挂载到真实 DOM 对象的属性中 方便在对比时获取其 Virtual DOM
  newElement._virtualDOM = virtualDOM;
  // 递归创建子节点
  virtualDOM.children.forEach(child => {
    mountElement(child, newElement);
  });

  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement)
  }

  return newElement;
}
