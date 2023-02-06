import React, { useEffect } from "react";
import CommonLayout from "../../components/shop/CommonLayout";
import { Container, Row, Col, Media } from "reactstrap";
import one from "../../public/assets/images/pro3/1.jpg";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Footer from "@/components/Footer.js";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HeadSeo from "../../components/HeadSeo";

const OrderSuccess = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    let _timeout;

    _timeout = setTimeout(() => {
      router.push("/");
    }, 1000);

    return () => {
      clearTimeout(_timeout);
    };
  }, []);
  return (
    <>
      <HeadSeo title={`Đặt đơn hàng thành công`} />
      <HeaderAuthen />
      <CommonLayout parent="Trang chủ" title="Đặt đơn hàng thành công">
        <section className="section-b-space light-layout">
          <Container>
            <Row>
              <Col md="12">
                <div className="success-text">
                  <i className="fa fa-check-circle" aria-hidden="true"></i>
                  <h2>Cảm ơn</h2>
                  <p>Đơn hàng của bạn đã được đặt thành công</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </CommonLayout>
      <Footer />
    </>
  );
};

export default OrderSuccess;
