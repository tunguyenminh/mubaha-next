import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Row, Col, Media } from "reactstrap";

import TopBarDark from "@/components/common/TopbarDark";

import logo from "../assets/images/logo-white.svg";

import NavBar from "@/components/common/Navbar";
import HeaderSettings from "./common/HeaderSettings";

import styles from "./HeaderTwo.module.css";
import CartContainer from "./CartContainer";

import cart from "../assets/icons/cart.png";
import SearchOverlay from "@/components/common/SearchOverlay";
import Search from "@/components/Search.js";
export default function HeaderTwo({}) {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [navClose, setNavClose] = useState({ right: "0px" });

  const openNav = () => {
    setNavClose({ right: "0px" });
  };

  const closeNav = () => {
    setNavClose({ right: "-410px" });
  };

  useEffect(() => {
    if (window.innerWidth < 750) {
      setNavClose({ right: "-410px" });
    }
    if (window.innerWidth < 1199) {
      setNavClose({ right: "-300px" });
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let number =
      window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 300) {
      if (window.innerWidth < 576) {
        document.getElementById("sticky").classList.remove("fixed");
        document.getElementById("navbar-row").style.display = "block";
      } else {
        document.getElementById("sticky").classList.add("fixed");
        document.getElementById("navbar-row").style.display = "none";
      }
    } else {
      document.getElementById("sticky").classList.remove("fixed");
      document.getElementById("navbar-row").style.display = "block";
    }
  };

  const openSearch = () => {
    setToggleSearch(true);
  };

  return (
    <div>
      <header id="sticky" className={`sticky marketplace dark`}>
        <div className="mobile-fix-option"></div>

        <TopBarDark topClass="top-header top-header-dark2" />
        <Container>
          <Row>
            <Col>
              <div className="main-menu d-flex">
                <div className="menu-left">
                  <Link href="/">
                    <a>
                      <div className="brand-logo" style={{ width: "15vw", maxWidth: "15vw" }}>
                        <Image src={logo} alt="Mubaha" layout="responsive" />
                      </div>
                    </a>
                  </Link>
                </div>
               <Search />
                <div className="menu-right pull-right">
                  {/* <NavBar /> */}
                  <nav className="text-start">
                    <div className="toggle-nav" onClick={openNav.bind(this)}>
                      <i className="fa fa-bars sidebar-bar"></i>
                    </div>
                  </nav>

                  <div>
                    <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-search d-xl-none d-inline-block">
                          <div>
                            <Media
                              src="/assets/images/icon/search.png"
                              className="img-fluid"
                              onClick={openSearch}
                              alt=""
                            />
                          </div>
                        </li>
                        <HeaderSettings />
                        <CartContainer icon={cart} />
                        {/* <Currency icon={settings} /> */}

                        {/* {direction === undefined ? (
                          <CartContainer layout={direction} icon={cart} />
                        ) : (
                          <Cart layout={direction} icon={cart} />
                        )} */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container id="navbar-row">
          <div className={styles.bottom_part}>
            <Row>
              <Col lg={3} className="d-none d-xl-block">
                <div className={`${styles.category_menu} h-100`}>
                  <Link href="/categories">
                    <a>
                      <h5 className={`mb-0 ${styles.txt_white}`}>
                        <strong>
                          <i className="fa fa-bars mr-2"></i>DANH MỤC SẢN PHẨM
                        </strong>
                      </h5>
                    </a>
                  </Link>
                </div>
              </Col>
              <Col sm={12} lg={9}>
                <div className={`main-nav-center`}>
                  <NavBar navClose={navClose} closeNav={closeNav} />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </header>
      <SearchOverlay toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} />
    </div>
  );
}
