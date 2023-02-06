import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import logo from "../../assets/images/logo-color.svg";
import Image from "next/image";

export default function HeaderAuthen() {
  return (
    <>
      <header>
        <div className="mobile-fix-option"></div>
        <Container>
          <Row className="p-0">
            <Col>
              <div className="main-menu d-flex p-0">
                <div className="menu-left ml-5">
                  <Link href="/">
                    <a>
                      <div className="brand-logo" style={{ width: "200px", maxWidth: "200px" }}>
                        <Image src={logo} alt="Mubaha" layout="responsive" />
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="menu-right pull-right">
                  <div className="mr-5">
                    <p>
                      Hotline: <a href="tel:+84898851111">+8489 885 1111</a>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
}
