import SearchLayout from "@/components/SearchLayout";
import React, { useState, useLayoutEffect } from "react";
import FilterPage from "@/components/category/FilterCate.js";
import ProductList from "@/components/category/ProductList.js";
import _ from "lodash";
import sortByType from "@/enums/sortByType.enum.js";
import orderType from "@/enums/sortOrderType.enum.js";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";
import Head from "next/head";
import HeadSeo from "../../components/HeadSeo";
export default function SerchCategory({ data }) {
  const router = useRouter();
  const [sidebarView, setSidebarView] = useState(false);
  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  const [limit, setLimit] = useState(data.produtcs.products.limit);
  const [cateChild, setCateChild] = useState(data.produtcs.category.childCategories);
  const [products, setProduct] = useState(data.produtcs.products.docs);
  const [cuurentPage, setCurrentPage] = useState(data.produtcs.products.page);
  const [totalPages, setTotalPages] = useState(data.produtcs.products.totalPages);
  const [totalProduct, setTotalProduct] = useState(data.produtcs.products.totalDocs);
  const [hasNextPage, setHasNextPage] = useState(data.produtcs.products.hasNextPage);
  const [brand, setBrand] = useState(data.brands);
  const [priceMin, setPriceMin] = useState(data.minPrice);
  const [priceMax, setPriceMax] = useState(data.maxPrice);
  const [location, setLocation] = useState(data.location);
  const [rating, setRating] = useState(data.rating);
  const [order, setOrder] = useState(data.order);
  const [sortBy, setSortBy] = useState(data.sortBy);
  const [slug, setSlug] = useState(data.cateSlug);
  const [name, setName] = useState(data.produtcs.category.name);
  const handleLimit = (limit) => {
    setLimit(limit);
  };
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
    router.push({
      pathname: `/categories/${slug}`,
      query: searchQuery,
    });
  }, [limit, brand, location, rating, slug, priceMin, priceMax, order, sortBy]);
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
        pathname: `/categories/${slug}`,
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
  }, [limit, brand, location, rating, slug, priceMin, priceMax, order, sortBy]);
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
    try {
      let searchQuery = `limit=${limit}&page=${page}`;
      if (location !== "") {
        searchQuery += `&location=${location}`;
      }
      if (brand !== "") {
        searchQuery += `&brands=${brand}`;
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
      const res = await fetch(`${process.env.API_URL}/categories/${slug}/products?${searchQuery}`);
      const data = await res.json();
      if (data.status === 200) {
        const list = _.concat(products, data.data.products.docs);
        setTimeout(() => {
          setProduct([...list]);
          setCurrentPage(data.data.products.page);
          setCurrentPage(page);
          setTotalPages(data.data.products.totalPages);
          setTotalProduct(data.data.products.totalDocs);
          setHasNextPage(data.data.products.hasNextPage);
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
      const res = await fetch(`${process.env.API_URL}/categories/${slug}/products?${searchQuery}`);
      const data = await res.json();
      if (data.status === 200) {
        setProduct([...data.data.products.docs]);
        setCurrentPage(data.data.products.page);
        setTotalPages(data.data.products.totalPages);
        setTotalProduct(data.data.products.totalDocs);
        setHasNextPage(data.data.products.hasNextPage);
        setName(data.data.category?.name);
        setSlug(data.data.category?.slug);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const hanldeRating = (value) => {
    setRating(value);
  };
  const hanldeCategory = (value) => {
    setSlug(value);
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
      <HeadSeo title={`Danh mục ${name}`} />
      <FilterPage
        sm="3"
        sidebarView={sidebarView}
        hanldeBrand={hanldeBrand}
        handleLocation={handleLocation}
        hanldeCategory={hanldeCategory}
        cateChild={cateChild}
        closeSidebar={() => openCloseSidebar(sidebarView)}
        hanldePrice={hanldePrice}
        slug={slug}
        hanldeRating={hanldeRating}
      />
      <ProductList
        limit={limit}
        totalProduct={totalProduct}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
        handlePaging={handlePaging}
        text={name}
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
SerchCategory.getLayout = function getLayout(page) {
  return <SearchLayout>{page}</SearchLayout>;
};
export async function getServerSideProps(ctx) {
  const { limit, page, maxPrice, minPrice, location, brands, id, rating, order, sortBy } =
    ctx.query;
  let searchQuery = `limit=${limit || 20}&page=${page || 1}`;

  if (location) {
    searchQuery += `&location=${location}`;
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
  const res = await fetch(`${process.env.API_URL}/categories/${id}/products?${searchQuery}`);
  const data = await res.json();
  return {
    props: {
      data: {
        produtcs: data.data,
        maxPrice: maxPrice || "",
        minPrice: minPrice || "",
        location: location || "",
        brands: brands || "",
        rating: rating || "",
        sortBy: sortBy || "",
        order: order || "",
        cateSlug: id || "",
      },
    },
  };
}
