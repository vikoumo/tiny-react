import mountNativeElement from "./mountNativeElement";
import isNativeElement from "./isNativeElement";
import mountComponent from "./mountComponent";

export default function mountElement(virtualDOM, container) {
  if (isNativeElement(virtualDOM)) {
    // NativeElement
    mountNativeElement(virtualDOM, container);
  } else {
    // Component
    mountComponent(virtualDOM, container);
  }
}
