import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Head from "next/head";
import {
  Container,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  Row,
  ModalHeader,
  Alert,
  AlertTitle,
} from "reactstrap";
import styles from "../../styles/checkout.module.css";
import CartList from "@/components/checkout/CartList";
import VoucherShop from "@/components/checkout/VoucherShop";
import CommonLayout from "../../components/shop/CommonLayout";
import HeaderAuthen from "@/components/authen/HeaderAuthen.js";
import Footer from "@/components/Footer.js";
import _ from "lodash";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdressList from "@/components/checkout/AddressList";
import TotalPrice from "@/components/checkout/TotalPrice";
import dynamic from "next/dynamic";
import HeadSeo from "../../components/HeadSeo";
// import { Checkmark } from 'react-checkmark'
const PaymentCard = dynamic(() => import("react-payment-card-component"), {
  ssr: false,
});
const Checkmark = dynamic(() => import("react-checkmark"), {
  ssr: false,
});

const Checkout = ({ data }) => {
  const { data: session } = useSession();

  const [showVoucher, setShowVoucher] = useState(false);
  const [showVoucherShop, setShowVoucherShop] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [vouchers, setVouchers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [succesPayment, setSuccesPayment] = useState(false);
  const [cardCode, setCardCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const [selectedVoucher, setSelectedVoucher] = useState([]);
  const [selectedVoucherShop, setSelectedVoucherShop] = useState([]);
  const [groupedItems, setGroupedItems] = useState([]);
  const [listOrder, setListOrder] = useState([]);

  const [listAddress, setListAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();

  const [show, setShow] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [chooseAddress, setChooseAddress] = useState();
  const [showError, setShowError] = useState(false);
  const [totalPriceProducts, setTotalPriceProducts] = useState(0);
  const [totalDiscountShop, setTotalDiscountShop] = useState(0);
  const [totalDiscountSystem, setTotalDiscountSystem] = useState(0);
  const [totalPriceProduct, setTotalPriceProduct] = useState(0);
  const [totalVoucherDiscount, setTotalVoucherDiscount] = useState(0);
  const [totalOrdersPrice, setTotalOrdersPrice] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    setIsLoading(false);

    let _timeout;
    if (session) {
      handleGetListAddress();
      if (data !== null) {
        setListOrder(data);
        setGroupedItems(data.grouped);
        setTotalOrdersPrice(data.totalOrdersPrice);

        let newPrice = 0;
        data.grouped.forEach((item) => {
          newPrice += item.totalPrice;
        });
        setTotalPriceProducts(newPrice);
      } else {
        setShowError(true);

        _timeout = setTimeout(() => {
          router.push("/cart");
        }, 2000);
      }
    }

    return () => {
      clearTimeout(_timeout);
    };
  }, [session]);

  console.log("setTotalPriceProducts(newTotal)", totalPriceProducts);
  const handleGetListAddress = async () => {
    try {
      const res = await fetch(process.env.API_ADDRESS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.accessToken,
        },
      });

      const addressData = await res.json();
      if (addressData.status === 200) {
        const data = addressData.data;

        setListAddress(data);
        if (data.length > 0) {
          const findDefaultAddress = data.filter((item) => item.isDefault == true);
          if (!findDefaultAddress || findDefaultAddress.length == 0) {
            setSelectedAddress(data[0]);
          } else {
            setSelectedAddress(findDefaultAddress[0]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleVoucherShow = async (type) => {
    setShowVoucher(true);
    try {
      const response = await fetch(`${process.env.API_VOUCHER_URL}?type=${type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.accessToken,
        },
      });
      const data = await response.json();
      const newVouchers = data.data;
      setVouchers(newVouchers);
    } catch (error) {
      console.error(error);
    }
  };
  const handleVoucherShopShow = async (type, vendorId) => {
    setShowVoucherShop(true);
    try {
      const response = await fetch(
        `${process.env.API_VOUCHER_URL}?type=${type}&vendorId=${vendorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.accessToken,
          },
        }
      );
      const data = await response.json();
      const newVouchers = data.data;
      setVouchers(newVouchers);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseVoucher = () => {
    setShowVoucher(false);
  };
  const handleCloseVoucherShop = () => {
    setShowVoucherShop(false);
  };
  const handleApplyVoucher = async (voucher) => {
    setSelectedVoucher([voucher._id]);
    const usedVouchers = [...[voucher._id], ...selectedVoucherShop];
    const response = await fetch(
      `${process.env.API_ORDER_URL}/pre-voucher?s=${router.query.s}&f=${router.query.f}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.accessToken,
        },
        body: JSON.stringify({ voucherIds: usedVouchers }),
      }
    );
    const data = await response.json();
    if (data.status == 200) {
      setTotalDiscountSystem(data.data.totalSystemDiscount);
      data.data.grouped.forEach((pr) => {
        setTotalDiscountShop(pr.voucherDiscountAmount);
        setTotalPriceProduct(pr.totalPrice);
      });
      setTotalOrdersPrice(data.data.totalOrdersPrice);
      setTotalVoucherDiscount(data.data.totalVoucherDiscount);
    }
    setShowVoucher(false);
  };
  const handleApplyVoucherShop = async (voucher) => {
    setSelectedVoucherShop([voucher._id]);

    const usedVouchers = [...selectedVoucher, ...[voucher._id]];

    const response = await fetch(
      `${process.env.API_ORDER_URL}/pre-voucher?s=${router.query.s}&f=${router.query.f}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.accessToken,
        },
        body: JSON.stringify({ voucherIds: usedVouchers }),
      }
    );
    const data = await response.json();
    if (data.status == 200) {
      data.data.grouped.forEach((pr) => {
        setTotalDiscountShop(pr.voucherDiscountAmount);
        setTotalPriceProduct(pr.totalPrice);
      });
      setTotalOrdersPrice(data.data.totalOrdersPrice);
      setTotalVoucherDiscount(data.data.totalVoucherDiscount);
      setTotalDiscountSystem(data.data.totalSystemDiscount);
    }

    setShowVoucherShop(false);
  };
  const handleSelectPaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === "atm") setShowCard(true);
  };

  const handleUpdateAddAddress = (data) => {
    const newListAddress = [...listAddress, data];
    setListAddress(newListAddress);
    if (data.isDefault) {
      setSelectedAddress(data);
    }
  };

  const handleChangeAddress = (addressItem) => {
    setSelectedAddress(addressItem);
  };

  const handlePaymentMedthod = () => {
    setShowCard(false);
    setSuccesPayment(true);

    setTimeout(function () {
      setSuccesPayment(false);
    }, 2000);
  };

  const handleOrder = async (e) => {
    const cartID = [];
    const voucherID = [];

    groupedItems.forEach((p) => {
      cartID = [...p.products.map((x) => x._id)];
    });
    if (selectedVoucher) voucherID.push(selectedVoucher._id);

    const payload = {
      cartItemIds: cartID,
      method: paymentMethod,
      address: selectedAddress._id,
      voucherIds: voucherID,
      // cardCode,
      // cardNumber,
      // cardName,
      // expirationDate: cardExp,
    };
    setVisible(true);

    const response = await fetch(
      `${process.env.API_ORDER_URL}?s=${router.query.s}&f=${router.query.f}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.accessToken,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      setTimeout(function () {
        setVisible(false);
        router.push("/account/list-order");
      }, 3000);
    } else {
      alert(data.message);
    }
  };
  const handleCloseCreateAdd = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    setChooseAddress(selectedAddress);
  }, [selectedAddress]);

  useEffect(() => {
    if (listAddress.length === 0) {
      setShowAddress(true);
    } else {
      setShowAddress(false);
    }
  }, [listAddress]);

  return (
    <>
      <HeadSeo title={`Thanh toán đơn hàng`} />
      <HeaderAuthen />
      <CommonLayout parent="Trang chủ" title="Thanh toán đơn hàng">
        <section className={`section-b-space ${styles.section_checkout_page}`}>
          <Container>
            {showError && (
              <>
                <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={showError}>
                  <ModalBody className="container-fluid">
                    <Row className="pl-5 pr-5 pt-3" style={{ justifyContent: "center" }}>
                      <h3>Giỏ hàng trống</h3>
                    </Row>
                  </ModalBody>
                  <ModalFooter style={{ border: "none" }}>
                    <Button
                      className="btn btn-secondary btn-lg"
                      style={{ width: "100%", maxWidth: "100%", borderRadius: "5px" }}
                      onClick={() => setShowError(!showError)}
                    >
                      OK
                    </Button>
                  </ModalFooter>
                </Modal>
              </>
            )}
            <div className={`${styles.address}`}>
              <h4>1. Chọn địa chỉ giao hàng</h4>
              <div className={`${styles.table_address}`}>
                <div className={`${styles.border_top}`}></div>
                <AdressList
                  showAddress={showAddress}
                  listAddress={listAddress}
                  chooseAddress={chooseAddress}
                  setChooseAddress={setChooseAddress}
                  handleChangeAddress={handleChangeAddress}
                  setShowAddress={setShowAddress}
                  selectedAddress={selectedAddress}
                  show={show}
                  handleCloseCreateAdd={handleCloseCreateAdd}
                  handleShow={handleShow}
                />
                <div className={`${styles.border_top}`}></div>
              </div>
            </div>
            <div className={`${styles.list_cart}`}>
              <h4>2. Danh sách đơn hàng</h4>
              <div className={`${styles.title_section}`}>
                <div className={`${styles.title}`}>
                  <div className={`${styles.title_name} ${styles.title_products}`}>
                    <div className={`${styles.products}`}>Sản phẩm</div>
                  </div>
                  <div className={`${styles.title_name} ${styles.classify_products}`}></div>
                  <div className={`${styles.title_name}`}>Giá tiền</div>
                  <div className={`${styles.title_name}`}>Số lượng</div>
                  <div className={`${styles.title_name} ${styles.title_price}`}>Thành tiền</div>
                </div>
              </div>
              {groupedItems &&
                groupedItems.length > 0 &&
                groupedItems.map((listCarts, index) => {
                  return (
                    <div key={index}>
                      <CartList
                        listCarts={listCarts}
                        handleVoucherShopShow={handleVoucherShopShow}
                        handleApplyVoucherShop={handleApplyVoucherShop}
                        vouchers={vouchers}
                        showVoucherShop={showVoucherShop}
                        handleCloseVoucher={() => setShowVoucherShop(false)}
                        totalDiscountShop={totalDiscountShop}
                        totalPriceProduct={totalPriceProduct}
                      />
                    </div>
                  );
                })}
            </div>
            <div className={`${styles.voucher}`}>
              <h4>3. Chọn Voucher</h4>
              <VoucherShop
                selectedVoucher={selectedVoucherShop}
                handleVoucherShow={handleVoucherShow}
                showVoucher={showVoucher}
                handleCloseVoucher={handleCloseVoucher}
                vouchers={vouchers}
                handleApplyVoucher={handleApplyVoucher}
                totalDiscountSystem={totalDiscountSystem}
              />
            </div>
            <div className={`${styles.payments}`}>
              <h4>4. Chọn hình thức thanh toán</h4>
              <div className={`${styles.payment_methods}`}>
                <ul>
                  <li>
                    <label className={`${styles.methods}`}>
                      <input
                        type="radio"
                        name="payment_methods"
                        data-view-index="cod"
                        readOnly
                        value="cod"
                        onChange={handleSelectPaymentMethod}
                        // disabled={groupedItems.length === 0}
                        checked={paymentMethod === "cod"}
                      />
                      <span>
                        <div className={`${styles.method_content_name}`}>
                          <img
                            width="32px"
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                          />
                          <span>Thanh toán tiền mặt khi nhận hàng</span>
                        </div>
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className={`${styles.methods}`}>
                      <input
                        type="radio"
                        name="payment_methods"
                        data-view-index="atm"
                        readOnly
                        value="atm"
                        onChange={handleSelectPaymentMethod}
                        // disabled={groupedItems.length === 0}
                        checked={paymentMethod === "atm"}
                      />
                      <span>
                        <div className={`${styles.method_content_name}`}>
                          <img
                            width="32px"
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-credit.svg"
                          />

                          <span>Thanh toán bằng thẻ quốc tế Visa, Master, JCB</span>
                        </div>
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.total}`}>
              <h4>5. Tổng đơn hàng </h4>
              <TotalPrice
                groupedItems={groupedItems}
                totalPriceProduct={totalPriceProduct}
                totalOrdersPrice={totalOrdersPrice}
                selectedVoucherShop={selectedVoucherShop}
                selectedVoucher={selectedVoucher}
                handleOrder={handleOrder}
                visible={visible}
                totalVoucherDiscount={totalVoucherDiscount}
                listOrder={listOrder}
                totalDiscountSystem={totalDiscountSystem}
                totalDiscountShop={totalDiscountShop}
                totalPriceProducts={totalPriceProducts}
              />
            </div>
          </Container>
        </section>

        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered isOpen={showCard}>
          <ModalHeader>Nhập thẻ thanh toán</ModalHeader>
          <ModalBody>
            <Container>
              <div className="d-flex flex-row">
                <div className="p-1">
                  <img
                    width="32"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-visa.png"
                    alt="visa"
                  />
                </div>
                <div className="p-1">
                  <img
                    width="32"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-credit-type-mastercard.svg"
                    alt="mastercard"
                  />
                </div>
                <div className="p-1">
                  <img
                    width="32"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-credit-type-jcb.svg"
                    alt="mastercard"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div className={`${styles.add_card_form_left}`}>
                  <div className="mb-4">
                    <div className="mb-2">Số thẻ:</div>
                    <input
                      type="text"
                      name="number"
                      className="w-100 rounded border border-dark p-2"
                      placeholder="VD: 4123456789012345"
                      maxLength={16}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      onFocus={() => setIsFlipped(false)}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="mb-2">Tên in trên thẻ:</div>
                    <input
                      type="text"
                      name="name"
                      maxLength={25}
                      className="w-100 rounded border border-dark p-2"
                      placeholder="VD: NGUYEN VAN A"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      onFocus={() => setIsFlipped(false)}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="mb-2">Ngày hết hạn:</div>
                    <input
                      type="text"
                      name="empiry"
                      className="w-100 rounded border border-dark p-2"
                      placeholder="VD: MM/YY"
                      maxLength={5}
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      onFocus={() => setIsFlipped(false)}
                      // name={dateEnd}
                      // value={format(new Date(dateEnd), "dd/yy")}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="mb-2">Mã bảo mật:</div>
                    <div
                      className="d-flex
                    "
                    >
                      <input
                        type="text"
                        name="cvc"
                        className="w-100 rounded border border-dark p-2"
                        placeholder="VD: 123"
                        value={cardCode}
                        onChange={(e) => setCardCode(e.target.value)}
                        onFocus={() => setIsFlipped(true)}
                        maxLength={3}
                      />
                      <img
                        className="ml-3"
                        width="21%"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/checkout-img-cvv-hint.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  {!isLoading ? (
                    <>
                      <PaymentCard
                        bank="itau"
                        model="personormalnnalite"
                        type="black"
                        brand="visa"
                        number={cardNumber}
                        cvv={cardCode}
                        holderName={cardName}
                        expiration={cardExp}
                        flipped={isFlipped}
                      />
                      <style jsx>{`
                        .santander-normal-black {
                          background: #000000;
                        }
                      `}</style>
                    </>
                  ) : null}
                </div>
              </div>
              <div className={`${styles.add_card_note} mb-3 p-3 rounded`}>
                Để đảm bảo an toàn, thông tin thẻ của bạn chỉ được lưu bởi CyberSource, công ty quản
                lý thanh toán lớn nhất thế giới (thuộc tổ chức VISA)
              </div>
            </Container>
          </ModalBody>
          <ModalFooter>
            <div className="d-flex justify-content-md-end">
              <button
                className={`${styles.back} d-flex justify-content-center align-items-center rounded mb-0 mx-3 border border-primary`}
                onClick={() => setShowCard(!showCard)}
              >
                {" "}
                Trở Lại
              </button>
              <button
                className={`${styles.confirm} d-flex justify-content-center align-items-center border-0 rounded`}
                onClick={handlePaymentMedthod}
              >
                {" "}
                Xác nhận
              </button>
            </div>
          </ModalFooter>
        </Modal>

        <Modal centered isOpen={succesPayment}>
          <ModalBody className="my-5">
            <Checkmark size="96px" />
            <div className="text-center mt-3">
              <p>Nhập số thẻ thành công</p>
            </div>
          </ModalBody>
        </Modal>
      </CommonLayout>
      <Footer />
    </>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const q = context.query;
  const response = await fetch(`${process.env.API_ORDER_URL}/checkout?s=${q.s}&f=${q.f}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const { data } = await response.json();
  return {
    props: {
      data,
    },
  };
}
