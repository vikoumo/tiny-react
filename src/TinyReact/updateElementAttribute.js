export default function updateElementAttribute(newElement, virtualDOM) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props || {};
  // const oldProps = oldVirtualDOM.props || {};
  Object.keys(newProps).forEach(propName => {
    if (propName === 'children') {
      return;
    }
    // 获取属性值
    const propValue = newProps[propName];
    // const oldPropValue = oldProps[propName];
    // if (newPropValue !== oldPropValue) {
      // 判断属性是否是否事件属性 onClick -> click
      if (propName.slice(0, 2) === 'on') {
        // 事件名称
        const eventName = propName.slice(2).toLowerCase();
        // 为元素添加事件
        newElement.addEventListener(eventName, propValue);
      } else if (propName === 'value' || propName === 'checked') {
        // 单独考虑value和checked，因为这两个属性不能被setAttribute设置
        newElement[propName] = propValue;
      } else if (propName === 'className') {
        newElement.setAttribute('class', propValue);
      } else {
        newElement.setAttribute(propName, propValue);
      }
    // }
    
  });
}