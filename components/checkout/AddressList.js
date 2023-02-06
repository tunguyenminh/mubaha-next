import React from "react";
import styles from "../../styles/checkout.module.css";
import Link from "next/link";
import Address from "@/components/Address";
const AdressList = ({
  showAddress,
  listAddress,
  chooseAddress,
  setChooseAddress,
  handleChangeAddress,
  setShowAddress,
  selectedAddress,
  show,
  handleCloseCreateAdd,
  handleShow,
}) => {
  return (
    <>
      <div className={`${styles.padding_box}`}>
        <div className={`${styles.title_address}`}>
          <div className={`${styles.icon_address}`}>
            <div className={`${styles.icon}`}>
              <svg height="16" viewBox="0 0 12 16" width="12" fill="#f89922">
                <path
                  d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>Địa chỉ giao hàng</div>
          </div>
          {showAddress && (
            <>
              <div className={`${styles.button_select_address}`}>
                <button
                  className={`${styles.button_add_address} ${styles.method_content}`}
                  onClick={handleShow}
                >
                  <svg
                    enableBackground="new 0 0 10 10"
                    viewBox="0 0 10 10"
                    role="img"
                    className="stardust-icon stardust-icon-plus-sign _3PTu7X"
                  >
                    <path
                      stroke="none"
                      d="m10 4.5h-4.5v-4.5h-1v4.5h-4.5v1h4.5v4.5h1v-4.5h4.5z"
                    ></path>
                  </svg>
                  Thêm địa chỉ mới
                </button>

                <Link href="/account/address" passHref>
                  <button className={`${styles.button_add_address}`}>Thiết lập địa chỉ</button>
                </Link>
              </div>
            </>
          )}
        </div>

        {showAddress && listAddress.length > 0 && chooseAddress && (
          <>
            <div className={`${styles.list_address}`}>
              <ul>
                {listAddress.map((item, index) => {
                  return (
                    <li key={index}>
                      <input
                        type="radio"
                        name="delivery_address"
                        data-view-index="cod"
                        readOnly
                        onClick={() => setChooseAddress(item)}
                        value="address2"
                        checked={item._id === chooseAddress._id}
                      />
                      <div className={`${styles.detail_info}`}>
                        <div className={`${styles.info}`}>
                          <div className={`${styles.fullName}`}>
                            {item.fullName} {item.phone}
                          </div>
                          <div className={`${styles.detailAddress}`}>{item.fullAddress}</div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            {listAddress.length > 0 && (
              <div className={`${styles.button_change}`}>
                <button
                  className={`${styles.button_add_address} ${styles.button_success} `}
                  onClick={() => {
                    handleChangeAddress(chooseAddress);
                    setShowAddress(!showAddress);
                  }}
                >
                  Hoàn Thành
                </button>
                <button
                  className={`${styles.button_add_address} ${styles.button_back}`}
                  onClick={() => {
                    setChooseAddress(selectedAddress);
                    setShowAddress(!showAddress);
                  }}
                >
                  Trở về
                </button>
              </div>
            )}
          </>
        )}

        {!showAddress && (
          <>
            {selectedAddress && (
              <div className="detail_infor">
                <div className={`${styles.info}`}>
                  <div className={`${styles.fullName}`}>
                    {selectedAddress.fullName} {selectedAddress.phone}
                  </div>
                  <div className={`${styles.detailAddress}`}>{selectedAddress.fullAddress}</div>
                  <div className={`${styles.default}`}>Mặc định</div>
                </div>
              </div>
            )}

            <div>
              <button
                className={`${styles.btn_change} btn p-0 m-0`}
                onClick={() => {
                  setShowAddress(!showAddress);
                }}
              >
                Thay đổi địa chỉ
              </button>
            </div>
          </>
        )}
      </div>
      {/* Modal add address */}
      <Address isOpen={show} handleCloseCreateAdd={handleCloseCreateAdd} />
    </>
  );
};

export default AdressList;
