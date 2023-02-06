import React, { useState } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import Layout from "@/components/profile/Layout.js";
import { Button, Card, CardBody, CardHeader, Popover, PopoverBody } from "reactstrap";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import styles from "@/styles/account.module.css";
import { FaStore, FaInfoCircle, FaMoneyCheck, FaTruck, FaRegStar } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { FcInTransit } from "react-icons/fc";
import NumberFormat from "react-number-format";
import Steps from "@/components/order-detail/Steps";
import format from "date-fns/format";
import statusEnums from "@/enums/statusOrder.enum"
import methodEnums from "@/enums/paymenMethod.enum"
import shipmentEnums from "@/enums/shipmentType.enum"

const OrderDetail = ({ data }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const onHover = () => {
    setPopoverOpen(true);
  };
  const onHoverLeave = () => {
    setPopoverOpen(false);
  };
  return (
    <>
      {!data ? (
        <></>
      ) : (
        <div className="dashboard-right">
          <div className="dashboard py-3 px-3 d-flex flex-column border-bottom-0">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Button className="d-flex align-items-center">
                  <AiOutlineDoubleLeft />
                  <Link href="/account/list-order">
                    <a>
                      <span style={{ color: "#ffffff" }}>Quay lại đơn hàng của tôi</span>
                    </a>
                  </Link>
                </Button>
              </div>
              <div className="text-uppercase">
                <span>id đơn hàng: {data.orderId}</span>
                <span className="mx-2">|</span>
                <span style={{ color: "#f89922" }}>{statusEnums[data.status]}</span>
              </div>
            </div>
          </div>
          <div style={{ border: " 1px dotted rgba(0, 0, 0, 0.09)" }}></div>
          <div className="dashboard py-3 px-3 d-flex flex-column border-top-0">
            <div className="  align-items-center justify-content-between">
              <div className="main_container">
                <div className="container padding-bottom-3x mt-4">
                  
                   
                      <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-around">
                        {!data.proccessingInfo.orderAt ? (
                          <div className="step flex-grow-1">
                            <div className="step-icon-wrap">
                              <div className="step-icon">
                                <i style={{ opacity: "0.4" }}>
                                  <RiBillFill />
                                </i>
                              </div>
                            </div>
                            <h4 className="step-title text-center" style={{ opacity: "0.4" }}>
                              Đơn hàng đã đặt
                            </h4>
                          </div>
                        ) : (
                          <div className="step completed flex-fill">
                            <div className="step-icon-wrap">
                              <div className="step-icon">
                                <i>
                                  <RiBillFill />
                                </i>
                              </div>
                            </div>
                            <h4 className="step-title text-center ">
                              Đơn hàng đã đặt
                              <p className="mt-1" style={{ opacity: "0.6", fontSize: "12px" }}>
                                {format(new Date(data.proccessingInfo.orderAt), "HH:mm MM/dd/yyyy")}
                              </p>
                            </h4>
                          </div>
                        )}

                        {!data.proccessingInfo.paymentAt ? (
                          <div className="step flex-grow-1">
                            <div className="step-icon-wrap">
                              <div className="step-icon">
                                <i style={{ opacity: "0.4" }}>
                                  <FaMoneyCheck />
                                </i>
                              </div>
                            </div>
                            <h4 className="step-title text-center" style={{ opacity: "0.4" }}>
                              Đã thanh toán
                            </h4>
                          </div>
                        ) : (
                          <div className="step completed flex-grow-1">
                            <div className="step-icon-wrap">
                              <div className="step-icon">
                                <i>
                                  <FaMoneyCheck />
                                </i>
                              </div>
                            </div>
                            <h4 className="step-title text-center">
                              Đã thanh toán
                              <p className="mt-1" style={{ opacity: "0.6", fontSize: "12px" }}>
                                {format(
                                  new Date(data.proccessingInfo.paymentAt),
                                  "HH:mm MM/dd/yyyy"
                                )}
                              </p>
                            </h4>
                          </div>
                        )}

                        {!data.proccessingInfo.intransitAt ? (<div className="step flex-grow-1">
                          <div className="step-icon-wrap">
                            <div className="step-icon">
                              <i style={{ opacity: "0.4" }}>
                                <FaTruck />
                              </i>
                            </div>
                          </div>
                          <h4 className="step-title text-center" style={{ opacity: "0.4" }}>
                            Đã giao cho ĐVVC
                          </h4>
                        </div>) : (<div className="step completed flex-grow-1">
                            <div className="step-icon-wrap">
                              <div className="step-icon">
                                <i>
                                <FaTruck />
                                </i>
                              </div>
                            </div>
                            <h4 className="step-title text-center">
                            Đã giao cho ĐVVC
                              <p className="mt-1" style={{ opacity: "0.6", fontSize: "12px" }}>
                                {format(
                                  new Date(data.proccessingInfo.intransitAt),
                                  "HH:mm MM/dd/yyyy"
                                )}
                              </p>
                            </h4>
                          </div>)}

                        

                          {!data.proccessingInfo.pickupAt ? (<div className="step flex-grow-1">
                          <div className="step-icon-wrap">
                            <div className="step-icon">
                              <i style={{ opacity: "0.4" }}>
                              <MdDeliveryDining />
                              </i>
                            </div>
                          </div>
                          <h4 className="step-title text-center" style={{ opacity: "0.4" }}>
                          Đang giao
                          </h4>
                        </div>) : (!data.proccessingInfo.deliveredAt ? <div className="step completed flex-grow-1">
                            <div className="step-icon-wrap">
                              <div className="step-icon">
                                <i>
                                <MdDeliveryDining />
                                </i>
                              </div>
                            </div>
                            <h4 className="step-title text-center">
                            Đang giao
                              <p className="mt-1" style={{ opacity: "0.6", fontSize: "12px" }}>
                                {format(
                                  new Date(data.proccessingInfo.pickupAt),
                                  "HH:mm MM/dd/yyyy"
                                )}
                              </p>
                            </h4>
                          </div> : <div className="step completed flex-grow-1">
                            <div className="step-icon-wrap">
                              <div className="step-icon">
                                <i>
                                <MdDeliveryDining />
                                </i>
                              </div>
                            </div>
                            <h4 className="step-title text-center">
                            Đơn hàng đã nhận
                              <p className="mt-1" style={{ opacity: "0.6", fontSize: "12px" }}>
                                {format(
                                  new Date(data.proccessingInfo.deliveredAt),
                                  "HH:mm MM/dd/yyyy"
                                )}
                              </p>
                            </h4>
                          </div>)}

                        
                                  {!data.proccessingInfo.reviewAt ? ( <div className="step flex-grow-1">
                          <div className="step-icon-wrap  ">
                            <div className="step-icon">
                              <i style={{ opacity: "0.4"}}>
                                <FaRegStar />
                              </i>
                            </div>
                          </div>
                          <h4 className="step-title text-center" style={{ opacity: "0.4" }}>
                           Đánh giá
                          </h4>
                        </div>) : (<div className="step completed flex-grow-1">
                            <div className="step-icon-wrap">
                              <div className="step-icon">
                                <i>
                                <FaRegStar />
                                </i>
                              </div>
                            </div>
                            <h4 className="step-title text-center">
                            Đã đánh giá
                             
                            </h4>
                          </div>)}
                       
                      </div>
                   
                  
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.border}`}></div>
          <div className="dashboard py-3 px-4 d-flex flex-column border border-bottom-0">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <div className="d-flex align-items-center">
                  <h4 className="mb-0 font-weight-bold">địa chỉ nhận hàng</h4>
                </div>
              </div>
              <div>
                <div
                  className="d-flex flex-column text-right"
                  style={{ fontSize: "12px", color: "rgba(0,0,0,.54)" }}
                >
                  <span>
                    <span className="text-uppercase">{shipmentEnums[data.shipmentMethod.type]}</span> -{" "}
                    {data.shipmentMethod.name}
                  </span>
                  {data.shipmentMethod._id ? <span>{data.shipmentMethod._id}</span> : <span></span>}
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div className="d-flex flex-column pt-2 pr-3" style={{ width: "40%" }}>
                <div className="font-weight-bolder mb-3">{data.deliveryAddress.fullName}</div>
                <div className="d-flex flex-column" style={{ color: "rgba(0,0,0,.54)" }}>
                  <div>{data.deliveryAddress.phone}</div>
                  <div>{data.deliveryAddress.fullAddress}</div>
                </div>
              </div>
              <div className="border-left border-dark">
                <div className="d-flex flex-column pt-1 pl-4">
                  {data.shipment?.details.length > 0 ? (
                    <>
                      <Steps data={data.shipment.details} />
                    </>
                  ) : (
                    <span className="mt-2">Không có Thông tin vận chuyển</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Card className="p-3 rounded-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}>
              <CardHeader className="pt-0 px-0 mx-3" style={{ backgroundColor: "transparent" }}>
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <div>
                      <img src="/assets/icon/shop-icon.png" className="mr-2" />
                    </div>
                    <div className="mx-2">
                      <span>
                        <strong>{data.vendor.brandName}</strong>{" "}
                      </span>{" "}
                    </div>
                    <Button
                      size="sx"
                      style={{
                        color: "#f89922",
                        background: "#fff",
                        border: "1px solid #f89922",
                      }}
                      className="d-flex flex-row align-items-center"
                    >
                      <FaStore />

                      <Link href={`/vendors/${data.vendor.owner.username}`}>
                        <a style={{ color: "#f89922" }} className="mx-2 font-weight-normal">
                          Xem Shop
                        </a>
                      </Link>
                    </Button>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="d-flex flex-row align-items-center mr-2">
                      {data.shipment?.details.length > 0 ? (
                        <div>
                          <div
                            role="button"
                            id="Popover1"
                            type="button"
                            onMouseEnter={onHover}
                            onMouseLeave={onHoverLeave}
                          >
                            <FaInfoCircle />
                          </div>
                          <Popover
                            style={{ width: "9rem" }}
                            flip
                            target="Popover1"
                            isOpen={popoverOpen}
                            toggle={onHover.bind(this)}
                          >
                            <PopoverBody>
                              <span>Cập nhật mới nhất</span>
                              <br />
                              <span>
                                {format(
                                  new Date(data.shipment.details[0].createdAt),
                                  "HH:mm MM/dd/yyyy"
                                )}
                              </span>
                            </PopoverBody>
                          </Popover>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              {data.products.map((product,i) => {
                return (
                  <CardBody key={i} className="py-0">
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          className="border mr-3"
                          width="85vw"
                          src={product.product.media.featuredImage}
                        />
                        <div className="d-flex flex-column justify-content-between p-2">
                          <h4 className="mb-0" style={{ lineHeight: "1.3" }}>
                            {product.product.name}
                          </h4>
                          {!product.selectedVariant ? (
                            !product.selectedAttribute ? (
                              <></>
                            ) : (
                              <span>Phân loại hàng: {product.selectedAttribute}</span>
                            )
                          ) : (
                            <span>
                              Phân loại hàng: {product.selectedVariant} -{" "}
                              {product.selectedAttribute}
                            </span>
                          )}
                          <p className="mb-0"> x {product.amount}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        {product.discount > 0 ? (
                          <>
                            <del>
                              <span className="money ml-1">
                                <NumberFormat
                                  value={product.price}
                                  thousandSeparator={true}
                                  displayType="text"
                                  suffix={product.currencySymbol}
                                  decimalScale={0}
                                />
                              </span>
                            </del>
                            <h3 className="mb-0 mx-2" style={{ color: "#f89922" }}>
                              <NumberFormat
                                value={(1 - product.discount) * product.price}
                                thousandSeparator={true}
                                displayType="text"
                                suffix="đ"
                                decimalScale={0}
                              />
                            </h3>
                          </>
                        ) : (
                          <h3 className="mb-0 mx-2" style={{ color: "#f89922" }}>
                            <NumberFormat
                              value={product.price}
                              thousandSeparator={true}
                              displayType="text"
                              suffix="đ"
                              decimalScale={0}
                            />
                          </h3>
                        )}
                      </div>
                    </div>
                  </CardBody>
                );
              })}
            </Card>
          </div>
          <div className={`${styles.border}`}></div>
          <div className="dashboard p-0">
            <div
              className="d-flex justify-content-end px-3"
              style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
            >
              <div className="p-3">
                <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                  Tổng tiền hàng
                </h6>
              </div>
              <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
                <div style={{ width: "15vw" }} className="text-right pr-2">
                  <NumberFormat
                    value={data.totalPriceBefore}
                    thousandSeparator={true}
                    displayType="text"
                    suffix={data.currencySymbol}
                    decimalScale={0}
                  />
                </div>
              </div>
            </div>
            {/* <div
            className="d-flex justify-content-end px-3"
            style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
          >
            <div className="p-3">
              <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                Phí vận chuyển
              </h6>
            </div>
            <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
              <div style={{ width: "15vw" }} className="text-right pr-2">
                252.000₫
              </div>
            </div>
          </div> */}
            {data.totalVendorDiscount && data.totalVendorDiscount > 0 ? (
              <div
                className="d-flex justify-content-end px-3"
                style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
              >
                <div className="p-3">
                  <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                    Giảm giá từ Voucher Shop
                  </h6>
                </div>
                <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
                  <div style={{ width: "15vw", color: "red" }} className="text-right pr-2">
                    {" - "}
                    <NumberFormat
                      value={data.totalVendorDiscount}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={data.currencySymbol}
                      decimalScale={0}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {data.totalSystemDiscount && data.totalSystemDiscount > 0 ? (
              <div
                className="d-flex justify-content-end px-3"
                style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
              >
                <div className="p-3">
                  <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                    Giảm giá từ Voucher Mubaha
                  </h6>
                </div>
                <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
                  <div style={{ width: "15vw", color: "red" }} className="text-right pr-2">
                    {" - "}
                    <NumberFormat
                      value={data.totalSystemDiscount}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={data.currencySymbol}
                      decimalScale={0}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {data.voucherDiscountAmount && data.voucherDiscountAmount > 0 ? (
              <div
                className="d-flex justify-content-end px-3"
                style={{ borderBottom: "1px dotted rgba(0,0,0,.09)" }}
              >
                <div className="p-3">
                  <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                    Tổng giảm giá Voucher
                  </h6>
                </div>
                <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
                  <div style={{ width: "15vw", color: "red" }} className="text-right pr-2">
                    {" - "}

                    <NumberFormat
                      value={data.voucherDiscountAmount}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={data.currencySymbol}
                      decimalScale={0}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="d-flex justify-content-end align-items-center px-3">
              <div className="p-3">
                <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                  Tổng số tiền
                </h6>
              </div>
              <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
                <h3 style={{ minWidth: "15vw", color: "#f89922" }} className="text-right pr-2">
                  <NumberFormat
                    value={data.totalPrice}
                    thousandSeparator={true}
                    displayType="text"
                    suffix={data.currencySymbol}
                    decimalScale={0}
                  />
                </h3>
              </div>
            </div>
          </div>
          <div className={`${styles.border}`}></div>
          <div className="dashboard p-0">
            <div className="d-flex justify-content-end px-3">
              <div className="p-3 d-flex justify-content-center align-items-center">
                <FcInTransit style={{ fontSize: "18px" }} />
                <h6 className="ml-2 mb-0" style={{ fontSize: "13px" }}>
                  Phương thức thanh toán
                </h6>
              </div>
              <div className="p-3" style={{ borderLeft: "1px dotted rgba(0,0,0,.09)" }}>
                <div
                  style={{ width: "15vw", fontSize: "13px" }}
                  className="text-right pr-2 font-weight-bold"
                >
                  {methodEnums[data.payment.method]}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

OrderDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default OrderDetail;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { orderId } = context.query;
  const res = await fetch(`${process.env.API_ORDER_URL}/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const { data } = await res.json();

  return {
    props: {
      data,
    },
  };
}
