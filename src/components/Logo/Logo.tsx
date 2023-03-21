import clsx from "clsx";
import Link from "next/link";

import Image from "@components/Image";

import styles from "./Logo.module.scss";

const LOGO_SRC = {
  header: "https://s3.ap-south-1.amazonaws.com/prod-assets.fancraze.com/assets/fc-logo-new.svg",
  footer: "https://s3.ap-south-1.amazonaws.com/prod-assets.fancraze.com/assets/fc-logo-gray.svg",
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
    <Link href="/" className={clsx(styles.logo, styles[variant])} data-testid="logo" {...props}>
      <Image alt={LOGO_ALT[variant]} src={LOGO_SRC[variant]} layout="fill" objectFit="contain" />
    </Link>
  );
};

Logo.defaultProps = {
  variant: "header",
};

type LogoProps = React.DetailsHTMLAttributes<HTMLAnchorElement> & {
  variant?: "header" | "footer";
  disabled?: boolean;
};

export default Logo;
