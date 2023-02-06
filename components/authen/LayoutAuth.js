import { Row } from "reactstrap";
import LoginSocail from "@/components/authen/LoginSocail.js";
import styles from "@/styles/authen.module.css";
import Footer from "@/components/Footer.js"
import HeaderAuthen from "./HeaderAuthen.js"
import ImageAuthen from "./ImgaeAuthen.js";

export default function LayoutAuth({ title, form, bottom }) {
  return (
    <>
      <HeaderAuthen />
      <div className="login-page container-fluit">
        <Row className={`${styles.backgroundLogin} d-flex justify-content-center`}>
          <div className={`right-login ${styles.marginForm} d-flex`}>
            <div style={{ width: "50%", position: "relative" }}>
              <ImageAuthen />
            </div>
            <div className={`theme-card ${styles.loginFormRight}`} style={{ width: "50%" }}>
              <div className="justify-content-center mt-4 mb-5 ml-3 mr-3">
                <h3 className="text-center">{title}</h3>
              </div>
              {form}
              <div className="mt-4 mx-auto">
                <h5 className={styles.textOr}>HOẶC TIẾP TỤC VỚI</h5>
                <LoginSocail />
              </div>
              {bottom}
            </div>
          </div>
        </Row>
      </div>
      <Footer />
    </>
  )
}
