import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import OneColumnProductSlider from "./common/OneColumnProductSlider";

import ProductItem from "./ProductItem";

export default function PartitionSlider({
  leftNewProducts,
  rightFeatureProducts,
  dealsOfTheDay
}) {
  return (
    <section>
      <Container>
        <Row className="partition3 partition_3">
          <Col lg="4">
            <OneColumnProductSlider title="Sản phẩm mới" border="card-border" data={leftNewProducts} />
          </Col>
          <Col lg="4" className="center-slider border-0">
            <div>
              <div className="title2">
                <h4>Flash sale</h4>
                <h2 className="title-inner2">Sale mùa này</h2>
              </div>
              <Slider className="offer-slider slide-1 center-image-width no-arrow">
                {dealsOfTheDay &&
                  dealsOfTheDay.slice(0, 2).map((product, i) => (
                    <div key={i}>
                      <ProductItem
                        product={product}
                        oldThumbnail={true}
                      />
                    </div>
                  ))}
              </Slider>
            </div>
          </Col>
          <Col lg="4">
            <OneColumnProductSlider title="Sản phẩm hấp dẫn" border="card-border" data={rightFeatureProducts} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
