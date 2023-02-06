import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {Row} from "reactstrap"
export default function SkeletonProduct({value,grid}){
  return(
    <Row className="mb-4">
    {value.map((val,i)=>{
      return (
        <div className={grid} key={i}>
      <div className="product">
        <Skeleton count={1} height={250} width="100%" />
      </div>
    </div>
      )
    })}
  </Row>
  )
}