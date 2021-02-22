import mountNativeElement from "./mountNativeElement";
import isNativeElement from "./isNativeElement";
import mountComponent from "./mountComponent";

export default function mountElement(virtualDOM, container, oldDOM) {
  if (isNativeElement(virtualDOM)) {
    // NativeElement
    mountNativeElement(virtualDOM, container, oldDOM);
  } else {
    // Component
    mountComponent(virtualDOM, container, oldDOM);
  }
}
