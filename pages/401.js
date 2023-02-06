import Layout from "@/components/Layout";
import ErrorPage from "@/components/errors/ErrorPage";
import HeadSeo from "@/components/HeadSeo";

export default function Custom401() {
  return (
    <>
      <HeadSeo title={`Oops! Có lỗi xảy ra..`} />
      <ErrorPage title="401" message="Bạn chưa đăng nhập tài khoản" />
    </>
  );
}

Custom401.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
