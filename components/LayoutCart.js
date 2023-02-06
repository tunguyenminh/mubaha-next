import HeaderThree from '@/components/HeaderThree.js';
import Footer from '@/components/Footer.js'

export default function HeaderTwo({ children }) {

  return (
    <div style={{backgroundColor:"rgb(245, 245, 250)"}}>
  <HeaderThree />
      { children }
      <Footer />

    </div>
  )
}
