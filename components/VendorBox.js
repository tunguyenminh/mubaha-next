import styles from "@/styles/vendor.module.css";
import numeral from "numeral"
import { Row, Container, Col, Button } from 'reactstrap'
import {useRouter} from 'next/router'
import Link from "next/link"
export default function VendorBox({value,page}) {
  const router = useRouter()
  return(
    <div className={`${styles.boxVendor} mt-3`} onClick={() =>{
      router.push(`vendors/${value.owner.username}`)
    }}>
    <Container>
      <Row >
        <Col xs={page=="search" ? 6 : 5}>
          <div className="d-flex">
            <div className="w-25 h-100 d-inline-block" >
              <img src={value.cover}
                style={{ border: 'none', height: "100px" }}
                className="img-fluid img-thumbnail rounded-circle" alt="mubaha" />
            </div>
            <div className="ml-2">
              <div className="mt-3">
                <h4 ><b>{value.brandName}</b></h4>
              </div>
              <div>
                <p style={{ fontSize: "12px" }}><b>{value.owner.username}</b></p>
              </div>
              <div className="mt-2 d-flex justify-content-start">
                <div>
                  <p style={{ fontSize: "10px" }}><span className={styles.numberFormat}>{numeral(value.followers).format('0a')}</span> theo dõi</p>
                </div>
                <div className="ml-1 border-left pl-1" style={{ height: "16px" }}>
                  <p style={{ fontSize: "10px" }}> <span className={styles.numberFormat}>{numeral(value.followers).format('0a')}</span> đang theo dõi</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col className="d-flex justify-content-end mt-3" xs={page=="search" ? 6 : 5}>
          <Container>
            <Row xs={3}>
              <Col className="border-left">
                <div className="d-flex justify-content-center">

                  <img src="/assets/icon/product.svg" className={styles.iconSize} />
                  <p className={`mt-1 ml-2 ${styles.numberFormat}`}>{value.responseRate}</p>

                </div>
                <div className="d-flex justify-content-center">
                  <p>Sản phẩm</p>
                </div>
              </Col>
              <Col className="border-left">
                <div className="d-flex justify-content-center">
                  <img src="/assets/icon/star.svg" className={styles.iconSize} />
                  <p className={`mt-1 ml-2 ${styles.numberFormat}`}>{value.ratingOverall}</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p>Đánh giá</p>
                </div>
              </Col>
              <Col className="border-left" style={{ width: "800px" }} >
                <div className="d-flex justify-content-center">
                  <img src="/assets/icon/message.svg" className={styles.iconSize} />
                  <p className={`mt-1 ml-2 ${styles.numberFormat}`}>{value.responseRate}</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p>Tỉ lệ phản hồi</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
        {!(page==="search") && 
        <Col xs={2} >
          <div className="d-flex justify-content-center">
          <Link href={`vendors/${value.owner.username}`} >
            <Button className="btn btn-solid mt-3">Xem shop</Button>
            </Link>
          </div>

        </Col>
      }
      </Row>
    </Container>
  </div>
  )
}