import React from "react";
import Image from "next/image";
import voucher from "../../assets/images/checkout/icon-voucher.svg";
import voucher2 from "../../assets/images/checkout/icon-voucher-v02.svg";
import styles from "../../styles/checkout.module.css";
import Voucher from "@/components/Voucher";
import NumberFormat from "react-number-format";

const VoucherShop = ({
  selectedVoucher,
  handleVoucherShow,
  groupedItems,
  showVoucher,
  handleCloseVoucher,
  vouchers,
  handleApplyVoucher,
  totalDiscountSystem,
}) => {
  return (
    <>
      <div className={`${styles.section_voucher}`}>
        <div className={`${styles.title_voucher}`}>
          <div className={`${styles.title_voucher1}`}>
            <div className={`${styles.title_voucher2}`}>
              {selectedVoucher ? (
                <Image src={voucher2} width={30} height={30} alt="Voucher Mubaha" />
              ) : (
                <Image src={voucher} width={30} height={30} alt="Voucher Mubaha" />
              )}

              <span className={`${styles.title_name_voucher}`}>Mubaha voucher</span>
            </div>
          </div>
        </div>
        <div className={`${styles.selectVoucher}`}>
          {totalDiscountSystem === 0 ? (
            <button
              className={`${styles.btn_change} btn p-0 m-0`}
              onClick={() => handleVoucherShow("system")}
              // disabled={groupedItems.length === 0}
            >
              Chọn Voucher
            </button>
          ) : (
            <>
              <div className={`${styles.apply_show_voucher}`}>
                <div className={`${styles._1oOP8B}`}></div>
                <div className={`${styles.show_voucher}`}>
                  <span>
                    {" - "}
                    <NumberFormat
                        style={{ color: "red" }}
                        value={totalDiscountSystem}
                        thousandSeparator={true}
                        displayType="text"
                        suffix={selectedVoucher.currencySymbol}
                        decimalScale={0}
                      />
                  </span>
                </div>
              </div>
              <button
                className={`${styles.btn_change} btn p-0 m-0`}
                onClick={() => handleVoucherShow("system")}
              >
                Chọn Voucher Khác
              </button>
            </>
          )}
        </div>
      </div>
      {/* Modal voucher */}
      <Voucher
        isOpen={showVoucher}
        handleCloseVoucher={handleCloseVoucher}
        vouchers={vouchers}
        handleApplyVoucher={handleApplyVoucher}
        selectedVoucher={selectedVoucher}
        titleHeader={"Chọn Mubaha Voucher"}
        placeholder={"Mã Mubaha Voucher"}
        typeVoucher={"mã miễn phí vận chuyển và mã giảm giá đơn hàng"}
      />
    </>
  );
};

export default VoucherShop;
