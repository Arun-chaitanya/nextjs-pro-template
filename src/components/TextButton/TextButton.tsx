import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import styles from "./TextButton.module.scss";

const TextButton: React.FC<TextButtonProps> = (props) => {
  const { children, className, href, onClick, color, weight, size, underlined, withLoader, ...rest } = props;

  const classes = clsx(
    styles.root,
    color && styles[color],
    weight && styles[weight],
    size && styles[size],
    underlined && styles.underlined,
    className
  );

  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    if (!onClick) return;
    setLoading(true);
    try {
      await onClick(e);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <CircularProgress size={20} className={clsx(classes, styles.loading)} data-testid="button-loader" />;
  }
  if (href)
    return (
      <Link href={href} className={classes} onClick={onClick} data-testid="text-button" {...rest}>
        {children}
      </Link>
    );

  return (
    <button className={classes} onClick={withLoader ? handleClick : onClick} data-testid="text-button" {...rest}>
      {children}
    </button>
  );
};

TextButton.defaultProps = {
  color: "primary",
  weight: "bold",
  size: "md",
  underlined: true,
};

type TextButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, "onClick"> &
  Omit<Partial<LinkProps>, "onClick"> & {
    color?: "primary" | "light" | "grey";
    weight?: "normal" | "medium" | "bold" | "heavy";
    size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
    underlined?: boolean;
    withLoader?: boolean;
    onClick?: React.MouseEventHandler<any>;
  };

export default TextButton;
