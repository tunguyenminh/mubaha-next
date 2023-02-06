import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import Link from "next/link";
import { Container, Row, Col, Media, Button, Modal, ModalFooter, ModalHeader } from "reactstrap";
import Breadcrumb from "../Breadcrumb";
import styles from "@/styles/cart.module.css";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import Modal2 from "react-awesome-modal";
import productStatus from "@/enums/productStatus.enum.js";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import _ from "lodash";
import productStatusEnum from "@/enums/productStatus.enum";
import Sticky from "@/components/cart/Sticky";
import { useRouter } from "next/router";
import "react-loading-skeleton/dist/skeleton.css";
const Vendor = dynamic(() => import("@/components/cart/Vendor.js"));

const CartPage = ({ data }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProduct] = useState(data.fullP);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProductSelect, setTotalProductSelect] = useState(0);
  const [isOpenModalDeleteProduct, setIsOpenModalDeleteProduct] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [totalPage, setTotalPage] = useState(data.totalPage);
  const [currentPage, setCurrentPage] = useState(data.page);
  const [totalProduct, setTotalProduct] = useState(data.totalDocs);
  const [unActive, setUnActive] = useState(data.unActive);
  const [totoalCheck, setTotalCheck] = useState(0);
  useEffect(() => {
    const isSelectAll = data.fullP.some((v) => v.selected === false);
    if (!isSelectAll) setIsSelectedAll(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const updateQuantity = (vendorId, ProductId, quantity) => {
    products[vendorId].products[ProductId].quantity = quantity;
    setProduct([...products]);
  };
  const updateDeleteOneCart = (vendorId, ProductId, cartID) => {
    if (ProductId > -1) {
      products[vendorId].products.splice(ProductId, 1);
    }
    if (products[vendorId].products.length === 0) {
      products.splice(vendorId, 1);
    }
    setProduct([...products]);
  };
  const updateSelectProduct = (vendorId, productId) => {
    products[vendorId].products[productId].selected =
      !products[vendorId].products[productId].selected;
    const selectAllVendor = products[vendorId].products.filter((p) => {
      return p.selected !== true && p.status !== productStatus.DISABLE && p.isOutOfStock !== true;
    });
    if (selectAllVendor.length < 1) {
      products[vendorId].selected = true;
    } else {
      products[vendorId].selected = false;
    }

    const selectAll = products.filter((p) => {
      return p.selected !== true;
    });
    if (selectAll.length < 1) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
    setProduct([...products]);
  };
  const updateSelectVendor = (vendorID) => {
    products[vendorID].selected = !products[vendorID].selected;
    products[vendorID].products.forEach((p) => {
      if (p.status !== productStatus.DISABLE) {
        if (p.isOutOfStock === false) {
          p.selected = products[vendorID].selected;
        }
      }
    });
    const selectAll = products.filter((p) => {
      return p.selected !== true;
    });
    if (selectAll.length < 1) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
    setProduct([...products]);
  };
  const selectAllProduct = () => {
    setIsSelectedAll(!isSelectedAll);
    products.forEach((product, i) => {
      product.selected = !isSelectedAll;
      product.products.forEach((p, index) => {
        if (p.status !== productStatus.DISABLE) {
          if (p.isOutOfStock == false) {
            products[i].products[index].selected = !isSelectedAll;
          }
        }
      });
    });
    setProduct([...products]);
  };

  useEffect(() => {
    let amount = 0;
    let total = 0;
    let amoutCheckout = 0;
    products.forEach((product) => {
      let t = 0;
      let a = 0;
      product.products.forEach((p) => {
        if (p.selected == true) {
          if (p.status !== productStatus.DISABLE && !p.isChanged) {
            a += 1;
            t += p.price * p.quantity * (1 - p.discount);
            amoutCheckout += 1;
          } else {
            a += 1;
          }
        }
      });
      total += t;
      amount += a;
    });
    setTotalCheck(amoutCheckout);
    setTotalProductSelect(amount);
    setTotalPrice(total);
  }, [products]);
  const deleteManyCartItem = async () => {
    let cartItems = [];
    products.forEach((product) => {
      product.products.forEach((p) => {
        if (p.selected === true) {
          cartItems = [...cartItems, p.cartID];
        }
      });
    });
    const response = await fetch(`${process.env.API_CART_URL}/deleteMany`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.accessToken,
      },
      body: JSON.stringify({ cartItems: cartItems }),
    });
    const data = await response.json();

    if (data.status === 200) {
      products.forEach((product, i) => {
        const pr = product.products.filter((p) => {
          return !cartItems.includes(p.cartID);
        });
        if (pr.length < 1) {
          products.splice(i, 1);
        } else {
          products[i] = {
            vendor: product.vendor,
            selected: false,
            totalDocs: product.totalDocs,
            products: pr,
          };
        }
      });
      setProduct([...products]);
      setIsOpenModalDeleteProduct(false);
    } else {
      alert(data.message);
    }
  };
  const handleModalDeleteMany = () => {
    if (totalProductSelect < 1) {
      setMessage("Vui lòng chọn sản phẩm");
      setVisible(true);
      setTimeout(function () {
        setVisible(false);
      }, 1000);
    } else {
      setIsOpenModalDeleteProduct(!isOpenModalDeleteProduct);
    }
  };
  const updateProduct = (body, i, index) => {
    if (body.selectedVariant != null && body.selectedAttribute != null) {
      products[i].products[index].variant = body.selectedVariant;
      products[i].products[index].attr = body.selectedAttribute;
      products[i].products[index].price = body.price;
      products[i].products[index].discount = body.discount;
      products[i].products[index].isOutOfStock = false;
      setProduct([...products]);
    } else if (body.selectedVariant != null && body.selectedAttribute == null) {
      products[i].products[index].variant = body.selectedVariant;
      products[i].products[index].isOutOfStock = false;
      products[i].products[index].price = body.price;
      products[i].products[index].discount = body.discount;
      setProduct([...products]);
    }
  };
  function closeModal() {
    setVisible(false);
  }
  const deleteAvailableProducts = async () => {
    let cartItems = [];
    products.forEach((product) => {
      product.products.forEach((p) => {
        if (p.status === productStatus.DISABLE) {
          cartItems = [...cartItems, p.cartID];
        }
      });
    });
    const response = await fetch(`${process.env.API_CART_URL}/deleteMany`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.accessToken,
      },
      body: JSON.stringify({ cartItems: cartItems }),
    });
    const data = await response.json();

    if (data.status === 200) {
      setUnActive(unActive - cartItems.length);
      products.forEach((product, i) => {
        const pr = product.products.filter((p) => {
          return !cartItems.includes(p.cartID);
        });
        if (pr.length < 1) {
          products.splice(i, 1);
        } else {
          products[i] = {
            vendor: product.vendor,
            selected: false,
            totalDocs: product.totalDocs,
            products: pr,
          };
        }
      });
      setProduct([...products]);
    } else {
      alert(data.message);
    }
  };
  const fetchMoreData = async () => {
    const page = currentPage + 1;
    const res = await fetch(`${process.env.API_CART_URL}/paginate?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.accessToken,
      },
    });

    const data = await res.json();
    setTotalProduct(totalProduct + data.data.totalDocs);
    const results = data.data.grouped;
    let fecthUnActive = 0;
    const fullP = results.map((product) => {
      let countActive = 0;
      let countOutOfStocks = 0;
      let countChange = 0;
      const d = product.products.map((p, index) => {
        if (p.product.status === productStatusEnum.DISABLE) {
          countActive += 1;
          fecthUnActive += 1;
        }
        if (p.isChanged) {
          countChange += 1;
        }
        let value = {
          quantity: p.amount,
          name: p.product.name,
          currencySymbol: p.product.currencySymbol,
          slug: p.product.slug,
          cartID: p._id,
          selected: false,
          productID: p.product._id,
          discount: p.product.discount,
          status: p.product.status,
          price: p.price,
          discount: p.discount,
          isChanged: p.isChanged,
        };
        if (p.selectedVariant != null && p.selectedAttribute == null) {
          value = {
            ...value,
            variantLable: p.product.variantLabel,
            variant: p.selectedVariant,
            variants: p.product.variants,
          };
          if (
            p.selectedVariant.stock.quantity == 0 &&
            p.product.status !== productStatusEnum.DISABLE
          ) {
            countOutOfStocks += 1;
            value = {
              ...value,
              isOutOfStock: true,
            };
          } else {
            value = {
              ...value,
              isOutOfStock: false,
            };
          }
        } else if (p.selectedVariant != null && p.selectedAttribute != null) {
          value = {
            ...value,
            variant: p.selectedVariant,
            attr: p.selectedAttribute,
            variants: p.product.variants,
            variantLable: p.product.variantLabel,
            attributeLabel: p.product.attributeLabel,
          };
          if (
            p.selectedAttribute.stock.quantity == 0 &&
            p.product.status !== productStatusEnum.DISABLE
          ) {
            countOutOfStocks += 1;
            value = {
              ...value,
              isOutOfStock: true,
            };
          } else {
            value = {
              ...value,
              isOutOfStock: false,
            };
          }
        } else {
          value = {
            ...value,
            price: p.product.price,
            image: p.product.media.featuredImage,
          };
          if (p.product.stock.quantity == 0) {
            count += 1;
            value = {
              ...value,
              isOutOfStock: true,
            };
          } else {
            value = {
              ...value,
              isOutOfStock: false,
            };
          }
        }
        return value;
      });
      return {
        vendor: product.vendor,
        selected: false,
        totalDocs: product.products.length,
        products: d,
        count: countActive + countChange + countOutOfStocks,
      };
    });
    fullP.forEach((i) => {
      const check = products.findIndex((j) => i.vendor._id === j.vendor._id);
      if (check >= 0) {
        products[check].products = products[check].products.concat(i.products);
        products[check].count = i.count;
        products[check].totalDocs = i.totalDocs;
        products[check].selected = false;
      } else {
        products.push(i);
      }
    });
    setTimeout(function () {
      setUnActive(fecthUnActive + unActive);
      setCurrentPage(page);
      setProduct([...products]);
    }, 1500);
  };
  const handleSubmit = async () => {
    const cartItems = [];
    products.forEach((v) => {
      v.products.forEach((p) => {
        if (p.selected === true && p.status !== productStatus.DISABLE && !p.isChanged) {
          cartItems.push(p.cartID);
        }
      });
    });
    if (cartItems.length <= 0) {
      setMessage("Vui lòng chọn sản phẩm");
      setVisible(true);
      setTimeout(function () {
        setVisible(false);
      }, 1000);
    } else {
      const response = await fetch(`${process.env.API_ORDER_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.accessToken,
        },
        body: JSON.stringify({ cartItemIds: cartItems }),
      });
      const data = await response.json();
      if (data.status == 200) {
        const payload = {
          s: data.data.s,
          f: data.data.f,
        };
        router.push(
          {
            pathname: "/checkout",
            query: payload,
          },
          "/checkout"
        );
      } else {
        alert(data.message);
      }
    }
  };
  if (products.length > 0) {
    return (
      <>
        <Modal2
          visible={visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => closeModal()}
        >
          <i className="fa fa-solid fa-xmark"></i>
          <div className=" d-flex justify-content-center mt-5">
            <img width="100" height="100" src="/assets/icon/icon-danger.svg" />
          </div>
          <div className=" d-flex justify-content-center mt-5">
            <p style={{ fontSize: "16px", color: "red" }}>{message}</p>
          </div>
        </Modal2>
        <Breadcrumb previousLink="/" currentValue={"Giỏ hàng"} previousValue="Trang chủ" />
        <div>
          <div>
            <section className={`cart-section pb-3 pt-0 ${styles.backgroundFull}`}>
              <div></div>
              <Container>
                <Row>
                  <SkeletonTheme
                    className="skeleton"
                    color="#ff7748"
                    highlightColor="#f45728"
                  ></SkeletonTheme>
                  <Col sm="12">
                    <div className="mt-3">
                      <table className="table cart-table table-responsive-xs mt-2">
                        <thead style={{ border: "none" }}>
                          <tr className={`${styles.backgroundHead}`}>
                            <th scope="col">
                              <div className="mt-4 mb-3">
                                {isLoading ? (
                                  <Skeleton width={20} height={20} square />
                                ) : (
                                  <input
                                    type="checkbox"
                                    role="button"
                                    checked={isSelectedAll}
                                    onClick={selectAllProduct}
                                  />
                                )}
                              </div>
                            </th>
                            <th scope="col" colSpan="2">
                              <div className="mt-4 mb-3 ml-5">Sản phẩm</div>
                            </th>
                            <th scope="col">
                              <div className="mt-4 mb-3 ml-5">Giá</div>
                            </th>
                            <th scope="col">
                              <div className="mt-4 mb-3 ml-1">Số lượng</div>
                            </th>
                            <th scope="col">
                              <div className="mt-4 mb-3 ml-2">Số Tiền</div>
                            </th>
                            <th scope="col">
                              <div className="mt-4 mb-3">Thao Tác</div>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div className={`${styles.vendorPart} mt-3`}>
                      <InfiniteScroll
                        scrollThreshold={0.75}
                        dataLength={currentPage}
                        next={fetchMoreData}
                        hasMore={currentPage < totalPage}
                        loader={
                          <>
                            <div className="d-flex" style={{ backgroundColor: "white" }}>
                              <tbody>
                                <tr>
                                  <td className={`d-flex} p-2`}>
                                    <Skeleton width={100} rectangle height={100} />
                                  </td>
                                  <td>
                                    <Skeleton width={300} rectangle height={10} />
                                  </td>

                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                </tr>
                                <tr>
                                  <td className={`d-flex} p-2`}>
                                    <Skeleton width={100} rectangle height={100} />
                                  </td>
                                  <td>
                                    <Skeleton width={300} rectangle height={10} />
                                  </td>

                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                </tr>
                                <tr>
                                  <td className={`d-flex} p-2`}>
                                    <Skeleton width={100} rectangle height={100} />
                                  </td>
                                  <td>
                                    <Skeleton width={300} rectangle height={10} />
                                  </td>

                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                  <td>
                                    <Skeleton width={40} rectangle height={10} />
                                  </td>
                                </tr>
                              </tbody>
                            </div>
                          </>
                        }
                      >
                        {products.map((p, i) => {
                          return (
                            <Vendor
                              key={i}
                              p={p}
                              vendorKey={i}
                              updateProduct={updateProduct}
                              isLoading={isLoading}
                              updateQuantity={updateQuantity}
                              updateSelectProduct={updateSelectProduct}
                              updateDeleteOneCart={updateDeleteOneCart}
                              updateSelectVendor={updateSelectVendor}
                            />
                          );
                        })}
                      </InfiniteScroll>
                    </div>
                    <Modal
                      className="mt-5"
                      isOpen={isOpenModalDeleteProduct}
                      toggle={handleModalDeleteMany}
                    >
                      <ModalHeader toggle={handleModalDeleteMany}>
                        Bạn có muốn bỏ {totalProductSelect} sản phẩm?
                      </ModalHeader>
                      <ModalFooter>
                        <Button color="danger" onClick={deleteManyCartItem}>
                          Đồng ý
                        </Button>
                        <Button onClick={handleModalDeleteMany}>Huỷ</Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        </div>
        <div ref={comboBtnRef}></div>
        {!isLoading && (

            <Container className={`${styles.totalPart} mt-0 boder-0 pl-3 pr-3 border-0`}>
              <div className={`${styles.trBox} ${isSticky ? styles.shadow : ""}`}>
                <table className="table cart-table table-responsive-md mt-0">
                  <tfoot>
                    <tr className={`${styles.trBox} ${isSticky ? styles.shadow : ""}`}>
                      <td className="d-flex justify-content-between pt-4 border-0 mt-0">
                        <div className="d-flex flex-row bd-highlight ml-5">
                          <div className="bd-highlight">
                            <span
                              className={`${styles.cursorVendor} ${styles.textDelete} mr-1`}
                              disabled={true}
                              onClick={handleModalDeleteMany}
                            >
                              Xoá
                            </span>
                            ({totalProductSelect} sản phẩm đã chọn)
                          </div>
                          {unActive ? (
                            <div className="ml-5">
                              <span
                                className={styles.deleteUnavailable}
                                onClick={deleteAvailableProducts}
                              >
                                Xoá tất cả sản phẩm không hoạt động
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="ml-5">Tổng thanh toán ({totoalCheck} sản phẩm) :</div>
                      </td>
                      <td className="border-0">
                        <div className="d-flex justify-content-between">
                          <h2>
                            <NumberFormat
                              value={totalPrice}
                              thousandSeparator={true}
                              displayType="text"
                              suffix={"₫"}
                              decimalScale={0}
                            />
                          </h2>
                          <a onClick={handleSubmit} className="btn btn-solid mr-1">
                            Thanh toán
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Container>
 
        )}
      </>
    );
  } else {
    return (
      <section className={`cart-section section-b-space ${styles.backgroundFull}`}>
        <Container>
          <Row>
            <Col sm="12">
              <div className="mt-5">
                <div className="col-sm-12 empty-cart-cls text-center">
                  <Media
                    src="/assets/icon/cart-is-empty-800x800.png"
                    className="img-fluid mx-auto"
                    alt="mubaha.com"
                    style={{ width: "200px", maxWidth: "200px" }}
                  />
                  <h3>
                    <strong>Giỏ hàng bạn đang chưa có sản phẩm</strong>
                  </h3>
                  <Link href="/" passHref>
                    <Button className="btn btn-solid mt-2">Khám phá ngay</Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
};

export default CartPage;
