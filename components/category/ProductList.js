import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import dynamic from 'next/dynamic'
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton'
import PostLoader from '@/components/common/PostLoader';
import 'react-loading-skeleton/dist/skeleton.css'
const TextResult = dynamic(() => import('@/components/searchOptions/TextResult'))
const Options = dynamic(() => import('@/components/searchOptions/Options'))
const NoProduct = dynamic(() => import('@/components/searchOptions/NoProduct'))
const ProductItem = dynamic(() => import('@/components/filterOptions/ProductBox'))
const ProductList = ({ colClass, layoutList, products, 
  totalProduct, handleLimit, handlePaging, hasNextPage, text, hanldeOrder }) => {
  const [grid, setGrid] = useState(colClass);
  const [layout, setLayout] = useState(layoutList);
  return (
    <Col className="collection-content pl-5 pr-5" style={{ backgroundColor: "white" }}>
      <div className="page-main-content">
        <Row>
          <Col sm="12">
          <TextResult text={text} cat="showCat" />
            <div className="collection-product-wrapper">
              <div className="product-top-filter">

                {products.length > 0
                  ?
                  <Options totalProduct={totalProduct} handleLimit={handleLimit} hanldeOrder={hanldeOrder}
                  setGrid={setGrid} setLayout={setLayout} currentProduct={products.length} layout={layout} />
                  :
                  ""
                }
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {!products || !products || products.length === 0 ? (
                    products && products && products.length === 0 ? (
                      <NoProduct />
                    ) : (
                      <div className="row mx-0 margin-default mt-4">
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                      </div>
                    )
                  ) : (
                    <InfiniteScroll
                      dataLength={products.length}
                      next={handlePaging}
                      hasMore={hasNextPage}
                      loader={
                        <Row className="mb-4">
                          <div className={grid}>
                            <div className="product">
                              <Skeleton count={1} height={250} />
                            </div>
                          </div>
                          <div className={grid}>
                            <div className="product">
                              <Skeleton count={1} height={250} />
                            </div>
                          </div>
                          <div className={grid}>
                            <div className="product">
                              <Skeleton count={1} height={250} />
                            </div>
                          </div>
                          <div className={grid}>
                            <div className="product">
                              <Skeleton count={1} height={250} />
                            </div>
                          </div>
                        </Row>
                      }
                    >
                      <Row>
                        {products.map((p, i) => {
                          return (
                            <div className={grid} key={i}>
                              <div className="product">
                                <ProductItem
                                  des={true}
                                  product={p}
                                  cartClass="cart-info cart-wrap"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </Row>
                    </InfiniteScroll>
                  )}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductList;
