import clsx from "clsx";
import { ReactNode } from "react";

import LoadingIndicator from "@components/LoadingIndicator";
import SEO from "@components/SEO";

import styles from "./LayoutCentered.module.scss";

const LayoutCentered: React.FC<LayoutCenteredProps> = (props) => {
  const { children, indexing, metaTitle, metaDescription, metaImage, loading, header, classes } = props;

  return (
    <div className={styles.root} data-testid="layout-centered">
      <SEO noindex={!indexing} metaTitle={metaTitle} metaDescription={metaDescription} metaImage={metaImage} />
      {header}
      <main className={clsx(styles.inner, loading ? "flex align-center" : "", classes?.inner)}>
        {loading ? <LoadingIndicator /> : children}
      </main>
    </div>
  );
};

type LayoutCenteredProps = React.PropsWithChildren<{
  header?: ReactNode;
  loading?: boolean;
  indexing?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  classes?: { inner?: string };
}>;

export default LayoutCentered;
