import Layout from "@/components/vendor/Layout";
import { Row, Container, Col, Button, Spinner } from "reactstrap";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { SWRConfig } from "swr";
import fetcher from "../libs/fetcher";
import _ from "lodash";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import VendorBox from "@/components/VendorBox.js";
import Head from "next/head";
import HeadSeo from "../components/HeadSeo";
const API = `${process.env.API_VENDOR_URL}/search`;
export default function Searchvendor({ fallback }) {
  const [text, setText] = useState(fallback.text);
  const [limit, setLimit] = useState(fallback.limit);
  const [page, setPage] = useState(fallback.page);
  const PAGE_SIZE = fallback.data.data.totalPages;
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => `${API}?t=${fallback.text || ""}&limit=${limit || 10}&page=${index + 1}`,
    fetcher
  );
  let issues = [];
  if (data && data[data.length - 1].status === 200) {
    issues = _.concat(issues, data[data.length - 1].data.docs);
  }
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isReachingEnd = data && data[data.length - 1].data.page === PAGE_SIZE;
  return (
    <SWRConfig value={{ fallback }}>
      <HeadSeo title={text} />
      <div style={{ backgroundColor: "rgb(245, 245, 250)" }}>
        <section className="section-b-space ratio_asos">
          <div className="collection-wrapper">
            <Container>
              <Row className="d-flex justify-content-center">
                <Col md={10}>
                  <div className="d-flex justify-content-start">
                    <h3>
                      Shop liên quan đến <strong>{fallback.text}</strong>
                    </h3>
                  </div>
                  {data ? (
                    issues.length > 0 ? (
                      issues.map((value, i) => {
                        return <VendorBox value={value} key={i} page="vendor" />;
                      })
                    ) : (
                      <Col xs="12">
                        <div>
                          <div className="col-sm-12 empty-cart-cls text-center">
                            <img
                              src={`/assets/images/empty-search.jpg`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                            />
                            <h3>
                              <strong>Không có shop nào</strong>
                            </h3>
                          </div>
                        </div>
                      </Col>
                    )
                  ) : (
                    <>
                      <Skeleton count={3} height={100} width="100%" />
                      <div className="d-flex justify-content-center">
                        <Skeleton count={1} height={30} width={100} />
                      </div>
                    </>
                  )}
                  {!isReachingEnd && (
                    <div className="section-t-space">
                      <div className="text-center">
                        <Row>
                          <Col xl="12" md="12" sm="12">
                            <Button
                              onClick={() => {
                                setSize(size + 1);
                              }}
                            >
                              {isLoadingMore && <Spinner animation="border" variant="light" />}
                              Xem thêm
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </div>
    </SWRConfig>
  );
}
Searchvendor.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export async function getServerSideProps(ctx) {
  const { t, limit, page } = ctx.query;
  const finalAPI = `${API}?t=${t || ""}&limit=${limit || 10}&page=${page || 1}`;
  const repoInfo = await fetcher(finalAPI);
  return {
    props: {
      fallback: {
        data: repoInfo,
        text: t || "",
        limit: limit || 10,
        page: page || 1,
      },
    },
  };
}
