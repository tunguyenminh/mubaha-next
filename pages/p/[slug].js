import Layout from "@/components/Layout";
import { Container } from "reactstrap";
import HeadSeo from "../../components/HeadSeo";

export default function CustomPage(data) {
  return (
    <>
      <HeadSeo title={data.data.title} />
      <section>
        <Container>
          <div className="mg-5">
            <h2 className="text-center">{data.data.title}</h2>
          </div>
          <div className="m-5" dangerouslySetInnerHTML={{ __html: data.data.content }}></div>
        </Container>
      </section>
    </>
  );
}

CustomPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const response = await fetch(`${process.env.API_URL}/custom/${slug}`);
  const { data, status, message } = await response.json();
  if (status != 200)
    return {
      notFound: true,
    };

  return {
    props: {
      data: data,
    },
  };
}
