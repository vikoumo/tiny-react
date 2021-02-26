import mountElement from "./mountElement";
import updateTextNode from "./updateTextNode";
import updateElementAttribute from "./updateElementAttribute";
import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode";
import diffComponent from "./diffComponent";

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
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
    // 1) 组件本身的 virtualDOM 对象 通过它可以获取到组件最新的 props
    // 2) 要更新的组件的实例对象 通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可 以获取到组件返回的最新的 Virtual DOM
    // 3) 要更新的 DOM 象 在更新组件时 需要在已有DOM对象的身上进行修改 实现DOM最小化操作 获取 旧的 Virtual DOM 对象
    // 4) 如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中 此时需要 container 做为父级容器
    diffComponent(virtualDOM, oldComponent, oldDOM, container);
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // 类型相同
    if (virtualDOM.type === "text") {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 更新元素节点属性
      updateElementAttribute(oldDOM, virtualDOM, oldVirtualDOM);
    }

    // key 属性不需要全局唯一，但是在同一个父节点下的兄弟节点之间必须是唯一的
    // 也就是说，在比对同一个父节点下类型相同的子节点时需要用到 key 属性
    // 1. 将拥有key属性的子元素放置在一个单独的对象中
    let keyedElements = {};
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      let domElement = oldDOM.childNodes[i];
      if (domElement.nodeType === 1) {
        let key = domElement.getAttribute("key");
        if (key) {
          keyedElements[key] = domElement;
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0;
    
    // 2. 循环 virtualDOM 的子元素 获取子元素的 key 属性
    virtualDOM.children.forEach((child, i) => {
      if (hasNoKey) {
        // 对比子节点
        diff(child, oldDOM, oldDOM.childNodes[i]);
      } else {
        let key = child.props.key;
        if (key) {
          let domElement = keyedElements[key];
          if (domElement) {
            // 3. 看看当前位置的元素是不是我们期望的元素
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i]);
            }
          } else {
            // 新增元素
            // mountElement这个方法虽然会把child渲染到oldDOM.childNodes[i]前面
            // 但是会把oldDOM.childNodes[i]删除
            // 然后下一步进入domElement是true，
            // 然后把删除的oldDOM.childNodes[i] insert回来
            mountElement(child, oldDOM, oldDOM.childNodes[i]);
          }
        }
      }
    })

    // 删除旧的节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes;
    // 判断旧节点的数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasNoKey) {
        // 有节点需要被删除
        for (
          let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
          unmountNode(oldChildNodes[i]);
        }
      } else {
        // 通过key属性删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i];
          let oldChildKey = oldChild._virtualDOM.props.key;
          let found = false;
          for (let n = 0; n < virtualDOM.children.length; n++) {
            if (oldChildKey === virtualDOM.children[n].props.key) {
              found = true;
              break;
            }
          }
          if (!found) {
            unmountNode(oldChild);
          }
        }
      }
    }
  }
}