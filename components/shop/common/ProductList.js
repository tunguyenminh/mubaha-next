import React, { useState } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import Menu2 from "../../../public/assets/images/mega-menu/2.jpg";
import PostLoader from "../../common/PostLoader";
import ProductItem2 from "../../common/product-box/ProductBox1";
import Slider from "react-slick";
import MasterBanner from "@/components/MasterBanner";

const ProductList = ({
  colClass,
  layoutList,
  openSidebar,
  noSidebar,
  listProduct,
  products,
  limit,
  handleCallApi,
  handlePagination,
  value,
  orderBy,
  totalProduct,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [layout, setLayout] = useState(layoutList);
  const [grid, setGrid] = useState(colClass);
  const [isLoading, setIsLoading] = useState(false);
  const [limitView, setLimitView] = useState(limit);
  const [orderByView, setOrderByView] = useState(orderBy);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  return (
    <Col className="collection-content col-sm-9">
      <div className="page-main-content">
        <Row style={{ flexWrap: "nowrap" }}>
          <Col sm="12">
            <div className="top-banner-wrapper">
              <div className="p-0">
                <Slider className="slide-1 home-slider">
                  <a href={null}>
                    <Media src={Menu2.src} className="img-fluid blur-up lazyload" alt="" />
                  </a>
                  <a href={null}>
                    <Media src={Menu2.src} className="img-fluid blur-up lazyload" alt="" />
                  </a>
                </Slider>
              </div>

              <div className="top-banner-content small-section">
                <h4>Thời trang</h4>
                <h5>
                  Shop khuyến khích các bạn sử dụng mã Freeship Extra để được giảm tiền ship tối đa
                </h5>
                <p>
                  Fear of God (FOG) được ra mắt vào năm 2012, bởi Jerry Lorenzo - một ông bố trẻ
                  tuổi trước đó chưa hề theo học một khóa thời trang bài bản. Chỉ trong vài năm ngắn
                  ngủi, thương hiệu đã nhanh chóng thu hút một số lượng người hâm mộ khổng lồ, bao
                  gồm cả các ngôi sao hàng đầu như Justin Bieber, Kanye West hay Kendall Jenner.
                  Phong cách đặc trưng của FOG là “grunge” (style ăn mặc thể hiện sự thoải mái,
                  phóng khoáng đi kèm một chút luộm thuộm) bằng cách pha trộn tinh thần rock’n’roll
                  và màu sắc tôn giáo một cách khéo léo trên những trang phục cơ bản của mình. Cách
                  layering item mới mẻ và những chiếc áo oversize cực chất đã tạo ra một xu hướng
                  mới trong làng thời trang đương đại. Kể từ khi xuất hiện vào năm 2013, Fear Of God
                  đã nhanh chóng trở thành biểu tượng của những người yêu thích sự trẻ trung, năng
                  động nhưng vẫn mang cái “chất” chứng tỏ bản ngã tuổi trẻ của mình.
                </p>
              </div>
            </div>
            <Row>
              <Col xs="12">
                <ul className="product-filter-tags"></ul>
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                {!noSidebar ? (
                  <Row>
                    <Col xl="12">
                      <div className="filter-main-btn" onClick={() => openSidebar()}>
                        <span className="filter-btn btn btn-theme">
                          <i className="fa fa-filter" aria-hidden="true"></i> Filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                <Row>
                  <Col>
                    <div className="product-filter-content">
                      <div className="search-count">
                        <h5>
                          {listProduct
                            ? `Hiển thị 1 - ${listProduct.length} trên ${totalProduct}`
                            : "loading..."}{" "}
                          Sản phẩm
                        </h5>
                      </div>
                      <div className="collection-view">
                        <ul>
                          <li>
                            <i
                              className="fa fa-th grid-layout-view"
                              onClick={() => {
                                setLayout("");
                                setGrid("col-lg-3");
                              }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="fa fa-list-ul list-layout-view"
                              onClick={() => {
                                setLayout("list-view");
                                setGrid("col-lg-12");
                              }}
                            ></i>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="collection-grid-view"
                        style={layout === "list-view" ? { opacity: 0 } : { opacity: 1 }}
                      >
                        <ul>
                          <li>
                            <Media
                              src={`/assets/images/icon/2.png`}
                              alt=""
                              className="product-2-layout-view"
                              onClick={() => setGrid("col-lg-6")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/3.png`}
                              alt=""
                              className="product-3-layout-view"
                              onClick={() => setGrid("col-lg-4")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/4.png`}
                              alt=""
                              className="product-4-layout-view"
                              onClick={() => setGrid("col-lg-3")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/6.png`}
                              alt=""
                              className="product-6-layout-view"
                              onClick={() => setGrid("col-lg-2")}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="product-page-per-view">
                        <select
                          onChange={(e) => {
                            setLimitView(parseInt(e.target.value));
                            handleCallApi(e.target.value, 1, orderByView, value);
                          }}
                        >
                          <option value="8">8 Sản phẩm </option>
                          <option value="10">10 Sản phẩm</option>
                          <option value="15">15 Sản phẩm</option>
                          <option value="20">20 Sản phẩm</option>
                        </select>
                      </div>
                      <div className="product-page-filter">
                        <select
                          onChange={(e) => {
                            setOrderByView(e.target.value);
                            handleCallApi(limitView, 1, e.target.value, value);
                          }}
                        >
                          <option value="">Sắp xếp theo</option>
                          <option value="ascPrice">Tăng dần</option>
                          <option value="descPrice">Giảm dần</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {/* Product Box */}
                  {!listProduct || !listProduct || listProduct.length === 0 ? (
                    listProduct && listProduct && listProduct.length === 0 ? (
                      <Col xs="12">
                        <div>
                          <div className="col-sm-12 empty-cart-cls text-center">
                            <img
                              src={`/assets/images/empty-search.jpg`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                            />
                            <h3>
                              <strong>Không có sản phẩm nào</strong>
                            </h3>
                          </div>
                        </div>
                      </Col>
                    ) : (
                      <div className="row mx-0 margin-default mt-4">
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                      </div>
                    )
                  ) : (
                    listProduct.map((product, i) => (
                      <div className={grid} key={i}>
                        <div className="product">
                          <div>
                            <ProductItem2
                              des={true}
                              product={product}
                              cartClass="cart-info cart-wrap"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </Row>
              </div>

              {listProduct.length > 0 && listProduct.length < totalProduct && (
                <>
                  <div className="section-t-space">
                    <div className="text-center">
                      <Row>
                        <Col xl="12" md="12" sm="12">
                          {listProduct && listProduct && (
                            <Button
                              onClick={() => {
                                handlePagination();
                              }}
                            >
                              {isLoading && <Spinner animation="border" variant="light" />}
                              Xem thêm
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductList;
