import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

import styles from "./NavItem.module.scss";

const NavItem: React.FC<NavItemProps> = (props) => {
  const {
    children,
    className,
    exact,
    href,
    onClick,
    isExternal,
    active,
    showActive,
    position,
    font,
    dimInActive,
    id,
    ...rest
  } = props;

  const router = useRouter();

  const isActive =
    showActive && (active || (href && (exact ? router.asPath === href : router.asPath.startsWith(href))));

  const underline = (
    <div className={clsx(styles.underline, isActive ? styles.active : "")} data-testid="nav-item-underline" />
  );

  const renderLink = () => {
    if (!href) return <a onClick={onClick}>{children}</a>;
    if (isExternal)
      return (
        <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    return (
      <Link {...rest} href={href}>
        <a onClick={onClick}>{children}</a>
      </Link>
    );
  };

  return (
    <li
      className={clsx(
        styles.root,
        position && styles[position],
        font && styles[font],
        className,
        !isActive && dimInActive ? styles.inactive : ""
      )}
      data-testid="nav-item"
      id={id}
    >
      {renderLink()}
      {!isExternal && underline}
    </li>
  );
};

NavItem.defaultProps = {
  isExternal: false,
  showActive: true,
  position: "right",
  font: "header",
};

type NavItemProps = React.PropsWithChildren<
  Omit<LinkProps, "href"> & {
    className?: string;
    exact?: boolean;
    href?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    isExternal?: boolean;
    active?: boolean;
    showActive?: boolean;
    position?: "left" | "right" | "justify" | "center";
    font?: "body" | "header";
    dimInActive?: boolean;
    id?: string;
  }
>;

export default NavItem;
