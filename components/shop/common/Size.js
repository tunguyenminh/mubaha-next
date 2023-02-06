import React, { useState } from "react";
import { Collapse, Input } from "reactstrap";

const Size = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      {/* size filter start here */}
      <div className="collection-collapse-block border-0 open">
        <h3 className="collapse-block-title" onClick={toggle}>
          Kích thước
        </h3>
        <Collapse isOpen={isOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-size-filter">
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input type="checkbox" className="custom-control-input" id="hundred" />
                <label className="custom-control-label" htmlFor="hundred">
                  s
                </label>
              </div>
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input type="checkbox" className="custom-control-input" id="twohundred" />
                <label className="custom-control-label" htmlFor="twohundred">
                  m
                </label>
              </div>
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input type="checkbox" className="custom-control-input" id="threehundred" />
                <label className="custom-control-label" htmlFor="threehundred">
                  l
                </label>
              </div>
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input type="checkbox" className="custom-control-input" id="fourhundred" />
                <label className="custom-control-label" htmlFor="fourhundred">
                  xl
                </label>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Size;
