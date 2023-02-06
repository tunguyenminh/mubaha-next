import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import libphone from "google-libphonenumber";
import otpEnums from "../../enums/otp.enum.js";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Footer from "@/components/Footer.js";
import { Row, Form, Alert } from "reactstrap";
import styles from "@/styles/authen.module.css";
import BottomFornLogin from "@/components/authen/BottomFornLogin.js";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import HeadSeo from "../../components/HeadSeo.js";

const DynamicOtpComponent = dynamic(() => import("@/components/Otp.js"));
const DynamicBreadcrumbComponent = dynamic(() => import("@/components/Breadcrumb.js"));
const DynamicLayoutAuthComponent = dynamic(() => import("@/components/authen/LayoutAuth.js"));

const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance();

export default function LoginWithOtp() {
  const [isNotValidPhone, setIsNotValidPhone] = useState(true);
  const [phone, setPhone] = useState("");
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [message, setMessage] = useState("");
  const [isNotRegistered, setIsNotRegistered] = useState(false);
  const [slug, setSlug] = useState();
  const router = useRouter();
  const inputPhone = useRef();
  useEffect(() => {
    const slug = router.query.slug;
    setSlug(slug);
  }, []);
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

  const getOtp = async (e) => {
    e.preventDefault();
    const params = {
      phone: phone,
    };
    // const response = await API.instance.post("/auth/login-otp", params);
    // const data = response.data;
    const response = await fetch(`${process.env.API_AUTH_URL}/login-otp`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.status == 200) {
      setIsVerifyPhone(true);
      setMessage("");
      setIsNotRegistered(false);
    } else {
      setMessage(data.message);
      setIsNotRegistered(true);
    }
  };
  return (
    <>
      <HeadSeo title={`Đăng nhập với SMS`} />
      {/* breadcrumb start */}
      {!isVerifyPhone && (
        <DynamicLayoutAuthComponent
          title="Đăng nhập SMS"
          form={
            <Form className="theme-form ml-3 mr-3" onSubmit={getOtp}>
              {isNotRegistered && (
                <Alert style={{ textAlign: "center", height: "auto" }} variant={"danger"}>
                  {message}
                </Alert>
              )}
              <div className="form-group mb-1">
                <input
                  ref={inputPhone}
                  onChange={checkPhone}
                  type="text"
                  className="form-control"
                  placeholder="Nhập số điện thoại của bạn"
                  autoFocus
                />
              </div>
              <div className="d-flex justify-content-end mb-5">
                <div>
                  {slug == undefined ? (
                    <Link href="/auth/login">
                      <a className={`${styles.textLink} text-primary`}>Đăng nhập mật khẩu</a>
                    </Link>
                  ) : (
                    <Link href={`/auth/login?slug=${slug}`}>
                      <a className={`${styles.textLink} text-primary`}>Đăng nhập mật khẩu</a>
                    </Link>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  disabled={isNotValidPhone}
                  className="btn btn-solid btn-block"
                >
                  Đăng nhập
                </button>
              </div>
            </Form>
          }
          bottom={<BottomFornLogin slug={slug} />}
        />
      )}

      {isVerifyPhone && (
        <div>
          <HeaderAuthen />
          <DynamicBreadcrumbComponent
            previousLink="/auth/login-otp"
            previousValue="Trang đăng nhập"
            currentValue="Xác thực Otp"
          />
          <Row className={`${styles.backgroundLogin} d-flex justify-content-center`}>
            <DynamicOtpComponent phone={phone} type={otpEnums.LOGIN} />
          </Row>
          <Footer />
        </div>
      )}
    </>
  );
}
