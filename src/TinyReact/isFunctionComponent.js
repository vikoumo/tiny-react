export default function isFunctionComponent (virtualDOM) {
  const type = virtualDOM.type;
  return type && type.prototype && !type.prototype.render;
}
