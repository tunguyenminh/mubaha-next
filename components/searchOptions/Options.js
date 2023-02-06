import {Row,Col,Media} from "reactstrap"

export default function searchOptions({totalProduct,handleLimit,hanldeOrder,setGrid,setSkeletonArray,
  setLayout,currentProduct,layout}){
  return(
    <Row>
    <Col>
      <div className="product-filter-content">
        <div className="search-count">
          <h5>
            Hiển Thị {currentProduct} Trên {totalProduct} Sản Phẩm
          </h5>
        </div>
        <div className="collection-view">
          <ul>
            <li>
              <i
                className="fa fa-th grid-layout-view"
                onClick={() => {
                  setLayout("");
                  setGrid("col-lg-3");
                }}
              ></i>
            </li>
            <li>
              <i
                className="fa fa-list-ul list-layout-view"
                onClick={() => {
                  setLayout("list-view");
                  setGrid("col-lg-12");
                }}
              ></i>
            </li>
          </ul>
        </div>
        <div
          className="collection-grid-view"
          style={
            layout === "list-view"
              ? { opacity: 0 }
              : { opacity: 1 }
          }
        >
          <ul>
            <li>
              <Media
                src={`/assets/icon/2.png`}
                alt=""
                className="product-2-layout-view"
                onClick={() => {
                  setGrid("col-lg-6");
                  setSkeletonArray(Array.from({length: 2}, (v, i) => i))
                  }}
              />
            </li>
            <li>
              <Media
                src={`/assets/icon/3.png`}
                alt="aaa"
                className="product-3-layout-view"
                onClick={() => {
                  setGrid("col-lg-4");
                  setSkeletonArray(Array.from({length: 3}, (v, i) => i))
                  }}
              />
            </li>
            <li>
              <Media
                src={`/assets/icon/4.png`}
                alt=""
                className="product-4-layout-view"
                onClick={() => {
                  setGrid("col-lg-3");
                  setSkeletonArray(Array.from({length: 4}, (v, i) => i))
                  }}
              />
            </li>
            <li>
              <Media
                src={`/assets/icon/6.png`}
                alt=""
                className="product-6-layout-view"
                onClick={() => {
                  setGrid("col-lg-2");
                  setSkeletonArray(Array.from({length: 6}, (v, i) => i))
                  }}
              />
            </li>
          </ul>
        </div>
        <div className="product-page-per-view">
          <select
            onChange={(e) => handleLimit(e.target.value)}
          >
            <option value="20">20 sản phẩm trên trang</option>
            <option value="25">25 sản phẩm trên trang</option>
            <option value="30">30 sản phẩm trên trang</option>
          </select>
        </div>
        <div className="product-page-filter">
          <select onChange={(e) => { hanldeOrder(e) }}>
            <option >Phổ biến</option>
            <option >Cao tới thấp</option>
            <option >Thấp tới cao</option>
            <option >Mới nhất</option>
          </select>
        </div>
      </div>
    </Col>
  </Row>
  )
}