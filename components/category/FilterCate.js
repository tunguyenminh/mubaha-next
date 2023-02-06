import { Col } from 'reactstrap';
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import dynamic from 'next/dynamic'
const CategoryTwo = dynamic(() => import('@/components/filterOptions/CategoryTwo'))
const Price = dynamic(() => import('@/components/filterOptions//Price'))
const Rating = dynamic(() => import('@/components/filterOptions//Rating'))
const Brand = dynamic(() => import('@/components/filterOptions//Brand'))
const Location = dynamic(() => import('@/components/filterOptions//Location'))
const Skeleton = dynamic(() => import('@/components/filterOptions/SkeletonFilterOption'))
const FilterPage = ({ sm, sidebarView, closeSidebar, slug,
    hanldeBrand, handleLocation, hanldePrice, cateChild, hanldeRating, hanldeCategory }) => {
    const { data, error } = useSWR(`${process.env.API_URL}/categories/${slug}/filters`, fetcher)
    if(error) {
        console.error(error)
    }
    return (
        <>
            <Col sm={sm} className="collection-filter" style={sidebarView ? { left: "0px" } : {}}>
                <div className="collection-filter-block">
                    <div className="collection-mobile-back" onClick={() => closeSidebar()}>
                        <span className="filter-back">
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>

                    {cateChild.length > 0 && <CategoryTwo cateChild={cateChild} hanldeCategory={hanldeCategory} />}
                    {data ? (
                        data.data != null
                            ?
                            <>
                                <Location stockCountries={data.data.stockCountries} handleLocation={handleLocation} />
                                <Rating hanldeRating={hanldeRating} />
                                <Brand hanldeBrand={hanldeBrand} brands={data.data.brands} />
                                <Price hanldePrice={hanldePrice} />
                            </>
                            : "Không tìm thấy các sự lựa chọn nào"
                    ) : (
                        <Skeleton /> 
                    )}

                </div>
            </Col>
        </>
    )
}

export default FilterPage;