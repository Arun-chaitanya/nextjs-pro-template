import clsx from "clsx";

import { APP_NAME } from "@config/constants";

import Image from "@components/Image";

import styles from "./LoadingIndicator.module.scss";

const LoadingIndicator: React.FC<React.HTMLProps<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={clsx(styles.root, className)} data-testid="loading-indicator" {...props}>
    <div className={styles.logo}>
      <Image src="https://prod-assets-s3.faze.app/assets/logo.svg" alt={APP_NAME} layout="fill" objectFit="contain" />
      <div className={styles.loader} />
    </div>
  </div>
);

export default LoadingIndicator;
