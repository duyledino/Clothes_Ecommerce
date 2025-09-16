"use client";
import { useState, useEffect, SetStateAction } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Loading from "../ui/Loading";
import { toast } from "react-toastify";
import { fetchTotalPage } from "@/slice/ProductSlice";
import { fetchTotalOrderPage } from "@/slice/OrderSlice";

export default function Pagination({
  page,
  categories,
  subcategory,
  setPage,
  pageName,
}: {
  categories: string[] | null;
  subcategory: string[] | null;
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  pageName: string;
}) {
  const { loading, error, totalPage } = useAppSelector(
    (state) => state.ProductSlice
  );
  const dispatch = useAppDispatch();
  const windowSize = 2;
  console.log("total page: ", totalPage);
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    // always show first page
    if (page > 1 + windowSize) {
      pages.push(1, "...");
    } else {
      for (let i = 1; i < page; i++) pages.push(i);
    }

    // middle window
    for (
      let i = Math.max(1, page <= 3 ? page : page - windowSize);
      i <= Math.min(totalPage, page + windowSize);
      i++
    ) {
      pages.push(i);
    }

    // always show last page
    if (page < totalPage - windowSize) {
      pages.push("...", totalPage);
    } else {
      for (let i = page + 1; i <= totalPage - windowSize; i++) pages.push(i);
    }

    return pages;
  };
  useEffect(() => {
    console.log("category,subcategory: ", categories, subcategory);
    // const localStore = localStorage.getItem("user");
    // if (localStore === undefined || localStore === null) {
    //   toast.error("No token");
    //   return;
    // }
    if (categories === null || subcategory === null) {
      dispatch(fetchTotalPage({ categories: [], subcategory: [] }));
      return;
    }
    if (pageName === "product")
      dispatch(fetchTotalPage({ categories, subcategory }));
    else if (pageName === "order") dispatch(fetchTotalOrderPage());
  }, [page, categories, subcategory]); // trigger infinite here

  const handlePrevious = () => {
    setPage((prev) => {
      if (prev === 1) return totalPage;
      return prev - 1;
    });
  };
  const handleNext = () => {
    setPage((prev) => {
      if (prev === totalPage) return 1;
      return prev + 1;
    });
  };
  //toast 2nd
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <>
      {loading && <Loading />}
      <div className="my-7 p-4 flex justify-center items-center gap-4">
        {/* Pagination */}
        <Button
          onClick={() => handlePrevious()}
          variant={"ghost"}
          className="bg-gray-900 text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold w-10 h-10 rounded border-2 border-gray-900 cursor-pointer"
        >
          <ChevronLeft />
        </Button>
        <div className="flex gap-4">
          {getPageNumbers().map((item, index) =>
            item === "..." ? (
              <p className="text-gray-900">...</p>
            ) : (
              <button
                key={index}
                onClick={() => setPage(item as number)}
                className={`w-10 h-10 rounded text-2xl cursor-pointer ${
                  Number(item) === page
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>
        <Button
          onClick={() => handleNext()}
          variant={"ghost"}
          className="bg-gray-900 text-white hover:bg-transparent hover:text-gray-800 uppercase font-semibold w-10 h-10 rounded border-2 border-gray-900 cursor-pointer"
        >
          <ChevronRight />
        </Button>
      </div>
    </>
  );
}
