import _ from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import Head from "next/head";
import SideProductCart from "@/components/SideProductCart";
import { Row, Col, Media, Container, Input, Modal, ModalBody } from "reactstrap";
import RelatedProducts from "@/components/RelatedProducts";
import Layout from "@/components/Layout";
import ProductTab from "@/components/common/product-details/product-tab";
import Services from "@/components/common/product-details/services";
import Filter from "@/components/common/product-details/filter";
import CountdownComponent from "@/components/common/widgets/countdownComponent";
import ProductPrice from "@/components/common/ProductDetails/ProductPrice";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "@/styles/slug.module.css";
// import Modal from "react-awesome-modal";

import priceCalculator from "@/utils/priceCalculator";

import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  MailruShareButton,
  LinkedinShareButton,
} from "react-share";
import NumberFormat from "react-number-format";
import HeadSeo from "../../components/HeadSeo";
import siteMetadata from "../../store/siteMetadata";
import StarRating from "@/components/filterOptions/StarRating";
let timeOut_1;
export default function ProductDetail({ detailProduct, relatedProducts, newProducts }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [variantColor, setVariantColor] = useState();
  const [attributes, setAttributes] = useState();
  const [shareUrl, setShareUrl] = useState();
  const [priceProduct, setPriceProduct] = useState();
  const [discount, setDiscount] = useState(0);
  const [selectedSize, setSlectedSize] = useState();
  const [unSelect, setUnSelect] = useState(false);

  function closeModal() {
    setVisible(false);
  }
  const addToCart = async () => {
    if (session === null) {
      const payload = {
        slug: detailProduct.slug,
      };
      router.push({
        pathname: "/auth/login",
        query: payload,
      });
    } else {
      let isDone = false;
      let body = {
        productId: detailProduct._id,
        amount: quantity || 1,
      };
      if (detailProduct.variants.length > 0) {
        if (detailProduct.variants[0].attributes.length > 0) {
          if (selectedSize == undefined) {
            setUnSelect(true);
          } else {
            isDone = true;
            body = {
              ...body,
              selectedVariant: variantColor,
              selectedAttribute: selectedSize,
            };
          }
        } else {
          if (variantColor == undefined) {
            setUnSelect(true);
          } else {
            isDone = true;
            body = {
              ...body,
              selectedVariant: variantColor,
            };
          }
        }
      } else if (detailProduct.variants.length == 0) {
        isDone = true;
      }
      if (isDone) {
        const response = await fetch(process.env.API_CART_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.accessToken,
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (data.status === 200) {
          setVisible(true);
          timeOut_1 = setTimeout(() => setVisible(false), 1500);
        } else {
          alert(data.message);
        }
      }
    }
  };

  useEffect(() => {
    if (detailProduct.variants.length > 0) {
      setPriceProduct(null);
      setDiscount(null);
    } else {
      setPriceProduct(detailProduct.price);
      setDiscount(detailProduct.discount);
    }

    setShareUrl(window.location.href);
    return () => {
      clearTimeout(timeOut_1);
    };
  }, []);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const changeQty = (e) => {
    var reg = new RegExp("^[0-9]*$");
    if (reg.test(e.target.value)) {
      setQuantity(e.target.value);
    }
  };
  const handleCrease = () => {
    if (quantity < 2) return;
    setQuantity(quantity - 1);
  };
  const [selectedVariant, setSelectedVariant] = useState();

  const selectedColor = (e, variant) => {
    setSelectedVariant(variant._id);
    if (variant.attributes.length === 0) {
      setPriceProduct(variant.price);
      setDiscount(variant.discount);
    }
    setVariantColor(variant._id);
    setUnSelect(false);
    const index = detailProduct.media.data.findIndex((e) => e._id === variant.imageId);
    slider1.current.slickGoTo(index);
    setAttributes(variant.attributes);
  };

  const handleSelectedSize = (size) => {
    setSlectedSize(size._id);
    setUnSelect(false);
    setPriceProduct(size.price);
    setDiscount(size.discount);
  };

  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });

    setAttributes(detailProduct?.variants[0]?.size);
  }, []);
  const { nav1, nav2 } = state;

  let propertySlider = {
    slidesToShow: 1,
    SlidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
    infinite: false,
  };
  var productsnav = {
    infinite: false,
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };
  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };
  const handleCheckout = async () => {
    if (session === null) {
      const payload = {
        slug: detailProduct.slug,
      };
      router.push({
        pathname: "/auth/login",
        query: payload,
      });
    } else {
      let isDone = false;
      let body = {
        productId: detailProduct._id,
        amount: quantity || 1,
      };
      if (detailProduct.variants.length > 0) {
        if (detailProduct.variants[0].attributes.length > 0) {
          if (selectedSize == undefined) {
            setUnSelect(true);
          } else {
            isDone = true;
            body = {
              ...body,
              selectedVariant: variantColor,
              selectedAttribute: selectedSize,
            };
          }
        } else {
          if (variantColor == undefined) {
            setUnSelect(true);
          } else {
            isDone = true;
            body = {
              ...body,
              selectedVariant: variantColor,
            };
          }
        }
      } else if (detailProduct.variants.length == 0) {
        isDone = true;
      }
      if (isDone) {
        const response = await fetch(process.env.API_CART_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.accessToken,
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (data.status === 200) {
          setVisible(true);
          timeOut_1 = setTimeout(() => setVisible(false), 1000);
          router.push(
            {
              pathname: "/cart",
              query: { cartId: data.data._id },
            },
            "/cart"
          );
        } else {
          alert(data.message);
        }
      }
    }
  };
  return (
    <>
      <HeadSeo
        title={`${detailProduct.name}`}
        description={_.truncate(detailProduct.description.replace(/(<([^>]+)>)/gi, ""), {
          length: 155,
        })}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogImageUrl={detailProduct.media.featuredImage}
        ogType={"website"}
      />
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="page-title">
                <h2>Sản phẩm</h2>
              </div>
            </div>
            <div className="col-sm-6">
              <nav aria-label="breadcrumb" className="theme-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a>Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Sản phẩm
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="collection-wrapper">
          <Container>
            <Row>
              <Col lg={9} sm={12} xs={12}>
                <div className="container-fluid">
                  <Row>
                    <Col xl={12}>
                      <div className="filter-main-btn mb-2">
                        <span onClick={filterClick} className="filter-btn">
                          <i className="fa fa-filter" aria-hidden="true"></i> filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                  {!detailProduct.media.data || detailProduct.media.length === 0 ? (
                    "loading"
                  ) : (
                    <Row>
                      {/* Slider */}
                      <Col lg={6} className="product-thumbnail">
                        <Slider
                          {...propertySlider}
                          asNavFor={nav2}
                          ref={(slider) => (slider1.current = slider)}
                          className="product-slick"
                        >
                          {detailProduct.media.data.map((item, index) => (
                            <div key={index}>
                              <Media
                                src={item.path}
                                alt=""
                                className="img-fluid blur-up lazyload"
                              />
                            </div>
                          ))}
                        </Slider>
                        <Slider
                          className="slider-nav"
                          {...productsnav}
                          asNavFor={nav1}
                          ref={(slider) => (slider2.current = slider)}
                        >
                          {detailProduct.variants
                            ? detailProduct.media.data.map((item, index) => (
                                <div key={index}>
                                  <Media src={`${item.path}`} className="img-fluid" />
                                </div>
                              ))
                            : ""}
                        </Slider>
                      </Col>
                      {/* Slider end*/}
                      <Col lg={6} className="rtl-text">
                        {/* DetailsWithPrice */}
                        <div className="product-right">
                          <h2>{detailProduct.name}</h2>
                          <div className="rating-section">
                            <div className="rating">
                              <StarRating value={detailProduct.avgRating} />
                            </div>
                            {/* <div className="rating">
                              <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
                              <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
                              <i className="fa fa-star" />
                            </div> */}
                            <h6>{detailProduct.totalReviews} đánh giá</h6>
                          </div>
                          <h3 className="price-detail">
                            {/* {discount && discount > 0.0 ? (
                              <del>
                                <span className="money ml-1">
                                  <NumberFormat
                                    value={priceProduct}
                                    thousandSeparator={true}
                                    displayType="text"
                                    suffix={detailProduct.currencySymbol}
                                    decimalScale={0}
                                  />
                                </span>
                              </del>
                            ) : null} */}
                            {priceProduct ? (
                              <ProductPrice
                                price={priceProduct}
                                discount={discount}
                                currencySymbol={detailProduct.currencySymbol}
                              />
                            ) : (
                              <>
                                <ProductPrice
                                  price={detailProduct.priceRange.min}
                                  discount={discount}
                                  currencySymbol={detailProduct.currencySymbol}
                                />{" "}
                                -{" "}
                                <ProductPrice
                                  price={detailProduct.priceRange.max}
                                  discount={discount}
                                  currencySymbol={detailProduct.currencySymbol}
                                />
                              </>
                            )}
                          </h3>
                          <div className="p-2" style={{ backgroundColor: unSelect && "#fff2e0" }}>
                            {detailProduct.variantLabel && (
                              <>
                                <h6 className="product-title size-text">
                                  {detailProduct.variantLabel}
                                </h6>
                                <ul className="color-variant mt-1">
                                  {detailProduct.variants[0]?.attributes.length > 0 ? (
                                    <>
                                      {detailProduct.variants.map((variant) => {
                                        return (
                                          <li
                                            style={
                                              selectedVariant === variant._id
                                                ? {
                                                    border: "1px solid #ffa200",
                                                    color: "#ffa200",
                                                  }
                                                : {}
                                            }
                                            key={variant._id}
                                            checked={selectedVariant === variant._id}
                                            value={variantColor}
                                            onClick={(e) => selectedColor(e, variant)}
                                          >
                                            {variant.name}
                                            <img
                                              style={
                                                selectedVariant === variant._id
                                                  ? {
                                                      display: "block",
                                                    }
                                                  : {}
                                              }
                                              className={`selected-indicator ${styles.tickImage}`}
                                              src="../assets/images/selected-variant-indicator.svg"
                                              alt="Selected"
                                            ></img>
                                          </li>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <>
                                      {detailProduct.variants.map((variant) => {
                                        return (
                                          <li
                                            className={
                                              variant.stock.quantity == 0 && styles.disabled
                                            }
                                            style={
                                              selectedVariant === variant._id
                                                ? {
                                                    border: "1px solid #ffa200",
                                                    color: "#ffa200",
                                                  }
                                                : {}
                                            }
                                            key={variant._id}
                                            checked={selectedVariant === variant._id}
                                            value={variantColor}
                                            onClick={(e) => selectedColor(e, variant)}
                                          >
                                            {variant.name}
                                            <img
                                              style={
                                                selectedVariant === variant._id
                                                  ? {
                                                      display: "block",
                                                    }
                                                  : {}
                                              }
                                              className={`selected-indicator ${styles.tickImage}`}
                                              src="../assets/images/selected-variant-indicator.svg"
                                              alt="Selected"
                                            ></img>
                                          </li>
                                        );
                                      })}
                                    </>
                                  )}
                                </ul>
                              </>
                            )}
                            {detailProduct.variants[0]?.attributes.length > 0 && (
                              <>
                                <h6 className="product-title size-text">
                                  {variantColor === undefined
                                    ? `Vui lòng chọn ${detailProduct.variantLabel} trước`
                                    : detailProduct.attributeLabel}
                                </h6>

                                <div className="size-box">
                                  <ul>
                                    {attributes?.map((size) => (
                                      <li
                                        className={size.stock.quantity == 0 && styles.disabled}
                                        style={
                                          selectedSize === size._id
                                            ? { lineHeight: 2.3, border: "1px solid #ffa200" }
                                            : { lineHeight: 2.3 }
                                        }
                                        checked={selectedSize === size._id}
                                        key={size._id}
                                        onClick={() => handleSelectedSize(size)}
                                      >
                                        {size.name}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            )}
                            {unSelect && (
                              <div className="d-flex">
                                <span style={{ color: "red" }}>
                                  <i className="fa fa-solid fa-exclamation mr-2"></i> Vui lòng chọn
                                  sản phẩm
                                </span>
                              </div>
                            )}
                          </div>
                          <Modal isOpen={visible}>
                            <ModalBody className="my-5">
                              <div className="text-center">
                                <img
                                  width="100"
                                  height="100"
                                  src="/assets/icon/success-popup.svg"
                                />
                              </div>
                              <div className="text-center mt-3">
                                <p>Sản phẩm đã được thêm vào Giỏ hàng</p>
                              </div>
                            </ModalBody>
                          </Modal>

                          <div
                            id="selectSize"
                            className="addeffect-section product-description border-product"
                          >
                            <h6 className="product-title">Số lượng</h6>
                            <div className="qty-box">
                              <div className="input-group">
                                <span className="input-group-prepend">
                                  <button
                                    type="button"
                                    className="btn quantity-left-minus"
                                    onClick={handleCrease}
                                    data-type="minus"
                                    data-field=""
                                  >
                                    <i className="fa fa-angle-left"></i>
                                  </button>
                                </span>
                                <Input
                                  type="text"
                                  pattern="[0-9]+"
                                  name="quantity"
                                  value={quantity}
                                  min={1}
                                  onChange={changeQty}
                                  className="form-control input-number"
                                />
                                <span className="input-group-prepend">
                                  <button
                                    type="button"
                                    className="btn quantity-right-plus"
                                    // onClick={() => plusQty(product)}
                                    onClick={handleIncrease}
                                    data-type="plus"
                                    data-field=""
                                  >
                                    <i className="fa fa-angle-right"></i>
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="product-buttons">
                            <button
                              style={{
                                background: "transparent",
                                border: "0px",
                                padding: "0px",
                              }}
                            >
                              <a
                                style={{ margin: "0px" }}
                                id="cartEffect"
                                className="btn btn-solid btn-animation"
                                onClick={() => addToCart(detailProduct, quantity, variantColor)}
                              >
                                <i className="fa fa-shopping-cart mx-2" aria-hidden="true" />
                                Thêm giỏ hàng
                              </a>
                            </button>
                            <button
                              style={{
                                background: "transparent",
                                border: "0px",
                                padding: "1px 6px 1px 0px",
                              }}
                            >
                              <a className="btn btn-solid" onClick={handleCheckout}>
                                <i className="fa fa-bookmark fz-16 mx-2" aria-hidden="true" />
                                Mua ngay
                              </a>
                            </button>
                          </div>
                          <div className="border-product">
                            <h6 className="product-title">Chia sẻ</h6>
                            <div className="product-icon">
                              <ul className="product-social">
                                <li>
                                  <a>
                                    <FacebookShareButton
                                      url={shareUrl}
                                      hashtag={"#MUBAHA"}
                                      quote={"Sàn thương mại điện tử bán sỉ hàng đầu Việt Nam"}
                                    >
                                      <i className="fa fa-facebook" />
                                    </FacebookShareButton>
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <TelegramShareButton
                                      url={shareUrl}
                                      hashtag={"#MUBAHA"}
                                      quote={"Sàn thương mại điện tử bán sỉ hàng đầu Việt Nam"}
                                    >
                                      <i className="fa fa-telegram" />
                                    </TelegramShareButton>
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <TwitterShareButton
                                      url={shareUrl}
                                      hashtag={"#MUBAHA"}
                                      quote={"Sàn thương mại điện tử bán sỉ hàng đầu Việt Nam"}
                                    >
                                      <i className="fa fa-twitter" />
                                    </TwitterShareButton>
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <MailruShareButton
                                      url={shareUrl}
                                      hashtag={"#MUBAHA"}
                                      quote={"Sàn thương mại điện tử bán sỉ hàng đầu Việt Nam"}
                                    >
                                      <i className="fa fa-google-plus" />
                                    </MailruShareButton>
                                  </a>
                                </li>
                                <li>
                                  <a>
                                    <LinkedinShareButton
                                      url={shareUrl}
                                      hashtag={"#MUBAHA"}
                                      quote={"Sàn thương mại điện tử bán sỉ hàng đầu Việt Nam"}
                                    >
                                      <i className="fa fa-linkedin" />
                                    </LinkedinShareButton>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="border-product">
                            {/* <h6 className="product-title">Thời gian khuyễn mãi</h6>
                            <CountdownComponent /> */}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  )}
                </div>

                {/* Vendor */}
                <section>
                  <div className={`${styles.vendorBox} ${styles.product_shop}`}>
                    <div className={`${styles.leftVendor}`}>
                      <a
                        className={`${styles._3IIjTV}`}
                        href={`/vendors/${detailProduct.vendor.ownerRef.username}`}
                      >
                        <div className={`${styles.mubaha_avatar}`}>
                          <img
                            className={`${styles.shopee_avatar_img}`}
                            src={detailProduct.vendor.avatar}
                          />
                        </div>
                      </a>
                      <div className={`${styles._27NV_r}`}>
                        <div className={`${styles._1wVLAc}`}>
                          <a>{detailProduct.vendor.brandName}</a>
                        </div>
                        <div className={`${styles.WvDg_k}`}>Online 1 giờ trước</div>
                        <div className={`${styles._1NgpoA}`}>
                          <Link href={`/vendors/${detailProduct.vendor.ownerRef.username}`}>
                            <a className="btn btn-light btn--s btn--inline btn-light--link _1bsnOp">
                              xem shop
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles.rightVendor}`}>
                      <div className={`${styles._1utN4D}`}>
                        <button className={`${styles._14x4GD} ${styles.gy4qkp}`}>
                          <label>Đánh giá</label>
                          <span>{detailProduct.vendor.ratingOverall}</span>
                        </button>
                        <button className={`${styles._14x4GD} ${styles.gy4qkp}`}>
                          <label>tỷ lệ phản hồi</label>
                          <span>{detailProduct.vendor.responseRate}</span>
                        </button>
                      </div>
                      <div className={`${styles._1utN4D}`}>
                        <button className={`${styles._14x4GD} ${styles.gy4qkp}`}>
                          <label>tham gia</label>
                          <span>3 năm trước</span>
                        </button>
                        <button className={`${styles._14x4GD} ${styles.gy4qkp}`}>
                          <label>Người theo dõi</label>
                          <span>{detailProduct.vendor.followers}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Vendor end */}
                <ProductTab detailProduct={detailProduct} />
              </Col>
              <Col sm={3} className="collection-filter">
                <Filter />
                <Services />
                <div className="theme-card">
                  <h5 className="title-border">Sản phẩm mới</h5>
                  <Slider slidesPerRow={5} className="offer-slider slide-1">
                    {newProducts
                      ? newProducts.map((product) => {
                          return <SideProductCart key={product._id} product={product} />;
                        })
                      : null}
                  </Slider>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <RelatedProducts data={relatedProducts} />
    </>
  );
}

ProductDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const response = await fetch(`${process.env.API_URL}/products/${slug}`);
  const { data, status, message } = await response.json();

  if (status != 200)
    return {
      notFound: true,
    };

  return {
    props: {
      detailProduct: data.detailProduct,
      relatedProducts: data.relatedProducts,
      newProducts: data.newProducts,
    },
  };
}
