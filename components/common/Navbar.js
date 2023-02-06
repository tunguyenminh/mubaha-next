import Link from "next/link";
import { StockCountry } from "@/enums/product.enum";
import location from "@/enums/location.enum";
export default function NavBar({ navClose, closeNav }) {
  const locationArray = Object.values(StockCountry);
  // const [navClose, setNavClose] = useState({ right: "0px" });

  // useEffect(() => {
  //   if (window.innerWidth < 750) {
  //     setNavClose({ right: "-410px" });
  //   }
  //   if (window.innerWidth < 1199) {
  //     setNavClose({ right: "-300px" });
  //   }
  // }, []);

  // const openNav = () => {
  //   setNavClose({ right: "0px" });
  // };

  // const closeNav = () => {
  //   setNavClose({ right: "-410px" });
  // };

  return (
    <div>
      <div className="main-navbar">
        <div id="mainnav">
          {/* <div className="toggle-nav" onClick={openNav.bind(this)}>
            <i className="fa fa-bars sidebar-bar"></i>
          </div> */}
          <ul className="nav-menu sm pixelstrap sm-horizontal" style={navClose}>
            <li className="back-btn" onClick={closeNav.bind(this)}>
              <div className="mobile-back text-right">
                <span>Quay lại</span>
                <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
              </div>
            </li>
            {locationArray.map((val, i) => {
              if (val == "CN") {
                return (
                  <li role="button" key={i}>
                    <div className="lable-nav">hot</div>
                    <Link href={`../location/${val}`} passHref>
                      <a className="nav-link">{location[val]}</a>
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li role="button" key={i}>
                    <Link href={`../location/${val}`} passHref>
                      <a className="nav-link">{location[val]}</a>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
