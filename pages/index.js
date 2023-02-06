import Head from "next/head";
import MainServiceCollections from "@/components/MainServiceCollections";
import ProductCollection1 from "@/components/ProductCollection1";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import MainMultipleSlider from "@/components/MainMultipleSlider";
import PartitionSlider from "@/components/PartitionSlider";
import MasterParallaxBanner from "@/components/MasterParallaxBanner";
import styles from "@/styles/homepage.module.css";
import HeadSeo from "@/components/HeadSeo";

export default function Home({
  dealsOfTheDay,
  dontMissTheseProducts,
  firstNewProducts,
  leftNewProducts,
  rightFeatureProducts,
  top5Products,
}) {
  return (
    <>
      <HeadSeo title={`Trang chủ`} />
      <section className={`section-b-space ${styles.bgHead}`}>
        <MainMultipleSlider dontMissTheseProducts={dontMissTheseProducts} />
      </section>
      <MainServiceCollections />
      <ProductCollection1 title="gợi ý hôm nay" data={dealsOfTheDay} />
      <MasterParallaxBanner
        bg="parallax-mubaha"
        parallaxClass="text-center p-left"
        title="2022"
        subTitle1="xu hướng mới"
        subTitle2="rất nhiều ưu đãi"
      />
      <ProductCollection1 title="đừng bỏ lỡ" data={dontMissTheseProducts} />
      <div className="section-b-space">
        <PartitionSlider
          dealsOfTheDay={dealsOfTheDay}
          leftNewProducts={leftNewProducts}
          rightFeatureProducts={rightFeatureProducts}
        />
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const response = await fetch(`${process.env.API_URL}`);
  const { data } = await response.json();

  return {
    props: {
      dealsOfTheDay: data.dealsOfTheDay,
      dontMissTheseProducts: data.dontMissTheseProducts,
      firstNewProducts: data.firstNewProducts,
      leftNewProducts: data.leftNewProducts,
      rightFeatureProducts: data.rightFeatureProducts,
      top5Products: data.top5Products,
    },
    revalidate: 60,
  };
}
