import Layout from "@/components/Layout";
import ErrorPage from "@/components/errors/ErrorPage";
import HeadSeo from "@/components/HeadSeo";

export default function Custom404() {
  return (
    <>
      <HeadSeo title={`Oops! Có lỗi xảy ra..`} />
      <ErrorPage title="404" message="Không có gì ở đây" />
    </>
  );
}

Custom404.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
