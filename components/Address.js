
import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
} from "reactstrap";
import styles from '@/styles/account.module.css'
import libphone from 'google-libphonenumber';
import { useSession } from 'next-auth/react'
const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance()
export default function Address({ isOpen, handleCloseCreateAdd ,isExist}) {
  const { data: session } = useSession()
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const inputName = useRef()
  const inputPhone = useRef()
  const selectPrivince = useRef()
  const selectDistrict = useRef()
  const selectWard = useRef()
  const inputDetailAddress = useRef()
  const selectCheck = useRef()

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.API_LOCATION_URL}/provinces`)
      const data = await res.json()
      setProvinces(data.data)
    }
    fetchData()
  }, [])
  const handleDistrict = async (e) => {
    const id = e.target.value
    const res = await fetch(`${process.env.API_LOCATION_URL}/provinces/${id}/districts`)
    const data = await res.json()
    setDistricts(data.data)
    setWards([])
  }
  const handleWards = async (e) => {
    const id = e.target.value
    const res = await fetch(`${process.env.API_LOCATION_URL}/districts/${id}/wards`)
    const data = await res.json()
    setWards(data.data)
  }
  const handleAdd = async () => {
    let mess = ""
    var reg = /^\d+$/;
    if (!reg.test(inputPhone.current.value)) {
      mess += "Số điện thoại không hợp lệ, "
    } else {
      if (inputPhone.current.value.length < 2 || inputPhone.current.value == null) {
        mess += "Số điện thoại không hợp lệ, "

      } else {
        const number = phoneUtil.parse(inputPhone.current.value, "VN");
        if (!phoneUtil.isValidNumber(number)) {
          mess += "Số điện thoại không hợp lệ, "

        }
      }
    }
    if (inputName.current.value.length < 1) {
      mess += "Tên không hợp lệ, "
    }
    if (selectPrivince.current.value == "") {
      mess += "Tỉnh hoặc thành phố không hợp lệ, "
    }
    if (selectDistrict.current.value == "") {
      mess += "Quận hoặc huyện không hợp lệ, "
    }
    if (selectWard.current.value == "") {
      mess += "Xã hoặc phường không hợp lệ, "
    }
    if (mess == "") {
      const body = {
        isDefault: selectCheck.current.checked,
        phone: inputPhone.current.value,
        fullName: inputName.current.value,
        provinceCode: selectPrivince.current.value,
        districtCode: selectDistrict.current.value,
        wardCode: selectWard.current.value,
        detailAddress: inputDetailAddress.current.value,
        fullAddress: `${selectWard.current.options[selectWard.current.selectedIndex].text}, ${selectDistrict.current.options[selectDistrict.current.selectedIndex].text}, ${selectPrivince.current.options[selectPrivince.current.selectedIndex].text}`
      }
      const response = await fetch(process.env.API_ADDRESS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + session.accessToken
        },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (data.status === 200) {
        handleCloseCreateAdd(data.data,selectCheck.current.checked)
      }
    } else {
      setMessage(mess.slice(0, -2))
      setShowMessage(true)
    }

  }
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={isOpen}>
        <ModalHeader>
          Tạo địa chỉ mới
        </ModalHeader>
        <ModalBody className="container-fluid">
          <div className="col-md-12 mt-3">
            {showMessage &&
              <Alert style={{ textAlign: 'center', height: 'auto' }} color={'danger'}>
                {message}
              </Alert>
            }
          </div>
          <Row className="pl-5 pr-5 pb-3 pt-3">
            <form id="add_address">
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="productname">Họ và tên</label>
                    <input
                      name="productname"
                      type="text"
                      ref={inputName}
                      className="form-control productname"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="number_phone">Số điện thoại</label>
                    <input
                      name="number_phone"
                      type="text"
                      ref={inputPhone}
                      className="form-control number_phone"
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="mb-3">
                    <label
                      htmlFor="choices-single-groups"
                      className="form-label font-size-13 text-muted"
                    >
                      Tỉnh/Thành phố
                    </label>
                    <select
                      className="form-control"
                      data-trigger
                      ref={selectPrivince}
                      name="choices-single-groups"
                      required
                      onChange={handleDistrict}
                    >
                      <option value="">Chọn một tỉnh/thành phố</option>
                      {provinces.map((p) => {
                        return (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="mb-3">
                    <label
                      htmlFor="choices-single-groups"
                      className="form-label font-size-13 text-muted"
                    >
                      Quận/Huyện
                    </label>
                    <select
                      ref={selectDistrict}
                      className="form-control"
                      data-trigger
                      name="choices-single-groups"
                      onChange={handleWards}
                      required
                    >
                      <option value="">Chọn một quận/huyện</option>
                      {districts.map((p) => {
                        return (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="mb-3">
                    <label
                      htmlFor="choices-single-groups"
                      className="form-label font-size-13 text-muted"
                    >
                      Xã/Phường
                    </label>
                    <select
                      ref={selectWard}
                      className="form-control"
                      data-trigger
                      name="choices-single-groups"
                      id="ward"
                      required
                    >
                      <option value="">Chọn một xã/phường</option>
                      {wards.map((p) => {
                        return (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <label className="col-form-label">
                    Địa chỉ chi tiết
                  </label>
                  <textarea
                    className="form-control"
                    ref={inputDetailAddress}
                    required
                  />
                </div>
                <div className={` col-lg-12 mt-2 a ${isExist===0 ? styles.disabled : ""}`}>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                    defaultChecked={isExist==0} ref={selectCheck}
                     />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Đặt địa chỉ mặc định
                    </label>
                  </div>
                </div>
              </div>

            </form>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-secondary btn-lg" style={{ width: '120px', height: '50px' }}
            onClick={() => handleCloseCreateAdd() }
          >
            Huỷ
          </Button>
          <button className="btn-solid btn"
            onClick={handleAdd}
          >
            Tạo
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}