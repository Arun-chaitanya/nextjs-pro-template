import Link from "next/link";
import { useRouter } from "next/router";
import { SVGProps } from "react";

import Text from "@components/Text";

import styles from "./MobileNavigator.module.scss";

const MobileTab: React.FC<MobileTabProps> = ({ exact, href, Icon, text }) => {
  const router = useRouter();

  const isActive = exact ? router.asPath === href : router.asPath.startsWith(href);

  return (
    <Link href={href} className={styles.tab} data-testid="mobile-tab">
      <Icon height="3rem" width="3rem" className={isActive ? undefined : styles.inactive} />
      <Text className="mt5" align="center" size="sm" color={isActive ? "light" : "grey"}>
        {text}
      </Text>
    </Link>
  );
};

type MobileTabProps = {
  exact?: boolean;
  href: string;
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  text: string;
};

export default MobileTab;
