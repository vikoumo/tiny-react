export default function updateElementAttribute(newElement, virtualDOM, oldVirtualDOM = {}) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props || {};
  const oldProps = oldVirtualDOM.props || {};
  Object.keys(newProps).forEach(propName => {
    if (propName === 'children') {
      return;
    }
    // 获取属性值
    const newPropValue = newProps[propName];
    const oldPropValue = oldProps[propName];
    if (newPropValue !== oldPropValue) {
      // 判断属性是否是否事件属性 onClick -> click
      if (propName.slice(0, 2) === 'on') {
        // 事件名称
        const eventName = propName.slice(2).toLowerCase();
        // 为元素添加事件
        newElement.addEventListener(eventName, newPropValue);
        // 删除原有的事件的事件处理函数
        if(oldPropValue) {
          newElement.removeEventListener(eventName, oldPropValue);
        }
      } else if (propName === 'value' || propName === 'checked') {
        // 单独考虑value和checked，因为这两个属性不能被setAttribute设置
        newElement[propName] = newPropValue;
      } else if (propName === 'className') {
        newElement.setAttribute('class', newPropValue);
      } else {
        newElement.setAttribute(propName, newPropValue);
      }
    }
  });

  // 判断属性被删除的情况
  Object.keys(oldProps).forEach(propName => {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (!newPropsValue) {
      // 属性被删除了
      if (propName.slice(0, 2) === "on") {
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropsValue)
      } else if (propName !== "children") {
        newElement.removeAttribute(propName)
      }
    }
  })
}