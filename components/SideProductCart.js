import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import ProductPrice from "./common/ProductDetails/ProductPrice";

export default function SideProductCart({ product }) {
  return (
    <>
      <div>
        <div className="media">
          <Link href={`/${product.slug}`}>
            <a>
              <img
                alt=""
                className="img-fluid blur-up lazyload"
                src={product.media.featuredImage}
                layout="responsive"
              />
            </a>
          </Link>

          <div className="media-body align-self-center">
            <div className="rating">
              <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
              <i className="fa fa-star" /> <i className="fa fa-star" />{" "}
              <i className="fa fa-star" />
            </div>
            <Link href={`/${product.slug}`}>
              <a>
                <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
              </a>
            </Link>

            <h4>
              <ProductPrice price={product.price} discount={product.discount} currencySymbol={product.currencySymbol} />
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
