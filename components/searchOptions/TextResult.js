import {Row,Col} from "reactstrap"
import locationEnum from "@/enums/location.enum";
export default function TextResult({text,location,cat,t}){
  return(
    <Row>
    <Col xs="12" >
      <div className="mt-4 mb-4">
        {cat && <h3>Kết quả tìm kiếm cho danh mục: <strong>{text}</strong></h3>}
        {t && <h3>Kết quả tìm kiếm cho sản phẩm: <strong>{text}</strong></h3>}
        {location && <h3>Kết quả tìm kiếm cho quốc gia: <strong>{locationEnum[text]}</strong></h3>}
      </div>
    </Col>
  </Row>
  )
} 