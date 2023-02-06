import React, { useState,useEffect } from "react";
import Link from "next/link";
import { Media } from "reactstrap";
import ProductPrice from "@/components/common/ProductDetails/ProductPrice.js";
import StarRating from "./StarRating";
const ProductItem2 = ({ product,backImage,des}) => {
  return (
    <div className="product-box product-wrap">
      <div className="img-wrapper">
        <div className="lable-block">
          {product.new && <span className="lable3">new</span> } 
          {product.discount > 0 ? <span className="lable4">Giảm giá</span> : ""}
        </div>
        <div className="front">
          <Link href={`/${product.slug}`}>
            <a>
              <Media
                src={product.media.featuredImage}
                className="img-fluid"
                alt=""
              />
            </a>
          </Link>
        </div>
        {backImage ? (
          product.media.featuredImage === "undefined" ? (
            "false"
          ) : (
            <div className="back">
              <Link href={`/${product.slug}`}>
                <a>
                  <Media
                    src={product.media.featuredImage}
                    style={!oldThumbnail ? { maxHeight: "204px" } : {}}
                    className="img-fluid m-auto"
                    alt=""
                  />
                </a>
              </Link>
            
            </div>
          )
        ) : (
          ""
        )}

      </div>
      <div className={`product-detail`}>
      <div className="product-info">
        <div className="rating d-flex justify-content-center">
         <StarRating value={product.avgRating} />
        </div>
        <Link href={`/${product.slug}`}>
          <a>
            <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
          </a>
        </Link>
        {des ? <p>{product.description}</p> : ""}
        <h4><ProductPrice price={product.price} discount={product.discount} currencySymbol={product.currencySymbol} /></h4>
      </div>
    </div>
    </div>
  );
};

export default ProductItem2;
