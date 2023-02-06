import React, { useState, useEffect, useRef, useContext } from "react";
import Slider from "react-slick";
import Image from "next/image";
import SideProductCart from "@/components/SideProductCart";
import ProductCard from "@/components/ProductCard";
import { Row, Col, Media, Collapse } from "reactstrap";
import { useRouter } from "next/router";
// import products from "./products.json";
import API from "@/services/api";
import Head from "next/head";
import InputRange from "react-input-range";
import FilterContext from "../filter/FilterContext";
import Layout from "@/components/Layout";
import HeadSeo from "../components/HeadSeo";

export default function ListProduct({ results, newProducts }) {
  // const products = data.products.splice(0, 20);
  const [sidebarView, setSidebarView] = useState(false);

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };

  // handle Price

  const context = useContext(FilterContext);
  const router = useRouter();
  const [url, setUrl] = useState();
  useEffect(() => {
    const pathname = window.location.pathname;
    setUrl(pathname);
  }, []);

  return (
    <>
      <HeadSeo title={`Danh sách sản phẩm`} />

      {/* breadcrumb start */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="page-title">
                <h2>collection</h2>
              </div>
            </div>
            <div className="col-sm-6">
              <nav aria-label="breadcrumb" className="theme-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    collection
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* breadcrumb end */}

      {/* section start */}
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <div className="container">
            <div className="row">
              <Col sm={3} className="collection-filter">
                {/* side-bar colleps block stat */}
                <div className="collection-filter-block">
                  {/* brand filter start */}
                  <div
                    className="collection-mobile-back"
                    onClick={() => openCloseSidebar(sidebarView)}
                  >
                    <span className="filter-back">
                      <i className="fa fa-angle-left" aria-hidden="true" /> back
                    </span>
                  </div>
                  {/* category filter start here */}
                  <div className="collection-collapse-block open">
                    <h3 className="collapse-block-title">category</h3>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <ul className="category-list">
                          <li>
                            <a href={null} onClick={() => updateCategory("all")}>
                              all products
                            </a>
                          </li>
                          <li>
                            <a href={null} onClick={() => updateCategory("fashion")}>
                              fashion
                            </a>
                          </li>
                          <li>
                            <a href={null} onClick={() => updateCategory("electronics")}>
                              electronics
                            </a>
                          </li>
                          <li>
                            <a href={null} onClick={() => updateCategory("vegetables")}>
                              vegetables
                            </a>
                          </li>
                          <li>
                            <a href={null} onClick={() => updateCategory("furniture")}>
                              furniture
                            </a>
                          </li>
                          <li>
                            <a href={null} onClick={() => updateCategory("jewellery")}>
                              jewellery
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* brand filter start here */}
                  <div className="collection-collapse-block open">
                    <h3 className="collapse-block-title">brand</h3>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <div className="form-check collection-filter-checkbox">
                          <input type="checkbox" className="form-check-input" id="zara" />
                          <label className="form-check-label" htmlFor="zara">
                            zara
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input type="checkbox" className="form-check-input" id="vera-moda" />
                          <label className="form-check-label" htmlFor="vera-moda">
                            vera-moda
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input type="checkbox" className="form-check-input" id="forever-21" />
                          <label className="form-check-label" htmlFor="forever-21">
                            forever-21
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input type="checkbox" className="form-check-input" id="roadster" />
                          <label className="form-check-label" htmlFor="roadster">
                            roadster
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input type="checkbox" className="form-check-input" id="only" />
                          <label className="form-check-label" htmlFor="only">
                            only
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* color filter start here */}
                  <div className="collection-collapse-block open">
                    <h3 className="collapse-block-title">colors</h3>
                    <div className="collection-collapse-block-content">
                      <div className="color-selector">
                        <ul>
                          <li className="color-1 active" />
                          <li className="color-2" />
                          <li className="color-3" />
                          <li className="color-4" />
                          <li className="color-5" />
                          <li className="color-6" />
                          <li className="color-7" />
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* size filter start here */}
                  <div className="collection-collapse-block border-0 open">
                    <h3 className="collapse-block-title">size</h3>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <div className="form-check collection-filter-checkbox">
                          <input type="checkbox" className="form-check-input" id="hundred" />
                          <label className="form-check-label" htmlFor="hundred">
                            s
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input type="checkbox" className="form-check-input" id="twohundred" />
                          <label className="form-check-label" htmlFor="twohundred">
                            m
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input type="checkbox" className="form-check-input" id="threehundred" />
                          <label className="form-check-label" htmlFor="threehundred">
                            l
                          </label>
                        </div>
                        <div className="form-check collection-filter-checkbox">
                          <input type="checkbox" className="form-check-input" id="fourhundred" />
                          <label className="form-check-label" htmlFor="fourhundred">
                            xl
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* price filter start here */}
                  <div className="collection-collapse-block border-0 open">
                    <h3 className="collapse-block-title">price</h3>
                    <div className="collection-collapse-block-content">
                      <div className="wrapper mt-3">
                        <div className="range-slider">
                          <InputRange
                            maxValue={500}
                            minValue={0}
                            // value={price}
                            onChange={(price) => {
                              setSelectedPrice(price),
                                router.push(
                                  `${url}?category=${context.state}&brand=${context.selectedBrands}&color=${context.selectedColor}&size=${context.selectedSize}&minPrice=${context.selectedPrice.min}&maxPrice=${context.selectedPrice.max}`
                                );
                            }}
                            onChangeComplete={(price) => {
                              context.setSelectedPrice(price),
                                router.push(
                                  `${url}?category=${context.state}&brand=${context.selectedBrands}&color=${context.selectedColor}&size=${context.selectedSize}&minPrice=${context.selectedPrice.min}&maxPrice=${context.selectedPrice.max}`
                                );
                            }}
                            type="text"
                            className="js-range-slider"
                            defaultValue
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* silde-bar colleps block end here */}
                {/* side-bar single product slider start */}
                <div className="theme-card">
                  <h5 className="title-border">new product</h5>
                  <Slider slidesPerRow={3} className="offer-slider slide-1">
                    {newProducts.map((product) => (
                      <SideProductCart key={product._id} product={product} />
                    ))}
                  </Slider>
                </div>
                {/* side-bar single product slider end */}
                {/* side-bar banner start here */}
                <div className="collection-sidebar-banner">
                  <a href="#">
                    <img
                      src="../assets/images/side-banner.png"
                      className="img-fluid blur-up lazyload"
                      alt=""
                    />
                  </a>
                </div>
                {/* side-bar banner end here */}
              </Col>
              <Col className="collection-content">
                <div className="page-main-content">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="top-banner-wrapper">
                        <a href="#">
                          <img
                            src="../assets/images/mega-menu/2.jpg"
                            className="img-fluid blur-up lazyload"
                            alt=""
                          />
                        </a>
                        <div className="top-banner-content small-section">
                          <h4>BIGGEST DEALS ON TOP BRANDS</h4>
                          <p>
                            The trick to choosing the best wear for yourself is to keep in mind your
                            body type, individual style, occasion and also the time of day or
                            weather. In addition to eye-catching products from top brands, we also
                            offer an easy 30-day return and exchange policy, free and fast shipping
                            across all pin codes, cash or card on delivery option, deals and
                            discounts, among other perks. So, sign up now and shop for westarn wear
                            to your heart’s content on MUBAHA.{" "}
                          </p>
                        </div>
                      </div>
                      <div className="collection-product-wrapper">
                        <div className="product-top-filter">
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="filter-main-btn">
                                <span className="filter-btn btn btn-theme">
                                  <i className="fa fa-filter" aria-hidden="true" /> Filter
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="product-filter-content">
                                <div className="search-count">
                                  <h5>Showing Products 1-24 of 10 Result</h5>
                                </div>
                                <div className="collection-view">
                                  <ul>
                                    <li>
                                      <i className="fa fa-th grid-layout-view" />
                                    </li>
                                    <li>
                                      <i className="fa fa-list-ul list-layout-view" />
                                    </li>
                                  </ul>
                                </div>
                                <div className="collection-grid-view">
                                  <ul>
                                    <li>
                                      <img
                                        src="../assets/images/icon/2.png"
                                        alt=""
                                        className="product-2-layout-view"
                                      />
                                    </li>
                                    <li>
                                      <img
                                        src="../assets/images/icon/3.png"
                                        alt=""
                                        className="product-3-layout-view"
                                      />
                                    </li>
                                    <li>
                                      <img
                                        src="../assets/images/icon/4.png"
                                        alt=""
                                        className="product-4-layout-view"
                                      />
                                    </li>
                                    <li>
                                      <img
                                        src="../assets/images/icon/6.png"
                                        alt=""
                                        className="product-6-layout-view"
                                      />
                                    </li>
                                  </ul>
                                </div>
                                <div className="product-page-per-view">
                                  <select>
                                    <option value="High to low">24 Products Par Page</option>
                                    <option value="Low to High">50 Products Par Page</option>
                                    <option value="Low to High">100 Products Par Page</option>
                                  </select>
                                </div>
                                <div className="product-page-filter">
                                  <select>
                                    <option value="High to low">Sorting items</option>
                                    <option value="Low to High">50 Products</option>
                                    <option value="Low to High">100 Products</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="product-wrapper-grid">
                          <div className="row margin-res">
                            {results.docs.map((product) => (
                              <Col xl={3} lg={4} col={6} key={product._id}>
                                <ProductCard key={product._id} product={product} />
                              </Col>
                            ))}
                          </div>
                        </div>
                        <div className="section-t-space">
                          <div className="text-center">
                            <Row>
                              <Col xl="12" md="12" sm="12">
                                <button>Load More</button>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </div>
          </div>
        </div>
      </section>
      {/* section End */}
    </>
  );
}

ListProduct.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  const response = await API.instance.get("/products");
  const data = response.data.data;
  return {
    props: {
      results: data.results,
      newProducts: data.newProducts,
    },
  };
}
