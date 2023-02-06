import React, { useState } from "react";
import { Collapse } from "reactstrap";

const Filter = () => {
  // Handle Brand
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const toggleBrand = () => setIsBrandOpen(!isBrandOpen);
  return (
    <div className="collection-filter-block">
      <div className="collection-mobile-back">
        <span className="filter-back">
          <i className="fa fa-angle-left" aria-hidden="true" />
          back
        </span>
      </div>
      <div className="collection-collapse-block border-0 open">
        <h3 className="collapse-block-title" onClick={toggleBrand}>
          Thương hiệu
        </h3>
        <Collapse isOpen={isBrandOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                <li>
                  <a>Quần, áo</a>
                </li>
                <li>
                  <a>Túi</a>
                </li>
                <li>
                  <a>Giày, dép</a>
                </li>
                <li>
                  <a>Đồng hồ</a>
                </li>
                <li>
                  <a>Phụ kiện</a>
                </li>
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Filter;
