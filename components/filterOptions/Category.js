import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { memo } from "react";

const Category = ({categories,hanldeCategory}) => {
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
              {categories.length >0
              ?
              categories.map((category,i) =>{
                  return(
                    <li key={i} onClick={() => hanldeCategory(category.category._id)} role="button">
                  <a className="custom-control-label" role="button" >
                    {category.category.name}
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
