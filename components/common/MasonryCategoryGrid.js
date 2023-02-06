import React from "react";
import Masonry from "react-masonry-css";
import styles from './MasonryCategoryGrid.module.css'

export default function MasonryCategoryGrid({ data, grid, colClass }) {
  return (
    <>
      <Masonry
        breakpointCols={grid}
        className={`row ${styles.category}`}
        columnClassName={`${colClass}`}
      >
        {data.map((item, index) => (
              <div key={index} className="mb-3">
                <span className="text-muted text-uppercase"><strong>{item.name}</strong></span>
                <div className="mt-0">
                  {item.childrens.map((child, idx, rows) => (
                    <small className="text-muted" key={idx}>
                      <a href="#">{child.name}</a>{idx + 1 == rows.length ? "" : " | "}
                    </small>
                  ))}
                </div>
              </div>
            ))}
      </Masonry>
    </>
  );
};
