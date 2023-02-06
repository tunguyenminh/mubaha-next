import HeaderThree from "@/components/HeaderThree.js";
import Footer from "@/components/Footer.js";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
export default function Lyout({ children }) {
  return (
    <>
      <HeaderThree />
      <section className="section-b-space">
        <Container>
          <Row>
            <Col lg="3">
              <div className="dashboard-left">
                <div className="block-content">
                  <ul>
                    <li className="active">
                      <Link href="/account/address">
                        <a>Địa chỉ</a>
                      </Link>
                    </li>
                    <li className="active">
                      <Link href="/account/list-order">
                        <a>Danh sách đơn hàng</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col lg="9">{children}</Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}
