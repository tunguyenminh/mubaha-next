import { Col,Button } from 'reactstrap';
import {useState} from "react"
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import dynamic from 'next/dynamic'
const Category = dynamic(() => import('@/components/filterOptions/Category'))
const Price = dynamic(() => import('@/components/filterOptions//Price'))
const Rating = dynamic(() => import('@/components/filterOptions//Rating'))
const Brand = dynamic(() => import('@/components/filterOptions//Brand'))
const Location = dynamic(() => import('@/components/filterOptions//Location'))
const Skeleton = dynamic(() => import('@/components/filterOptions/SkeletonFilterOption'))
const FilterPage = ({ sm, sidebarView, closeSidebar, hanldeBrand, handleLocation,clearSearch,
     hanldePrice, text ,hanldeRating,hanldeCategory}) => {
    const [clear,setClear] = useState(false);
    const { data, error } = useSWR(`${process.env.API_PRODUCT_URL}/filters?t=${text}`, fetcher)
    if(error) {
        console.error(error)
    }
    const hanldeClear = () =>{
        setClear(!clear)
        clearSearch()
    }
    return (
        <>
            <Col sm={sm} className="collection-filter" style={sidebarView ? { left: "0px" } : {}}>
            {data ? (
                        data.data != null 
                        ?
                        <>
                <div className="collection-filter-block">
                    <div className="collection-mobile-back" onClick={() => closeSidebar()}>
                        <span className="filter-back">
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>
                            <Category categories={data.data.categories} hanldeCategory={hanldeCategory} />
                            <Location stockCountries={data.data.stockCountries} handleLocation={handleLocation} clear={clear} />
                            <Rating hanldeRating={hanldeRating} />
                            <Brand hanldeBrand={hanldeBrand} brands={data.data.brands} clear={clear} />
                            <Price hanldePrice={hanldePrice} clear={clear} />
                     
                </div>
                <Button onClick={hanldeClear} className="w-100">Xoá tất cả</Button>
                </>
                :"Không tìm thấy các sự lựa chọn nào"
                    ) : (
                        <Skeleton /> 
                    )}
            </Col>
        </>
    )
}

export default FilterPage;