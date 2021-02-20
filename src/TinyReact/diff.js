import mountElement from "./mountElement";
import updateTextNode from "./updateTextNode";
import updateElementAttribute from "./updateElementAttribute";
import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode";

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container);
  } else if (
    // 如果要比对的两个节点类型不相同
    virtualDOM.type !== oldVirtualDOM.type &&
    // 并且节点的类型不是组件 因为组件要单独处理
    typeof virtualDOM.type !== "function"
  ) {
    // 不需要对比
    // 使用新的 virtualDOM 对象生成真实 DOM 对象
    const newElement = createDOMElement(virtualDOM);
    // 使用新的 DOM 对象替换旧的 DOM 对象
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  } else if (typeof virtualDOM.type === "function") {
    // 组件对比
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // 类型相同
    if (virtualDOM.type === "text") {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 更新元素节点属性
      updateElementAttribute(oldDOM, virtualDOM, oldVirtualDOM);
    }
    // 对比子节点
    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i]);
    });

    // 删除旧的节点
    let oldChildNodes = oldDOM.childNodes;
    // 判断旧节点的数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      for (
        let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i])
      }
    }
  }
}