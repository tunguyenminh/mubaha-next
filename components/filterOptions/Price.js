import React, { useState,useEffect } from "react";
import { Button, Badge } from "reactstrap";
import NumberFormat from "react-number-format";
import styles from "@/styles/filter.module.css";
import priceOptins from "@/enums/priceOptions.enum";
const Price = ({ hanldePrice,clear }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  useEffect(()=>{
    setMin(0)
    setMax(0);
  },[clear])
  const hanldeMinPrice = (e) => {
    setMin(parseInt(e.value) || "");
  };
  const hanldeMaxPrice = (e) => {
    setMax(parseInt(e.value) || "");
  };
  const handlePrice1 = () => {
    if (min >= max) {
      const prevMin = min;
      const prevMax = max;
      setMin(prevMax);
      setMax(prevMin);
      hanldePrice(prevMax, prevMin);
    } else {
      hanldePrice(min, max);
    }
  };
  const hanldeOptions = (minOptions, maxOptions) => {
    hanldePrice(minOptions, maxOptions);
  };

  return (
    <>
      <div className="collection-collapse-block border-0 open">
        <h3 className="collapse-block-title">Khoảng Giá</h3>
        <div className="collection-collapse-block-content">
          {priceOptins.map((value, index) => {
            return (
              <Badge
                key={index}
                pill
                className={`${styles.priceOptions} mt-1`}
                role="button"
                onClick={() => hanldeOptions(value.min, value.max)}
              >
                {value.text}
              </Badge>
            );
          })}
          <div className="wrapper mt-3">
            <div className="range-slider d-flex">
              <NumberFormat
                thousandSeparator="."
                placeholder="Từ"
                decimalSeparator=","
                value={min}
                className={`w-100 ${styles.inputPrice}`}
                onValueChange={(e) => hanldeMinPrice(e)}
              />
              <div className="ml-2 mr-2">
                <strong> - </strong>
              </div>
              <NumberFormat
                placeholder="Đến"
                onValueChange={(e) => hanldeMaxPrice(e)}
                thousandSeparator="."
                value={max}
                decimalSeparator=","
                className={`w-100 ${styles.inputPrice}`}
              />
            </div>
            <div>
              <div className="d-flex justify-content-center mt-3">
                <Button className="btn btn-solid" style={{ width: "100%" }} onClick={handlePrice1}>
                  Áp dụng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Price;
