import OtpInput from "react-otp-input";
import { Alert } from "reactstrap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import otpEnums from "../enums/otp.enum.js";
import { signIn } from "next-auth/react";
import styles from "@/styles/authen.module.css";
import API from "@/services/api.js";
export default function VerifyOtp({ phone, type }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isInvalidOtp, setInvalidOtp] = useState(false);
  const [isNotFullOtp, setNotFullOtp] = useState(true);

  const checkOtp = async (e) => {
    setOtp(e);
    if (e.length == 4) {
      setNotFullOtp(false);
      if (type == otpEnums.REGISTRATION) {
        const res = await signIn("mubaha-signup", {
          phone: phone,
          code: e,
          redirect: false,
        });
        if (res.error == null) {
          const slug = router.query.slug;
          if (slug != undefined) {
            router.push({
              pathname: "/auth/create-password",
              query: { slug: slug },
            });
          } else {
            router.push("/auth/create-password");
          }
        } else {
          setInvalidOtp(true);
        }
      } else if (type == otpEnums.LOGIN) {
        const res = await signIn("mubaha", {
          phone: phone,
          code: e,
          redirect: false,
        });
        if (res.error == null) {
          const slug = router.query.slug;
          if (slug != undefined) {
            router.push(`/${slug}`);
          } else {
            router.push("/");
          }
        } else {
          setInvalidOtp(true);
        }
      } else if (type == otpEnums.CREATE_PASSWORD) {
        const res = await signIn("mubaha", {
          phone: phone,
          code: e,
          redirect: false,
        });

        if (res.error == null) {
          router.push("/auth/create-password");
        } else {
          setInvalidOtp(true);
        }
      } else if ((type = otpEnums.RECOVER_PASSWORD)) {
        const params = {
          phone,
          code: e,
        };
        const response = await API.instance.post(
          `${process.env.API_AUTH_URL}/verify-otp-recover-password`,
          params
        );
        const data = response.data;

        if (data.status === 400) {
          setInvalidOtp(true);
        } else if (data.status == 200) {
          localStorage.setItem("userId", data.data.userId);
          localStorage.setItem("token", data.data.token);
          router.push("/auth/update-password");
        }
      }
    }
  };
  return (
    <>
      <div className={`card ${styles.formOtp} container`}>
        <div className={`${styles.textTitleOtp} mt-5`}>
          <h3> Vui Lòng Nhập Mã Xác Minh</h3>
        </div>
        <p className={styles.textOtp}>
          Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến số điện thoại
        </p>
        <p className={styles.textPhoneOtp}>
          <b>({phone})</b>
        </p>
        {isInvalidOtp && (
          <Alert className={styles.alertOtp} variant={"danger"}>
            Mã xác minh không hợp lệ
          </Alert>
        )}
        <div style={{ marginTop: "10px" }} className="d-flex justify-content-center">
          <OtpInput
            shouldAutoFocus="true"
            isInputNum="true"
            inputStyle={{
              width: "4em",
              height: "4em",
            }}
            value={otp}
            onChange={checkOtp}
            numInputs={4}
            separator={<span style={{ marginLeft: "10px" }}></span>}
          />
        </div>
        <div className="container d-flex justify-content-center mt-5 mb-5">
          <p style={{ textAlign: "center" }}>
            Bạn không nhận được mã?
            <br />
            <br></br>
            <span style={{ color: "blue" }}>
              {" "}
              <Link href="#">
                <a> Gửi lại</a>
              </Link>
            </span>{" "}
            {type == otpEnums.LOGIN && (
              <>
                hoặc
                <span style={{ color: "blue" }}>
                  <Link href="/auth/login">
                    <a> thử bằng phương thức xác minh khác</a>
                  </Link>
                </span>
              </>
            )}
            <div className="mt-4">
              <button disabled={isNotFullOtp} className={`btn btn-solid ${styles.otpButton}`}>
                Tiếp tục
              </button>
            </div>
          </p>
        </div>
      </div>
    </>
  );
}
