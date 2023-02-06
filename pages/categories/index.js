import Head from "next/head";
import Layout from "@/components/Layout";

import Breadcrumb from "@/components/Breadcrumb";
import CategorySection from "@/components/CategorySection";
import HeadSeo from "../../components/HeadSeo";

export default function Categories({}) {
  return (
    <>
      <HeadSeo title={`Danh mục sản phẩm`} />
      <Breadcrumb previousLink="/" previousValue="Trang chủ" currentValue="Danh mục sản phẩm" />
      {/* <div className="section-b-space"> */}
      <CategorySection />
      {/* </div> */}
    </>
  );
}

Categories.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
