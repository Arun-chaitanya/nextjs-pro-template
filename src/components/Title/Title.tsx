import clsx from "clsx";

import styles from "./Title.module.scss";

const Title: React.FC<TitleProps> = (props) => {
  const { variant, className, children, isUppercase, align, color, style, customStyles, font, ...restProps } = props;

  const Heading = variant as keyof JSX.IntrinsicElements;
  return (
    <Heading
      className={clsx(
        styles.root,
        isUppercase && styles.uppercase,
        font && styles[font],
        align && styles[align],
        style && styles[style],
        color && styles[color],
        className
      )}
      style={customStyles}
      data-testid="title"
      {...restProps}
    >
      {children}
    </Heading>
  );
};

Title.defaultProps = {
  variant: "h2",
  font: "primary",
};

export type TitleProps = Omit<React.HTMLAttributes<any>, "style"> & {
  font?: "primary" | "secondary";
  isUppercase?: boolean;
  className?: string;
  color?: "light" | "grey" | "dark" | "danger" | "success" | "black" | "primary-color";
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right";
  style?: "normal" | "italic";
  customStyles?: React.CSSProperties;
};

export default Title;
