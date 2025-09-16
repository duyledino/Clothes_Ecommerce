"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { products } from "@/assets/frontend_assets/assets";
import Card from "./Card";
import SortBy from "./SortBy";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { StaticImageData } from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../ui/Loading";
import {
  fetchApiSearchProduct,
  fetchProductFromApi,
  resetSearchProduct,
} from "@/slice/ProductSlice";

type ProductData = {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string[];
  tryon: string;
  category: string;
  subcategory: string;
  size: string[];
};

// type product = {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: StaticImageData[];
//   category: string;
//   subCategory: string;
//   sizes: string[];
//   date: number;
//   bestseller: boolean;
// };

type cateAndType = {
  subcategory: string[];
  categories: string[];
  query: string;
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  SearchProduct: ProductData[];
};

const Collections = ({
  page,
  subcategory,
  categories,
  query,
  setPage,
  SearchProduct,
}: cateAndType) => {
  const { Products, error, loading } = useAppSelector(
    (state) => state.ProductSlice
  );
  const dispatch = useAppDispatch();

  const [sort, setSort] = useState<string>("");
  //filter fake data
  // useEffect(() => {
  //   setProductFilter((prev) => {
  //     prev = products.filter((item) => {
  //       const matchCategories =
  //         categories.length !== 0
  //           ? categories.find((subItem) => subItem === item.category) !==
  //             undefined
  //           : true;
  //       const matchType =
  //         type.length !== 0
  //           ? type.find((subItem) => subItem === item.subCategory) !== undefined
  //           : true;
  //       return matchCategories && matchType;
  //     });
  //     if (sort !== "") {
  //       prev = [...prev].sort((a, b) =>
  //         sort === "Low to High" ? a.price - b.price : b.price - a.price
  //       );
  //     }
  //     return prev;
  //   });
  // }, [sort, categories, type]);
  // trigger when one of these change [sort, categories, subcategory]
  console.log("sort,categories,subcategory: ", sort, categories, subcategory);
  useEffect(() => {
    setPage(1);
    console.log("fetch page: ", page); // not trigger when page change
    dispatch(
      fetchProductFromApi({
        page: 1,
        category: categories,
        subcategory: subcategory,
        sort: sort,
      })
    );
  }, [sort, categories, subcategory]);
  useEffect(() => {
    if (query === "") {
      dispatch(resetSearchProduct());
    } else {
      dispatch(fetchApiSearchProduct({ query }));
    }
  }, [query]);
  useEffect(() => {
    console.log("page in useEffect: ", page);
    dispatch(
      fetchProductFromApi({
        page,
        category: categories,
        subcategory: subcategory,
        sort: sort,
      })
    );
  }, [page]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <>
      {loading && <Loading />}
      <div className="md:flex-1 w-full flex flex-col">
        <div className="flex  justify-between items-center">
          <div className="flex items-center gap-4 w-full">
            <h2 className="text-xl uppercase font-semibold text-gray-500 rounded-full">
              All <span className="text-black">Collection</span>
            </h2>
            <p className="w-9 h-0.5 rounded-full bg-black"></p>
          </div>
          <SortBy setSort={setSort} />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-10 gap-5 gap-y-6">
          {/* real data */}
          {SearchProduct.length === 0
            ? Products.map((item) => (
                <Link href={`/Product/${item.id}`} key={item.id}>
                  <Card
                    imageUrl={item.imageUrl[0]}
                    title={item.title}
                    price={item.price}
                    key={item.id}
                  />
                </Link>
              ))
            : SearchProduct.map((item) => (
                <Link href={`/Product/${item.id}`} key={item.id}>
                  <Card
                    imageUrl={item.imageUrl[0]}
                    title={item.title}
                    price={item.price}
                    key={item.id}
                  />
                </Link>
              ))}
          {/* //fake data */}
          {/* {productSearch.length > 0
            ? productSearch.map((item) => (
                <Link href={`/Product/${item._id}`} key={item._id}>
                  <Card
                    imageUrl={item.image[0]}
                    title={item.name}
                    price={item.price}
                    key={item._id}
                  />
                </Link>
              ))
            : productFilter.map((item) => (
                <Link href={`/Product/${item._id}`} key={item._id}>
                  <Card
                    imageUrl={item.image[0]}
                    title={item.name}
                    price={item.price}
                    key={item._id}
                  />
                </Link>
              ))} */}
        </div>
      </div>
    </>
  );
};

export default Collections;
