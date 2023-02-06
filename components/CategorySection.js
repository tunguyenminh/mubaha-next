import { Col, Container, Media, Row } from "reactstrap";
import useSWR from 'swr'
import fetcher from '../libs/fetcher'
import styles from '@/styles/category.module.css'
import Link from "next/link"
const MasterCategory = ({ img, title, slug }) => {
  return (
    <Col className={`border-padding col-md-3 col-sm-6 col-lg-2`}>
      <div className={`category-banner ${styles.background}`} >
     
        <div >
        <Link href={`categories/${slug}`}>
          <Media
            src={img}
            className="img-fluid blur-up lazyload bg-img"
            alt=""
          />
           </Link>
        </div>
        <div className="category-box">
        <Link href={`categories/${slug}`}>
          <a>
            <h3 style={{fontSize:"15px"}}>{title}</h3>
          </a>
          </Link>
        </div>
    
      </div>
    </Col>
  );
};

const CategorySection = () => {
  const { data, error } = useSWR(`${process.env.API_URL}/categories/featured`, fetcher)

  return (
    <>
      <section className={`p-0 ratio2_1`} >
        {data?.data && data.data.length > 0 &&
          <Container fluid={true}>
            <Row className="category-border d-flex justify-content-center">
              {data?.data.map((item, i) => {
                return <MasterCategory key={i} img={item.featuredImage} title={item.name} slug={item.slug} />;
              })}
            </Row>
          </Container>
        }
      </section>
    </>
  )
};

export default CategorySection;