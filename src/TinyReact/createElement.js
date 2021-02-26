/**
 * 创建 Virtual DOM 
 * @param {string} type 类型 
 * @param {object | null} props 属性
 * @param {createElement[]} children 子元素
 * @return {object} Virtual DOM
 */
export default function createElement(type, props, ...children) {
  const childElements = [].concat(...children).reduce((result, child) => {
    if (typeof child !== 'boolean' && child !== null) {
      if (child instanceof Object) {
        result.push(child)
      } else {
        result.push(createElement("text", { textContent: child }))
      }
    }
    return result
  }, [])
  return {
    type,
    props: Object.assign({children: childElements}, props),
    children: childElements,
  }
}