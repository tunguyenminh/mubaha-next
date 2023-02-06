import React from "react";
import Image from "next/image";
import styles from "../../styles/checkout.module.css";
import NumberFormat from "react-number-format";
import voucher from "../../assets/images/checkout/icon-voucher.svg";
import Voucher from "@/components/Voucher";

const CartList = ({
  listCarts,
  handleVoucherShopShow,
  showVoucherShop,
  handleCloseVoucher,
  handleApplyVoucherShop,
  vouchers,
  totalDiscountShop,
  totalPriceProduct,
}) => {
  return (
    
    <>
      <div className={`${styles.total_price_information}`}>
        <div>
          <div className={`${styles.detail_order_information}`}>
            <div className={`${styles.vendor_name}`}>
              <img src="/assets/icon/shop-icon.png" className="mr-2" />
              <span>{listCarts.vendor.brandName}</span>
            </div>
            <div className={`${styles.section_order_info}`}>
              {listCarts.products.map((product, i) => {
                return (
                  <div key={i}>
                    <div className={`${styles.order_info}`}>
                      <div className={`${styles.title_info} ${styles.title_image_product}`}>
                        <img
                          width="40px"
                          src={
                            product.selectedAttribute?.image ||
                            product.selectedVariant?.image ||
                            product.product.media?.featuredImage
                          }
                        />
                        <span>
                          <strong>
                            <span className={`${styles.name_product}`}>{product.product.name}</span>
                          </strong>
                        </span>
                      </div>

                      <div className={`${styles.title_info} ${styles.classify_info}`}>
                        {product.selectedVariant === null ? (
                          ""
                        ) : product.selectedAttribute === null ? (
                          <span>Loại: {product.selectedVariant.name}</span>
                        ) : (
                          <span>
                            Loại: {product.selectedVariant.name} - {product.selectedAttribute.name}
                          </span>
                        )}
                      </div>
                      <div className={`${styles.title_info}`}>
                        <NumberFormat
                          value={(1 - product.discount) * product.price}
                          thousandSeparator={true}
                          displayType="text"
                          suffix={product.product.currencySymbol}
                          decimalScale={0}
                        />
                      </div>
                      <div className={`${styles.title_info}`}>{product.amount}</div>
                      <div className={`${styles.title_info}`}>
                        <NumberFormat
                          value={(1 - product.discount) * product.price * product.amount}
                          thousandSeparator={true}
                          displayType="text"
                          suffix={product.product.currencySymbol}
                          decimalScale={0}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`${styles.section_voucher_shop}`}>
              <div className={`${styles.voucher_shop}`}>
                <div className={`${styles.title_voucher_shop}`}>
                  <div className={`${styles.image_voucher}`}>
                    <Image src={voucher} alt="Voucher Mubaha" />
                    <div>Voucher của Shop</div>
                  </div>
                </div>
                <div className={`${styles.selectVoucher}`}>
                  {totalDiscountShop === 0 ? (
                    <div className={`${styles.button_voucher_shop}`}>
                      <button
                        onClick={() => handleVoucherShopShow("vendor", listCarts.vendor._id)}
                        // disabled={groupedItems.length === 0}
                      >
                        Chọn Voucher
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={`${styles.apply_show_voucher}`}>
                        <div className={`${styles._1oOP8B}`}></div>
                        <div className={`${styles.show_voucher}`}>
                          <span>
                            {" - "}
                            <NumberFormat
                              style={{ color: "red" }}
                              value={totalDiscountShop}
                              thousandSeparator={true}
                              displayType="text"
                              suffix={listCarts.currencySymbol}
                              decimalScale={0}
                            />
                          </span>
                        </div>
                      </div>
                      <div className={`${styles.button_voucher_shop}`}>
                        <button
                          onClick={() => handleVoucherShopShow("vendor", listCarts.vendor._id)}
                        >
                          Chọn Voucher Khác
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* <div
              className="d-flex p-4 justify-content-end align-items-center"
              style={{ borderTop: "1px dashed rgba(0, 0, 0, 0.09)" }}
            >
              <div>Tổng số tiền (1 sản phẩm):</div>
              <div className="ml-4">
                <h3 style={{ color: "#f89922" }}>
                  <NumberFormat
                    value={totalPriceProduct}
                    thousandSeparator={true}
                    displayType="text"
                    suffix={listCarts.currencySymbol}
                    decimalScale={0}
                  />
                </h3>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Voucher
        isOpen={showVoucherShop}
        vouchers={vouchers}
        handleCloseVoucher={handleCloseVoucher}
        handleApplyVoucher={handleApplyVoucherShop}
        titleHeader={`Chọn Voucher ${listCarts.vendor.brandName}`}
        placeholder={"Mã Voucher của Shop"}
        // typeVoucher={"mã miễn phí vận chuyển và mã giảm giá đơn hàng"}
      />
    </>
  );
};

export default CartList;
