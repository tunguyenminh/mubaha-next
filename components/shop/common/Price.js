import React, { useState, useEffect } from "react";
import InputRange from "react-input-range";


const Price = () => {
  const [value, setValue] = useState([0, 500]);
  
  return (
    <>
      <div className="collection-collapse-block border-0 open">
        <h3 className="collapse-block-title">Giá</h3>
        <div className="collection-collapse-block-content">
          <div className="wrapper mt-3">
          <div className="range-slider">
           
             <InputRange
             minValue={0}
             maxValue={20}
             value={value}
             onChange={value => setValue({value})}
             />
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Price;
