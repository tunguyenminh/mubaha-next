import Link from "next/link";
import { Row, Col, Media, Modal, ModalBody } from "reactstrap";

import MasterProductDetail from "./common/product-box/MasterProductDetail";

const currency = {
  ccurrency: "USD",
  name: "doller",
  symbol: "$",
  value: 1,
};
export default function ProductCard({ product }) {
  return (
    <>
      <div className="product-box product-wrap">
        <div className="img-wrapper">
          <div className="front">
            <Link href={`/${product.slug}`} passHref>
              <Media
                src={product.media.featuredImage}
                style={{ maxHeight: "204px" }}
                className="img-fluid bg-img blur-up"
                alt=""
              />
            </Link>
          </div>
          <div className="back">
            <Link href={`/${product.slug}`} passHref>
              <Media
                src={product.media.featuredImage}
                style={{ maxHeight: "204px" }}
                className="img-fluid bg-img blur-up"
                alt=""
              />
            </Link>
          </div>
          <div className="cart-info cart-wrap bg-color-cls sm-box">
            <button title="Add to cart">
              <i className="ti-shopping-cart" />
            </button>
            <a title="Add to Wishlist">
              <i className="ti-heart" aria-hidden="true" />
            </a>
            <a
              data-bs-toggle="modal"
              data-bs-target="#quick-view"
              title="Quick View"
            >
              <i className="ti-search" aria-hidden="true" />
            </a>
            <a title="Compare">
              <i className="ti-reload" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="product-detail">
          <Link href={`/${product.slug}`}>
            <a>
              <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
            </a>
          </Link>
          <h4>${product.price}</h4>
        </div>
      </div>
    </>
  );
}
