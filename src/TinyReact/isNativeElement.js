export default function isNativeElement (virtualDOM) {
  // class 和 function 组件的type是个 function
  return virtualDOM && typeof virtualDOM.type !== "function";
}
