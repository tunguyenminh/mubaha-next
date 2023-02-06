import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import accountTypeEnum from "@/enums/accountType.enum";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function TopBarDark({ topClass, fluid }) {
  const { data: session, status } = useSession();
  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                {/* <li>
                  <Link href="/vendors/apply">
                    <a>
                      Trở thành người bán Mubaha
                    </a>
                  </Link>
                </li> */}
                <li>Sàn thương mại điện tử bán sỉ hàng đầu Việt Nam</li>
                <li>
                  <a href="tel:+84898851111">Hotline: +8489 885 1111</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-right">
            <ul className="header-dropdown">
              {session?.user?.type !== accountTypeEnum.VENDOR ? (
                <li>
                  <Link href="/vendors/apply">
                    <a>Trở thành người bán Mubaha</a>
                  </Link>
                </li>
              ) : (
                ""
              )}
              {!session ? (
                <>
                  <li>
                    <Link href="/auth/register">
                      <a>Đăng ký</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/login">
                      <a>Đăng nhập</a>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {session.user.type === accountTypeEnum.VENDOR ? (
                    <li>
                      <a href="https://vendor.mubaha.com">Kênh người bán</a>
                    </li>
                  ) : (
                    ""
                  )}
                  <li>
                    <Link href="/account/address">
                      <a>Thông tin tài khoản</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        signOut({
                          callbackUrl: `${window.location.origin}/`,
                        })
                      }
                    >
                      Đăng xuất
                    </a>
                  </li>
                </>
              )}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
