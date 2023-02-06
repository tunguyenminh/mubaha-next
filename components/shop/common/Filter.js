import React, { useState } from "react";
import { Col, Media } from "reactstrap";
import sideBanner from "../../../public/assets/images/side-banner.png";
import Slider from "react-slick";
import Category from "./Category";
import Brand from "./Brand";
import Color from "./Color";
import Size from "./Size";
import Price from "./Price";
import SideProductCart from "@/components/SideProductCart";
import InputRange from "react-input-range";
import NumberFormat from "react-number-format";
import ProductType from "./ProductType";

const FilterPage = ({ sm, sidebarView, closeSidebar, newProducts, handleCallApi, limit, orderBy }) => {
  const [value, setValue] = useState({ min: 0, max: 10000000 });
  return (
    <>
      <Col sm={sm} className="collection-filter" style={sidebarView ? { left: "0px" } : {}}>
        {/* <!-- side-bar colleps block stat --> */}
        <div className="collection-filter-block">
          {/* <!-- brand filter start --> */}
          <div className="collection-mobile-back" onClick={() => closeSidebar()}>
            <span className="filter-back">
              <i className="fa fa-angle-left" aria-hidden="true"></i> back
            </span>
          </div>
          <Category />
          <Brand />
          <ProductType />
          {/* <Color />
          <Size /> */}
          <div className="collection-collapse-block border-0 open">
            <h3 className="collapse-block-title">Giá</h3>
            <div className="collection-collapse-block-content">
              <div className="wrapper mt-3">
                <div className="range-slider">
                <InputRange
                    minValue={0}
                    maxValue={10000000}
                    step={500000}
                    value={value}
                    formatLabel={(value) => (
                      <NumberFormat
                        value={value}
                        thousandSeparator={true}
                        displayType="text"
                        suffix="₫"
                        decimalScale={0}
                      />
                    )}
                    onChangeComplete={(value) => {
                      handleCallApi(limit, 1, orderBy, value);
                    }}
                    onChange={(value) => {
                      setValue(value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* side-bar single product slider start */}
        <div className="theme-card">
          <h5 className="title-border">Sản phẩm mới</h5>
          <Slider slidesPerRow={3} className="offer-slider slide-1">
            {newProducts.map((product) => {
              return <SideProductCart key={product._id} product={product} />;
            })}
          </Slider>
        </div>
        {/* side-bar single product slider end */}
        <div className="collection-sidebar-banner">
          <a href={null}>
            <Media src={sideBanner.src} className="img-fluid blur-up lazyload" alt="" />
          </a>
        </div>
        {/* <!-- side-bar banner end here --> */}
      </Col>
    </>
  );
};

export default FilterPage;
