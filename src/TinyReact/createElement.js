/**
 * 创建 Virtual DOM 
 * @param {string} type 类型 
 * @param {object | null} props 属性
 * @param {createElement[]} children 子元素
 * @return {object} Virtual DOM
 */
export default function createElement(type, props, ...children) {
  const childElement = children.reduce((arr, child) => {
    if (typeof child !== 'boolean' && child !== null) {
      child instanceof Object ? arr.push(child) : arr.push(createElement('text', {textContent: child}))
    }
    return arr;
  }, [])
  return {
    type,
    props: Object.assign({children: childElement}, props),
    children: childElement,
  }
}