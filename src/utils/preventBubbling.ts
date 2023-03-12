export default function preventBubbling(e: React.MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
