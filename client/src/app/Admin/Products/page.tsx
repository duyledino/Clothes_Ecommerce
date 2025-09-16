"use client";
import React, { useEffect, useState } from "react";
import { products } from "@/assets/frontend_assets/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RotateCcw, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toast } from "react-toastify";
import Pagination from "@/components/guest/Pagination";
import Loading from "@/components/ui/Loading";
import {
  fetchDeleteProduct,
  fetchProductFromApiAdmin,
  fetchReviseProduct,
} from "@/slice/ProductSlice";

const tags = ["image", "name", "size", "category", "price", "sold", "action"];

const Page = () => {
  const [page, setPage] = useState(1);
  const { loading, ProductsAdmin, error, Message } = useAppSelector(
    (state) => state.ProductSlice
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("Products Admin: ", ProductsAdmin);
    const localStore = localStorage.getItem("user");
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    const token = JSON.parse(localStore).token;
    dispatch(fetchProductFromApiAdmin({ token: token, page }));
  }, [page]);
  // toast 1st
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (Message && !error) {
      toast.success(Message);
      //dirty code
      const localStore = localStorage.getItem("user");
      if (localStore === undefined || localStore === null) {
        toast.error("No token");
        return;
      }
      const token = JSON.parse(localStore).token;
      dispatch(fetchProductFromApiAdmin({ token: token, page }));
    }
  }, [Message, error]);
  const handleClickDel = (id: string) => {
    const ids: string[] = [];
    ids.push(id);
    const localStore = localStorage.getItem("user");
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    const token = JSON.parse(localStore).token;
    dispatch(fetchDeleteProduct({ ids: ids, token: token }));
  };
  const handleClickRevise = (id: string) => {
    const ids: string[] = [];
    ids.push(id);
    const localStore = localStorage.getItem("user");
    if (localStore === undefined || localStore === null) {
      toast.error("No token");
      return;
    }
    const token = JSON.parse(localStore).token;
    dispatch(fetchReviseProduct({ ids: ids, token: token }));
  };
  console.log("products: ", ProductsAdmin);
  return (
    <>
      {loading && <Loading />}
      <div>
        <h1 className="mb-3 text-gray-900">Products</h1>
        <ul className="flex flex-col gap-3">
          <li className="list-none md:grid hidden grid-cols-[64px_1fr_1fr_1fr_1fr_1fr_1fr] md:gap-x-3 md:place-items-center bg-gray-100 p-2 ">
            {tags.map((item, index) => (
              <p key={index} className="capitalize text-gray-900">
                {item}
              </p>
            ))}
          </li>
          {ProductsAdmin.map((item, index) => (
            <li
              key={item.id}
              className={`p-2 list-none grid md:grid-cols-[64px_1fr_1fr_1fr_1fr_1fr_1fr] md:gap-x-3 grid-cols-2 md:place-items-center md:gap-0 gap-2 ${
                item.isDelete === "deleted" ? "bg-red-200" : ""
              }`}
            >
              <Image
                src={item.imageUrl[0]}
                alt={item.imageUrl[0]}
                width={390}
                height={450}
                className="w-16 h-auto"
              />
              <p className="text-gray-500 md:text-sm text-[12px] md:text-center">
                {item.title}
              </p>
              <div className="text-gray-500 md:text-sm text-[12px]">
                <p>{item.size.join(", ")}</p>
              </div>
              <p className="text-gray-500 md:text-sm text-[12px]">
                {item.category}
              </p>
              <p className="text-gray-500 md:text-sm text-[12px]">
                {item.price}
              </p>
              <p className="text-gray-500 md:text-sm text-[12px]">
                {item.count}
              </p>
              <Button
                onClick={() =>
                  item.isDelete === 'deleted'
                    ? handleClickRevise(item.id)
                    : handleClickDel(item.id)
                }
                variant={"ghost"}
                className="bg-gray-100 text-gray-600 hover:text-red-600 focus:outline-none md:col-span-1 col-span-2 cursor-pointer md:w-fit w-full"
              >
                {item.isDelete === "deleted" ? (
                  <RotateCcw className="w-6 h-6" />
                ) : (
                  <Trash className="w-6 h-6" />
                )}
              </Button>
            </li>
          ))}
        </ul>
        {/* cause infinite render because treat [] as reference not content so prevCategory !== Category */}
        <Pagination
          pageName="product"
          categories={null}
          page={page}
          setPage={setPage}
          subcategory={null}
        />
      </div>
    </>
  );
};

export default Page;
