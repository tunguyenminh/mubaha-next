
import { Container, Col, Row } from "reactstrap";

import {
  services,
} from "@/services/script";

import MasterServiceContent from "./MasterServiceContent";

import styles from "./MainServiceCollections.module.css"

export default function MainServiceCollections() {
  return (
    <>
      <section className={`banner-padding absolute-banner ${styles.absoluteMub}`}>
        <Container className="absolute-bg">
          <div className="service p-0">
            <Row>
              {services.map((data, i) => {
                return (
                  <Col lg={3} sm={12} className="service-block" key={i}>
                    <MasterServiceContent
                      link={data.link}
                      title={data.title}
                      service={data.service}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </section>
    </>
  )
}