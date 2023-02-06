import React, { useState } from "react";
import CommonLayout from "../../components/shop/CommonLayout";
import seventeen from "../../public/assets/images/logos/17.png";
import Layout from "../../components/Layout";
import { Container, Col, Row, Media } from "reactstrap";
import FilterPage from "../../components/shop/common/Filter.js";
import ProductList from "../../components/shop/common/ProductList";
import HeadSeo from "../../components/HeadSeo";

const VenderProfile = ({ vendorProfile, products, newProducts, layoutList, username }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [listProduct, setListProduct] = useState(products.docs);
  const [totalProduct, setTotalProduct] = useState(products.totalDocs);
  const [value, setValue] = useState({ min: 0, max: 10000000 });
  const [orderBy, setOrderBy] = useState("");

  const handlePagination = async () => {
    try {
      setPage(page + 1);
      const respone = await fetch(
        `${process.env.API_URL}/vendors/${username}?limit=${limit}&page=${
          page + 1
        }&orderBy=${orderBy}&minPrice=${value.min}&maxPrice=${value.max}`
      );
      const { data, status, message } = await respone.json();
      const { products } = data;
      var newListProduct = listProduct.concat(products.docs);
      setListProduct(newListProduct);
    } catch (error) {}
  };
  const [sidebarView, setSidebarView] = useState(false);
  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };

  const handleCallApi = async (limit, page, orderBy, value) => {
    setValue(value);
    setLimit(limit);
    setOrderBy(orderBy);
    try {
      setPage(page);
      const respone = await fetch(
        `${process.env.API_URL}/vendors/${username}?limit=${limit}&page=${page}&orderBy=${orderBy}&minPrice=${value.min}&maxPrice=${value.max}`
      );
      const { data, status, message } = await respone.json();
      const { products } = data;
      setListProduct(products.docs);
      setTotalProduct(products.totalDocs);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <HeadSeo title={vendorProfile.brandName} />
      <CommonLayout parent="Trang chủ" title="Hồ sơ người bán">
        <div className="vendor-cover">
          <div
            className="bg-size"
            style={{ backgroundImage: "url(" + vendorProfile.cover + ")" }}
          ></div>
        </div>
        <section className="vendor-profile pt-0">
          <Container>
            <Row>
              <Col lg="12">
                <div className="profile-left">
                  <div className="profile-image">
                    <div>
                      <Media src={seventeen.src} alt="" className="img-fluid" />
                      <h3>{vendorProfile.brandName}</h3>
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <h6>750 Người theo dõi | 10 Đánh giá</h6>
                      </div>
                    </div>
                  </div>
                  <div className="profile-detail">
                    <div>
                      <p>{vendorProfile.details}</p>
                    </div>
                  </div>
                  <div className="vendor-contact">
                    <div>
                      <h6>Theo dõi chúng tôi:</h6>
                      <div className="footer-social">
                        {vendorProfile.socialLinks && (
                          <ul>
                            <li>
                              <a href={vendorProfile.socialLinks.facebook}>
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li>
                              <a href={vendorProfile.socialLinks.youtube}>
                                <i className="fa fa-youtube" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li>
                              <a href={vendorProfile.socialLinks.tiktok}>
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                              </a>
                            </li>
                            <li>
                              <a href={vendorProfile.socialLinks.instagram}>
                                <i className="fa fa-instagram" aria-hidden="true"></i>
                              </a>
                            </li>
                          </ul>
                        )}
                      </div>
                      <h6>Nếu bạn có câu hỏi thắc mắc:</h6>
                      <a href="#" className="btn btn-solid btn-sm">
                        Liên hệ
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section-b-space ratio_asos">
          <div className="collection-wrapper">
            <Container>
              <Row>
                {/* Filter by */}
                <FilterPage
                  sm="3"
                  sidebarView={sidebarView}
                  closeSidebar={() => openCloseSidebar(sidebarView)}
                  handleCallApi={handleCallApi}
                  newProducts={newProducts}
                  limit={limit}
                  orderBy={orderBy}
                />
                {/* Filter by end*/}

                {/* Product List */}
                <ProductList
                  colClass="col-xl-3 col-md-6 col-grid-box"
                  openSidebar={() => openCloseSidebar(sidebarView)}
                  listProduct={listProduct}
                  products={products}
                  limit={8}
                  handleCallApi={handleCallApi}
                  handlePagination={handlePagination}
                  value={value}
                  totalProduct={totalProduct}
                />
                {/* Product List End */}
              </Row>
            </Container>
          </div>
        </section>
      </CommonLayout>
    </>
  );
};

VenderProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default VenderProfile;

export async function getServerSideProps(context) {
  const { username } = context.query;

  const respone = await fetch(
    `${process.env.API_URL}/vendors/${username}?limit=8&page=1&minPrice=0&maxPrice=10000000`
  );
  const { data, status, message } = await respone.json();
  if (status != 200)
    return {
      notFound: true,
    };

  return {
    props: {
      vendorProfile: data.vendorProfile,
      products: data.products,
      newProducts: data.newProducts,
      username: username,
    },
  };
}
