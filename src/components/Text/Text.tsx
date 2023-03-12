import clsx from "clsx";

import styles from "./Text.module.scss";

const Text: React.FC<TextProps> = (props) => {
  const { variant, className, children, font, color, weight, size, align, noWrap, ...rest } = props;

  const Content = variant as keyof JSX.IntrinsicElements;

  return (
    <Content
      {...rest}
      className={clsx(
        font && styles[font],
        color && styles[color],
        weight && styles[weight],
        size && styles[size],
        align && styles[align],
        noWrap && styles.noWrap,
        className
      )}
      data-testid="text"
    >
      {children}
    </Content>
  );
};

Text.defaultProps = {
  variant: "p",
  font: "primary",
  weight: "medium",
  size: "md",
  noWrap: false,
};

export type TextProps = React.HTMLAttributes<any> & {
  font?: "primary" | "secondary";
  color?:
    | "light"
    | "grey"
    | "dark"
    | "danger"
    | "success"
    | "grey2"
    | "grey6"
    | "grey7"
    | "grey8"
    | "primary-color"
    | "primary-light"
    | "black"
    | "info";
  weight?: "normal" | "medium" | "semi-bold" | "bold" | "heavy";
  size?: "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  align?: "left" | "center" | "right" | "justify";
  variant?: keyof JSX.IntrinsicElements;
  noWrap?: boolean;
};

export default Text;
