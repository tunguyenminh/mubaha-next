import { Row } from "reactstrap";
import styles from "@/styles/authen.module.css";
import Link from "next/link";
export default function BottomFormRegister() {
  return (
    <>
      <Row className="mt-2 d-flex justify-content-center  ml-3 mr-3">
        <div className=" mb-4 mx-auto">
          <h6 style={{ textAlign: "center", fontSize: "13px" }}>
            Bằng việc đăng kí, bạn đã đồng ý với Mubaha về
            <span className={styles.textPolicies}> Điều khoản dịch vụ</span>
            <span> & </span>
            <span className={styles.textPolicies}>Chính sách bảo mật</span>
          </h6>
        </div>
        <div className="d-flex justify-content-center">
          <p className="mx-auto">
            <span>Bạn đã có tài khoản? </span>
            <Link href="/auth/login">
              <a>Đăng nhập</a>
            </Link>
          </p>
        </div>
      </Row>
    </>
  )
}