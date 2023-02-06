// import Header from './Header'
import Footer from './Footer'
import useSWR from 'swr'
import fetcher from '../libs/fetcher'
import HeaderTwo from './HeaderTwo'
import {Container,Row} from "reactstrap"

export default function Layout({ children }) {
  const { data, error } = useSWR(`${process.env.API_URL}/categories`, fetcher)

  return (
    <>
      <HeaderTwo />
      <div style={{ backgroundColor: "rgb(245, 245, 250)" }}>
        <section className="section-b-space ratio_asos">
          <div className="collection-wrapper">
            <Container>
              <Row>
                {children}
              </Row>
            </Container>
          </div>
        </section>
      </div>
      <Footer categories={data?.data} />
    </>
  )

}
