import {Col} from 'reactstrap'
export default function NoProduct(){
  return(
    <Col xs="12">
    <div>
      <div className="col-sm-12 empty-cart-cls text-center">
        <img
          src={`/assets/images/empty-search.jpg`}
          className="img-fluid mb-4 mx-auto"
          alt=""
        />
        <h3>
          <strong>Không có sản phẩm nào</strong>
        </h3>
      </div>
    </div>
  </Col>
  )
}