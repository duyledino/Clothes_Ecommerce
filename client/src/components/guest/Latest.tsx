import React, { useEffect } from "react";
import { products } from "@/assets/frontend_assets/assets";
import Card from "./Card";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchLatestFromApi } from "@/slice/ProductSlice";
import { toast } from "react-toastify";
import Loading from "../ui/Loading";

const Latest = () => {
  const { LatestProduct, loading, Message, error } = useAppSelector(
    (state) => state.ProductSlice
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLatestFromApi());
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  console.log("LatestPRoduct: ", LatestProduct);
  return (
    <>
      {loading && <Loading />}
      <div className="container m-auto mt-14 md:mt-[600px] lg:mt-32 xl:mt-20 md:px-0 px-4">
        <div className="w-full flex items-center justify-center gap-2">
          <h1 className=" text-center uppercase text-3xl text-gray-500">
            latest <span className="text-black">collections</span>
          </h1>
          <p className="w-9 h-0.5 rounded-full bg-black inline-block"></p>
        </div>
        <h2 className="text-center text-gray-600 mt-5 text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </h2>
        <div className="grid lg:grid-cols-5 md:grid-4 sm:grid-cols-3 grid-cols-2 mt-10 gap-5 gap-y-6">
          {LatestProduct.map((item) => (
            <Card
              key={item.id}
              imageUrl={item.imageUrl[0]}
              title={item.title}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Latest;
