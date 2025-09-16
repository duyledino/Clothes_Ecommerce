import Image, { StaticImageData } from "next/image";
import React from "react";
import temp from "@/assets/frontend_assets/p_img1.png";

// (alias) const products: {
//     _id: string;
//     name: string;
//     description: string;
//     price: number;
//     image: StaticImageData[];
//     category: string;
//     subCategory: string;
//     sizes: string[];
//     date: number;
//     bestseller: boolean;
// }[]



type product = {
  title: string;
  price: number;
  imageUrl: StaticImageData;
};

type Product={
  title: string;
  imageUrl: string;
  price: number;
}

const Card = ({title,price,imageUrl}:Product) => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="w-full h-auto overflow-hidden relative">
        <Image
          src={imageUrl}
          alt="product"
          width={390}
          height={450}
          className="w-full h-auto object-cover hover:scale-110 transition-all"
        />
      </div>
      <p className="text-[12px] text-black">
        {title}
      </p>
      <h1 className="text-black font-bold">{price}</h1>
    </div>
  );
};

export default Card;
