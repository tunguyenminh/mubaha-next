import { Col } from 'reactstrap';
import Category from './Category';
import Brand from './Brand'
import Price from './Price';
import Rating from './Rating'
import Location from './Location.js'
import useSWR from 'swr'
import fetcher from '../../libs/fetcher'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const FilterPage = ({ sm, sidebarView, closeSidebar, slug,
    hanldeBrand, handleLocation, hanldePrice, cateChild, hanldeRating, hanldeCategory }) => {
    const { data, error } = useSWR(`${process.env.API_URL}/categories/${slug}/filters`, fetcher)
    return (
        <>
            <Col sm={sm} className="collection-filter" style={sidebarView ? { left: "0px" } : {}}>
                <div className="collection-filter-block">
                    <div className="collection-mobile-back" onClick={() => closeSidebar()}>
                        <span className="filter-back">
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>

                    {cateChild.length > 0 && <Category cateChild={cateChild} hanldeCategory={hanldeCategory} />}
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
                        <>
                            <Skeleton height={30} />
                            <Skeleton width={"50%"} count={2} />
                            <Skeleton width={"25%"} count={2} />
                            <br></br>
                            <Skeleton height={30} />
                            <Skeleton width={"50%"} count={2} />
                            <Skeleton width={"25%"} count={2} />
                            <br></br>
                            <Skeleton height={30} />
                            <Skeleton width={"50%"} count={2} />
                            <Skeleton width={"25%"} count={2} />
                            <br></br>
                            <Skeleton height={30} />
                            <Skeleton width={"50%"} count={2} />
                            <Skeleton width={"25%"} count={2} />
                            <br></br>
                            <Skeleton height={30} />
                            <Skeleton width={"50%"} count={2} />
                            <Skeleton width={"25%"} count={2} />
                        </>
                    )}

                </div>
            </Col>
        </>
    )
}

export default FilterPage;