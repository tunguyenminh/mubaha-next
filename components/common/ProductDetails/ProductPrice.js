import NumberFormat from "react-number-format";
import priceCalculator from "@/utils/priceCalculator";

export default function ProductPrice({price, discount, currencySymbol}) {
  return (
    <>
      <NumberFormat
        value={priceCalculator(price, discount)}
        thousandSeparator={true}
        displayType="text"
        suffix={currencySymbol}
        decimalScale={0}
      />
      {discount > 0.0 ? (
        <del>
          <span className="money ml-1">
            <NumberFormat
              value={price}
              thousandSeparator={true}
              displayType="text"
              suffix={currencySymbol}
              decimalScale={0}
            />
          </span>
        </del>
      ) : (
        ""
      )}
    </>
  )
}