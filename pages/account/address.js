import React, { useState, useEffect, useRef } from "react";
import { getSession } from "next-auth/react";
import { Container, Row, Col, Button } from "reactstrap";
import styles from "@/styles/account.module.css";
import AddressChild from "@/components/AddressChild.js";
import Address from "@/components/Address";
import Layout from "@/components/profile/Layout.js";
import Head from "next/head";
import HeadSeo from "../../components/HeadSeo";
const AddressPage = ({ data }) => {
  const [address, setAddress] = useState([]);
  const [createAdd, setCreateAdd] = useState(false);
  const handleCreateAdd = () => {
    setCreateAdd(true);
  };
  useEffect(() => {
    setAddress(data);
  }, []);
  const handleCloseCreateAdd = (add, isDefault) => {
    if (add) {
      if (isDefault) {
        address.forEach((add) => {
          if (add && add.isDefault === true) {
            add.isDefault = false;
          }
        });
      }
      address.unshift(add);
      setAddress([...address]);
    }
    setCreateAdd(false);
  };
  const updateAddress = (i, add) => {
    address[i] = add;
    setAddress([...address]);
  };
  const deleteAddress = (i) => {
    address.splice(i, 1);
    setAddress([...address]);
  };
  const updateDefaultAddress = (i, add) => {
    address.forEach((add) => {
      if (add.isDefault === true) {
        add.isDefault = false;
      }
    });
    address[i] = add;
    setAddress([...address]);
  };
  return (
    <>
      <HeadSeo title={`Thông tin địa chỉ`} />
      <div className="dashboard-right">
        <div className="dashboard">
          <div className="d-flex align-items-center">
            <div className={`page-title flex-grow-1`}>
              <h2 className="mb-0">Địa chỉ của tôi</h2>
            </div>
            <div className={`${styles.add_address}`}>
              <Button className={`${styles.button_add_address}`} onClick={handleCreateAdd}>
                <i className="fa fa-solid fa-plus mr-1"></i>
                Thêm địa chỉ
              </Button>
            </div>
          </div>
          <Row>
            {data.length > 0
              ? address.map((a, i) => {
                  return (
                    <>
                      <AddressChild
                        key={i}
                        address={a}
                        index={i}
                        updateAddress={updateAddress}
                        deleteAdd={deleteAddress}
                        updateDefaultAddress={updateDefaultAddress}
                      />
                    </>
                  );
                })
              : "Bạn chưa có địa chỉ nào"}
          </Row>
        </div>
      </div>

      <Address
        isOpen={createAdd}
        handleCloseCreateAdd={handleCloseCreateAdd}
        isExist={address.length}
      />
    </>
  );
};

AddressPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AddressPage;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  const res = await fetch(process.env.API_ADDRESS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.accessToken,
    },
  });

  const data = await res.json();
  return { props: { data: data.data } };
}
