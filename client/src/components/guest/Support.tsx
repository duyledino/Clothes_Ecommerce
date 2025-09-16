import React from "react";
import { assets } from "@/assets/frontend_assets/assets";
import Image from "next/image";

const support = [
  {
    image: assets.exchange_icon,
    name: "Easy Exchange Policy",
    description: "We offer hassle free exchange policy",
  },
  {
    image: assets.quality_icon,
    name: "7 Days Return Policy",
    description: "We provide 7 days free return policy",
  },
  {
    image: assets.support_img,
    name: "Best customer support",
    description: "we provide 24/7 customer support",
  },
];

const Support = () => {
  return (
    <div className="container m-auto mt-14">
      <div className="w-full flex sm:flex-row flex-col justify-around text-center lg:gap-0 sm:gap-6 gap-6">
        {support.map((item, index) => (
          <div className="flex flex-col items-center" key={index}>
            <div className="mb-7">
              <Image src={item.image} alt="exchange" className="sm:w-16 w-14 h-auto"/>
            </div>
            <h1 className="text-[16px] sm:text-[12px] md:text-[14px] lg:text-[16px] text-black font-bold">{item.name}</h1>
            <p className="text-sm sm:text-[10px] md:text-[12px] lg:text-sm text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
