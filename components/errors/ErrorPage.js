import Link from "next/link";
import { Col, Container, Row } from "reactstrap";

export default function ErrorPage({ title, message }) {
  return (
    <section className="p-0">
      <Container>
        <Row>
          <Col sm="12">
            <div className="error-section">
              <h1>{title}</h1>
              <h2>{message}</h2>
              <Link href="/">
                <a className="btn btn-solid">Quay về trang chủ</a>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
