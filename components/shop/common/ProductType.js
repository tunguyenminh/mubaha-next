import React, { useState } from "react";
import { Collapse, Input } from "reactstrap";

const ProductType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBrand = () => setIsOpen(!isOpen);
  return (
    <>
      {/* brand filter start here */}
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleBrand}>
          Loại sản phẩm
        </h3>
        <Collapse isOpen={isOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input type="checkbox" className="custom-control-input" id="zara" />
                <label className="custom-control-label" htmlFor="zara">
                  Loại 1
                </label>
              </div>
              
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default ProductType;
