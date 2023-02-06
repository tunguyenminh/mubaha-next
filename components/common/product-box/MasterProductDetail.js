import Link from "next/link"
import NumberFormat from "react-number-format";
import price from "@/utils/priceCalculator";
import ProductPrice from "../ProductDetails/ProductPrice";

const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  // uniqueTags,
  detailClass,
  title,
  des,
  // variantChangeByColor,
}) => {
  let RatingStars = []
  let rating = 5
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>)
  }

  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div className="product-info">
        <div className="rating">{RatingStars}</div>
        <Link href={`/${product.slug}`}>
          <a>
            <h6>{product.name.length > 52 ?
    `${product.name.substring(0, 52)}...` : product.name
  }</h6>
          </a>
        </Link>

        {des ? <p>{product.description}</p> : ""}
        <h4><ProductPrice price={product.price} discount={product.discount} currencySymbol={product.currencySymbol} /></h4>

        {/* {product.variants.map((vari) => {
          var findItem = uniqueTags.find((x) => x.color === vari.color);
          if (!findItem) uniqueTags.push(vari);
        })} */}

        {/* {product.type === "jewellery" ||
        product.type === "nursery" ||
        product.type === "beauty" ||
        product.type === "electronics" ||
        product.type === "goggles" ||
        product.type === "watch" ||
        product.type === "pets" ? (
          ""
        ) : (
          <>
            {title !== "Product style 4" && uniqueTags[0].color ? (
              <ul className="color-variant">
                {uniqueTags.map((vari, i) => {
                  return (
                    <li
                      className={vari.color}
                      key={i}
                      title={vari.color}
                      onClick={() =>
                        variantChangeByColor(vari.image_id, product.images)
                      }
                    ></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        )} */}
      </div>
    </div>
  )
}

export default MasterProductDetail
