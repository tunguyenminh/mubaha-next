import Head from "next/head";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Breadcrumb from "@/components/Breadcrumb.js";
import { Container, Row, Form, Col, Alert } from "reactstrap";
import { useState } from "react";
import libphone from "google-libphonenumber";
import API from "@/services/api.js";
import dynamic from "next/dynamic";
import styles from "@/styles/authen.module.css";
import otpEnums from "../../enums/otp.enum.js";
import Footer from "@/components/Footer.js";
import HeadSeo from "../../components/HeadSeo.js";
const { PhoneNumberUtil, PhoneNumberFormat } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();

const DynamicOtpComponent = dynamic(() => import("@/components/Otp.js"));
const DynamicBreadcrumbComponent = dynamic(() => import("@/components/Breadcrumb.js"));

export default function RecoverPassword() {
  const [isNotValidPhone, setIsNotValidPhone] = useState(true);
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const checkPhone = (e) => {
    phone = e.target.value;
    var reg = /^\d+$/;
    if (!reg.test(phone)) {
      setIsNotValidPhone(true);
    } else {
      if (phone.length < 2 || phone == null) {
        setIsNotValidPhone(true);
      } else {
        const number = phoneUtil.parse(phone, "VN");
        if (!phoneUtil.isValidNumber(number)) {
          setIsNotValidPhone(true);
        } else {
          const phoneNumber = phoneUtil.format(number, PhoneNumberFormat.E164);
          setPhone(phoneNumber);
          setIsNotValidPhone(false);
        }
      }
    }
  };
  const handlePhone = async (e) => {
    e.preventDefault();
    const params = {
      phone: phone,
    };

    const response = await API.instance.post(
      `${process.env.API_AUTH_URL}/recover-password`,
      params
    );
    const data = response.data;

    if (data.status == 200) {
      setIsVerifyPhone(true);
    } else {
      setMessage(data.message);
      setShowError(true);
    }
  };
  return (
    <>
      <HeadSeo title={`Lấy lại mật khẩu`} />
      <HeaderAuthen />
      {!isVerifyPhone && (
        <div>
          <Breadcrumb
            previousLink="/auth/login"
            previousValue="Trang đăng nhập"
            currentValue="Lấy lại mật khẩu"
          />
          <section className="pwd-page section-b-space">
            <Container>
              <Row>
                <Col lg="6" className="m-auto">
                  <h2>Đặt Lại Mật Khẩu</h2>
                  {showError && (
                    <Alert style={{ textAlign: "center", height: "auto" }} color="danger">
                      {message}
                    </Alert>
                  )}
                  <Form className="theme-form" onSubmit={handlePhone}>
                    <Row>
                      <Col md="12">
                        <input
                          type="tel"
                          className="form-control"
                          onChange={checkPhone}
                          placeholder="Nhập số điện thoại của bạn"
                        />
                      </Col>
                      <button className="btn btn-solid" disabled={isNotValidPhone}>
                        Tiếp theo
                      </button>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      )}
      {isVerifyPhone && (
        <div>
          <DynamicBreadcrumbComponent
            previousLink="/auth/recover-password"
            previousValue="Lấy lại mật khẩu"
            currentValue="Xác thực Otp"
          />
          <Row className={`${styles.backgroundLogin} d-flex justify-content-center`}>
            <DynamicOtpComponent phone={phone} type={otpEnums.RECOVER_PASSWORD} />
          </Row>
        </div>
      )}
      <Footer />
    </>
  );
}
