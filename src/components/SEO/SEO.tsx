import Head from "next/head";
import { useRouter } from "next/router";

import { APP_DESCRIPTION, APP_NAME, APP_ORIGIN } from "@config/constants";

const SEO: React.FC<SEOProps> = ({ noindex, metaTitle, metaDescription, metaImage, schemaSEO }) => {
  const router = useRouter();

  const SEO = {
    title: metaTitle ? `${metaTitle} | ${APP_NAME}` : APP_NAME,
    description: metaDescription || APP_DESCRIPTION,
    image: metaImage || "",
    url: APP_ORIGIN + router.asPath,
  };

  return (
    <Head>
      {noindex && <meta name="robots" content="noindex" />}
      <title>{SEO.title}</title>
      <meta name="description" content={SEO.description} />

      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={SEO.title} />
      <meta property="og:description" content={SEO.description} />
      <meta property="og:image" content={SEO.image} />
      <meta property="og:url" content={SEO.url} />

      <meta name="twitter:site" content="" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={SEO.title} />
      <meta name="twitter:description" content={SEO.description} />
      <meta name="twitter:image" content={SEO.image} />
      <meta property="twitter:url" content={SEO.url} />

      {schemaSEO && <script type="application/ld+json">{JSON.stringify(schemaSEO)}</script>}
    </Head>
  );
};

type SEOProps = {
  noindex?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  schemaSEO?: string;
};

export default SEO;
