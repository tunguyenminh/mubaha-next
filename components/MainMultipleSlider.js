import { Col, Container, Row, Media } from "reactstrap";
import Slider from "react-slick";
import NumberFormat from "react-number-format";
import Link from "next/link";
import ProductPrice from "./common/ProductDetails/ProductPrice";
import styles from "./MainMultipleSlider.module.css";

export default function MainMultipleSlider({ dontMissTheseProducts }) {
  return (
    <Container>
      <Row className={`multiple-slider`}>
        <Col lg={4} sm={12}>
          <div className={`theme-card card-border bg-light border-0`}>
            <h5 className="title-border">Sản phẩm HOT</h5>
            <Slider className="offer-slider slide-1">
              <div>
                {dontMissTheseProducts &&
                  dontMissTheseProducts.slice(0, 2).map((product, index) => (
                    <div className="media" key={index}>
                      <Link href={`/${product.slug}`}>
                        <a>
                          <Media
                            className="img-fluid blur-up lazyload"
                            src={product.media.featuredImage}
                            alt=""
                          />
                        </a>
                      </Link>
                      <div className="media-body align-self-center">
                        <div className="rating">
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <Link href={`/${product.slug}`}>
                          <a>
                            <h6>
                            {product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }
                            </h6>
                          </a>
                        </Link>
                        <h4><ProductPrice price={product.price} discount={product.discount} currencySymbol={product.currencySymbol} /></h4>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                {dontMissTheseProducts &&
                  dontMissTheseProducts.slice(4, 6).map((product, index) => (
                    <div className="media" key={index}>
                      <Link href={`/${product.slug}`}>
                        <a>
                          <Media
                            className="img-fluid blur-up lazyload"
                            src={product.media.featuredImage}
                            alt=""
                          />
                        </a>
                      </Link>
                      <div className="media-body align-self-center">
                        <div className="rating">
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <Link href={`/${product.slug}`}>
                          <a>
                            <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
                          </a>
                        </Link>
                        <h4><ProductPrice price={product.price} discount={product.discount} currencySymbol={product.currencySymbol} /></h4>
                      </div>
                    </div>
                  ))}
              </div>
            </Slider>
          </div>
        </Col>
        <Col lg={4} sm={12}>
          <div className="theme-card card-border bg-light border-0">
            <h5 className="title-border">Đang hạ giá</h5>
            <Slider className="offer-slider slide-1">
              <div>
                {dontMissTheseProducts &&
                  dontMissTheseProducts.slice(8, 10).map((product, index) => (
                    <div className="media" key={index}>
                      <Link href={`/${product.slug}`}>
                        <a>
                          <Media
                            className="img-fluid blur-up lazyload"
                            src={product.media.featuredImage}
                            alt=""
                          />
                        </a>
                      </Link>
                      <div className="media-body align-self-center">
                        <div className="rating">
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <Link href={`/${product.slug}`}>
                          <a>
                            <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
                          </a>
                        </Link>
                        <h4><ProductPrice price={product.price} discount={product.discount} currencySymbol={product.currencySymbol} /></h4>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                {dontMissTheseProducts &&
                  dontMissTheseProducts.slice(12, 14).map((product, index) => (
                    <div className="media" key={index}>
                      <Link href={`/${product.slug}`}>
                        <a>
                          <Media
                            className="img-fluid blur-up lazyload"
                            src={product.media.featuredImage}
                            alt=""
                          />
                        </a>
                      </Link>
                      <div className="media-body align-self-center">
                        <div className="rating">
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <Link href={`/${product.slug}`}>
                          <a>
                            <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
                          </a>
                        </Link>
                        <h4><ProductPrice price={product.price} discount={product.discount} currencySymbol={product.currencySymbol} /></h4>
                      </div>
                    </div>
                  ))}
              </div>
            </Slider>
          </div>
        </Col>
        <Col lg={4} sm={12}>
          <div className="theme-card card-border bg-light border-0">
            <h5 className="title-border">Bán chạy nhất</h5>
            <Slider className="offer-slider slide-1">
              <div>
                {dontMissTheseProducts &&
                  dontMissTheseProducts.slice(2, 4).map((product, index) => (
                    <div className="media" key={index}>
                      <Link href={`/${product.slug}`}>
                        <a>
                          <Media
                            className="img-fluid blur-up lazyload"
                            src={product.media.featuredImage}
                            alt=""
                          />
                        </a>
                      </Link>
                      <div className="media-body align-self-center">
                        <div className="rating">
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <Link href={`/${product.slug}`}>
                          <a>
                            <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
                          </a>
                        </Link>
                        <h4><ProductPrice price={product.price} discount={product.discount} currencySymbol={product.currencySymbol} /></h4>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                {dontMissTheseProducts &&
                  dontMissTheseProducts.slice(7, 9).map((product, index) => (
                    <div className="media" key={index}>
                      <Link href={`/${product.slug}`}>
                        <a>
                          <Media
                            className="img-fluid blur-up lazyload"
                            src={product.media.featuredImage}
                            alt=""
                          />
                        </a>
                      </Link>
                      <div className="media-body align-self-center">
                        <div className="rating">
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <Link href={`/${product.slug}`}>
                          <a>
                            <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
                          </a>
                        </Link>
                        <h4><ProductPrice price={product.price} discount={product.discount} currencySymbol={product.currencySymbol} /></h4>
                      </div>
                    </div>
                  ))}
              </div>
            </Slider>
          </div>
        </Col>
        {/* <Col lg={3} sm={6}>
          <div className="theme-card">
            <h5 className="title-border">Mùa Thu 2022</h5>
            <Slider className="offer-slider slide-1">
              <div>
                {dontMissTheseProducts &&
                  dontMissTheseProducts.slice(9, 12).map((product, index) => (
                    <div className="media" key={index}>
                      <Link href={`/${product.slug}`}>
                        <a>
                          <Media
                            className="img-fluid blur-up lazyload"
                            src={product.media.featuredImage}
                            alt=""
                          />
                        </a>
                      </Link>
                      <div className="media-body align-self-center">
                        <div className="rating">
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <Link href={`/${product.slug}`}>
                          <a>
                            <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
                          </a>
                        </Link>
                        <h4>
                          <NumberFormat
                            value={product.currentPrice}
                            thousandSeparator={true}
                            displayType="text"
                            suffix={product.currencySymbol}
                            decimalScale={0}
                          />
                          {product.discountPercent > 1 ? (
                            <del>
                              <span className="money ml-1">
                                <NumberFormat
                                  value={product.price}
                                  thousandSeparator={true}
                                  displayType="text"
                                  suffix={product.currencySymbol}
                                  decimalScale={0}
                                />
                              </span>
                            </del>
                          ) : (
                            ""
                          )}
                        </h4>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                {dontMissTheseProducts &&
                  dontMissTheseProducts.slice(5, 8).map((product, index) => (
                    <div className="media" key={index}>
                      <Link href={`/${product.slug}`}>
                        <a>
                          <Media
                            className="img-fluid blur-up lazyload"
                            src={product.media.featuredImage}
                            alt=""
                          />
                        </a>
                      </Link>
                      <div className="media-body align-self-center">
                        <div className="rating">
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <Link href={`/${product.slug}`}>
                          <a>
                            <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
                          </a>
                        </Link>
                        <h4>
                          <NumberFormat
                            value={product.currentPrice}
                            thousandSeparator={true}
                            displayType="text"
                            suffix={product.currencySymbol}
                            decimalScale={0}
                          />
                          {product.discountPercent > 1 ? (
                            <del>
                              <span className="money ml-1">
                                <NumberFormat
                                  value={product.price}
                                  thousandSeparator={true}
                                  displayType="text"
                                  suffix={product.currencySymbol}
                                  decimalScale={0}
                                />
                              </span>
                            </del>
                          ) : (
                            ""
                          )}
                        </h4>
                      </div>
                    </div>
                  ))}
              </div>
            </Slider>
          </div>
        </Col> */}
      </Row>
    </Container>
  );
}
