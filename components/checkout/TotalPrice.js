import React from "react";
import styles from "../../styles/checkout.module.css";
import { Modal, Button, ModalBody, ModalFooter, Row } from "reactstrap";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";

const TotalPrice = ({
  groupedItems,
  totalPriceProduct,
  selectedVoucher,
  handleOrder,
  visible,
  totalOrdersPrice,
  totalVoucherDiscount,
  listOrder,
  totalDiscountSystem,
  totalDiscountShop,
  totalPriceProducts,
}) => {
  const router = useRouter();

  return (
    <>
      <div className={`${styles.total_prices}`}>
        <div className="d-flex align-items-end justify-content-center flex-column">
          <div className="d-flex">
            <div className="mr-2" style={{ width: "10rem" }}>
              Tổng tiền hàng:
            </div>
            <div className="ml-5 mr-2" style={{ width: "12rem" }}>
              <h5 className="text-right mb-0">
                <NumberFormat
                  value={totalPriceProducts}
                  thousandSeparator={true}
                  displayType="text"
                  suffix={listOrder.currencySymbol}
                  decimalScale={0}
                />
              </h5>
            </div>
          </div>
          {totalDiscountShop > 0 ? (
            <>
              <div className="d-flex mt-4">
                <div style={{ marginRight: "5.3rem" }}>Giảm giá từ Voucher Shop:</div>
                <div className="ml-5 mr-2">
                  <NumberFormat
                    style={{ color: "red" }}
                    value={totalDiscountShop}
                    thousandSeparator={true}
                    displayType="text"
                    prefix="-"
                    suffix={listOrder.currencySymbol}
                    decimalScale={0}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {totalDiscountSystem > 0 ? (
            <div className="d-flex mt-4">
              <div style={{ marginRight: "3.8rem" }}>Giảm giá từ Voucher Mubaha:</div>
              <div className="ml-5 mr-2">
                <NumberFormat
                  style={{ color: "red" }}
                  value={totalDiscountSystem}
                  thousandSeparator={true}
                  displayType="text"
                  prefix="-"
                  suffix={listOrder.currencySymbol}
                  decimalScale={0}
                />
              </div>
            </div>
          ) : (
            <></>
          )}

          {totalVoucherDiscount > 0 ? (
            <div className="d-flex mt-4">
              <div style={{ marginRight: "3.5rem" }}>Tổng cộng Voucher giảm giá:</div>
              <div className="ml-5 mr-2">
                <h5 className="mb-0">
                  <NumberFormat
                    style={{ color: "red" }}
                    value={totalVoucherDiscount}
                    thousandSeparator={true}
                    displayType="text"
                    prefix="-"
                    suffix={listOrder.currencySymbol}
                    decimalScale={0}
                  />
                </h5>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="d-flex mt-4">
            <div style={{ width: "10rem" }}>Tổng thanh toán:</div>
            <div className="ml-4 mr-2" style={{ width: "14rem" }}>
              <h3 className="text-right" style={{ color: "#f89922" }}>
                <NumberFormat
                  value={totalOrdersPrice}
                  thousandSeparator={true}
                  displayType="text"
                  suffix={listOrder.currencySymbol}
                  decimalScale={0}
                />
              </h3>
            </div>
          </div>
        </div>

        <div className={`${styles.section_button_order}`}>
          <div className={`${styles.section_rules}`}>
            <div>
              Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo{" "}
              <a href="" target="_blank" rel="noopener noreferrer">
                Điều khoản Mubaha
              </a>
            </div>
          </div>

          <button
            className={
              groupedItems.length === 0
                ? `${styles.button_order_disabled}`
                : `${styles.button_order}`
            }
            onClick={handleOrder}
            disabled={groupedItems.length === 0}
          >
            Đặt hàng
          </button>
        </div>
      </div>
      <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={visible}>
        <ModalBody className="container-fluid">
          <Row className="pl-5 pr-5 pt-3" style={{ justifyContent: "center" }}>
            <h3>Đặt hàng thành công</h3>
          </Row>
        </ModalBody>
        <ModalFooter style={{ border: "none" }}>
          <Button
            className="btn btn-secondary btn-lg"
            style={{ width: "100%", maxWidth: "100%", borderRadius: "5px" }}
            onClick={() => router.push("/account/list-order")}
          >
            Quay về danh sách đơn hàng
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TotalPrice;
