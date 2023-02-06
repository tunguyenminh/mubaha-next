import Head from "next/head";
import { useState } from "react";
import libphone from "google-libphonenumber";
import { Row, Form, Alert } from "reactstrap";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Footer from "@/components/Footer.js";
import otpEnums from "../../enums/otp.enum.js";
import styles from "@/styles/authen.module.css";
import dynamic from "next/dynamic";
import BottomFormRegister from "@/components/authen/BottomFormRegister.js";
import HeadSeo from "../../components/HeadSeo.js";

const DynamicOtpComponent = dynamic(() => import("@/components/Otp.js"));
const DynamicBreadcrumbComponent = dynamic(() => import("@/components/Breadcrumb.js"));
const DynamicLayoutAuthComponent = dynamic(() => import("@/components/authen/LayoutAuth.js"));

const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();

export default function RegisterPage() {
  const [isNotValidPhone, setIsNotValidPhone] = useState(true);
  const [phone, setPhone] = useState("");
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [isRegisted, setIsRegisted] = useState(false);
  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const checkPhone = (e) => {
    phone = e.target.value;
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
  };
  const handleFullname = (e) => {
    setFullName(e.target.value);
  };

  const getOtp = async (e) => {
    e.preventDefault();
    if (fullName == "") {
      setMessage("Họ và tên không hợp lệ");
      setIsRegisted(true);
    } else {
      const params = {
        phone,
        fullName: fullName,
      };
      const response = await fetch(`${process.env.API_AUTH_URL}/register-otp`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.status == 200) {
        setIsVerifyPhone(true);
      } else {
        setMessage(data.message);
        setIsRegisted(true);
      }
    }
  };
  return (
    <>
      <HeadSeo title={`Đăng ký tài khoản`} />
      {!isVerifyPhone && (
        <DynamicLayoutAuthComponent
          title="Đăng ký"
          form={
            <Form className="theme-form ml-3 mr-3" onSubmit={getOtp}>
              {isRegisted && (
                <Alert style={{ textAlign: "center", height: "40px" }} variant={"danger"}>
                  {message}
                </Alert>
              )}
              <div className="form-group mb-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập họ và tên"
                  onChange={handleFullname}
                  autoFocus
                />
                <input
                  onChange={checkPhone}
                  type="text"
                  className="form-control"
                  placeholder="Nhập số điện thoại của bạn"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  disabled={isNotValidPhone}
                  className="btn btn-solid btn-block"
                >
                  Đăng Ký
                </button>
              </div>
            </Form>
          }
          bottom={<BottomFormRegister />}
        />
      )}
      {isVerifyPhone && (
        <div>
          <HeaderAuthen />
          <DynamicBreadcrumbComponent
            previousLink="/auth/register"
            previousValue="Đăng ký"
            currentValue="Xác thực Otp"
          />
          <Row className={`${styles.backgroundLogin} d-flex justify-content-center`}>
            <DynamicOtpComponent phone={phone} type={otpEnums.REGISTRATION} fullName={fullName} />
          </Row>
          <Footer />
        </div>
      )}
    </>
  );
}
