import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

import { Container, Row, Col, Form, FormGroup, Input, Button, Collapse } from "reactstrap";

import logo from "../assets/images/logo-color.svg";
import Copyright from "./common/Copyright";
import MasonryCategoryGrid from "./common/MasonryCategoryGrid";

export default function Footer({ categories }) {
  const [isOpen, setIsOpen] = useState();
  const [collapse, setCollapse] = useState(0);
  const [width, setWidth] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setWidth(window.innerWidth < 750);
    const changeCollapse = () => {
      setWidth(window.innerWidth < 750);
      if (window.innerWidth < 750) {
        setCollapse(0);
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", changeCollapse);

    return () => {
      window.removeEventListener("resize", changeCollapse);
    };
  }, []);

  return (
    <div>
      <footer className="footer-light">
        {router.pathname === "/" && categories && categories.length ? (
          <div className="light-layout upper-footer">
            <Container fluid="">
              <section className="small-section border-section border-top-0">
                <h5 className="text-muted text-uppercase">Danh mục sản phẩm</h5>
                <MasonryCategoryGrid data={categories} grid={4} colClass="col-lg-3 col-md-4 col-sm-6 col-12" />
              </section>
            </Container>
          </div>
        ) : (
          ""
        )}
        <section className="section-b-space light-layout">
          <Container fluid="">
            <Row className="footer-theme partition-f">
              <Col lg="4" md="6">
                <div
                  className={`footer-title ${isOpen && collapse == 1 ? "active" : ""
                    } footer-mobile-title`}
                >
                  <h4
                    onClick={() => {
                      setCollapse(1);
                      setIsOpen(!isOpen);
                    }}
                  >
                    about
                    <span className="according-menu"></span>
                  </h4>
                </div>
                <Collapse isOpen={width ? (collapse === 1 ? isOpen : false) : true}>
                  <div className="footer-contant">
                    <div className="footer-logo">
                      <Link href="/">
                        <a>
                          <div style={{ width: "200px", maxWidth: "200px" }}>
                            <Image src={logo} alt="Mubaha" layout="responsive" />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <p>
                      Với hàng triệu sản phẩm từ các thương hiệu, cửa hàng uy tín, hàng nghìn loại
                      mặt hàng từ Điện thoại smartphone tới Rau củ quả tươi, kèm theo dịch vụ giao
                      hàng siêu tốc Muhaba mang đến cho bạn một trải nghiệm mua sắm online bắt đầu
                      bằng chữ tín. Thêm vào đó, ở Mubaha bạn có thể dễ dàng sử dụng vô vàn các tiện
                      ích khác như mua thẻ cào, thanh toán hoá đơn điện nước, các dịch vụ bảo hiểm.
                    </p>
                    <div className="footer-social">
                      <ul>
                        <li>
                          <a href="https://www.facebook.com">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://plus.google.com">
                            <i className="fa fa-google-plus" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com">
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com">
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://rss.com">
                            <i className="fa fa-rss" aria-hidden="true"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </Col>
              <Col className="offset-xl-1">
                <div className="sub-title">
                  <div className={`footer-title ${isOpen && collapse == 2 ? "active" : ""} `}>
                    <h4
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(2);
                        } else setIsOpen(true);
                      }}
                    >
                      Chăm sóc khách hàng
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse isOpen={width ? (collapse === 2 ? isOpen : false) : true}>
                    <div className="footer-contant">
                      <ul>
                        <li>
                          <Link href="/p/operating-regulations">
                           Quy chế hoạt động
                          </Link>
                        </li>
                        <li>
                          <Link href="/p/guide_pay">Hướng dẫn mua hàng</Link>
                        </li>
                        <li>
                          <Link href="/p/regulations-on-posting-products-on-mubaha">Quy định đăng bán sản phẩm trên Mubaha</Link>
                        </li>
                        <li>
                          <Link href="/p/products-banningrelimitation-policy">Chính sách Cấm/Hạn chế sản phẩm</Link>
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
              <Col>
                <div className="sub-title">
                  <div className={`footer-title ${isOpen && collapse == 3 ? "active" : ""} `}>
                    <h4
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(3);
                        } else setIsOpen(true);
                      }}
                    >
                      Về Mubaha
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse isOpen={width ? (collapse === 3 ? isOpen : false) : true}>
                    <div className="footer-contant">
                      <ul>
                        <li>
                          <Link href="/p/about-us">Giới thiệu về Mubaha Việt Nam</Link>
                        </li>
                        <li>
                          <Link href="/p/privacy-policy">Chính sách bảo mật</Link>
                        </li>
                        <li>
                          <Link href="/p/terms-of-service">Điều khoản và dịch vụ</Link>
                        </li>
                        <li>
                          <Link href="https://vendor.mubaha.com">Kênh người bán</Link>
                        </li>
                        <li>
                          <Link href="/p/service">Cam kết dịch vụ vận chuyển</Link>
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Copyright />
      </footer>
    </div>
  );
}
