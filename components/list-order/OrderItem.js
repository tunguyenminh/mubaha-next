import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import Link from "next/link";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaStore, FaShuttleVan, FaRegMoneyBillAlt } from "react-icons/fa";
import NumberFormat from "react-number-format";
import statusEnums from "@/enums/statusOrder.enum";

const OrderItem = ({ order, setShowModal, setOrderId }) => {
  return (
    <>
      {!order ? (
        <></>
      ) : (
        <Card className="p-4 my-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}>
          <CardHeader style={{ backgroundColor: "transparent" }}>
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <div>
                  <img src="/assets/icon/shop-icon.png" className="mr-2" />
                </div>
                <div className="mx-2">
                  <span>
                    <strong>{order.vendor.brandName}</strong>{" "}
                  </span>{" "}
                </div>
                <Button
                  size="sx"
                  style={{
                    color: "#f89922",
                    background: "#fff",
                    border: "1px solid #f89922",
                  }}
                  href={`/vendors/${order.vendor.owner.username}`}
                  className="d-flex flex-row align-items-center"
                >
                  <FaStore />
                  <span className="mx-2 font-weight-normal">Xem Shop</span>
                </Button>
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex flex-row align-items-center border-right border-dark mr-2">
                  {order.shipment?.details[0]?.title && (
                    <>
                      <FaShuttleVan className="mx-2" />
                      <span className="text-capitalize">{order.shipment?.details[0]?.title}</span>
                      <div className="mx-2">
                        <AiOutlineQuestionCircle />
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <span style={{ textTransform: "uppercase", color: "#f89922" }}>
                    {statusEnums[order.status]}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardBody className="py-0">
            {order.products.length > 0 &&
              order.products.map((product, i) => {
                return (
                  <div key={i}>
                    <Link href={`/account/order-detail/${order.orderId}`}>
                      <div className="d-flex align-items-center justify-content-between my-3">
                        <div className="d-flex align-items-center justify-content-center">
                          <img
                            className="border mr-3"
                            width="85vw"
                            src={`${product.product.media.featuredImage}`}
                          />
                          <div className="d-flex flex-column justify-content-between p-2">
                            <h4 className="mb-0" style={{ lineHeight: "1.3" }}>
                              {product.product.name}
                            </h4>
                            {product.selectedVariant === null ? (
                              ""
                            ) : product.selectedAttribute === null ? (
                              <span>Phân loại hàng: {product.selectedVariant.name}</span>
                            ) : (
                              <span>
                                Phân loại hàng: {product.selectedVariant.name} -{" "}
                                {product.selectedAttribute.name}
                              </span>
                            )}
                            <p className="mb-0">x {product.amount}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <del className="mx-1">
                            <span className="money ml-1">
                              <span>
                                {product.discount > 0 && (
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
                                )}
                              </span>
                            </span>
                          </del>
                          <span>
                            <NumberFormat
                              value={product.price * (1 - product.discount)}
                              thousandSeparator={true}
                              displayType="text"
                              suffix={product.currencySymbol}
                              decimalScale={0}
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </CardBody>

          <CardFooter className="pb-1" style={{ backgroundColor: "transparent" }}>
            <div className="d-flex justify-content-end align-items-center">
              <FaRegMoneyBillAlt />
              <div className="p-2">Tổng số tiền:</div>
              <h3 className="mb-0" style={{ color: "#f89922" }}>
                <NumberFormat
                  value={order.totalPrice}
                  thousandSeparator={true}
                  displayType="text"
                  suffix={order.currencySymbol}
                  decimalScale={0}
                />
              </h3>
            </div>
            {(order && order.status === "awaiting_confirmation") ||
            order.status === "pickup_available" ? (
              <div className="mt-3">
                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    size="lg"
                    onClick={() => {
                      setOrderId(order._id);
                      setShowModal(true);
                    }}
                  >
                    Huỷ đơn hàng
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
};
export default OrderItem;
