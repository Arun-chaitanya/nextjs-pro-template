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
    variant,
    id,
    underlineClassName,
    ...rest
  } = props;

  const router = useRouter();

  const isActive =
    showActive && (active || (href && (exact ? router.asPath === href : router.asPath.startsWith(href))));

  const renderLink = () => {
    if (!href) return <a onClick={onClick}>{children}</a>;
    if (isExternal)
      return (
        <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    return (
      <Link {...rest} href={href} onClick={onClick}>
        {children}
      </Link>
    );
  };

  return (
    <li
      className={clsx(
        styles.root,
        position && styles[position],
        variant && styles[variant],
        isActive && styles.active,
        className
      )}
      id={id}
    >
      {renderLink()}
    </li>
  );
};

NavItem.defaultProps = {
  isExternal: false,
  showActive: true,
  position: "right",
  variant: "header",
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
    variant?: "body" | "header";
    id?: string;
    underlineClassName?: string;
  }
>;

export default NavItem;
