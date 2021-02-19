import createDOMElement from "./createDOMElement";

export default function mountNativeElement(virtualDOM, container) {
  let newElement = createDOMElement(virtualDOM);
  // 将转换之后的DOM对象放到页面中
  container.appendChild(newElement);
}
