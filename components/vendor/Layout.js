import Footer from '../Footer.js'
import HeaderTwo from '../HeaderTwo.js';
export default function SearchVendor({children}){
  return(
    <>
    <HeaderTwo />
    {children}
    <Footer />
    </>
  )
}