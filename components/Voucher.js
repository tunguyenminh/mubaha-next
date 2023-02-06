import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import styles from "@/styles/checkout.module.css";
import NumberFormat from "react-number-format";
import format from "date-fns/format";

const Voucher = ({ isOpen, handleCloseVoucher, vouchers, handleApplyVoucher, selectedVoucher, titleHeader, placeholder, typeVoucher }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={isOpen}
    >
      <ModalHeader>{titleHeader}</ModalHeader>
      <ModalBody>
        <div className={`${styles.modal_voucher}`}>
          <div className={`${styles.section_search_voucher}`}>
            <span>Mã voucher</span>
            <div className={`${styles.input_voucher}`}>
              <div className={`${styles.input_with_validator}`}>
                <input type="text" placeholder={placeholder} maxLength="255" />
              </div>
            </div>
            <button className={`${styles.button_apply}`}>
              <span>Áp dụng</span>
            </button>
          </div>
          <div className={`${styles.section_list_voucher}`}>
            <div className={`${styles.title_name_list}`}>
              {typeVoucher}
            </div>

             { vouchers && vouchers.docs &&
              vouchers.docs.length > 0 &&
              vouchers.docs.map((voucher, index) => {
                return (
                  <div key={index}>
                    <div className={`${styles.voucher}`}>
                      <div className={`${styles.voucher_1}`}>
                        <div className={`${styles.voucher_title}`}>
                          <div>{voucher.title}</div>
                        </div>
                        <div className={`${styles.voucher_information}`}>
                          <div className={`${styles.voucher_information_basic}`}>
                            <div>
                              <span>Áp dụng cho một số shop nhất định</span>
                            </div>
                            <div className={`${styles.voucher_information_basic_1}`}>
                              <div className={`${styles.voucher_information_basic_2}`}>
                                <div className={`${styles.apply_information}`}>
                                  Đơn hàng tối thiếu{" "}
                                  <NumberFormat
                                    style={{ color: "red" }}
                                    value={voucher.minBasketPrice}
                                    thousandSeparator={true}
                                    displayType="text"
                                    suffix={voucher.currencySymbol}
                                    decimalScale={0}
                                  />
                                </div>
                              </div>
                              <div className={`${styles.voucher_information_basic_2}`}>
                                <div className={`${styles.apply_information}`}>
                                  Mã giảm giá{" "}
                                  {voucher.discount.type === "percent" ? (
                                    `${voucher.discount.amount}%`
                                  ) : (
                                    <NumberFormat
                                      style={{ color: "red" }}
                                      value={voucher.discount.amount}
                                      thousandSeparator={true}
                                      displayType="text"
                                      suffix={voucher.currencySymbol}
                                      decimalScale={0}
                                    />
                                  )}{" "}
                                </div>
                              </div>
                            </div>

                            <span>HSD: {format(new Date(voucher.endDate), "MM/dd/yyyy")}</span>
                          </div>
                          <div className={`${styles.button_apply_voucher}`}>
                            {selectedVoucher && selectedVoucher._id === voucher._id ? (
                              <button className={`${styles.voucher_used}`} disabled>
                                <span>Đã áp dụng</span>
                              </button>
                            ) : (
                              <button
                                className={`${styles.button_apply}`}
                                onClick={() => handleApplyVoucher(voucher)}
                              >
                                <span>Áp dụng</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className="btn btn-secondary btn-lg"
          style={{ width: "120px", height: "50px" }}
          onClick={handleCloseVoucher}
        >
          Huỷ
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Voucher;
