export default function isFunctionComponent (virtualDOM) {
  // Virtual DOM 是函数型组件
  // 1. Virtual DOM 的 type 属性值为函数
  // 2. 函数的原型对象中不能有render方法（只有类组件的原型对象中有render方法）
  const type = virtualDOM.type;
  return type && type.prototype && !type.prototype.render;
}
