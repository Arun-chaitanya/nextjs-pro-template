import clsx from "clsx";
import Link from "next/link";

import styles from "./IconButton.module.scss";

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children, href, className, ...rest } = props;
  if (href)
    return (
      <Link href={href} className={clsx(styles.root, className)} data-testid="icon-button" {...rest}>
        {children}
      </Link>
    );
  return (
    <button type="button" className={clsx(styles.root, className)} data-testid="icon-button" {...rest}>
      {children}
    </button>
  );
};

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default IconButton;
