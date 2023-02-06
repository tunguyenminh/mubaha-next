
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
import libphone from 'google-libphonenumber';
import {useSession} from 'next-auth/react'
const { PhoneNumberFormat, PhoneNumberUtil } = libphone;

const phoneUtil = PhoneNumberUtil.getInstance()
export default function Address({ isOpen, handleNotShow,address }) {
  const {data:session} = useSession()
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [name,setName] = useState(address.fullName)
  const [phone,setPhone] = useState(address.phone)
  const [province,setProvince] = useState(address.codes.province)
  const [district,setDistrict] = useState(address.codes.district)
  const [ward,setWard] = useState(address.codes.ward)
  const [details,setDetails] = useState(address.details)
  const inputName = useRef()
  const inputPhone = useRef()
  const selectPrivince = useRef()
  const selectDistrict = useRef()
  const selectWard = useRef()
  const inputDetailAddress = useRef()
  useEffect(() => {
    async function fetchData() {
  const res = await fetch(`${process.env.API_LOCATION_URL}/address?p=${province}&d=${district}`)

   const data = await res.json()
   setProvinces(data.data.provinces)
   setDistricts(data.data.districts)
   setWards(data.data.wards)
    }
    fetchData()
  }, [isOpen])
  const handleDistrict = async (e) => {
    const id = e.target.value
    const res = await fetch(`${process.env.API_LOCATION_URL}/provinces/${id}/districts`)
    const data = await res.json()
    setDistricts(data.data)
    setWards([])
    setProvince('')
    setDistrict('')
  }
  const handleWards = async (e) => {
    const id = e.target.value
    const res = await fetch(`${process.env.API_LOCATION_URL}/districts/${id}/wards`)
    const data = await res.json()
    setWards(data.data)
  }
  const handleAdd = async () => {
    let mess = ""
      if (inputPhone.current.value.length < 2 || inputPhone.current.value == null) {
        mess += "Số điện thoại không hợp lệ, "

      } else {
        const number = phoneUtil.parse(inputPhone.current.value, "VN");
        if (!phoneUtil.isValidNumber(number)) {
          mess += "Số điện thoại không hợp lệ, "
        }
    }
    if (inputName.current.value.length < 10) {
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
        phone: inputPhone.current.value,
        fullName: inputName.current.value,
        provinceCode: selectPrivince.current.value,
        districtCode: selectDistrict.current.value,
        wardCode: selectWard.current.value,
        detailAddress:inputDetailAddress.current.value,
        fullAddress: `${selectWard.current.options[selectWard.current.selectedIndex].text}, ${selectDistrict.current.options[selectDistrict.current.selectedIndex].text}, ${selectPrivince.current.options[selectPrivince.current.selectedIndex].text}`
      }
      const response = await fetch(`${process.env.API_ADDRESS_URL}/${address._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + session.accessToken
        },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if(data.status === 200){
        setMessage("")
        setShowMessage(false)
        setName(data.data.fullName)
        setPhone(data.data.phone)
        setProvince(data.data.codes.province)
        setDistrict(data.data.codes.district)
        setWard(data.data.codes.ward)
        setDetails(data.data.details)
        handleNotShow(data.data)
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
          Cập nhật địa chỉ
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
                      type="text"
                      defaultValue={name}
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
                      type="text"
                      defaultValue={phone}
                      ref={inputPhone}
                      className="form-control number_phone"
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
                      name="choices-single-groups"
                      required
                      onChange={handleDistrict}
                      ref={selectPrivince}
                    >
                      {provinces.map((p) => {
                        if(province==p.code){
                        return (
                            <option key={p.code} value={p.code} selected>
                            {p.name}
                          </option>
                        )
                      }else{
                        return (
                            <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        )
                      }
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
                      className="form-control"
                      data-trigger
                      name="choices-single-groups"
                      onChange={handleWards}
                      required
                      ref={selectDistrict}
                    >
                     {districts.map((p) => {
                       if(p.code === district){
                        return (
                            <option key={p.code} value={p.code} selected>
                            {p.name}
                          </option>
                        )
                       }
                       else{
                        return (
                            <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        )
                       }
                      
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
                      {wards.map((p) => {
                       if(ward===p.code){
                        return (
                            <option key={p.code} value={p.code} selected>
                            {p.name}
                          </option>
                        )
                       }else{
                        return (
                            <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        )
                       }
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <label htmlFor="message-text" className="col-form-label">
                    Địa chỉ chi tiết
                  </label>
                  <textarea
                    className="form-control"
                    required
                    ref={inputDetailAddress}
                    detailAddress={details}
                  />
                </div>
              </div>
            </form>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-secondary btn-lg" style={{ width: '120px', height: '50px' }}
            onClick={()=>{
              setMessage("")
      setShowMessage(false)
      setName(address.fullName)
      setPhone(address.phone)
      setProvince(address.codes.province)
      setDistrict(address.codes.district)
      setWard(address.codes.ward)
      setDetails(address.details)
              handleNotShow()
            }}
          >
            Huỷ
          </Button>
          <button className="btn-solid btn"
          onClick={handleAdd}
          >
            Cập nhật
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}