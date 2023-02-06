import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Breadcrumb from "@/components/Breadcrumb.js";
import { Form, Modal, ModalFooter, ModalHeader } from "reactstrap";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Footer from "@/components/Footer.js";
import styles from "@/styles/authen.module.css";
import { useSession } from "next-auth/react";
import HeadSeo from "../../../components/HeadSeo";

export default function CreatePassWord() {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState("block");
  const [hidePass, setHidePass] = useState("none");
  const [inputValues, setInputValues] = useState("password");
  const inputPassword = useRef();
  const router = useRouter();
  useEffect(() => {
    if (session != undefined) {
      const checkisCreatePass = session.user.authentication.isCreatedPassword;
      if (checkisCreatePass) {
        router.push("/");
      }
    }
  });

  useEffect(() => {
    inputPassword.current.focus();
  }, []);

  const handleShowPassword = () => {
    setHidePass("block");
    setShowPass("none");
    setInputValues("text");
  };
  const handlHidePassword = () => {
    setHidePass("none");
    setShowPass("block");
    setInputValues("password");
  };
  const handleCreatePass = async (e) => {
    e.preventDefault();
    const body = {
      password: inputPassword.current.value,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.accessToken,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${process.env.API_AUTH_URL}/create-password`, options);

    const data = await response.json();

    if (data.status == 200) {
      const slug = router.query.slug;
      if (slug != undefined) {
        router.push(`/${slug}`);
      } else {
        router.push("/");
      }
    }
  };
  return (
    <>
      <HeadSeo title={`Tạo mật khẩu`} />
      <HeaderAuthen />
      <Breadcrumb previousLink="/" previousValue="Trang chủ" currentValue="Tạo mật khẩu" />
      <section className="pwd-page  section-b-space">
        <div className={`container ${styles.formPassword}`}>
          <div className="row">
            <div className="col-lg-6 m-auto">
              <h2>Tạo mật khẩu mới</h2>
              <p style={{ textAlign: "center" }}>
                Tôi không muốn tạo mật khẩu, tôi chỉ muốn đăng nhập bằng SMS.
                <div className="mt-2">
                  <span style={{ color: "red" }}>
                    <Link href="/">
                      <a> Quay lại trang chủ</a>
                    </Link>
                  </span>
                </div>
              </p>
              <Form
                className="theme-form"
                style={{ marginTop: "10px" }}
                onSubmit={handleCreatePass}
              >
                <div className="form-row row">
                  <div className="col-md-12 d-flex">
                    <input
                      type={inputValues}
                      ref={inputPassword}
                      className="form-control"
                      placeholder="Nhập mật khẩu của bạn"
                      required
                    />
                    <div
                      onClick={handleShowPassword}
                      style={{ display: showPass }}
                      className={styles.hideShowPassword2}
                    >
                      <AiFillEye className={styles.iconPassword} />
                    </div>
                    <div
                      onClick={handlHidePassword}
                      style={{ display: hidePass }}
                      className={styles.hideShowPassword2}
                    >
                      <AiFillEyeInvisible className={styles.iconPassword} />
                    </div>
                  </div>
                  <button className="btn btn-solid w-auto" type="submit">
                    Tạo
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={show}>
        <ModalHeader>Thông báo</ModalHeader>

        <div
          className="alert alert-success d-flex justify-content-center align-items-center"
          role="alert"
        >
          <svg
            className="bi flex-shrink-0 me-2"
            width={24}
            height={24}
            role="img"
            aria-label="Success:"
          >
            <use xlinkHref="#check-circle-fill" />
          </svg>
          <div style={{ marginLeft: "10px" }}>Tạo mật khẩu thành công</div>
        </div>
        <ModalFooter>
          <div>
            <p style={{ marginRight: "10px", textAlign: "center" }}>
              Xin chờ một chút bạn đang được chuyển hướng đến sang trang chủ
            </p>
          </div>
        </ModalFooter>
      </Modal>
      <Footer />
    </>
  );
}
