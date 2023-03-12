import Link from "next/link";
import { useRouter } from "next/router";

import Text from "@components/Text";

import styles from "./MobileNavigator.module.scss";

const MobileTab: React.FC<MobileTabProps> = ({ href, Icon, text }) => {
  const router = useRouter();

  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <a className={styles.tab} data-testid="mobile-tab">
        <Icon filled={isActive} />
        <Text size="xxs" color={isActive ? "primary-color" : "grey8"} weight={isActive ? "medium" : "normal"}>
          {text}
        </Text>
      </a>
    </Link>
  );
};

type MobileTabProps = {
  href: string;
  Icon: React.FC<{ filled: boolean }>;
  text: string;
};

export default MobileTab;
