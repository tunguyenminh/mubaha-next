import React, { useState } from "react";
import { Collapse, Input } from "reactstrap";

const Brand = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBrand = () => setIsOpen(!isOpen);
  return (
    <>
      {/* brand filter start here */}
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleBrand}>
          Thương hiệu
        </h3>
        <Collapse isOpen={isOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input type="checkbox" className="custom-control-input" id="zara" />
                <label className="custom-control-label" htmlFor="zara">
                  zara
                </label>
              </div>
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input type="checkbox" className="custom-control-input" id="vera-moda" />
                <label className="custom-control-label" htmlFor="vera-moda">
                  vera-moda
                </label>
              </div>
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input type="checkbox" className="custom-control-input" id="forever-21" />
                <label className="custom-control-label" htmlFor="forever-21">
                  forever-21
                </label>
              </div>
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input type="checkbox" className="custom-control-input" id="roadster" />
                <label className="custom-control-label" htmlFor="roadster">
                  roadster
                </label>
              </div>
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input type="checkbox" className="custom-control-input" id="only" />
                <label className="custom-control-label" htmlFor="only">
                  only
                </label>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Brand;
