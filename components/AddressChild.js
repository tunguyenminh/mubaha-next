import styles from "@/styles/account.module.css";
import { Col, Modal, ModalHeader, ModalFooter, Button, Container, Row } from "reactstrap";
import { useState } from "react";
import { useSession } from "next-auth/react";
import AddressTwo from "@/components/AddressTwo.js";
import { AiFillDelete, AiFillHome, AiTwotoneEdit } from "react-icons/ai";
export default function AddressChild({
  address,
  index,
  updateAddress,
  deleteAdd,
  updateDefaultAddress,
}) {
  const [add, setAddress] = useState(address);
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleNotShow = (a) => {
    if (a) {
      setAddress(a);
      updateAddress(index, a);
    }
    setShow(false);
  };
  const hanldeShow = () => {
    setShow(true);
  };
  const handleModalDelete = () => {
    setIsDelete(!isDelete);
  };
  const deleteAddress = async () => {
    const response = await fetch(`${process.env.API_ADDRESS_URL}/${address._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.accessToken,
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      deleteAdd(index);
      handleModalDelete();
    }
  };
  const setUpdateDefault = async () => {
    const res = await fetch(`${process.env.API_ADDRESS_URL}/default/${address._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.accessToken,
      },
    });
    const data = await res.json();
    if (data.status === 200) {
      updateDefaultAddress(index, data.data);
    }
  };
  return (
    <>
      <Modal className="mt-5" isOpen={isDelete} toggle={handleModalDelete}>
        <ModalHeader toggle={handleModalDelete}>Bạn có muốn xoá địa chỉ?</ModalHeader>
        <ModalFooter>
          <Button color="danger" onClick={deleteAddress}>
            Đồng ý
          </Button>
          <Button onClick={handleModalDelete}>Huỷ</Button>
        </ModalFooter>
      </Modal>

      <div className={`${styles.hr}`}></div>
      <Col sm="8">
        <Container>
          <Row className="mb-3">
            <Col sm="4">
              <div className="text-right">Họ và tên:</div>
            </Col>
            <Col sm="8">
              <strong>{address.fullName}</strong>
              {address.isDefault && <span className={`${styles.note}`}>Mặc định</span>}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm="4">
              <div className="text-right">Số điện thoại:</div>
            </Col>
            <Col sm="8">
              <div>{address.phone}</div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="text-right">Địa chỉ:</div>
            </Col>
            <Col sm="8">
              <div>
                {address.details}
                {address.details && ", "}
                {address.fullAddress}
              </div>
            </Col>
          </Row>
        </Container>
      </Col>
      <Col sm="4">
        <div className="box">
          <div className={`${styles.box_function}`}>
            <Button className={`${styles.button_function}`} onClick={hanldeShow}>
              <AiTwotoneEdit className="mr-2" />
              <p className="font-weight-normal m-0">Sửa</p>
            </Button>

            {!address.isDefault && (
              <Button onClick={handleModalDelete} className={`${styles.button_function}`}>
                <AiFillDelete className="mr-2" />
                <p className="font-weight-normal m-0">Xoá</p>
              </Button>
            )}
            {!address.isDefault && (
              <Button onClick={setUpdateDefault} className={`${styles.button_function}`}>
                <AiFillHome className="mr-2" /> <p className="font-weight-normal m-0">Mặc định</p>
              </Button>
            )}
          </div>
        </div>
      </Col>

      <AddressTwo isOpen={show} handleNotShow={handleNotShow} address={address} />
    </>
  );
}
