import React, { useState } from "react";
import { Col, Row, Button } from "reactstrap";
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
import PostLoader from '@/components/common/PostLoader'

const TextResult = dynamic(() => import('@/components/searchOptions/TextResult'))
const Options = dynamic(() => import('@/components/searchOptions/Options'))
const NoProduct = dynamic(() => import('@/components/searchOptions/NoProduct'))
const VendorBox = dynamic(() => import('@/components/VendorBox'))
const ProductItem = dynamic(() => import('@/components/filterOptions/ProductBox'))
const Skeleton = dynamic(() => import('@/components/filterOptions/SkeletonProduct'))

const ProductList = ({ colClass, layoutList, products,totalProduct,handleLimit,hanldeOrder,
  handlePaging, hasNextPage, text }) => {
  const [grid, setGrid] = useState(colClass);
  const [layout, setLayout] = useState(layoutList);
  const router = useRouter()
  const [skeletonArray,setSkeletonArray] = useState(Array.from({length: 4}, (v, i) => i))
  const brandResult = useSWR(`${process.env.API_VENDOR_URL}/search?t=${text}&limit=1&page=1`, fetcher)
  return (
    <>
      <Col className="collection-content pl-5 pr-5" style={{ backgroundColor: 'white' }}>
        <div className="page-main-content" >
          <Row>
            {brandResult.data && brandResult.data.data.docs.length > 0
              ?
              <Col md="12">
                <Row>
                  <Col xs="12" >
                    <div className="mt-4 mb-2">
                      <h4>Shop liên quan đến: <strong>{text}</strong></h4>
                    </div>
                    {
                      brandResult.data.data.docs.length > 1 &&
                      <div className="d-flex justify-content-end">
                        <Button
                          onClick={() => {
                            router.push({
                              pathname: '/vendors',
                              query: { t: text },
                            }, undefined)
                          }}
                          className="boder-0"
                          color="warning"
                          outline
                        >
                          Thêm Kết Quả
                        </Button>
                      </div>
                    }
                    {brandResult.data.data.docs.map((value, i) => {
                      return (
                        <VendorBox value={value} key={i} page={"search"} />
                      )
                    })}
                  </Col>
                </Row>
              </Col>
              :
              ""
            }
            <Col sm="12">
             <TextResult text={text} t="showtext" />
              <div className="collection-product-wrapper">
                <div className="product-top-filter">
                  {products.length > 0
                    ?
                  <Options totalProduct={totalProduct} handleLimit={handleLimit} hanldeOrder={hanldeOrder}
                  setGrid={setGrid} setLayout={setLayout} currentProduct={products.length} layout={layout}
                  setSkeletonArray={setSkeletonArray}
                   />
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
                         <Skeleton grid={grid} value={skeletonArray} />
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
                            )
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
    </>
  );
};

export default ProductList;
