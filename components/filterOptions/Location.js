import React, { useState,useEffect } from "react";
import { Collapse, Input,Label } from "reactstrap";
import locationEnum from "@/enums/location.enum";
const Location = ({handleLocation,stockCountries,clear}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleLocation = () => setIsOpen(!isOpen);
  const [arr,setArr]= useState(stockCountries.map(stock =>{
    return {
      ...stock,
      isSelected: false,
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
  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleLocation}>
        NƠI BÁN
      </h3>
      <Collapse isOpen={isOpen}>
      <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
            {
              arr.length > 0 ?
              arr.map((value, index) => {
                return (
                <div key={index} className="custom-control custom-checkbox collection-filter-checkbox">
                  <Input type="checkbox" value={value.country} 
                  checked={value.isSelected}
                  onChange={(e)=>{handleCheck(index),handleLocation(e)}}
                  className="custom-control-input" id={`location${index}`} />
                <Label className="custom-control-label" htmlFor={`location${index}`}>
                  {locationEnum[value.country]}
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

export default Location;
