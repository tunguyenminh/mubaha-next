import React, {useState} from "react";
import { Collapse } from "reactstrap";

const Category = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  return (
    <>
      {/* category filter start here */}
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>
          Danh mục
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                <li>
                  <a href={null} >
                    all products
                  </a>
                </li>
                <li>
                  <a href={null} >
                    fashion
                  </a>
                </li>
                <li>
                  <a href={null} >
                    electronics
                  </a>
                </li>
                <li>
                  <a href={null} >
                    vegetables
                  </a>
                </li>
                <li>
                  <a href={null} >
                    furniture
                  </a>
                </li>
                <li>
                  <a href={null} >
                    jewellery
                  </a>
                </li>
                <li>
                  <a href={null} >
                    beauty
                  </a>
                </li>
                <li>
                  <a href={null} >
                    flower
                  </a>
                </li>
                <li>
                  <a href={null} >
                    tools
                  </a>
                </li>
                <li>
                  <a href={null} >
                    watch
                  </a>
                </li>
                <li>
                  <a href={null} >
                    metro
                  </a>
                </li>
                <li>
                  <a href={null} >
                    shoes
                  </a>
                </li>
                <li>
                  <a href={null}>
                    bags
                  </a>
                </li>
                <li>
                  <a href={null} >
                    kids
                  </a>
                </li>
                <li>
                  <a href={null} >
                    PETS
                  </a>
                </li>
                <li>
                  <a href={null} >
                    goggles
                  </a>
                </li>
                <li>
                  <a href={null} >
                    game
                  </a>
                </li>
                <li>
                  <a href={null} >
                    gym
                  </a>
                </li>
                <li>
                  <a href={null} >
                    nursery
                  </a>
                </li>
                <li>
                  <a href={null} >
                    videoslider
                  </a>
                </li>
                <li>
                  <a href={null} >
                    marketplace
                  </a>
                </li>
                <li>
                  <a href={null} >
                    marijuana
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Category;
