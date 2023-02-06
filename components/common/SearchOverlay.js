import { useEffect, useCallback, useState, useRef } from "react";


import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";


const SearchOverlay = ({toggleSearch, setToggleSearch}) => {
  const searchInput =  useRef(null);


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const closeSearch = () => {
    setToggleSearch(false);
    document.getElementById("search-overlay").style.display = "none";
  };

  const openSearch = () => {
    setToggleSearch(true);
    document.getElementById("search-overlay").style.display = "block";
  }

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      closeSearch();
      //Do whatever when esc is pressed
    }
  }, []);

  useEffect(() => {
    if(toggleSearch) {
      openSearch();
      searchInput.current.focus();
      document.addEventListener("keydown", escFunction, false);
    } else {
      document.removeEventListener("keydown", escFunction, false);
    }

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [toggleSearch]);

  return (
    <div id="search-overlay" className="search-overlay">
      <div>
        <span className="closebtn" onClick={closeSearch} title="Close Overlay">
          ×
        </span>
        <div className="overlay-content">
          <Container>
            <Row>
              <Col xl="12">
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      ref={searchInput}
                      type="text"
                      className="form-control"
                      placeholder="Tìm kiếm sản phẩm, nhãn hàng..."
                      autoFocus
                    />
                  </FormGroup>
                  <Button type="submit" className="btn btn-primary">
                    <i className="fa fa-search"></i>
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
