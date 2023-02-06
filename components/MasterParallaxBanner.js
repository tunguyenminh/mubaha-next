import { Col, Container, Row } from "reactstrap";

export default function MasterParallaxBanner({
  parallaxSectionClass,
  bg,
  parallaxClass,
  title,
  subTitle1,
  subTitle2,
}) {
  return (
    <>
      <section className={`p-0 ${parallaxSectionClass}`}>
        <div className={`full-banner ${bg} parallax ${parallaxClass}`}>
          <Container>
            <Row>
              <Col>
                <div className="banner-contain">
                  <h2>{title}</h2>
                  <h3>{subTitle1}</h3>
                  <h4>{subTitle2}</h4>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}
