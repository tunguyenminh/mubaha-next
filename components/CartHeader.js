import Link from "next/link";
import { Media } from "reactstrap";
import NumberFormat from "react-number-format";
const CartHeader = ({ item }) => {
  return (
    <li>
      <div className="media d-flex p-2" styles={{ height: "100px" }}>
        <Link href={"/" + item.product.slug}>
          <a>
            <Media alt="" className="mr-3" src={`${item.product.media.featuredImage}`} />
          </a>
        </Link>
        <div className="media-body d-flex justify-content-between text-black">
          <Link href={"/" + item.product.slug}>
            <a>
              <h5 style={{ color: "black" }}>
                <strong>{item.product.name}</strong>
              </h5>
              <span style={{ color: "black" }}>Số lượng: x{item.amount}</span>
            </a>
          </Link>
          <h5 style={{ color: "#f89922" }}>
            <NumberFormat
              value={item.discountedPrice}
              thousandSeparator={true}
              displayType="text"
              suffix={item.symbol}
              decimalScale={0}
            />
          </h5>
        </div>
      </div>
    </li>
  );
};

export default CartHeader;
