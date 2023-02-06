import Head from "next/head";
import siteMetadata from "../store/siteMetadata";

const HeadSeo = ({
  title = "Trang chủ",
  description = "Sàn thương mại điện tử bán sỉ hàng đầu Việt Nam",
  canonicalUrl = siteMetadata.siteUrl,
  ogTwitterImage = siteMetadata.siteLogoSquare,
  ogImageUrl = siteMetadata.siteLogoSquare,
  ogType = "website",
  children,
}) => {
  return (
    <Head>
      <title>{title} | Mubaha</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={siteMetadata.twitterHandle} />
      <meta name="twitter:title" content={`${title} | Mubaha`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogTwitterImage} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={siteMetadata.companyName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={`${title} | Mubaha`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />

      {children}
    </Head>
  );
};

export default HeadSeo;
