import clsx from "clsx";

import SEO from "@components/SEO";

import styles from "./LayoutCentered.module.scss";

const LayoutCentered: React.FC<LayoutCenteredProps> = (props) => {
  const { children, indexing, metaTitle, metaDescription, metaImage, loading, classes } = props;

  return (
    <div className={clsx(styles.root, classes?.root)} data-testid="layout-centered">
      <SEO noindex={!indexing} metaTitle={metaTitle} metaDescription={metaDescription} metaImage={metaImage} />

      <main className={clsx(clsx(styles.inner, classes?.main), loading ? "align-center" : "")}>
        {loading ? <p>Loading</p> : children}
      </main>
    </div>
  );
};

type LayoutCenteredProps = React.PropsWithChildren<{
  classes?: { root?: string; main?: string };
  loading?: boolean;
  indexing?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
}>;

export default LayoutCentered;
