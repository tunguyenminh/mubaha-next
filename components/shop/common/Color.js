import React, { useState } from "react";
import { Collapse } from "reactstrap";

const Color = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggle}>
        Màu sắc
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="color-selector">
            <ul>
              <li className="color-1" />
              <li className="color-2" />
              <li className="color-3" />
              <li className="color-4" />
              <li className="color-5" />
              <li className="color-6" />
              <li className="color-7" />
            </ul>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Color;
