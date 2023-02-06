import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { memo } from "react";

const Category = ({cateChild,hanldeCategory}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>
          Danh mục
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
              {cateChild.length >0
              ?
              cateChild.map((category,i) =>{
                  return(
                    <li key={i} onClick={() => hanldeCategory(category.slug)} role="button">
                  <a className="custom-control-label" role="button" >
                    {category.name}
                  </a>
                </li>
 
                  )
              })
              :
              "Không tìm thấy các sự lựa chọn nào"
              }
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default memo(Category);
