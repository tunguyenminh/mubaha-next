import Image from 'next/image';

import {
  Container,
  Row,
  Col,
  Media,
} from 'reactstrap'

export default function Copyright() {
  return (
    <>
      <div className="sub-footer">
        <Container fluid="">
          <Row>
            <Col xl={6} md={6} sm={12}>
              <div className="footer-end">
                <p><i className="fa fa-copyright" aria-hidden="true"></i> {(new Date().getFullYear())} Mubaha. Tất cả các quyền được bảo lưu.</p>
              </div>
            </Col>
            <Col xl={6} md={6} sm={12}>
              <div className="payment-card-bottom">
                <ul>
                  <li>
                    <a href={null}><Media src="/assets/images/icon/visa.png" alt="" /></a>
                  </li>
                  <li>
                    <a href={null}><Media src="/assets/images/icon/mastercard.png" alt="" /></a>
                  </li>
                  <li>
                    <a href={null}><Media src="/assets/images/icon/paypal.png" alt="" /></a>
                  </li>
                </ul>
              </div>

            </Col>
          </Row>
        </Container>

      </div>
    </>
  )
}
