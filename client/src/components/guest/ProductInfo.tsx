import { assets } from "@/assets/frontend_assets/assets";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import AddToCart from "./AddToCart";
import Guarantee from "./Guarantee";
import { ParamValue } from "next/dist/server/request/params";
import { toast } from "react-toastify";
import SkeletonProductInfo from "./SkeletonProductInfo";
import TryOnButton from "./TryOnButton";

type product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: StaticImageData[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
};

type Product = {
  id: string | undefined;
  title: string | undefined;
  imageUrl: string[] | undefined;
  description: string | undefined;
  price: number | undefined;
  size: string[] | undefined;
  tryon: string | undefined;
};

const ProductInfo = ({
  id,
  title,
  imageUrl,
  description,
  price,
  size,
  tryon,
}: Product) => {
  if (
    id === undefined ||
    title === undefined ||
    description === undefined ||
    price === undefined ||
    imageUrl === undefined ||
    size === undefined ||
    tryon === undefined
  ) {
    return <SkeletonProductInfo />;
  }
  const [sizeProduct, setSizeProduct] = useState("");
  const image = imageUrl[0];
  const stars = Array.from(
    { length: Math.floor(Math.random() * 5) },
    (v, i) => i
  );
  console.log("product id: ", id);
  console.log(
    "id, title, imageUrl, description, price,tryon: ",
    id,
    title,
    imageUrl,
    description,
    price,
    size,
    tryon
  );
  return (
    <>
      <div className="w-full flex md:flex-row flex-col md:px-0 px-3 gap-8">
        <div className="flex-1 flex sm:flex-row flex-col-reverse sm:items-start items-center gap-3">
          <div className="flex sm:min-h-full sm:flex-col flex-row flex-wrap gap-3.5 w-auto">
            {imageUrl.map((item, index) => (
              <Image
                src={item}
                alt="product image"
                key={index}
                width={390}
                height={450}
                className="w-24 h-auto"
              />
            ))}
          </div>
          <div className="md:w-md w-[320px]">
            {image && (
              <Image
                width={390}
                height={450}
                src={image}
                alt="product main"
                className="w-full h-full aspect-auto"
              />
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-black font-bold text-xl">{title}</h1>
          <div className="flex items-center gap-8">
            <div className="flex gap-2.5 items-center">
              {stars.map((item, index) => {
                return (
                  <Image
                    src={assets.star_icon}
                    alt="star"
                    key={index}
                    className="w-5"
                  />
                );
              })}
              {Array.from({ length: 5 - stars.length }, (v, i) => i).map(
                (item, index) => (
                  <Image
                    src={assets.star_dull_icon}
                    alt="star_dull"
                    key={index}
                    className="w-5"
                  />
                )
              )}
            </div>
            <p>(122)</p>
          </div>
          <h1 className="text-black font-bold text-2xl">{price}</h1>
          <p className="text-gray-500 text-[14px] font-semibold">
            {description}
          </p>
          <div className="flex flex-col gap-3">
            <p>Select size</p>
            {/* // TODO: add size and review product  */}
            <div className="flex gap-3">
              {size.map((item, index) => (
                <div
                  className={`bg-gray-300 flex justify-center items-center text-foreground py-3 px-5 text-[16px] transition-all cursor-pointer ${
                    sizeProduct === item ? "ring-1 ring-orange-300" : ""
                  }`}
                  onClick={() =>
                    setSizeProduct((prev) =>
                      prev === item ? "" : (prev = item)
                    )
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-4">
            <AddToCart
              price={price}
              product={{ id, imageUrl, price, title, size: sizeProduct }}
            />
            <TryOnButton tryon={tryon} />
          </div>
          <Guarantee />
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
