import React, { useState,useEffect } from "react";
import { Collapse, Input,Label } from "reactstrap";
const Brand = ({hanldeBrand,brands,clear}) => {
  const [arr,setArr] = useState(brands.map(b=>{
return{
  ...b,
  isSelected : false
}
  }))
  useEffect(() => {
    const a = arr.map(stock =>{
      return {
        ...stock,
        isSelected: false
      }
    })
    setArr([...a])
   }, [clear]);
  const handleCheck=(i)=>{
    arr[i].isSelected = true;
    setArr([...arr])
  }
  const [isOpen, setIsOpen] = useState(true);
  const toggleBrand = () => setIsOpen(!isOpen);
  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleBrand}>
        Thương hiệu
      </h3>
      <Collapse isOpen={isOpen}>
      <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
                  {
                    arr.length > 0
                    ?
                    arr.map((value, i) =>{
                    return(
                      <div key={i} className="custom-control custom-checkbox collection-filter-checkbox" >
                    <Input
                      type="checkbox"
                      className="custom-control-input"
                      value={value.brand._id}
                      id={`brand${i}`}
                      onChange={(e)=>{handleCheck(i),hanldeBrand(e)}}
                    />
                    <Label className="custom-control-label" htmlFor={`brand${i}`}>
                        {value.brand.name}
                    </Label>
                  </div>
                    )
                  })
                  :
                  "Không tìm thấy các sự lựa chọn nào"
                  }
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Brand;
