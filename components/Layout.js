// import Header from './Header'
import Footer from './Footer'
import useSWR from 'swr'
import fetcher from '../libs/fetcher'
import HeaderTwo from './HeaderTwo'

export default function Layout({ children }) {
  const { data, error } = useSWR(`${process.env.API_URL}/categories`, fetcher)

  return (
    <>
      <HeaderTwo />
                {children}
      <Footer categories={data?.data} />
    </>
  )

}
