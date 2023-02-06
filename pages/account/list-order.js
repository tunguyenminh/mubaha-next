import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import {
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Link from "next/link";
import Layout from "@/components/profile/Layout.js";
import OrderItem from "@/components/list-order/OrderItem.js";
import { MdNotificationImportant } from "react-icons/md";
import Head from "next/head";
import HeadSeo from "../../components/HeadSeo";

const reasons = [
  {
    id: 1,
    name: "Muốn thay đổi địa chỉ giao hàng",
  },
  {
    id: 2,
    name: "Muốn nhập/thay đổi mã Voucher",
  },
  {
    id: 3,
    name: "Muốn thay đổi sản phẩm trong đơn hàng (size, màu sắc, số lượng,...)",
  },
  {
    id: 4,
    name: "Đổi ý, không muốn mua nữa",
  },
  {
    id: 5,
    name: "Khác",
  },
];

const ListOrder = ({ data }) => {
  const { data: session } = useSession();
  const [listOrder, setListOrder] = useState(data.docs);
  const [activeTab, setActiveTab] = useState("1");
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleTransport = async (status) => {
    try {
      const response = await fetch(`${process.env.API_ORDER_URL}/listing?status=${status}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.accessToken,
        },
      });
      const { data } = await response.json();
      setListOrder(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancleOrder = async () => {
    const payload = {
      reason: reason,
    };
    const response = await fetch(`${process.env.API_ORDER_URL}/${orderId}/cancel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.accessToken,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data.status === 200) {
      const orderId = data.data._id;
      const newListOrder = listOrder.map((e) => {
        if (e._id === orderId) {
          return {
            ...e,
            status: "cancelled",
          };
        }
        return e;
      });
      setListOrder(newListOrder);
      setShowModal(false);
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <HeadSeo title={`Đơn mua`} />
      <div className="dashboard-right">
        <div className="d-flex flex-column">
          <div className="tab-product pt-0 m-0">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("1");
                      handleTransport("");
                    }}
                  >
                    Tất cả đơn hàng
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("2");
                      handleTransport("awaiting_confirmation");
                    }}
                  >
                    Chờ xác nhận
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "3" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("3");
                      handleTransport("pickup_available");
                    }}
                  >
                    Chờ lấy hàng
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "4" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("4");
                      handleTransport("in_transit");
                    }}
                  >
                    Đang giao
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "5" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("5");
                      handleTransport("delivered");
                    }}
                  >
                    Đã giao
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs flex-fill" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "6" ? "active" : ""}
                    onClick={() => {
                      setActiveTab("6");
                      handleTransport("cancelled");
                    }}
                  >
                    Đã huỷ
                  </NavLink>
                </NavItem>
              </Nav>
            </Row>
          </div>
          {/* <div
            className="d-flex mt-3 mb-3 align-items-center p-3 rounded"
            style={{ backgroundColor: "#eaeaea", fontSize: "15px" }}
          >
            <AiOutlineSearch size="22px" color="#bbb" />
            <input
              style={{ backgroundColor: "#eaeaea" }}
              className="border-0 flex-grow-1 pl-2"
              placeholder="Tìm kiếm theo Tên sản phẩm, ID đơn hàng hoặc Tên Shop"
            />
          </div> */}
          <TabContent activeTab={activeTab} className="nav-material">
            <TabPane tabId="1">
              {listOrder && listOrder.length > 0 ? (
                listOrder.map((order, i) => {
                  return (
                    <div key={i}>
                      <OrderItem
                        order={order}
                        setShowModal={setShowModal}
                        setOrderId={setOrderId}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="mt-3">
                  <h3 className="text-center">
                    {" "}
                    Chưa có đơn hàng nào. Quay lại{" "}
                    <Link href="/">
                      <a style={{ color: "#f89922" }}>Trang chủ</a>
                    </Link>{" "}
                  </h3>
                </div>
              )}
            </TabPane>
            <TabPane tabId="2">
              {" "}
              {listOrder.length > 0 ? (
                listOrder.map((order, i) => {
                  return (
                    <div key={i}>
                      <OrderItem
                        order={order}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        handleCancleOrder={handleCancleOrder}
                        reason={reason}
                        setReason={setReason}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="mt-3">
                  <h3 className="text-center">
                    {" "}
                    Chưa có đơn hàng nào. Quay lại{" "}
                    <Link href="/">
                      <a style={{ color: "#f89922" }}>Trang chủ</a>
                    </Link>{" "}
                  </h3>
                </div>
              )}
            </TabPane>
            <TabPane tabId="3">
              {" "}
              {listOrder.length > 0 ? (
                listOrder.map((order, i) => {
                  return (
                    <div key={i}>
                      <OrderItem
                        order={order}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        handleCancleOrder={handleCancleOrder}
                        reason={reason}
                        setReason={setReason}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="mt-3">
                  <h3 className="text-center">
                    {" "}
                    Chưa có đơn hàng nào. Quay lại{" "}
                    <Link href="/">
                      <a style={{ color: "#f89922" }}>Trang chủ</a>
                    </Link>{" "}
                  </h3>
                </div>
              )}
            </TabPane>
            <TabPane tabId="4">
              {" "}
              {listOrder.length > 0 ? (
                listOrder.map((order, i) => {
                  return (
                    <div key={i}>
                      <OrderItem order={order} />
                    </div>
                  );
                })
              ) : (
                <div className="mt-3">
                  <h3 className="text-center">
                    {" "}
                    Chưa có đơn hàng nào. Quay lại{" "}
                    <Link href="/">
                      <a style={{ color: "#f89922" }}>Trang chủ</a>
                    </Link>{" "}
                  </h3>
                </div>
              )}
            </TabPane>
            <TabPane tabId="5">
              {" "}
              {listOrder.length > 0 ? (
                listOrder.map((order, i) => {
                  return (
                    <div key={i}>
                      <OrderItem order={order} />
                    </div>
                  );
                })
              ) : (
                <div className="mt-3">
                  <h3 className="text-center">
                    {" "}
                    Chưa có đơn hàng nào. Quay lại{" "}
                    <Link href="/">
                      <a style={{ color: "#f89922" }}>Trang chủ</a>
                    </Link>{" "}
                  </h3>
                </div>
              )}
            </TabPane>
            <TabPane tabId="6">
              {" "}
              {listOrder.length > 0 ? (
                listOrder.map((order, i) => {
                  return (
                    <div key={i}>
                      <OrderItem order={order} />
                    </div>
                  );
                })
              ) : (
                <div className="mt-3">
                  <h3 className="text-center">
                    {" "}
                    Chưa có đơn hàng nào. Quay lại{" "}
                    <Link href="/">
                      <a style={{ color: "#f89922" }}>Trang chủ</a>
                    </Link>{" "}
                  </h3>
                </div>
              )}
            </TabPane>
          </TabContent>
        </div>
      </div>
      <Modal style={{ maxWidth: "640px", width: "80%" }} centered isOpen={showModal}>
        <ModalHeader>
          <h3 className="font-weight-bold">Chọn lí do huỷ đơn hàng</h3>
        </ModalHeader>
        <ModalBody className="p-4">
          <div className="alert alert-warning mb-0 d-flex align-items-center justify-content-between">
            <span className="mr-3">
              <MdNotificationImportant size="30px" />
            </span>
            <span>
              Vui lòng chọn lí do hủy đơn hàng. Lưu ý: Thao tác này sẽ hủy tất cả các sản phẩm có
              trong đơn hàng và không thể hoàn tác.
            </span>
          </div>
          <Form className="mx-2 mt-3 mb-5 d-flex flex-column">
            {reasons.map((reason, i) => {
              return (
                <>
                  <FormGroup key={i} className="my-3" check>
                    <Label check>
                      <Input
                        type="radio"
                        name="reasons"
                        value={reason.name}
                        onClick={(e) => setReason(e.target.value)}
                      />
                      {reason.name}
                    </Label>
                  </FormGroup>
                </>
              );
            })}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button style={{ width: "7em", height: "3em" }} onClick={() => setShowModal(false)}>
            Huỷ
          </Button>
          <Button
            style={{ width: "10em", height: "3em" }}
            color="danger"
            onClick={() => handleCancleOrder()}
          >
            Xác nhận
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

ListOrder.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ListOrder;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const response = await fetch(`${process.env.API_ORDER_URL}/listing`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const { data } = await response.json();
  return {
    props: { data },
  };
}
