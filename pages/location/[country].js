import SearchLayout from "@/components/SearchLayout";
import React, { useState, useLayoutEffect, useEffect } from "react";
import FilterPage from "@/components/location/FilterLocationSearch";
import ProductList from "@/components/location/ProductList.js";
import _ from "lodash";
import sortByType from "@/enums/sortByType.enum.js";
import orderType from "@/enums/sortOrderType.enum.js";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";
import Head from "next/head";
import HeadSeo from "../../components/HeadSeo";
export default function SearchLocation({ data }) {
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
  const [brand, setBrand] = useState(data.brands);
  const [cat, setCateID] = useState(data.cat);
  const [priceMin, setPriceMin] = useState(data.minPrice);
  const [priceMax, setPriceMax] = useState(data.maxPrice);
  const [location, setLocation] = useState(data.location);
  const [rating, setRating] = useState(data.rating);
  const [order, setOrder] = useState(data.order);
  const [sortBy, setSortBy] = useState(data.sortBy);

  useEffect(() => {
    setProduct(data.produtcs.docs);
    setLocation(data.location);
  }, [data]);

  const handleLimit = (limit) => {
    setLimit(limit);
  };
  useLayoutEffect(() => {
    let searchQuery = {
      limit: limit,
      page: cuurentPage,
    };
    if (brand !== "") {
      searchQuery = { ...searchQuery, brand: brand };
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
        pathname: `/location/${location}`,
        query: searchQuery,
      },
      undefined
    );
  }, [limit, brand, rating, cat, priceMin, priceMax, order, sortBy]);
  useLayoutEffect(() => {
    let searchQuery = {
      limit: limit,
      page: cuurentPage,
    };
    if (brand !== "") {
      searchQuery = { ...searchQuery, brand: brand };
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
        pathname: `/location/${location}`,
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
  }, [limit, brand, location, rating, cat, priceMin, priceMax, order, sortBy]);
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
  const hanldePrice = (min, max) => {
    setPriceMax(max);
    setPriceMin(min);
  };
  const handlePaging = async () => {
    const page = cuurentPage + 1;
    setCurrentPage(page);
    try {
      let searchQuery = `limit=${limit}&page=${page}`;
      if (brand !== "") {
        searchQuery += `&brands=${brand}`;
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
      const res = await fetch(`${process.env.API_LOCATION_URL}/${location}?${searchQuery}`);
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
      if (brand !== "") {
        searchQuery += `&brands=${brand}`;
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
      const res = await fetch(`${process.env.API_LOCATION_URL}/${location}?${searchQuery}`);
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
      <HeadSeo title={`Tìm kiếm theo kho hàng`} />
      <FilterPage
        sm="3"
        sidebarView={sidebarView}
        hanldeBrand={hanldeBrand}
        hanldeCategory={hanldeCategory}
        location={location}
        closeSidebar={() => openCloseSidebar(sidebarView)}
        hanldePrice={hanldePrice}
        hanldeRating={hanldeRating}
      />
      <ProductList
        limit={limit}
        totalProduct={totalProduct}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
        handlePaging={handlePaging}
        text={location}
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
SearchLocation.getLayout = function getLayout(page) {
  return <SearchLayout>{page}</SearchLayout>;
};
export async function getServerSideProps(ctx) {
  const { limit, page, maxPrice, minPrice, brands, cat, country, rating, order, sortBy } =
    ctx.query;
  console.log("country", country);
  let searchQuery = `limit=${limit || 20}&page=${page || 1}`;

  if (cat) {
    searchQuery += `&cat=${cat}`;
  }
  if (brands) {
    searchQuery += `&brands=${brands}`;
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
  const res = await fetch(`${process.env.API_LOCATION_URL}/${country}?${searchQuery}`);
  const data = await res.json();
  return {
    props: {
      data: {
        produtcs: data.data,
        maxPrice: maxPrice || "",
        minPrice: minPrice || "",
        brands: brands || "",
        cat: cat || "",
        rating: rating || "",
        sortBy: sortBy || "",
        order: order || "",
        location: country || "",
      },
    },
  };
}
