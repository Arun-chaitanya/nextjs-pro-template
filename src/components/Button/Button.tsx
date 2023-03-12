import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { useState } from "react";
import { UrlObject } from "url";

import CircularProgress from "@mui/material/CircularProgress";

import styles from "./Button.module.scss";

const Button: React.FC<ButtonProps> = (props) => {
  const {
    disabled,
    withLoader,
    loadingText,
    href,
    className,
    children,
    fullWidth,
    variant,
    onClick,
    isUppercase,
    isLoading,
    leftIcon,
    rightIcon,
    isExternal,
    id,
    onClickCapture,
    ...rest
  } = props;

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

  const classes = clsx(
    styles.root,
    fullWidth && styles.fullWidth,
    variant && styles[variant],
    isUppercase && styles.lowercase,
    className && className
  );

  const buttonElements = (
    <>
      {leftIcon}
      {(loading || isLoading) && loadingText !== null ? loadingText : children}
      {loading || isLoading ? (
        <CircularProgress size={20} className={styles.loading} data-testid="button-loader" />
      ) : (
        rightIcon
      )}
    </>
  );
  if (href && !disabled) {
    const linkProps = {
      target: isExternal ? "_blank" : undefined,
      rel: isExternal ? "noopener noreferrer" : undefined,
    };
    return (
      <Link href={href} {...(rest as Omit<LinkProps, "href">)}>
        <a
          {...linkProps}
          className={classes}
          onClick={onClick}
          onClickCapture={onClickCapture}
          data-testid="button"
          id={id}
        >
          {buttonElements}
        </a>
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled || loading || isLoading}
      onClick={withLoader ? handleClick : onClick}
      onClickCapture={onClickCapture}
      className={classes}
      data-testid="button"
      id={id}
      {...rest}
    >
      {buttonElements}
    </button>
  );
};

Button.defaultProps = {
  isExternal: false,
  withLoader: false,
  loadingText: null,
  variant: "dark",
  fullWidth: false,
  isUppercase: false,
  isLoading: false,
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<LinkProps> & {
    isExternal?: boolean;
    disabled?: boolean;
    className?: string;
    withLoader?: boolean;
    loadingText?: React.ReactNode;
    href?: string | UrlObject;
    fullWidth?: boolean;
    variant?: "text" | "contained" | "action" | "link" | "normal" | "outlined" | "gray" | "primary" | "dark";
    isUppercase?: boolean;
    isLoading?: boolean;
    leftIcon?: JSX.Element | null;
    rightIcon?: JSX.Element | null;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onClickCapture?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  };

export default Button;
