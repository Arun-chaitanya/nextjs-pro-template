import clsx from "clsx";
import Link from "next/link";

import Image from "@components/Image";

import styles from "./Logo.module.scss";

const LOGO_SRC = {
  header: "/assets/logo/traveey_logo.png",
  footer: "/assets/logo-white.svg",
};

const LOGO_ALT = {
  header: "FanCraze Logo",
  footer: "FanCraze Logo",
};

const Logo: React.FC<LogoProps> = ({ variant, disabled, ...props }) => {
  if (!variant) return null;
  if (disabled)
    return (
      <div className={clsx(styles.logo, styles[variant])}>
        <Image alt={LOGO_ALT[variant]} src={LOGO_SRC[variant]} layout="fill" objectFit="contain" />
      </div>
    );
  return (
    <Link href={props.href}>
      <a className={clsx(styles.logo, styles[variant])} data-testid="logo" {...props}>
        <Image
          alt={LOGO_ALT[variant]}
          src={LOGO_SRC[variant]}
          layout="fill"
          objectFit="contain"
          className={clsx(styles.logo, styles[variant])}
        />
      </a>
    </Link>
  );
};

Logo.defaultProps = {
  variant: "header",
};

type LogoProps = React.DetailsHTMLAttributes<HTMLAnchorElement> & {
  variant?: "header" | "footer";
  disabled?: boolean;
  href: string;
};

export default Logo;
