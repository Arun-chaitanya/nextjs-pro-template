import NextImage, { ImageProps } from "next/legacy/image";

const Image: React.FC<ImageProps> = (props) =>
  props.src ? <NextImage unoptimized data-testid="image" {...props} /> : null;

export default Image;
