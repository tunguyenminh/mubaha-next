import Slider from "react-slick";
import { Media } from "reactstrap";
import NumberFormat from "react-number-format";
import Link from "next/link";

const currency = {
  currency: "VND",
  name: "vietnamdong",
  symbol: "đ",
  value: 1,
};

export default function OneColumnProductSlider({ title, border, data }) {
  return (
    <div className={`theme-card ${border} `}>
      <h5 className="title-border">{title}</h5>
      <Slider className="offer-slider slide-1">
        <div>
          {data &&
            data.slice(0, 3).map((product, index) => (
              <div className="media" key={index}>
                <Link href={`/${product.slug}`}>
                  <a>
                    <Media
                      alt=""
                      className="img-fluid blur-up lazyload"
                      src={product.media.featuredImage}
                    />
                  </a>
                </Link>
                <div className="media-body align-self-center">
                  <div className="rating">
                    <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>
                  </div>
                  <Link href={`/${product.slug}`}>
                    <a>
                      <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
                    </a>
                  </Link>
                  <h4>
                    <NumberFormat
                      value={product.price}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={currency.symbol}
                      decimalScale={0}
                    />
                  </h4>
                </div>
              </div>
            ))}
        </div>
        <div>
          {data &&
            data.slice(4, 7).map((product, index) => (
              <div className="media" key={index}>
                <Link href={`/${product.slug}`}>
                  <a>
                    <Media
                      alt=""
                      className="img-fluid blur-up lazyload"
                      src={product.media.featuredImage}
                    />
                  </a>
                </Link>
                <div className="media-body align-self-center">
                  <div className="rating">
                    <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i> <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>
                  </div>
                  <Link href={`/${product.slug}`}>
                    <a>
                      <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
                    </a>
                  </Link>
                  <h4>
                    <NumberFormat
                      value={product.price}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={currency.symbol}
                      decimalScale={0}
                    />
                  </h4>
                </div>
              </div>
            ))}
        </div>
      </Slider>
    </div>
  );
}
