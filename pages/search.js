import SearchLayout from "@/components/SearchLayout";
import React, { useState, useLayoutEffect, useEffect } from "react";
import FilterPage from "@/components/filter/FilterTextSearch.js";
import ProductList from "@/components/filter/ProductList.js";
import _ from "lodash";
import sortByType from "@/enums/sortByType.enum.js";
import orderType from "@/enums/sortOrderType.enum.js";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";
import Head from "next/head";
import HeadSeo from "../components/HeadSeo";
export default function FilterLayoutComponent({ data }) {
  const router = useRouter();
  const [sidebarView, setSidebarView] = useState(false);
  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  const [limit, setLimit] = useState(data.produtcs.limit);
  const [products, setProduct] = useState(data.produtcs.docs);
  const [cuurentPage, setCurrentPage] = useState(data.produtcs.page);
  const [totalPages, setTotalPages] = useState(data.produtcs.totalPages);
  const [totalProduct, setTotalProduct] = useState(data.produtcs.totalDocs);
  const [hasNextPage, setHasNextPage] = useState(data.produtcs.hasNextPage);
  const [text, setText] = useState(data.t);
  const [brand, setBrand] = useState(data.brands);
  const [cat, setCateID] = useState(data.cat);
  const [priceMin, setPriceMin] = useState(data.minPrice);
  const [priceMax, setPriceMax] = useState(data.maxPrice);
  const [location, setLocation] = useState(data.location);
  const [rating, setRating] = useState(data.rating);
  const [order, setOrder] = useState(data.order);
  const [sortBy, setSortBy] = useState(data.sortBy);
  const clearSearch = () => {
    setSortBy("");
    setPriceMin("");
    setPriceMax("");
    setBrand("");
    setCateID("");
    setLocation("");
    setRating("");
    setOrder("");
    router.push(
      {
        query: { limit: limit, page: cuurentPage },
      },
      undefined
    );
  };
  const handleLimit = (limit) => {
    setLimit(limit);
  };
  useEffect(() => {
    setText(data.t);
  }, [data.t]);
  useLayoutEffect(() => {
    let searchQuery = {
      limit: limit,
      page: cuurentPage,
    };
    if (location !== "") {
      searchQuery = {
        ...searchQuery,
        location: location,
      };
    }
    if (brand !== "") {
      searchQuery = { ...searchQuery, brand: brand };
    }
    if (text !== "") {
      searchQuery = { ...searchQuery, t: text };
    }
    if (cat !== "") {
      searchQuery = { ...searchQuery, cat: cat };
    }
    if (typeof priceMax === "number") {
      searchQuery = { ...searchQuery, priceMax };
    }
    if (typeof priceMin === "number") {
      searchQuery = { ...searchQuery, priceMin };
    }
    if (rating > 0) {
      searchQuery = { ...searchQuery, rating: rating };
    }
    if (order) {
      searchQuery = { ...searchQuery, order: order };
    }
    if (sortBy) {
      searchQuery = { ...searchQuery, sortBy: sortBy };
    }
    router.push(
      {
        query: searchQuery,
      },
      undefined
    );
  }, [limit, brand, location, rating, cat, text, priceMin, priceMax, order, sortBy]);
  useLayoutEffect(() => {
    let searchQuery = {
      limit: limit,
      page: cuurentPage,
    };
    if (location !== "") {
      searchQuery = {
        ...searchQuery,
        location: location,
      };
    }
    if (brand !== "") {
      searchQuery = { ...searchQuery, brand: brand };
    }
    if (text !== "") {
      searchQuery = { ...searchQuery, t: text };
    }
    if (cat !== "") {
      searchQuery = { ...searchQuery, cat: cat };
    }
    if (typeof priceMax === "number") {
      searchQuery = { ...searchQuery, priceMax };
    }
    if (typeof priceMin === "number") {
      searchQuery = { ...searchQuery, priceMin };
    }
    if (rating > 0) {
      searchQuery = { ...searchQuery, rating: rating };
    }
    if (order) {
      searchQuery = { ...searchQuery, order: order };
    }
    if (sortBy) {
      searchQuery = { ...searchQuery, sortBy: sortBy };
    }
    router.push(
      {
        query: searchQuery,
      },
      undefined,
      {
        shallow: true,
      }
    );
  }, [cuurentPage]);

  useLayoutEffect(() => {
    handleApi();
  }, [limit, brand, location, rating, cat, text, priceMin, priceMax, order, sortBy]);
  const hanldeBrand = (e) => {
    const isCheck = e.target.checked;
    const value = e.target.value;
    if (isCheck) {
      if (brand === "") {
        setBrand(value);
      } else {
        const prev = `${brand},${value}`;
        setBrand(prev);
      }
    } else {
      const list = _.split(brand, ",");
      const rs = _.pull(list, value);
      setBrand(rs.toString());
    }
  };
  const handleLocation = (e) => {
    const isCheck = e.target.checked;
    const value = e.target.value;
    if (isCheck) {
      if (location === "") {
        setLocation(value);
      } else {
        const prev = `${location},${value}`;
        setLocation(prev);
      }
    } else {
      const list = _.split(location, ",");
      const rs = _.pull(list, value);
      setLocation(rs.toString());
    }
  };
  const hanldePrice = (min, max) => {
    setPriceMax(max);
    setPriceMin(min);
  };
  const handlePaging = async () => {
    const page = cuurentPage + 1;
    setCurrentPage(page);
    try {
      let searchQuery = `limit=${limit}&page=${page}`;
      if (location !== "") {
        searchQuery += `&location=${location}`;
      }
      if (brand !== "") {
        searchQuery += `&brands=${brand}`;
      }
      if (text !== "") {
        searchQuery += `&t=${text}`;
      }
      if (cat !== "") {
        searchQuery += `&cat=${cat}`;
      }
      if (typeof priceMax === "number") {
        searchQuery += `&maxPrice=${priceMax}`;
      }
      if (typeof priceMin === "number") {
        searchQuery += `&minPrice=${priceMin}`;
      }
      if (rating > 0) {
        searchQuery += `&rating=${rating}`;
      }
      if (order) {
        searchQuery += `&order=${order}`;
      }
      if (sortBy) {
        searchQuery += `&sortBy=${sortBy}`;
      }
      const res = await fetch(`${process.env.API_PRODUCT_URL}/search?${searchQuery}`);
      const data = await res.json();
      if (data.status === 200) {
        const list = _.concat(products, data.data.docs);
        setTimeout(() => {
          setProduct([...list]);
          setCurrentPage(data.data.page);
          setTotalPages(data.data.totalPages);
          setTotalProduct(data.data.totalDocs);
          setHasNextPage(data.data.hasNextPage);
        }, 1500);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleApi = async () => {
    try {
      let searchQuery = `limit=${limit}&page=${cuurentPage}`;
      if (location !== "") {
        searchQuery += `&location=${location}`;
      }
      if (brand !== "") {
        searchQuery += `&brands=${brand}`;
      }
      if (text !== "") {
        searchQuery += `&t=${text}`;
      }
      if (cat !== "") {
        searchQuery += `&cat=${cat}`;
      }
      if (priceMax !== "") {
        searchQuery += `&maxPrice=${priceMax}`;
      }
      if (priceMin !== "") {
        searchQuery += `&minPrice=${priceMin}`;
      }
      if (rating > 0) {
        searchQuery += `&rating=${rating}`;
      }
      if (order) {
        searchQuery += `&order=${order}`;
      }
      if (sortBy) {
        searchQuery += `&sortBy=${sortBy}`;
      }
      const res = await fetch(`${process.env.API_PRODUCT_URL}/search?${searchQuery}`);
      const data = await res.json();
      if (data.status === 200) {
        setProduct([...data.data.docs]);
        setCurrentPage(data.data.page);
        setTotalPages(data.data.totalPages);
        setTotalProduct(data.data.totalDocs);
        setHasNextPage(data.data.hasNextPage);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const hanldeRating = (value) => {
    setRating(value);
  };
  const hanldeCategory = (value) => {
    setCateID(value);
  };
  const hanldeOrder = (e) => {
    switch (e.target.options.selectedIndex) {
      case 0: {
        setOrder("");
        setSortBy("");
        break;
      }
      case 1: {
        setOrder(orderType.DESC);
        setSortBy(sortByType.PRICE);
        break;
      }
      case 2: {
        setOrder(orderType.ASC);
        setSortBy(sortByType.PRICE);
        break;
      }
      case 3: {
        setOrder(orderType.DESC);
        setSortBy(sortByType.TIME);
        break;
      }
    }
  };
  return (
    <>
      <HeadSeo title={`${text} giá tốt`} />

      <FilterPage
        sm="3"
        sidebarView={sidebarView}
        hanldeBrand={hanldeBrand}
        handleLocation={handleLocation}
        hanldeCategory={hanldeCategory}
        clearSearch={clearSearch}
        closeSidebar={() => openCloseSidebar(sidebarView)}
        hanldePrice={hanldePrice}
        text={text}
        hanldeRating={hanldeRating}
      />
      <ProductList
        limit={limit}
        totalProduct={totalProduct}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
        handlePaging={handlePaging}
        text={data.t}
        hanldeOrder={hanldeOrder}
        products={products}
        cuurentPage={cuurentPage}
        handleLimit={handleLimit}
        colClass="col-xl-3 col-md-6 col-grid-box"
        openSidebar={() => openCloseSidebar(sidebarView)}
      />
    </>
  );
}
FilterLayoutComponent.getLayout = function getLayout(page) {
  return <SearchLayout>{page}</SearchLayout>;
};
export async function getServerSideProps(ctx) {
  const { limit, page, maxPrice, minPrice, location, brands, t, cat, rating, order, sortBy } =
    ctx.query;
  let searchQuery = `limit=${limit || 20}&page=${page || 1}`;

  if (location) {
    searchQuery += `&location=${location}`;
  }
  if (brands) {
    searchQuery += `&brands=${brands}`;
  }
  if (t) {
    searchQuery += `&t=${t}`;
  }
  if (cat) {
    searchQuery += `&cat=${cat}`;
  }
  if (maxPrice) {
    searchQuery += `&maxPrice=${maxPrice}`;
  }
  if (minPrice) {
    searchQuery += `&minPrice=${minPrice}`;
  }
  if (rating) {
    searchQuery += `&rating=${rating}`;
  }
  if (order) {
    searchQuery += `&order=${order}`;
  }
  if (sortBy) {
    searchQuery += `&sortBy=${sortBy}`;
  }
  const res = await fetch(`${process.env.API_PRODUCT_URL}/search?${searchQuery}`);
  const data = await res.json();

  return {
    props: {
      data: {
        produtcs: data.data,
        maxPrice: maxPrice || "",
        minPrice: minPrice || "",
        location: location || "",
        brands: brands || "",
        t: t || "",
        cat: cat || "",
        rating: rating || "",
        sortBy: sortBy || "",
        order: order || "",
      },
    },
  };
}
